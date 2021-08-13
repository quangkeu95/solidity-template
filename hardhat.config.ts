import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import "hardhat-deploy";
import "hardhat-deploy-ethers";

import "./tasks/accounts";
import "./tasks/clean";

import { resolve } from "path";

import { config as dotenvConfig } from "dotenv";
import { NetworkUserConfig, HardhatUserConfig } from "hardhat/types";
import { accounts } from "./scripts/generate_wallet";
import { ChainID, ChainName } from "./scripts/config";

dotenvConfig({ path: resolve(__dirname, "./.env") });

const MNEMONIC = process.env.MNEMONIC || "";
const INFURA_API_KEY = process.env.INFURA_API_KEY || "";
const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY || "";
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

function createConfig(network: keyof typeof ChainID): NetworkUserConfig {
  const url: string = "https://" + network + ".infura.io/v3/" + INFURA_API_KEY;
  return {
    accounts: {
      count: 10,
      initialIndex: 0,
      mnemonic: MNEMONIC,
      path: "m/44'/60'/0'/0",
    },
    chainId: ChainID[network],
    url,
  };
}

const config: HardhatUserConfig = {
  defaultNetwork: ChainName.Hardhat,
  gasReporter: {
    currency: "USD",
    enabled: process.env.REPORT_GAS ? true : false,
    excludeContracts: [],
    src: "./contracts",
  },
  namedAccounts: {
    deployer: 0,
  },
  networks: {
    hardhat: {
      accounts: accounts,
      chainId: ChainID[ChainName.Hardhat],
    },
    goerli: createConfig("goerli"),
    kovan: createConfig("kovan"),
    rinkeby: createConfig("rinkeby"),
    ropsten: createConfig("ropsten"),
    mainnet: createConfig("mainnet"),
    polygonMainnet: createConfig("polygonMainnet"),
    polygonTestnet: createConfig("polygonTestnet"),
    bscMainnet: createConfig("bscMainnet"),
    bscTestnet: createConfig("bscTestnet"),
  },
  paths: {
    artifacts: "./artifacts",
    cache: "./cache",
    sources: "./contracts",
    tests: "./test",
  },
  solidity: {
    version: "0.8.6",
    settings: {
      metadata: {
        // Not including the metadata hash
        // https://github.com/paulrberg/solidity-template/issues/31
        bytecodeHash: "none",
      },
      // You should disable the optimizer when debugging
      // https://hardhat.org/hardhat-network/#solidity-optimizer-support
      optimizer: {
        enabled: true,
        runs: 800,
      },
    },
  },
  typechain: {
    outDir: "typechain",
    target: "ethers-v5",
  },
};

export default config;
