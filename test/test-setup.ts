import { expect } from "./chai-setup";
import { Contract } from "ethers";
import { BscConfig, ChainConfig, ChainName, GetChainConfig } from "../scripts/config";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signers";
import { ethers, network, getNamedAccounts, getUnnamedAccounts } from "hardhat";
import { BigNumber } from "ethers";
import { WBNB_ABI, PANCAKE_ROUTER_ABI } from "../scripts/abi";

interface ContractMap {
  [contractName: string]: Contract;
}

export interface IInitialSetup {
  deployer: SignerWithAddress;
  users: SignerWithAddress[];
  network: ChainConfig;
  contracts: ContractMap;
}

export const initialSetup = async (): Promise<IInitialSetup> => {
  const networkConfig = GetChainConfig(network.name);

  const { deployer } = await getNamedAccounts();
  const deployerSigner = await ethers.getSigner(deployer);
  const users: SignerWithAddress[] = [];
  for (const addr of await getUnnamedAccounts()) {
    users.push(await ethers.getSigner(addr));
  }

  const contracts = await setupContract(deployerSigner);

  return {
    deployer: deployerSigner,
    users: users,
    network: networkConfig,
    contracts: contracts,
  };
};

const setupContract = async (deployerSigner: SignerWithAddress): Promise<ContractMap> => {
  if (network.name == ChainName.BscMainnet) {
    const networkConfig = GetChainConfig(network.name) as BscConfig;
    const wbnbContract = new ethers.Contract(networkConfig.wbnbAddress, WBNB_ABI, ethers.provider);
    const pancakeRouter = new ethers.Contract(networkConfig.pancakeRouterAddress, PANCAKE_ROUTER_ABI, ethers.provider);

    // fund wbnb
    const wbnbAmount = ethers.utils.parseUnits("100", "ether");
    await wbnbContract.connect(deployerSigner).deposit({ value: wbnbAmount });

    expect(await wbnbContract.balanceOf(deployerSigner.address)).to.be.equal(wbnbAmount);

    console.log("Funded", {
      token: await wbnbContract.symbol(),
      token_address: networkConfig.wbnbAddress,
      address: deployerSigner.address,
      new_balance: wbnbAmount.toString(),
    });

    return {
      WBNB: wbnbContract,
      PancakeRouter: pancakeRouter,
    };
  }

  return {};
};
