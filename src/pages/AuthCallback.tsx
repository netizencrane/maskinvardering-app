import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { Loader2 } from "lucide-react";

/**
 * Handles the OAuth callback redirect from Supabase.
 * Exchanges the code/token fragment for a session, then redirects to /dashboard.
 */
export default function AuthCallback() {
    const navigate = useNavigate();

    useEffect(() => {
        supabase.auth.onAuthStateChange((event) => {
            if (event === "SIGNED_IN") {
                navigate("/dashboard", { replace: true });
            }
        });
    }, [navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="text-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
                <p className="text-sm text-muted-foreground">Loggar in...</p>
            </div>
        </div>
    );
}
