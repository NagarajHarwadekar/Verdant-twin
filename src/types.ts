export type PageId =
  | 'home'
  | 'overview'
  | 'digital-twin'
  | 'occupancy'
  | 'energy'
  | 'resources'
  | 'simulator'
  | 'insights'
  | 'alerts'
  | 'reports'
  | 'about';

export type ZoneStatus = 'efficient' | 'warning' | 'high_usage';

export interface RoomZone {
  id: string;
  name: string;
  category: 'reception' | 'conference' | 'office' | 'meeting' | 'server' | 'cafeteria';
  capacity: number;
  currentOccupancy: number;
  temperature: number; // Celsius
  lightingUtilization: number; // Percentage 0-100
  energyUsage: number; // kWh
  waterUsage?: number; // Liters
  status: ZoneStatus;
  statusMessage: string;
  areaSqFt: number;
  fixturesCount: number;
  hvacSetpoint: number;
  efficiencyScore: number;
  svgPathCoordinates: {
    x: number;
    y: number;
    width: number;
    height: number;
    labelX: number;
    labelY: number;
  };
  timeSeries: {
    morning: number;
    afternoon: number;
    evening: number;
    night: number;
  };
}

export type AlertSeverity = 'high' | 'medium' | 'low' | 'info';

export interface BuildingAlert {
  id: string;
  title: string;
  description: string;
  zoneId: string;
  zoneName: string;
  severity: AlertSeverity;
  timestamp: string;
  resolved: boolean;
}

export interface BuildingRecommendation {
  id: string;
  issue: string;
  whyItMatters: string;
  suggestedAction: string;
  estimatedImpact: string;
  kwhSavings: number;
  priority: 'high' | 'medium' | 'low';
  zoneId: string;
  zoneName: string;
  category: 'lighting' | 'hvac' | 'plugload' | 'water';
  applied: boolean;
}

export interface SimulatorState {
  lightingReduction: number; // 0 to 50%
  acReduction: number; // 0 to 30%
  idleReduction: number; // 0 to 40%
  occupancyOptimization: number; // 0 to 25%
}

export interface SimulationResult {
  currentEnergy: number;
  projectedEnergy: number;
  energySaved: number;
  percentageSaved: number;
  carbonReduction: number;
  annualDollarSavings: number;
}

export interface VisionDetectionBox {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  confidence: number;
  label: string;
}

export interface VisionAnalysisResult {
  detectedPeople: number;
  confidence: number;
  roomStatus: 'Active' | 'Vacant' | 'Overcrowded';
  suggestedHvac: string;
  timestamp: string;
  boxes: VisionDetectionBox[];
  imageUrl?: string;
  roomName: string;
}

export interface ResourceMetric {
  id: 'energy' | 'water' | 'lighting' | 'cooling' | 'occupancy';
  name: string;
  currentUsage: string;
  normalRange: string;
  status: 'Nominal' | 'Attention' | 'Optimal';
  efficiency: number; // 0-100
  trend: string;
  detail: string;
}
