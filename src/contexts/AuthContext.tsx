import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { Session, User, AuthError } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabaseClient";

interface AuthContextType {
  /** Whether the initial session check is still in progress. */
  loading: boolean;
  /** The active Supabase session (null when logged out). */
  session: Session | null;
  /** Convenience accessor – the user object from the session. */
  user: User | null;
  /** Sign in with email + password. */
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  /** Create a new account with email + password. */
  signUp: (email: string, password: string) => Promise<{ error: AuthError | null; confirmEmail: boolean }>;
  /** Sign in via OAuth provider (e.g. "google"). */
  signInWithOAuth: (provider: "google") => Promise<{ error: AuthError | null }>;
  /** Sign out the current user. */
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  loading: true,
  session: null,
  user: null,
  signIn: async () => ({ error: null }),
  signUp: async () => ({ error: null, confirmEmail: false }),
  signInWithOAuth: async () => ({ error: null }),
  signOut: async () => { },
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Grab the existing session on mount.
    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s);
      setLoading(false);
    });

    // Listen for auth state changes (login, logout, token refresh).
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error };
  }, []);

  const signUp = useCallback(async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    // If a session is returned, email confirmation is disabled.
    const confirmEmail = !error && !data.session;
    return { error, confirmEmail };
  }, []);

  const signInWithOAuth = useCallback(async (provider: "google") => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    return { error };
  }, []);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setSession(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        loading,
        session,
        user: session?.user ?? null,
        signIn,
        signUp,
        signInWithOAuth,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
