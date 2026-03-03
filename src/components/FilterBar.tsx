import { useState } from "react";
import { motion } from "framer-motion";

const categories = ["Alla", "Grävmaskiner", "Hjullastare", "Kranar", "Bulldozers", "Truckar"];
const statuses = ["Alla", "Verified", "AI Estimate", "In Pool"];

export function FilterBar() {
  const [activeCategory, setActiveCategory] = useState("Alla");

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setActiveCategory(cat)}
          className={`relative px-4 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-200 ${
            activeCategory === cat
              ? "text-primary-foreground"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          }`}
        >
          {activeCategory === cat && (
            <motion.div
              layoutId="activeFilter"
              className="absolute inset-0 rounded-lg gradient-gold"
              transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
            />
          )}
          <span className="relative z-10">{cat}</span>
        </button>
      ))}
    </div>
  );
}
