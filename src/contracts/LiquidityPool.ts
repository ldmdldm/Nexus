import {
  SmartContract,
  Storage,
  Address,
  Fixed,
  createEventNotifier,
  MapStorage
} from '@neo-one/smart-contract';

interface Pool {
  totalLiquidity: Fixed<8>;
  exchangeRate: Fixed<8>;
  tokenAddress: Address;
}

export class LiquidityPool extends SmartContract {
  private readonly pools = MapStorage.for<string, Pool>();
  private readonly userShares = MapStorage.for<Address, Fixed<8>>();
  private readonly totalShares = Storage.for<Fixed<8>>('totalShares');

  // Events
  private readonly onDeposit = createEventNotifier<Address, Fixed<8>>(
    'Deposit',
    'user',
    'amount'
  );

  private readonly onWithdraw = createEventNotifier<Address, Fixed<8>>(
    'Withdraw',
    'user',
    'amount'
  );

  // Liquidity Management Functions
  public deposit(poolId: string): boolean {
    const sender = Address.from(this.transaction.sender);
    const amount = Fixed.from(this.transaction.value, 8);
    const pool = this.pools.get(poolId);

    if (!pool) {
      throw new Error('Invalid pool');
    }

    const shares = this.calculateShares(amount, pool);
    const currentShares = this.userShares.get(sender) || Fixed.from(0, 8);
    this.userShares.set(sender, currentShares.add(shares));

    pool.totalLiquidity = pool.totalLiquidity.add(amount);
    this.pools.set(poolId, pool);

    const newTotalShares = this.totalShares.get().add(shares);
    this.totalShares.set(newTotalShares);

    this.onDeposit(sender, amount);
    return true;
  }

  public withdraw(poolId: string, shares: Fixed<8>): boolean {
    const sender = Address.from(this.transaction.sender);
    const userShares = this.userShares.get(sender) || Fixed.from(0, 8);

    if (shares.gt(userShares)) {
      throw new Error('Insufficient shares');
    }

    const pool = this.pools.get(poolId);
    if (!pool) {
      throw new Error('Invalid pool');
    }

    const amount = this.calculateWithdrawAmount(shares, pool);
    this.userShares.set(sender, userShares.sub(shares));

    pool.totalLiquidity = pool.totalLiquidity.sub(amount);
    this.pools.set(poolId, pool);

    const newTotalShares = this.totalShares.get().sub(shares);
    this.totalShares.set(newTotalShares);

    this.onWithdraw(sender, amount);
    return true;
  }

  private calculateShares(amount: Fixed<8>, pool: Pool): Fixed<8> {
    if (pool.totalLiquidity.equals(Fixed.from(0, 8))) {
      return amount;
    }
    return amount.mul(this.totalShares.get()).div(pool.totalLiquidity);
  }

  private calculateWithdrawAmount(shares: Fixed<8>, pool: Pool): Fixed<8> {
    return shares.mul(pool.totalLiquidity).div(this.totalShares.get());
  }

  public getPoolInfo(poolId: string): Pool {
    const pool = this.pools.get(poolId);
    if (!pool) {
      throw new Error('Invalid pool');
    }
    return pool;
  }
}