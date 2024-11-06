import { SmartContract, Storage, Address, Fixed, createEventNotifier } from '@neo-one/smart-contract';

export enum EmergencyLevel {
  None,
  Warning,
  Critical,
  Fatal
}

export class EmergencyModule extends SmartContract {
  private readonly emergencyState = Storage.for<EmergencyLevel>('emergencyState');
  private readonly pausedContracts = Storage.for<Set<Address>>('pausedContracts');
  private readonly emergencyAdmin = Storage.for<Address>('emergencyAdmin');

  // Events
  private readonly onEmergencyDeclared = createEventNotifier<EmergencyLevel>(
    'EmergencyDeclared',
    'level'
  );

  private readonly onContractPaused = createEventNotifier<Address>(
    'ContractPaused',
    'contract'
  );

  public constructor() {
    super();
    if (!this.emergencyAdmin.get()) {
      this.emergencyAdmin.set(Address.from(this.transaction.sender));
    }
  }

  private onlyEmergencyAdmin(): void {
    if (!Address.from(this.transaction.sender).equals(this.emergencyAdmin.get())) {
      throw new Error('Only emergency admin can call this method');
    }
  }

  public declareEmergency(level: EmergencyLevel): boolean {
    this.onlyEmergencyAdmin();
    
    if (level === EmergencyLevel.Fatal) {
      this.pauseAllContracts();
    }

    this.emergencyState.set(level);
    this.onEmergencyDeclared(level);
    return true;
  }

  public pauseContract(contractAddress: Address): boolean {
    this.onlyEmergencyAdmin();
    
    const paused = this.pausedContracts.get() || new Set<Address>();
    paused.add(contractAddress);
    this.pausedContracts.set(paused);

    this.onContractPaused(contractAddress);
    return true;
  }

  private pauseAllContracts(): void {
    // Implementation to pause all protocol contracts
    const criticalContracts: Address[] = [
      // Add addresses of critical contracts
    ];

    const paused = new Set<Address>();
    criticalContracts.forEach(contract => paused.add(contract));
    this.pausedContracts.set(paused);
  }

  public isContractPaused(contractAddress: Address): boolean {
    const paused = this.pausedContracts.get() || new Set<Address>();
    return paused.has(contractAddress);
  }

  public getEmergencyState(): EmergencyLevel {
    return this.emergencyState.get();
  }

  public resolveEmergency(): boolean {
    this.onlyEmergencyAdmin();
    
    this.emergencyState.set(EmergencyLevel.None);
    this.pausedContracts.set(new Set<Address>());
    
    return true;
  }
}</content>