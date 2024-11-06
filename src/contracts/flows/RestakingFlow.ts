import { IValidatorRegistry, ValidatorStatus } from '../interfaces/IValidatorRegistry';
import { SecurityModule } from '../modules/SecurityModule';
import { RiskManager } from '../modules/RiskManager';

export class RestakingFlow {
  constructor(
    private validatorRegistry: IValidatorRegistry,
    private securityModule: SecurityModule,
    private riskManager: RiskManager
  ) {}

  async registerValidator(
    validatorAddress: string,
    commission: string,
    credentials: ValidatorCredentials
  ): Promise<boolean> {
    // Verify credentials
    const isValid = await this.securityModule.verifyCredentials(credentials);
    if (!isValid) {
      throw new Error('Invalid validator credentials');
    }

    // Assess risk
    const riskScore = await this.riskManager.assessValidator(validatorAddress);
    if (riskScore > this.riskManager.getMaxAllowedRisk()) {
      throw new Error('Validator risk score too high');
    }

    // Register validator
    return await this.validatorRegistry.registerValidator(commission);
  }

  async updateValidatorStatus(
    validatorAddress: string,
    newStatus: ValidatorStatus
  ): Promise<boolean> {
    // Verify authority
    if (!await this.securityModule.hasUpdateAuthority()) {
      throw new Error('Unauthorized status update');
    }

    return await this.validatorRegistry.updateValidatorStatus(
      validatorAddress,
      newStatus
    );
  }
}

export interface ValidatorCredentials {
  publicKey: string;
  signature: string;
  timestamp: number;
  proofOfStake: string;
}