import { Injectable } from '@nestjs/common';
import { RepositoryService } from 'contracts/repository';
import { BigNumber } from 'ethers';
import { BlockTag } from 'provider';

@Injectable()
export class CatalistService {
  constructor(private repositoryService: RepositoryService) {}

  /**
   * Returns withdrawal credentials from the contract
   */
  public async getWithdrawalCredentials(blockTag?: BlockTag): Promise<string> {
    const contract = this.repositoryService.getCachedCatalistContract();

    return await contract.getWithdrawalCredentials({
      blockTag: blockTag as any,
    });
  }

  public async getBufferedAce(): Promise<BigNumber> {
    const contract = this.repositoryService.getCachedCatalistContract();

    return await contract.getBufferedAce();
  }
}
