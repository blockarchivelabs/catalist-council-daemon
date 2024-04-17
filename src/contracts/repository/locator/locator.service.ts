import { Injectable } from '@nestjs/common';
import { LocatorAbi, LocatorAbi__factory } from 'generated';
import { BlockTag, ProviderService } from 'provider';
import { getCatalistLocatorAddress } from './locator.constants';

@Injectable()
export class LocatorService {
  constructor(private providerService: ProviderService) {}
  private cachedCatalistLocatorContract: LocatorAbi | undefined;
  /**
   * Returns DSM contract address
   */
  public async getDSMAddress(blockTag: BlockTag): Promise<string> {
    const catalistLocator = await this.getCatalistLocatorAbiContract();
    return await catalistLocator.depositSecurityModule({
      blockTag: blockTag as any,
    });
  }

  /**
   * Returns Catalist contract address
   */
  public async getCatalistAddress(blockTag: BlockTag): Promise<string> {
    const catalistLocator = await this.getCatalistLocatorAbiContract();
    return await catalistLocator.catalist({ blockTag: blockTag as any });
  }
  /**
   * Returns StakingRouter contract address
   */
  public async getStakingRouterAddress(blockTag: BlockTag): Promise<string> {
    const catalistLocator = await this.getCatalistLocatorAbiContract();
    return await catalistLocator.stakingRouter({ blockTag: blockTag as any });
  }
  /**
   * Get Catalist locator contract
   */
  public async getCatalistLocatorAbiContract(): Promise<LocatorAbi> {
    if (this.cachedCatalistLocatorContract) return this.cachedCatalistLocatorContract;
    const locatorAddress = await this.getLocatorAddress();
    const provider = this.providerService.provider;

    this.cachedCatalistLocatorContract = LocatorAbi__factory.connect(
      locatorAddress,
      provider,
    );
    return this.cachedCatalistLocatorContract;
  }

  /**
   * Returns Catalist locator contract address
   */
  public async getLocatorAddress(): Promise<string> {
    const chainId = await this.providerService.getChainId();
    return getCatalistLocatorAddress(chainId);
  }
}
