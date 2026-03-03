import { Search } from "lucide-react";
import { useState } from "react";

export function GlobalSearch() {
  const [focused, setFocused] = useState(false);

  return (
    <div className={`relative w-full max-w-xl search-glow rounded-xl transition-all duration-300 ${focused ? 'scale-[1.01]' : ''}`}>
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      <input
        type="text"
        placeholder="Sök med Reg-nr, URL eller Org-nr..."
        className="w-full bg-card border border-border rounded-xl py-3 pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none transition-all duration-300"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      <div className="absolute right-3 top-1/2 -translate-y-1/2">
        <kbd className="hidden sm:inline-flex items-center gap-1 rounded-md border border-border bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">
          ⌘K
        </kbd>
      </div>
    </div>
  );
}
