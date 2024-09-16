import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hre from "hardhat";


import fs from 'fs'; 
import path from 'path';

import { buildSafe} from 'smart-contracts';
import {printContract} from '../../src/lib/wizard/smart-contracts/print';

describe("Lock", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployOneYearLockFixture() {
    const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
    const ONE_GWEI = 1_000_000_000;

    const lockedAmount = ONE_GWEI;
    const unlockTime = (await time.latest()) + ONE_YEAR_IN_SECS;

    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await hre.ethers.getSigners();

    const Lock = await hre.ethers.getContractFactory("Lock");
    const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

    return { lock, unlockTime, lockedAmount, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should set the right unlockTime", async function () {

      const opts = {
        contractName: 'SafeProxy',
        deployName: 'DeploySafeProxyScript'
      }
    
    const c = buildSafe({
        chain: 'ethereum',
        opSec: 'mnemonic',
        ...opts,
    });
    
    console.log('c', c)
    const code = printContract(c)
    
    const currentDir = path.resolve();
    const dirPath = path.join(currentDir, 'test/contract/fixture');
    const filePath = path.join(dirPath, `${opts.contractName}.sol`);
    
    // Ensure the directory exists, create if not
    if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    }
    
    fs.writeFile(filePath, code, (err) => {
        if (err) {
            console.error('Error writing the file:', err);
        } else {
            console.log(`Contract code written successfully to: ${filePath}`);
        }
    });
    

      const { lock, unlockTime } = await loadFixture(deployOneYearLockFixture);

      expect(await lock.unlockTime()).to.equal(unlockTime);
    });


  });


});
