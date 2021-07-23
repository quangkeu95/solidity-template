import { expect } from "./chai-setup";

import { ethers, deployments, getNamedAccounts } from "hardhat";
import { IInitialSetup, initialSetup } from "./test-setup";
import { Greeter } from "../typechain";

describe("Greeter Unit Tests", () => {
  let setup: IInitialSetup;

  before(async () => {
    setup = await initialSetup();
  });

  beforeEach(async () => {
    await deployments.fixture(["all"]);

    const greeter = await ethers.getContract("Greeter");
    setup.contracts["Greeter"] = greeter;
  });

  describe("Deployment", () => {
    it("Should deploy successfully", async () => {
      const { deployer, contracts } = setup;

      const greeter = contracts["Greeter"] as Greeter;
      console.log("Greeter address %s", greeter.address);
      console.log("Deployer addres %s", deployer.address);
    });
  });
});
