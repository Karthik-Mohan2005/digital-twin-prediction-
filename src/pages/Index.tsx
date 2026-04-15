import { useState, useEffect, useMemo } from "react";
import { Cpu, HardDrive, MemoryStick, Network } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { AnomalyChart } from "@/components/dashboard/AnomalyChart";
import { TelemetryChart } from "@/components/dashboard/TelemetryChart";
import { DigitalTwinPanel } from "@/components/dashboard/DigitalTwinPanel";
import { HealingLog } from "@/components/dashboard/HealingLog";
import { ComparisonTable } from "@/components/dashboard/ComparisonTable";
import { generateTelemetryHistory, generateHealingActions } from "@/lib/telemetryData";

function getStatus(value: number, warn: number, crit: number) {
  if (value >= crit) return 'critical' as const;
  if (value >= warn) return 'warning' as const;
  return 'normal' as const;
}

const Index = () => {
  const [telemetry, setTelemetry] = useState(() => generateTelemetryHistory(50));
  const healingActions = useMemo(() => generateHealingActions(), []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry((prev) => {
        const newData = generateTelemetryHistory(1)[0];
        return [...prev.slice(1), newData];
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const latest = telemetry[telemetry.length - 1];

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      <div className="max-w-[1440px] mx-auto">
        <DashboardHeader />

        {/* Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <MetricCard
            title="CPU Usage"
            value={latest.cpu}
            unit="%"
            icon={<Cpu className="h-4 w-4" />}
            status={getStatus(latest.cpu, 70, 90)}
            trend={latest.cpu > 60 ? 'up' : 'stable'}
          />
          <MetricCard
            title="Memory"
            value={latest.memory}
            unit="%"
            icon={<MemoryStick className="h-4 w-4" />}
            status={getStatus(latest.memory, 75, 90)}
            trend="stable"
          />
          <MetricCard
            title="Disk I/O"
            value={latest.disk}
            unit="%"
            icon={<HardDrive className="h-4 w-4" />}
            status={getStatus(latest.disk, 70, 85)}
          />
          <MetricCard
            title="Network"
            value={latest.network}
            unit="Mbps"
            icon={<Network className="h-4 w-4" />}
            status={getStatus(latest.network, 600, 900)}
            trend={latest.network > 500 ? 'up' : 'down'}
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          <TelemetryChart data={telemetry} />
          <AnomalyChart data={telemetry} />
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <DigitalTwinPanel
            syncStatus="synced"
            lastSync="2s ago"
            twinHealth={97}
          />
          <HealingLog actions={healingActions} />
          <ComparisonTable />
        </div>
      </div>
    </div>
  );
};

export default Index;
