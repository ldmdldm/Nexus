import { IStakeManager } from '../interfaces/IStakeManager';
import { IValidatorRegistry } from '../interfaces/IValidatorRegistry';

export class StakingFlow {
  constructor(
    private stakeManager: IStakeManager,
    private validatorRegistry: IValidatorRegistry
  ) {}

  async initiateStake(
    validatorAddress: string,
    amount: string,
    lockPeriod: number
  ): Promise<boolean> {
    // Verify validator status
    const validatorInfo = await this.validatorRegistry.getValidatorInfo(validatorAddress);
    if (!validatorInfo.active) {
      throw new Error('Validator is not active');
    }

    // Process stake
    const success = await this.stakeManager.stake(validatorAddress, amount, lockPeriod);
    if (!success) {
      throw new Error('Staking failed');
    }

    return true;
  }

  async processUnstake(stakeId: string): Promise<boolean> {
    // Get stake info
    const stakeInfo = await this.stakeManager.getStakeInfo(stakeId);
    
    // Verify lock period
    const currentTime = Math.floor(Date.now() / 1000);
    if (currentTime < stakeInfo.timestamp + stakeInfo.lockPeriod) {
      throw new Error('Stake is still locked');
    }

    // Process unstake
    return await this.stakeManager.unstake(stakeId);
  }
}