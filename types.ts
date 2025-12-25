
export interface DomainInfo {
  name: string;
  address: string;
  isPrimary: boolean;
  records: Record<string, string>;
  owner: string;
  expiryDate: string;
  rarity?: string;
  vibe?: string;
}

export enum ProjectPhase {
  BUILDING = 'Building',
  SETTING_UP = 'Setting Up',
  INTEGRATION = 'Integration',
  COLLABORATION = 'Collaboration',
  MARKETING = 'Marketing',
  FINISH = 'Final Finish'
}

export interface RoadmapStep {
  phase: ProjectPhase;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'upcoming';
}

export interface OwnedDomain {
  name: string;
  expiryYears: number;
  mintedAt: Date;
  isPrimary?: boolean;
}
