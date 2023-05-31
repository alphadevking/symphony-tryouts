import { ethers } from 'ethers'
import React, { useState } from 'react'
import SolCalculatorABI from '@/utils/abi/SolCalculatorABI.json'

const SolCalculatorCA = '0xd9145CCE52D386f254917e481eB44e9943F39138'

interface Contract {
    contract_address: string,
    contract_abi: any,
}

interface Networks {
    name: string,
    chain_id: number,
    rpcurl: string,
}
const contracts: Contract[] = [
    {
        contract_address: SolCalculatorCA,
        contract_abi: SolCalculatorABI,
    }
]

const networks: Networks[] = [
    {
        name: 'Binance Smart Chain Testnet',
        chain_id: 97,
        rpcurl: 'https://bsc-dataseed.binance.org/',
    }
]

const SolCalculator = () => {

    const [var1, setVar1] = useState<string>('')
    const [var2, setVar2] = useState<string>('')
    const [result, setResult] = useState<string>('')

    const [isConnected, setIsConnected] = useState<Boolean>(false)
    const [address, setAddress] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    const initializeWallet = async () => {
        try {
            const provider = new ethers.BrowserProvider((window as any).ethereum);
            await provider.send('eth_requestAccounts', []);
            const signer = await provider.getSigner();
            const address = await signer.getAddress()
            setIsConnected(true)
            setAddress(address)
        } catch (error) {
            setError('')
        }
    }
    
    const handleDisconnect = () => {
        setAddress('');
        setIsConnected(false);
    };

    const handleAdd = async (event: React.FormEvent) => {
        event.preventDefault()

        // Parse the input values as uint256
        const input1 = ethers.toBigInt(var1);
        const input2 = ethers.toBigInt(var2);

        const myContract = contracts[0];
        const provider = new ethers.BrowserProvider((window as any).ethereum)

        try {
            await provider.send('eth_requestAccounts', []);
            const signer = await provider.getSigner()
            const contract = new ethers.Contract(myContract.contract_address, myContract.contract_abi, signer)

            // Calling the Add function
            // Submit the transaction
            const result = await contract.add(input1, input2);
            alert(ethers.toNumber(result))
            console.log('Transaction ID:', result.hash);
        }
        catch(error) {
            setError(`${error}`)
        }
    }

    return (
        <div>
            {
                isConnected ? (
                    <div>
                        <div>
                            <button onClick={handleDisconnect} className='bg-pink-200/30 hover:bg-pink-200/50 px-4 py-2 rounded'>Disconnect Wallet</button>
                            {
                                address && (
                                    <div>Your wallet address is: {address}</div>
                                )
                            }
                        </div>
                        <div>
                            <h2 className="text-gray-700 text-lg font-semibold">Sol Calculator</h2>
                            <form onSubmit={handleAdd} className="mt-4">
                                <div className="flex gap-x-2">
                                    <div>
                                        <label htmlFor="var1" className="text-gray-700">
                                            Var 1:
                                        </label>
                                        <input
                                            id="var1"
                                            type="text"
                                            value={var1}
                                            onChange={(e) => setVar1(e.target.value)}
                                            className="border border-gray-300 rounded-md px-3 py-2 mt-1 mx-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="var2" className="text-gray-700">
                                            Var 2:
                                        </label>
                                        <input
                                            id="var2"
                                            type="text"
                                            value={var2}
                                            onChange={(e) => setVar2(e.target.value)}
                                            className="border border-gray-300 rounded-md px-3 py-2 mt-1 mx-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                                            required
                                        />
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="bg-pink-200/30 hover:bg-pink-200/50 px-4 py-2 rounded mt-4"
                                >
                                    Add
                                </button>
                            </form>
                        </div>

                    </div>
                ) : (
                    <div>
                        <button onClick={initializeWallet} className='bg-pink-200/30 hover:bg-pink-200/50 px-4 py-2 rounded'>Connect Wallet</button>
                    </div>
                )
            }
            <div>{error}</div>
        </div>
    )
}

export default SolCalculator