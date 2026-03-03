import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Fingerprint, Camera, Link2, FileSearch, Wrench, ShieldCheck, Lock } from "lucide-react";

interface CalibrationTest {
  id: string;
  label: string;
  icon: React.ElementType;
  fillPercent: number;
  confirmed: boolean;
  active: boolean;
}

interface PrecisionScannerProps {
  value: string; // e.g. "890 000 SEK"
  initialPrecision?: number;
  /** Which calibration steps are already completed */
  completedSteps?: string[];
}

const CALIBRATION_TESTS: Omit<CalibrationTest, "confirmed" | "active">[] = [
  { id: "identity", label: "Identitetsmatchning", icon: Fingerprint, fillPercent: 20 },
  { id: "images", label: "Bildanalys (Radar)", icon: Camera, fillPercent: 25 },
  { id: "url", label: "Datatriangulering", icon: Link2, fillPercent: 15 },
  { id: "service", label: "Servicehistorik", icon: FileSearch, fillPercent: 15 },
  { id: "inspection", label: "Besiktningsdata", icon: Wrench, fillPercent: 15 },
  { id: "expert", label: "Expertverifiering", icon: ShieldCheck, fillPercent: 10 },
];

const CONFIDENCE_MAP: Record<number, string> = {
  0: "±12%",
  1: "±9.5%",
  2: "±7.2%",
  3: "±5.8%",
  4: "±4.5%",
  5: "±3.8%",
  6: "±3.2%",
};

export function PrecisionScanner({ value, initialPrecision = 0, completedSteps = [] }: PrecisionScannerProps) {
  const [tests, setTests] = useState<CalibrationTest[]>(() =>
    CALIBRATION_TESTS.map((t) => ({
      ...t,
      confirmed: completedSteps.includes(t.id),
      active: false,
    }))
  );

  const [scanningIndex, setScanningIndex] = useState<number | null>(null);
  const [showLock, setShowLock] = useState(false);
  const [statusText, setStatusText] = useState("Väntar på kalibrering...");

  const confirmedCount = tests.filter((t) => t.confirmed).length;
  const totalFill = tests.reduce((sum, t) => (t.confirmed ? sum + t.fillPercent : sum), 0);
  const confidence = CONFIDENCE_MAP[confirmedCount] || "±12%";

  // Auto-run demo sequence
  useEffect(() => {
    const unconfirmed = tests.findIndex((t) => !t.confirmed);
    if (unconfirmed === -1) {
      setStatusText(`Kalibrering slutförd. ${totalFill}% Precision uppnådd.`);
      return;
    }

    const timeout = setTimeout(() => {
      setScanningIndex(unconfirmed);
      setTests((prev) =>
        prev.map((t, i) => (i === unconfirmed ? { ...t, active: true } : t))
      );

      const labels: Record<string, string> = {
        identity: "Analyserar identitetsmatchning...",
        images: "Radar-skannar bilder...",
        url: "Datatriangulering pågår...",
        service: "Analyserar servicehistorik...",
        inspection: "Kontrollerar besiktningsdata...",
        expert: "Väntar på expertverifiering...",
      };
      setStatusText(labels[tests[unconfirmed].id] || "Analyserar...");

      const confirmTimeout = setTimeout(() => {
        setTests((prev) =>
          prev.map((t, i) =>
            i === unconfirmed ? { ...t, confirmed: true, active: false } : t
          )
        );
        setScanningIndex(null);
        setShowLock(true);
        setTimeout(() => setShowLock(false), 600);

        const newConfirmed = tests.filter((t) => t.confirmed).length + 1;
        const newFill = tests.reduce((sum, t, i) => (t.confirmed || i === unconfirmed ? sum + t.fillPercent : sum), 0);
        setStatusText(
          newConfirmed === 6
            ? `Kalibrering slutförd. ${newFill}% Precision uppnådd.`
            : `${newFill}% Precision uppnådd.`
        );
      }, 1800);

      return () => clearTimeout(confirmTimeout);
    }, 1200 + unconfirmed * 200);

    return () => clearTimeout(timeout);
  }, [confirmedCount]);

  // SVG ring params
  const size = 220;
  const cx = size / 2;
  const cy = size / 2;
  const r = 95;
  const circumference = 2 * Math.PI * r;
  const segmentGap = 6;
  const segmentCount = 6;
  const totalGap = segmentGap * segmentCount;
  const usableArc = circumference - totalGap;
  const segmentArcs = CALIBRATION_TESTS.map((t) => (t.fillPercent / 100) * circumference);

  // Build segment positions
  const segments: { offset: number; length: number; fillLength: number; confirmed: boolean; active: boolean }[] = [];
  let cursor = 0;
  CALIBRATION_TESTS.forEach((t, i) => {
    const arcLen = (t.fillPercent / 100) * usableArc + (usableArc / segmentCount - (t.fillPercent / 100) * usableArc) * 0;
    // Proportional arc
    const propArc = (t.fillPercent / 100) * usableArc;
    const normalizedArc = usableArc / segmentCount; // equal segments for visual clarity
    segments.push({
      offset: cursor,
      length: normalizedArc,
      fillLength: tests[i].confirmed ? normalizedArc : 0,
      confirmed: tests[i].confirmed,
      active: tests[i].active,
    });
    cursor += normalizedArc + segmentGap;
  });

  return (
    <div className="flex flex-col items-center">
      {/* Circular Scanner Ring */}
      <div className="relative" style={{ width: size, height: size }}>
        <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full" style={{ transform: "rotate(-90deg)" }}>
          <defs>
            <linearGradient id="scanGlow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(43 96% 56%)" stopOpacity="0" />
              <stop offset="50%" stopColor="hsl(43 96% 56%)" stopOpacity="0.9" />
              <stop offset="100%" stopColor="hsl(43 96% 56%)" stopOpacity="0" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background segments */}
          {segments.map((seg, i) => (
            <circle
              key={`bg-${i}`}
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke="hsl(217 33% 18%)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={`${seg.length} ${circumference - seg.length}`}
              strokeDashoffset={-seg.offset}
            />
          ))}

          {/* Filled segments */}
          {segments.map((seg, i) => (
            <motion.circle
              key={`fill-${i}`}
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke={seg.confirmed ? "hsl(43 96% 56%)" : seg.active ? "hsl(199 89% 48%)" : "transparent"}
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={`${seg.fillLength} ${circumference - seg.fillLength}`}
              strokeDashoffset={-seg.offset}
              filter={seg.confirmed ? "url(#glow)" : undefined}
              initial={{ strokeDasharray: `0 ${circumference}` }}
              animate={{
                strokeDasharray: seg.confirmed
                  ? `${seg.length} ${circumference - seg.length}`
                  : seg.active
                  ? `${seg.length} ${circumference - seg.length}`
                  : `0 ${circumference}`,
                opacity: seg.active ? [0.4, 1, 0.4] : 1,
              }}
              transition={
                seg.active
                  ? { duration: 1.2, repeat: Infinity, ease: "easeInOut" }
                  : { duration: 0.8, ease: "easeOut" }
              }
            />
          ))}

          {/* Scanning light sweep */}
          {scanningIndex !== null && (
            <motion.circle
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke="url(#scanGlow)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`20 ${circumference - 20}`}
              filter="url(#glow)"
              animate={{
                strokeDashoffset: [0, -circumference],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          )}
        </svg>

        {/* Center value */}
        <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ transform: "none" }}>
          <AnimatePresence>
            {showLock && (
              <motion.div
                className="absolute"
                initial={{ scale: 2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Lock className="w-8 h-8 text-primary" />
              </motion.div>
            )}
          </AnimatePresence>
          {!showLock && (
            <>
              <motion.p
                className="text-2xl font-extrabold text-gradient-gold leading-none"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                {value.replace(" SEK", "")}
              </motion.p>
              <p className="text-[10px] text-muted-foreground mt-1">SEK</p>
            </>
          )}
        </div>
      </div>

      {/* Confidence interval */}
      <motion.div
        className="mt-3 text-center"
        key={confidence}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <p className="text-xs text-muted-foreground">
          Konfidensintervall: <span className="font-bold text-foreground">{confidence}</span>
        </p>
      </motion.div>

      {/* Calibration Tests List */}
      <div className="w-full mt-5 space-y-1.5">
        {tests.map((test, i) => (
          <motion.div
            key={test.id}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-300 ${
              test.confirmed
                ? "bg-primary/10 border border-primary/20"
                : test.active
                ? "bg-secondary/10 border border-secondary/20"
                : "bg-muted/30 border border-transparent"
            }`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: i * 0.08 }}
          >
            <div
              className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                test.confirmed
                  ? "bg-primary/20"
                  : test.active
                  ? "bg-secondary/20"
                  : "bg-muted/50"
              }`}
            >
              <test.icon
                className={`w-3.5 h-3.5 ${
                  test.confirmed
                    ? "text-primary"
                    : test.active
                    ? "text-secondary"
                    : "text-muted-foreground"
                }`}
              />
            </div>
            <span
              className={`text-xs font-medium flex-1 ${
                test.confirmed
                  ? "text-foreground"
                  : test.active
                  ? "text-secondary"
                  : "text-muted-foreground"
              }`}
            >
              {test.label}
            </span>
            <span className="text-[10px] font-semibold text-muted-foreground">
              +{test.fillPercent}%
            </span>
            {test.confirmed && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 25 }}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-primary" />
              </motion.div>
            )}
            {test.active && (
              <motion.div
                className="w-3 h-3 rounded-full bg-secondary"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            )}
          </motion.div>
        ))}
      </div>

      {/* Status text */}
      <motion.p
        className="mt-4 text-xs text-muted-foreground text-center italic"
        key={statusText}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {statusText}
      </motion.p>
    </div>
  );
}
