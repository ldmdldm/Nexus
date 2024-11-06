import { SmartContract, Storage, Address, Fixed, createEventNotifier } from '@neo-one/smart-contract';

export enum SlashingReason {
  Downtime,
  DoubleSigning,
  MaliciousBehavior,
  ProtocolViolation
}

export interface SlashingEvent {
  validator: Address;
  reason: SlashingReason;
  amount: Fixed<8>;
  timestamp: number;
  evidence: string;
}

export class SlashingManager extends SmartContract {
  private readonly slashingHistory = Storage.for<SlashingEvent[]>('slashingHistory');
  private readonly downtimeThreshold = Storage.for<number>('downtimeThreshold');
  private readonly slashingRates = Storage.for<Map<SlashingReason, Fixed<8>>>('slashingRates');

  // Events
  private readonly onValidatorSlashed = createEventNotifier<Address, SlashingReason, Fixed<8>>(
    'ValidatorSlashed',
    'validator',
    'reason',
    'amount'
  );

  public constructor() {
    super();
    this.initializeSlashingRates();
  }

  private initializeSlashingRates(): void {
    const rates = new Map<SlashingReason, Fixed<8>>();
    rates.set(SlashingReason.Downtime, Fixed.from(0.1, 8)); // 10%
    rates.set(SlashingReason.DoubleSigning, Fixed.from(0.5, 8)); // 50%
    rates.set(SlashingReason.MaliciousBehavior, Fixed.from(1, 8)); // 100%
    rates.set(SlashingReason.ProtocolViolation, Fixed.from(0.3, 8)); // 30%
    this.slashingRates.set(rates);
  }

  public handleDowntime(validator: Address, downtimeBlocks: number): boolean {
    if (downtimeBlocks > this.downtimeThreshold.get()) {
      return this.slash(validator, SlashingReason.Downtime);
    }
    return false;
  }

  public handleDoubleSigning(
    validator: Address,
    evidence: string
  ): boolean {
    return this.slash(validator, SlashingReason.DoubleSigning, evidence);
  }

  public handleMaliciousBehavior(
    validator: Address,
    evidence: string
  ): boolean {
    return this.slash(validator, SlashingReason.MaliciousBehavior, evidence);
  }

  private slash(
    validator: Address,
    reason: SlashingReason,
    evidence: string = ''
  ): boolean {
    const slashingRate = this.slashingRates.get().get(reason);
    if (!slashingRate) {
      throw new Error('Invalid slashing reason');
    }

    const validatorStake = this.getValidatorStake(validator);
    const slashAmount = validatorStake.mul(slashingRate);

    const event: SlashingEvent = {
      validator,
      reason,
      amount: slashAmount,
      timestamp: this.runtime.time,
      evidence
    };

    // Update slashing history
    const history = this.slashingHistory.get() || [];
    history.push(event);
    this.slashingHistory.set(history);

    // Emit event
    this.onValidatorSlashed(validator, reason, slashAmount);

    return true;
  }

  private getValidatorStake(validator: Address): Fixed<8> {
    // Implementation to get validator's stake
    return Fixed.from(0, 8);
  }

  public getSlashingHistory(validator: Address): SlashingEvent[] {
    return (this.slashingHistory.get() || []).filter(
      event => event.validator.equals(validator)
    );
  }
}</content>