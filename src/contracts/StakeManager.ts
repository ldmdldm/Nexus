import {
  SmartContract,
  Storage,
  Address,
  Fixed,
  createEventNotifier,
  MapStorage
} from '@neo-one/smart-contract';

interface Stake {
  amount: Fixed<8>;
  validatorAddress: Address;
  timestamp: number;
  lockPeriod: number;
}

export class StakeManager extends SmartContract {
  private readonly stakes = MapStorage.for<Address, Stake[]>();
  private readonly totalStaked = Storage.for<Fixed<8>>('totalStaked');
  private readonly minStake = Storage.for<Fixed<8>>('minStake');

  // Events
  private readonly onStake = createEventNotifier<Address, Fixed<8>>(
    'Stake',
    'staker',
    'amount'
  );

  private readonly onUnstake = createEventNotifier<Address, Fixed<8>>(
    'Unstake',
    'staker',
    'amount'
  );

  // Core Staking Functions
  public stake(validatorAddress: Address, lockPeriod: number): boolean {
    const sender = Address.from(this.transaction.sender);
    const amount = Fixed.from(this.transaction.value, 8);

    if (amount.lt(this.minStake.get())) {
      throw new Error('Stake amount below minimum');
    }

    const stake: Stake = {
      amount,
      validatorAddress,
      timestamp: this.runtime.time,
      lockPeriod
    };

    let userStakes = this.stakes.get(sender) || [];
    userStakes.push(stake);
    this.stakes.set(sender, userStakes);

    const newTotal = this.totalStaked.get().add(amount);
    this.totalStaked.set(newTotal);

    this.onStake(sender, amount);
    return true;
  }

  public unstake(stakeIndex: number): boolean {
    const sender = Address.from(this.transaction.sender);
    const userStakes = this.stakes.get(sender);

    if (!userStakes || !userStakes[stakeIndex]) {
      throw new Error('Invalid stake');
    }

    const stake = userStakes[stakeIndex];
    const lockEndTime = stake.timestamp + stake.lockPeriod;

    if (this.runtime.time < lockEndTime) {
      throw new Error('Stake still locked');
    }

    // Process unstaking
    const amount = stake.amount;
    userStakes.splice(stakeIndex, 1);
    this.stakes.set(sender, userStakes);

    const newTotal = this.totalStaked.get().sub(amount);
    this.totalStaked.set(newTotal);

    this.onUnstake(sender, amount);
    return true;
  }

  public getStakeInfo(address: Address): Stake[] {
    return this.stakes.get(address) || [];
  }

  public getTotalStaked(): Fixed<8> {
    return this.totalStaked.get();
  }
}