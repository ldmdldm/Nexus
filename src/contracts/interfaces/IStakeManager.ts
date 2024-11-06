export interface IStakeManager {
  stake(validatorAddress: string, amount: string, lockPeriod: number): Promise<boolean>;
  unstake(stakeId: string): Promise<boolean>;
  getStakeInfo(address: string): Promise<StakeInfo>;
  getTotalStaked(): Promise<string>;
}

export interface StakeInfo {
  amount: string;
  validatorAddress: string;
  timestamp: number;
  lockPeriod: number;
  rewards: string;
}