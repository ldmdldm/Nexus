import {
  SmartContract,
  Storage,
  Address,
  Fixed,
  createEventNotifier,
  MapStorage
} from '@neo-one/smart-contract';

interface RewardPool {
  totalAmount: Fixed<8>;
  lastDistributionTime: number;
  rewardRate: Fixed<8>;
}

export class RewardDistributor extends SmartContract {
  private readonly rewardPools = MapStorage.for<string, RewardPool>();
  private readonly userRewards = MapStorage.for<Address, Fixed<8>>();
  private readonly distributionInterval = Storage.for<number>('distributionInterval');

  // Events
  private readonly onRewardDistributed = createEventNotifier<Address, Fixed<8>>(
    'RewardDistributed',
    'recipient',
    'amount'
  );

  private readonly onRewardClaimed = createEventNotifier<Address, Fixed<8>>(
    'RewardClaimed',
    'recipient',
    'amount'
  );

  // Reward Distribution Functions
  public distributeRewards(poolId: string): boolean {
    const pool = this.rewardPools.get(poolId);
    if (!pool) {
      throw new Error('Invalid pool');
    }

    const currentTime = this.runtime.time;
    if (currentTime < pool.lastDistributionTime + this.distributionInterval.get()) {
      throw new Error('Distribution interval not met');
    }

    // Calculate and distribute rewards
    const rewardAmount = this.calculateRewards(pool);
    pool.lastDistributionTime = currentTime;
    this.rewardPools.set(poolId, pool);

    this.onRewardDistributed(Address.from(this.transaction.sender), rewardAmount);
    return true;
  }

  public claimRewards(): boolean {
    const sender = Address.from(this.transaction.sender);
    const rewards = this.userRewards.get(sender);

    if (!rewards || rewards.equals(Fixed.from(0, 8))) {
      throw new Error('No rewards to claim');
    }

    this.userRewards.set(sender, Fixed.from(0, 8));
    this.onRewardClaimed(sender, rewards);
    return true;
  }

  private calculateRewards(pool: RewardPool): Fixed<8> {
    const timeElapsed = this.runtime.time - pool.lastDistributionTime;
    return pool.rewardRate.mul(Fixed.from(timeElapsed, 8));
  }

  public getClaimableRewards(address: Address): Fixed<8> {
    return this.userRewards.get(address) || Fixed.from(0, 8);
  }
}