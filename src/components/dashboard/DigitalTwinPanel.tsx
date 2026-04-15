import { Activity, RefreshCw, Server, Wifi } from "lucide-react";
import { cn } from "@/lib/utils";

interface DigitalTwinPanelProps {
  syncStatus: 'synced' | 'syncing' | 'error';
  lastSync: string;
  twinHealth: number;
}

export function DigitalTwinPanel({ syncStatus, lastSync, twinHealth }: DigitalTwinPanelProps) {
  return (
    <div className="rounded-lg border border-glow bg-card p-5 card-glow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-mono uppercase tracking-widest text-muted-foreground">
          Digital Twin Status
        </h3>
        <div className={cn(
          "flex items-center gap-1.5 text-xs font-mono px-2 py-1 rounded-full",
          syncStatus === 'synced' && "bg-accent/10 text-accent",
          syncStatus === 'syncing' && "bg-primary/10 text-primary",
          syncStatus === 'error' && "bg-destructive/10 text-destructive",
        )}>
          <div className={cn(
            "h-1.5 w-1.5 rounded-full",
            syncStatus === 'synced' && "bg-accent animate-pulse-glow",
            syncStatus === 'syncing' && "bg-primary animate-pulse",
            syncStatus === 'error' && "bg-destructive",
          )} />
          {syncStatus === 'synced' ? 'Synchronized' : syncStatus === 'syncing' ? 'Syncing...' : 'Error'}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Twin Visualization */}
        <div className="relative flex flex-col items-center justify-center p-4 rounded-lg bg-secondary/50 border border-border">
          <Server className="h-8 w-8 text-muted-foreground mb-2" />
          <span className="text-xs font-mono text-muted-foreground">Physical Server</span>
          <div className="absolute -right-3 top-1/2 -translate-y-1/2 z-10">
            <div className="flex items-center gap-0.5">
              <Wifi className={cn("h-3.5 w-3.5", syncStatus === 'synced' ? "text-accent" : "text-primary animate-pulse")} />
            </div>
          </div>
        </div>
        <div className="relative flex flex-col items-center justify-center p-4 rounded-lg bg-primary/5 border border-primary/20">
          <Activity className="h-8 w-8 text-primary mb-2" />
          <span className="text-xs font-mono text-primary/80">Digital Twin</span>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        <div className="flex justify-between text-xs font-mono">
          <span className="text-muted-foreground">Twin Health</span>
          <span className="text-foreground">{twinHealth}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-1000"
            style={{ width: `${twinHealth}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
          <span className="flex items-center gap-1">
            <RefreshCw className="h-3 w-3" /> Last sync
          </span>
          <span>{lastSync}</span>
        </div>
      </div>
    </div>
  );
}
