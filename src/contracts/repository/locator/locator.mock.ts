import { LocatorService } from './locator.service';

export const mockLocator = (locator: LocatorService) => {
  const catalistAddr = jest
    .spyOn(locator, 'getCatalistAddress')
    .mockImplementation(async () => '0x' + '1'.repeat(40));

  const DSMAddr = jest
    .spyOn(locator, 'getDSMAddress')
    .mockImplementation(async () => '0x' + '2'.repeat(40));
  const SRAddr = jest
    .spyOn(locator, 'getStakingRouterAddress')
    .mockImplementation(async () => '0x' + '3'.repeat(40));
  const locatorAddr = jest
    .spyOn(locator, 'getLocatorAddress')
    .mockImplementation(async () => '0x' + '4'.repeat(40));

  return { catalistAddr, locatorAddr, SRAddr, DSMAddr };
};
