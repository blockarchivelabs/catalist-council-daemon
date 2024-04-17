import { Injectable } from '@nestjs/common';
import { RepositoryService } from 'contracts/repository';
import { BlockTag } from 'provider';

@Injectable()
export class CatalistService {
  constructor(private repositoryService: RepositoryService) {}

  /**
   * Returns withdrawal credentials from the contract
   */
  public async getWithdrawalCredentials(blockTag?: BlockTag): Promise<string> {
    const contract = await this.repositoryService.getCachedCatalistContract();

    return await contract.getWithdrawalCredentials({
      blockTag: blockTag as any,
    });
  }
}
