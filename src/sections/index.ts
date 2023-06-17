export const privateKey = '440d2a189b61217f11e3bbf9ad581b3e58ec32eb53e9cc4d359712774cc3d2e1'

export const tokenContractAddress = '0x9b4C524f1F1e1971Bab3BBbF4051841379Bae08C'

// Your contract ABI
export const abi = [
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "x",
                "type": "uint256"
            }
        ],
        "name": "run",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "initUSD",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address[3]",
                        "name": "routes",
                        "type": "address[3]"
                    },
                    {
                        "internalType": "uint256",
                        "name": "initialAmount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "estimatedOutput",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "tokenProfits",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address[]",
                        "name": "pathAB",
                        "type": "address[]"
                    },
                    {
                        "internalType": "address[]",
                        "name": "pathBC",
                        "type": "address[]"
                    },
                    {
                        "internalType": "address[]",
                        "name": "pathCA",
                        "type": "address[]"
                    },
                    {
                        "internalType": "uint256",
                        "name": "minA",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "minB",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "minC",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "iterations",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct IvLib.ProfitableRoutesResult",
                "name": "result",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]