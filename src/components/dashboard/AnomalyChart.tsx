import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, ReferenceLine } from "recharts";
import type { TelemetryPoint } from "@/lib/telemetryData";

interface AnomalyChartProps {
  data: TelemetryPoint[];
}

export function AnomalyChart({ data }: AnomalyChartProps) {
  return (
    <div className="rounded-lg border border-glow bg-card p-5 card-glow">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-mono uppercase tracking-widest text-muted-foreground">
            Anomaly Detection Timeline
          </h3>
          <p className="text-xs text-muted-foreground mt-1">LSTM Prediction Error + Isolation Forest Score</p>
        </div>
        <div className="flex gap-4 text-xs font-mono">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-primary" /> LSTM
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-accent" /> Isolation Forest
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-destructive" /> Threshold
          </span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
          <defs>
            <linearGradient id="gradLstm" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(190, 100%, 50%)" stopOpacity={0.3} />
              <stop offset="100%" stopColor="hsl(190, 100%, 50%)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gradIsolation" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(155, 100%, 50%)" stopOpacity={0.3} />
              <stop offset="100%" stopColor="hsl(155, 100%, 50%)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 18%)" />
          <XAxis dataKey="timestamp" tick={{ fontSize: 10, fill: 'hsl(215, 15%, 55%)' }} tickLine={false} axisLine={false} />
          <YAxis domain={[0, 1]} tick={{ fontSize: 10, fill: 'hsl(215, 15%, 55%)' }} tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(220, 20%, 10%)',
              border: '1px solid hsl(220, 15%, 18%)',
              borderRadius: '8px',
              fontSize: '12px',
              fontFamily: 'JetBrains Mono',
            }}
          />
          <ReferenceLine y={0.6} stroke="hsl(0, 72%, 51%)" strokeDasharray="5 5" strokeOpacity={0.6} />
          <Area type="monotone" dataKey="anomalyScore" stroke="hsl(190, 100%, 50%)" fill="url(#gradLstm)" strokeWidth={2} name="LSTM Score" />
          <Area type="monotone" dataKey="isolationScore" stroke="hsl(155, 100%, 50%)" fill="url(#gradIsolation)" strokeWidth={2} name="IF Score" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
