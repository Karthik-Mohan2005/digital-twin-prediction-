// Simulated telemetry data generator for the Digital Twin dashboard

export interface TelemetryPoint {
  timestamp: string;
  cpu: number;
  memory: number;
  disk: number;
  network: number;
  anomalyScore: number;
  lstmPrediction: number;
  isolationScore: number;
}

export interface HealingAction {
  id: string;
  timestamp: string;
  type: 'scaling' | 'restart' | 'redistribution';
  status: 'simulated' | 'validated' | 'executed' | 'failed';
  description: string;
  metric: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

const randomInRange = (min: number, max: number) =>
  Math.round((Math.random() * (max - min) + min) * 100) / 100;

export function generateTelemetryHistory(count: number): TelemetryPoint[] {
  const now = Date.now();
  return Array.from({ length: count }, (_, i) => {
    const t = now - (count - i) * 5000;
    const baseLoad = 40 + 20 * Math.sin(i / 10);
    const spike = i > count * 0.7 && i < count * 0.85 ? 25 : 0;
    const cpu = Math.min(99, Math.max(5, baseLoad + spike + randomInRange(-5, 5)));
    const memory = Math.min(95, Math.max(20, baseLoad * 0.8 + randomInRange(-3, 8)));
    const disk = Math.min(90, Math.max(30, 45 + randomInRange(-5, 15)));
    const network = Math.max(0, randomInRange(100, 800) + spike * 20);
    const anomalyScore = spike > 0 ? randomInRange(0.6, 0.95) : randomInRange(0.02, 0.3);
    const lstmPrediction = cpu + randomInRange(-3, 3);
    const isolationScore = anomalyScore * randomInRange(0.8, 1.2);

    return {
      timestamp: new Date(t).toLocaleTimeString(),
      cpu,
      memory,
      disk,
      network,
      anomalyScore,
      lstmPrediction,
      isolationScore: Math.min(1, isolationScore),
    };
  });
}

export function generateHealingActions(): HealingAction[] {
  return [
    {
      id: '1',
      timestamp: '14:32:15',
      type: 'scaling',
      status: 'executed',
      description: 'Auto-scaled CPU resources from 4 to 8 vCPUs',
      metric: 'CPU Utilization',
      severity: 'high',
    },
    {
      id: '2',
      timestamp: '14:28:42',
      type: 'redistribution',
      status: 'validated',
      description: 'Redistributed workload across 3 available nodes',
      metric: 'Memory Usage',
      severity: 'medium',
    },
    {
      id: '3',
      timestamp: '14:25:08',
      type: 'restart',
      status: 'simulated',
      description: 'Service restart simulated in digital twin environment',
      metric: 'Disk I/O',
      severity: 'low',
    },
    {
      id: '4',
      timestamp: '14:20:33',
      type: 'scaling',
      status: 'executed',
      description: 'Network bandwidth allocation increased by 40%',
      metric: 'Network Throughput',
      severity: 'critical',
    },
    {
      id: '5',
      timestamp: '14:15:19',
      type: 'redistribution',
      status: 'failed',
      description: 'Attempted load balancing — rollback triggered',
      metric: 'CPU Utilization',
      severity: 'high',
    },
  ];
}
