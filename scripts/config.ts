// contains chain ids
export const ChainID: Record<string, number> = {
  ganache: 1337,
  goerli: 5,
  hardhat: 31337,
  kovan: 42,
  mainnet: 1,
  rinkeby: 4,
  ropsten: 3,
  polygonMainnet: 137,
  polygonTestnet: 80001,
  bscMainnet: 56,
  bscTestnet: 97,
};

export enum ChainName {
  Ganache = "ganache",
  Goerli = "goerli",
  Hardhat = "hardhat",
  Kovan = "kovan",
  Mainnet = "mainnet",
  Rinkeby = "rinkeby",
  Ropsten = "ropsten",
  PolygonMainnet = "polygonMainnet",
  PolygonTestnet = "polygonTestnet",
  BscMainnet = "bscMainnet",
  BscTestnet = "bscTestnet",
}

export interface BscConfig {
  bnbAddress: string;
  wbnbAddress: string;
  usdtAddress: string;
  pancakeRouterAddress: string;
}

export interface EthConfig {
  ethAddress: string;
  wethAddress: string;
  usdtAddress: string;
  uniswapRouterAddress: string;
}

export type ChainConfig = EthConfig | BscConfig;

const EthConfigImpl: EthConfig = {
  ethAddress: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
  wethAddress: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
  usdtAddress: "0xdac17f958d2ee523a2206206994597c13d831ec7",
  uniswapRouterAddress: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
};

export function GetChainConfig(chainName: string): ChainConfig {
  switch (chainName) {
    case ChainName.Mainnet:
      return EthConfigImpl;
    case ChainName.Ropsten:
      return {
        ethAddress: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
        wethAddress: "",
        usdtAddress: "",
        uniswapRouterAddress: "",
      };
    case ChainName.BscMainnet:
      return {
        bnbAddress: "0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB",
        wbnbAddress: "",
        usdtAddress: "0x55d398326f99059ff775485246999027b3197955",
        pancakeRouterAddress: "0x10ED43C718714eb63d5aA57B78B54704E256024E",
      };
    case ChainName.BscTestnet:
      return {
        bnbAddress: "0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB",
        wbnbAddress: "",
        usdtAddress: "",
        pancakeRouterAddress: "",
      };
    case ChainName.Hardhat:
      return EthConfigImpl;
  }
  throw new Error("unknown chain name");
}
