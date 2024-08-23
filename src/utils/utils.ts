import * as polkadotCryptoUtils from '@polkadot/util-crypto';

export const convertEVMtoSubstrateAddress = (evmAddress: string) => {
  const SS58_PREFIX = 42;
  if (polkadotCryptoUtils.isEthereumAddress(evmAddress)) {
    return polkadotCryptoUtils.evmToAddress(evmAddress, SS58_PREFIX);
  }
};
