import {
  SmartContract,
  Storage,
  Address,
  Fixed,
  createEventNotifier,
  MapStorage
} from '@neo-one/smart-contract';

interface Validator {
  address: Address;
  stake: Fixed<8>;
  commission: Fixed<8>;
  active: boolean;
  totalDelegated: Fixed<8>;
}

export class ValidatorRegistry extends SmartContract {
  private readonly validators = MapStorage.for<Address, Validator>();
  private readonly activeValidators = Storage.for<Address[]>('activeValidators');
  private readonly minValidatorStake = Storage.for<Fixed<8>>('minValidatorStake');

  // Events
  private readonly onValidatorRegistered = createEventNotifier<Address>(
    'ValidatorRegistered',
    'validator'
  );

  private readonly onValidatorDeactivated = createEventNotifier<Address>(
    'ValidatorDeactivated',
    'validator'
  );

  // Validator Management Functions
  public registerValidator(commission: Fixed<8>): boolean {
    const sender = Address.from(this.transaction.sender);
    const stake = Fixed.from(this.transaction.value, 8);

    if (stake.lt(this.minValidatorStake.get())) {
      throw new Error('Insufficient validator stake');
    }

    if (this.validators.get(sender)) {
      throw new Error('Validator already registered');
    }

    const validator: Validator = {
      address: sender,
      stake,
      commission,
      active: true,
      totalDelegated: Fixed.from(0, 8)
    };

    this.validators.set(sender, validator);
    
    const currentActive = this.activeValidators.get() || [];
    currentActive.push(sender);
    this.activeValidators.set(currentActive);

    this.onValidatorRegistered(sender);
    return true;
  }

  public deactivateValidator(): boolean {
    const sender = Address.from(this.transaction.sender);
    const validator = this.validators.get(sender);

    if (!validator) {
      throw new Error('Validator not found');
    }

    validator.active = false;
    this.validators.set(sender, validator);

    const currentActive = this.activeValidators.get();
    const index = currentActive.findIndex(addr => addr.equals(sender));
    if (index !== -1) {
      currentActive.splice(index, 1);
      this.activeValidators.set(currentActive);
    }

    this.onValidatorDeactivated(sender);
    return true;
  }

  public getValidator(address: Address): Validator | undefined {
    return this.validators.get(address);
  }

  public getActiveValidators(): Address[] {
    return this.activeValidators.get() || [];
  }
}