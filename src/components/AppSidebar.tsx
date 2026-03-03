import { Warehouse, BarChart3, Landmark, Shield, Search, TrendingUp, Target, LogOut, Camera, Video, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { NavLink } from "@/components/NavLink";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";

const navItems = [
  { title: "Värdera maskin", url: "/vardering", icon: Target },
  { title: "Bildanalys", url: "/app/bildanalys", icon: Camera },
  { title: "Videoanalys", url: "/app/videoanalys", icon: Video },
  { title: "Rapporter", url: "/app/rapporter", icon: FileText },
];

const fleetItems = [
  { title: "Flottpark", url: "/dashboard", icon: Warehouse },
];

export function AppSidebar() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const displayName = user?.user_metadata?.full_name || user?.email || "Användare";
  const initials = displayName.substring(0, 2).toUpperCase();

  return (
    <Sidebar className="border-r border-sidebar-border">
      <SidebarHeader className="p-5 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg gradient-gold flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-foreground tracking-tight">Maskinvärdering</h1>
            <p className="text-xs text-muted-foreground">.se</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground mb-2 px-3">
            Värdering
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/vardering"}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-sidebar-accent transition-all duration-200"
                      activeClassName="bg-sidebar-accent text-foreground font-medium"
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground mb-2 px-3">
            Tillgångar
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {fleetItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-sidebar-accent transition-all duration-200"
                      activeClassName="bg-sidebar-accent text-foreground font-medium"
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-sidebar-border space-y-3">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
            <span className="text-xs font-semibold text-muted-foreground">{initials}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-foreground truncate">{displayName}</p>
            <p className="text-[10px] text-muted-foreground">{user?.email || ""}</p>
          </div>
        </div>
        <button
          onClick={() => { signOut(); navigate("/"); }}
          className="flex items-center gap-2 w-full px-4 py-2 rounded-lg text-sm text-destructive hover:bg-destructive/10 transition-colors duration-200"
        >
          <LogOut className="w-4 h-4" />
          Logga ut
        </button>
      </SidebarFooter>
    </Sidebar>
  );
}
