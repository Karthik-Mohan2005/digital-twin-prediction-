import { Line, LineChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { TelemetryPoint } from "@/lib/telemetryData";

interface TelemetryChartProps {
  data: TelemetryPoint[];
}

export function TelemetryChart({ data }: TelemetryChartProps) {
  return (
    <div className="rounded-lg border border-glow bg-card p-5 card-glow">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-mono uppercase tracking-widest text-muted-foreground">
            Server Telemetry
          </h3>
          <p className="text-xs text-muted-foreground mt-1">CPU · Memory · Disk Utilization (%)</p>
        </div>
        <div className="flex gap-4 text-xs font-mono">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-primary" /> CPU
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-accent" /> Memory
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: 'hsl(270, 80%, 60%)' }} /> Disk
          </span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 18%)" />
          <XAxis dataKey="timestamp" tick={{ fontSize: 10, fill: 'hsl(215, 15%, 55%)' }} tickLine={false} axisLine={false} />
          <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: 'hsl(215, 15%, 55%)' }} tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(220, 20%, 10%)',
              border: '1px solid hsl(220, 15%, 18%)',
              borderRadius: '8px',
              fontSize: '12px',
              fontFamily: 'JetBrains Mono',
            }}
          />
          <Line type="monotone" dataKey="cpu" stroke="hsl(190, 100%, 50%)" strokeWidth={2} dot={false} name="CPU %" />
          <Line type="monotone" dataKey="memory" stroke="hsl(155, 100%, 50%)" strokeWidth={2} dot={false} name="Memory %" />
          <Line type="monotone" dataKey="disk" stroke="hsl(270, 80%, 60%)" strokeWidth={2} dot={false} name="Disk %" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
