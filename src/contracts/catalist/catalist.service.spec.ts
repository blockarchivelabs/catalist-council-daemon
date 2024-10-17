import { Test } from '@nestjs/testing';
import { ConfigModule } from 'common/config';
import { LoggerModule } from 'common/logger';
import { MockProviderModule, ProviderService } from 'provider';
import { CatalistAbi__factory } from 'generated';
import { RepositoryModule, RepositoryService } from 'contracts/repository';
import { Interface } from '@ethersproject/abi';
import { CatalistService } from './catalist.service';
import { CatalistModule } from './catalist.module';
import { LocatorService } from 'contracts/repository/locator/locator.service';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { mockLocator } from 'contracts/repository/locator/locator.mock';
import { mockRepository } from 'contracts/repository/repository.mock';

describe('SecurityService', () => {
  let catalistService: CatalistService;
  let providerService: ProviderService;

  let repositoryService: RepositoryService;
  let locatorService: LocatorService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        MockProviderModule.forRoot(),
        LoggerModule,
        CatalistModule,
        RepositoryModule,
      ],
    }).compile();

    catalistService = moduleRef.get(CatalistService);
    providerService = moduleRef.get(ProviderService);

    repositoryService = moduleRef.get(RepositoryService);
    locatorService = moduleRef.get(LocatorService);
    jest
      .spyOn(moduleRef.get(WINSTON_MODULE_NEST_PROVIDER), 'log')
      .mockImplementation(() => undefined);

    mockLocator(locatorService);
    await mockRepository(repositoryService);
  });

  describe('getWithdrawalCredentials', () => {
    it('should return withdrawal credentials', async () => {
      const expected = '0x' + '1'.repeat(64);

      const mockProviderCall = jest
        .spyOn(providerService.provider, 'call')
        .mockImplementation(async () => {
          const iface = new Interface(CatalistAbi__factory.abi);
          const result = [expected];
          return iface.encodeFunctionResult('getWithdrawalCredentials', result);
        });

      const wc = await catalistService.getWithdrawalCredentials();
      expect(wc).toBe(expected);
      expect(mockProviderCall).toBeCalledTimes(1);
    });
  });

  describe('getBufferedAce', () => {
    it('should return buffered ace', async () => {
      const expected = '645579135630000000000';
      const mockProviderCall = jest
        .spyOn(providerService.provider, 'call')
        .mockImplementation(async () => {
          const iface = new Interface(CatalistAbi__factory.abi);
          const result = [expected];
          return iface.encodeFunctionResult('getBufferedAce', result);
        });

      const wc = await catalistService.getBufferedAce();
      console.log(+wc.toString() / 10 ** 18);
      expect(wc.toString()).toBe(expected);
      expect(mockProviderCall).toBeCalledTimes(1);
    });
  });
});
