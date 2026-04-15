import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: number;
  unit: string;
  icon: React.ReactNode;
  status: 'normal' | 'warning' | 'critical';
  trend?: 'up' | 'down' | 'stable';
}

export function MetricCard({ title, value, unit, icon, status, trend }: MetricCardProps) {
  return (
    <div className={cn(
      "relative overflow-hidden rounded-lg border bg-card p-5 transition-all",
      status === 'normal' && "border-glow card-glow",
      status === 'warning' && "border-warning/30 glow-warning",
      status === 'critical' && "border-destructive/30 glow-destructive",
    )}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
          {title}
        </span>
        <div className={cn(
          "p-1.5 rounded-md",
          status === 'normal' && "bg-primary/10 text-primary",
          status === 'warning' && "bg-warning/10 text-warning",
          status === 'critical' && "bg-destructive/10 text-destructive",
        )}>
          {icon}
        </div>
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className={cn(
          "text-3xl font-mono font-bold",
          status === 'normal' && "text-foreground",
          status === 'warning' && "text-warning",
          status === 'critical' && "text-destructive",
        )}>
          {value.toFixed(1)}
        </span>
        <span className="text-sm text-muted-foreground font-mono">{unit}</span>
      </div>
      <div className="mt-2 flex items-center gap-1.5">
        <div className={cn(
          "h-1.5 w-1.5 rounded-full",
          status === 'normal' && "bg-accent animate-pulse-glow",
          status === 'warning' && "bg-warning animate-pulse-glow",
          status === 'critical' && "bg-destructive animate-pulse",
        )} />
        <span className="text-xs text-muted-foreground font-mono">
          {status === 'normal' ? 'Healthy' : status === 'warning' ? 'Warning' : 'Critical'}
          {trend && ` · ${trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'}`}
        </span>
      </div>
      {/* Scan line effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.03]">
        <div className="h-px w-full bg-primary animate-scan" />
      </div>
    </div>
  );
}
