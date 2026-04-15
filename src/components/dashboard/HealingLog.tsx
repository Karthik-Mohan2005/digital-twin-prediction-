import { ArrowUpCircle, RotateCcw, Shuffle, CheckCircle2, Clock, XCircle, PlayCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { HealingAction } from "@/lib/telemetryData";

interface HealingLogProps {
  actions: HealingAction[];
}

const typeIcons = {
  scaling: ArrowUpCircle,
  restart: RotateCcw,
  redistribution: Shuffle,
};

const statusConfig = {
  simulated: { icon: PlayCircle, label: 'Simulated', className: 'text-primary bg-primary/10' },
  validated: { icon: Clock, label: 'Validated', className: 'text-accent bg-accent/10' },
  executed: { icon: CheckCircle2, label: 'Executed', className: 'text-accent bg-accent/10' },
  failed: { icon: XCircle, label: 'Failed', className: 'text-destructive bg-destructive/10' },
};

const severityColors = {
  low: 'text-accent',
  medium: 'text-primary',
  high: 'text-warning',
  critical: 'text-destructive',
};

export function HealingLog({ actions }: HealingLogProps) {
  return (
    <div className="rounded-lg border border-glow bg-card p-5 card-glow">
      <h3 className="text-sm font-mono uppercase tracking-widest text-muted-foreground mb-4">
        Self-Healing Actions Log
      </h3>
      <div className="space-y-3 max-h-[320px] overflow-y-auto pr-1">
        {actions.map((action) => {
          const TypeIcon = typeIcons[action.type];
          const sc = statusConfig[action.status];
          const StatusIcon = sc.icon;
          return (
            <div key={action.id} className="flex items-start gap-3 p-3 rounded-md bg-secondary/30 border border-border/50 hover:border-primary/20 transition-colors">
              <div className={cn("p-1.5 rounded-md mt-0.5", severityColors[action.severity], "bg-current/10")}>
                <TypeIcon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground leading-snug">{action.description}</p>
                <div className="flex items-center gap-3 mt-1.5 text-xs font-mono text-muted-foreground">
                  <span>{action.timestamp}</span>
                  <span>·</span>
                  <span>{action.metric}</span>
                </div>
              </div>
              <div className={cn("flex items-center gap-1 text-xs font-mono px-2 py-0.5 rounded-full shrink-0", sc.className)}>
                <StatusIcon className="h-3 w-3" />
                {sc.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
