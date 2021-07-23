export interface IConfig {}

export interface BscConfig {
  bnbAddress: string;
  wbnbAddress: string;
  pancakeRouterAddress: string;
}

const NetworkConfig: Record<string, IConfig | BscConfig> = {
  mainnet: {},
  bscMainnet: {},
  bscTestnet: {},
  polygonMainnet: {},
  polygonTestnet: {},
};

// hardhat network will be the same as mainnet
NetworkConfig.hardhat = {
  ...NetworkConfig.bscMainnet,
};

export { NetworkConfig };
