import { RewardDistributor } from '../RewardDistributor';
import { OracleModule } from '../modules/OracleModule';
import { IStakeManager } from '../interfaces/IStakeManager';

export class RewardFlow {
  constructor(
    private rewardDistributor: RewardDistributor,
    private oracleModule: OracleModule,
    private stakeManager: IStakeManager
  ) {}

  async distributeRewards(poolId: string): Promise<boolean> {
    // Get validator performance data
    const performanceData = await this.oracleModule.getValidatorPerformance(poolId);
    
    // Calculate rewards based on performance
    const rewardAmount = this.calculateRewards(performanceData);
    
    // Distribute rewards
    return await this.rewardDistributor.distributeRewards(poolId);
  }

  async claimRewards(userAddress: string): Promise<boolean> {
    // Verify claimable amount
    const claimable = await this.rewardDistributor.getClaimableRewards(userAddress);
    if (claimable.equals('0')) {
      throw new Error('No rewards to claim');
    }

    // Process claim
    return await this.rewardDistributor.claimRewards();
  }

  private calculateRewards(performanceData: ValidatorPerformance): string {
    const {
      uptime,
      proposedBlocks,
      missedBlocks,
      totalStake
    } = performanceData;

    // Calculate base reward
    const baseReward = totalStake * 0.1; // 10% annual base rate

    // Apply performance multiplier
    const performanceScore = (uptime * 0.4) + 
      (proposedBlocks / (proposedBlocks + missedBlocks) * 0.6);
    
    return (baseReward * performanceScore).toString();
  }
}

interface ValidatorPerformance {
  uptime: number;
  proposedBlocks: number;
  missedBlocks: number;
  totalStake: number;
}