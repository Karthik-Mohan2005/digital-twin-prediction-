import { Activity, Shield } from "lucide-react";

export function DashboardHeader() {
  return (
    <header className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10 glow-primary">
          <Shield className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight">
            <span className="text-gradient-primary">Digital Twin</span>{" "}
            <span className="text-foreground">Cloud Monitor</span>
          </h1>
          <p className="text-xs font-mono text-muted-foreground mt-0.5">
            Hybrid LSTM + Isolation Forest · Predictive Self-Healing Framework
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 text-xs font-mono text-accent bg-accent/10 px-3 py-1.5 rounded-full">
          <Activity className="h-3 w-3" />
          <span>System Online</span>
        </div>
      </div>
    </header>
  );
}
