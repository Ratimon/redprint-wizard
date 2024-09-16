import fs from 'fs'; 
import path from 'path';
// import type { dirname } from 'path';


import { ok, rejects } from 'node:assert/strict';

import { compileContract } from '../script-ts/compile';
// import { loadFile } from './helpers';

import {printSafe, buildSafe} from '../../src/lib/wizard/smart-contracts/1-safe';
import {printContract} from '../../src/lib/wizard/smart-contracts/print';


describe('src/compile.ts', function () {
  it('correctly compiles .sol ', async function () {

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

    // beforeEach

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

    const result = await compileContract(opts.contractName, code);

    console.log('compiled',result)
    console.log(result.solcVersion);


  

    ok(Array.isArray(result.abi));
    ok(typeof result.metadata === 'string');
    ok(typeof result.solcVersion === 'string');
    ok(typeof result.assembly === 'string');
    ok(typeof result.bytecode === 'string');
    ok(typeof result.deployedBytecode === 'string');
    ok(result.gasEstimates);

    //  to do: write file in directory : test/fixture/SafeProxy.sol
    // Note this file is test/contract/1-safe.test.ts
  });

});