export interface IValidatorRegistry {
  registerValidator(commission: string): Promise<boolean>;
  deactivateValidator(): Promise<boolean>;
  updateValidatorStatus(address: string, status: ValidatorStatus): Promise<boolean>;
  getValidatorInfo(address: string): Promise<ValidatorInfo>;
}

export interface ValidatorInfo {
  address: string;
  stake: string;
  commission: string;
  active: boolean;
  totalDelegated: string;
  performance: ValidatorPerformance;
}

export interface ValidatorPerformance {
  uptime: number;
  proposedBlocks: number;
  missedBlocks: number;
  lastActive: number;
}

export enum ValidatorStatus {
  Active,
  Inactive,
  Slashed,
  Jailed
}