import { CHAINS } from '@catalist-nestjs/constants';

export const CATALIST_LOCATOR_BY_NETWORK: {
  [key in CHAINS]?: string;
} = {
  [CHAINS.Mainnet]: '0xC1d0b3DE6792Bf6b4b37EccdcC24e45978Cfd2Eb',
  [CHAINS.Goerli]: '0x1eDf09b5023DC86737b59dE68a8130De878984f5',
  [CHAINS.Holesky]: '0x28FAB2059C713A7F9D8c86Db49f9bb0e96Af1ef8',
  [CHAINS.EnduranceMainnet]: '0xc0fB23Eb1f39Aa386AAF37CC60A8767c77666224',
};

export const getCatalistLocatorAddress = (chainId: CHAINS): string => {
  const address = CATALIST_LOCATOR_BY_NETWORK[chainId];
  if (!address) throw new Error(`Chain ${chainId} is not supported`);

  return address;
};
