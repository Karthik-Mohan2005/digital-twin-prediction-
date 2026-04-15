import { cn } from "@/lib/utils";

const models = [
  {
    name: 'Threshold Monitoring',
    accuracy: 'Low',
    downtime: 'Minimal',
    efficiency: 'Moderate',
    level: 1,
  },
  {
    name: 'LSTM Only',
    accuracy: 'High',
    downtime: 'Moderate',
    efficiency: 'High',
    level: 2,
  },
  {
    name: 'Hybrid LSTM + IF',
    accuracy: 'Very High',
    downtime: 'Significant',
    efficiency: 'Very High',
    level: 3,
    highlight: true,
  },
];

const levelColors = {
  1: 'text-muted-foreground',
  2: 'text-primary',
  3: 'text-accent',
};

export function ComparisonTable() {
  return (
    <div className="rounded-lg border border-glow bg-card p-5 card-glow">
      <h3 className="text-sm font-mono uppercase tracking-widest text-muted-foreground mb-4">
        Model Performance Comparison
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm font-mono">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2 px-3 text-xs uppercase text-muted-foreground font-medium">Model</th>
              <th className="text-left py-2 px-3 text-xs uppercase text-muted-foreground font-medium">Detection Accuracy</th>
              <th className="text-left py-2 px-3 text-xs uppercase text-muted-foreground font-medium">Downtime Reduction</th>
              <th className="text-left py-2 px-3 text-xs uppercase text-muted-foreground font-medium">Resource Efficiency</th>
            </tr>
          </thead>
          <tbody>
            {models.map((m) => (
              <tr
                key={m.name}
                className={cn(
                  "border-b border-border/50 transition-colors",
                  m.highlight && "bg-primary/5"
                )}
              >
                <td className={cn("py-3 px-3 font-medium", m.highlight ? "text-primary" : "text-foreground")}>
                  {m.name}
                  {m.highlight && <span className="ml-2 text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-full">Proposed</span>}
                </td>
                <td className={cn("py-3 px-3", levelColors[m.level as keyof typeof levelColors])}>{m.accuracy}</td>
                <td className={cn("py-3 px-3", levelColors[m.level as keyof typeof levelColors])}>{m.downtime}</td>
                <td className={cn("py-3 px-3", levelColors[m.level as keyof typeof levelColors])}>{m.efficiency}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
