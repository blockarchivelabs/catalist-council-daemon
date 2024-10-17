import { Module } from '@nestjs/common';

import { SecurityModule } from 'contracts/security';
import { StakingRouterModule } from 'staking-router';

import { GuardianMetricsModule } from '../guardian-metrics';
import { GuardianMessageModule } from '../guardian-message';

import { StakingModuleGuardService } from './staking-module-guard.service';
import { KeysValidationModule } from 'guardian/keys-validation/keys-validation.module';
import { CatalistModule } from 'contracts/catalist';
import { ConfigModule } from 'common/config';

@Module({
  imports: [
    SecurityModule,
    StakingRouterModule,
    GuardianMetricsModule,
    GuardianMessageModule,
    KeysValidationModule,
    CatalistModule,
    ConfigModule,
  ],
  providers: [StakingModuleGuardService],
  exports: [StakingModuleGuardService],
})
export class StakingModuleGuardModule {}
