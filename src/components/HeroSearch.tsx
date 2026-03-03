import { useState } from "react";
import { ArrowRight, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const maskintyper = ["Grävmaskin", "Hjullastare", "Dumper", "Kran", "Lastbil", "Teleskoplastare", "Grävlastare", "Minigrävare", "Bulldozer", "Betongblandare"];
const märken: Record<string, string[]> = {
  Grävmaskin: ["Volvo", "CAT", "Komatsu", "Hitachi", "Liebherr", "Doosan", "Hyundai", "JCB", "Kubota"],
  Hjullastare: ["Volvo", "CAT", "Komatsu", "Liebherr", "JCB", "Doosan"],
  Dumper: ["Volvo", "CAT", "Bell", "Komatsu"],
  Kran: ["Liebherr", "Tadano", "Manitowoc", "Terex"],
  Lastbil: ["Scania", "Volvo", "MAN", "Mercedes-Benz", "DAF", "Iveco"],
  Teleskoplastare: ["Merlo", "Manitou", "JCB", "Bobcat", "Claas"],
  Grävlastare: ["JCB", "CAT", "Volvo", "Case"],
  Minigrävare: ["Kubota", "Bobcat", "Yanmar", "CAT", "Volvo"],
  Bulldozer: ["CAT", "Komatsu", "Liebherr", "John Deere"],
  Betongblandare: ["Liebherr", "Stetter", "Schwing"],
};

const selectClass =
  "w-full bg-muted/50 border border-border rounded-xl py-3 px-4 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all duration-200 appearance-none cursor-pointer";

export function HeroSearch() {
  const navigate = useNavigate();

  // Manual fields
  const [maskintyp, setMaskintyp] = useState("");
  const [märke, setMärke] = useState("");
  const [modell, setModell] = useState("");
  const [år, setÅr] = useState("");
  const [timmar, setTimmar] = useState("");

  const availableMärken = maskintyp ? märken[maskintyp] || [] : [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/vardera?type=${encodeURIComponent(maskintyp)}&brand=${encodeURIComponent(märke)}&model=${encodeURIComponent(modell)}&year=${encodeURIComponent(år)}&hours=${encodeURIComponent(timmar)}`);
  };

  const canSubmitManual = maskintyp && märke;

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="bg-card border border-border rounded-2xl p-5 sm:p-6 search-glow space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {/* Maskintyp */}
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">Maskintyp *</label>
              <select
                value={maskintyp}
                onChange={(e) => {
                  setMaskintyp(e.target.value);
                  setMärke("");
                }}
                className={selectClass}
              >
                <option value="">Välj maskintyp</option>
                {maskintyper.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            {/* Märke */}
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">Märke *</label>
              <select
                value={märke}
                onChange={(e) => setMärke(e.target.value)}
                disabled={!maskintyp}
                className={`${selectClass} disabled:opacity-40`}
              >
                <option value="">Välj märke</option>
                {availableMärken.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            {/* Modell */}
            <div className="col-span-2">
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">Modell</label>
              <input
                type="text"
                placeholder="T.ex. EC220E, 950M..."
                value={modell}
                onChange={(e) => setModell(e.target.value)}
                className={selectClass}
              />
            </div>

            {/* År */}
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">Årsmodell</label>
              <input
                type="number"
                placeholder="T.ex. 2019"
                min="1980"
                max="2026"
                value={år}
                onChange={(e) => setÅr(e.target.value)}
                className={selectClass}
              />
            </div>

            {/* Timmar */}
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">Drifttimmar</label>
              <input
                type="number"
                placeholder="T.ex. 4500"
                min="0"
                value={timmar}
                onChange={(e) => setTimmar(e.target.value)}
                className={selectClass}
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={!canSubmitManual}
            className="w-full gradient-gold text-primary-foreground font-semibold py-3 h-auto rounded-xl disabled:opacity-50 transition-all duration-200"
          >
            Verifiera Värde
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </form>
    </div>
  );
}
