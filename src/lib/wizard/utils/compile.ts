import solc from 'solc';
import type { JsonFragment } from '@ethersproject/abi';

interface CompileResult {
  abi: JsonFragment[];
  metadata: string;
  solcVersion: string;
  assembly: string;
  bytecode: string;
  deployedBytecode: string;
  gasEstimates: {
    creation: {
      codeDepositCost: string;
      executionCost: string;
      totalCost: string;
    };
    external: {
      '': string;
    };
  };
}

export function getCompileInput(contractName: string, sourceCode: string, evmVersion?: string) {
  return {
    language: 'Solidity',
    sources: {
      [`${contractName}.sol`]: {
        content: sourceCode,
      },
    },
    settings: {
      outputSelection: {
        '*': { '*': ['*'] },
      },
      evmVersion,
    },
  };
}

export async function compileContract(
  contractName: string,
  sourceCode: string,
  evmVersion?: string
) {
  const input = getCompileInput(contractName, sourceCode, evmVersion);

  const solResult = JSON.parse(await solc.compile(JSON.stringify(input)));

  if (solResult.errors) {
    throw new Error(
      [
        `There was an error when compiling "${contractName}".`,
        ...solResult.errors.map((err: { message: string }) => err.message),
      ].join(' ')
    );
  }

  const info = solResult.contracts[`${contractName}.sol`][contractName];
  const metadata = JSON.parse(info.metadata);

  return {
    abi: info.abi,
    metadata: info.metadata,
    solcVersion: metadata.compiler.version,
    assembly: info.evm.assembly,
    bytecode: info.evm.bytecode.object,
    deployedBytecode: info.evm.deployedBytecode.object,
    gasEstimates: info.evm.gasEstimates,
  } as CompileResult;
}