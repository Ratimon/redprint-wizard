
import fs from 'fs'; 
import path from 'path';

import {printSafe, buildSafe} from '../../src/lib/wizard/smart-contracts/1-safe';
import {printContract} from '../../src/lib/wizard/smart-contracts/print';

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

// process.stdout.write(true);