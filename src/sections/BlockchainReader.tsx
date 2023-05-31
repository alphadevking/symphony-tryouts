import { useEffect, useState } from 'react';
import { ethers, BigNumberish } from 'ethers';
import MultiSigWalletABI from '@/utils/abi/MultiSigWalletABI.json';

// Define the interface for the Ethereum object in the window
interface EthereumWindow extends Window {
    ethereum?: any;
}

// Declare the window object with the EthereumWindow interface
declare const window: EthereumWindow;

// Define the Network and Contract types
type Network = {
    name: string;
    chainId: number;
    rpcUrl: string;
};

type Contract = {
    contract_address: string;
    contract_abi: any;
};

// Define the networks and contracts arrays
const networks: Network[] = [
    // Define the network configurations
    {
        name: 'Binance Smart Chain Testnet',
        chainId: 97,
        rpcUrl: 'https://endpoints.omniatech.io/v1/bsc/testnet/public',
    },
    // {
    //     name: 'Mainnet',
    //     chainId: 1,
    //     rpcUrl: 'https://infura.io',
    // },
];

const MultiSigWalletAddress = '0xB41aEDb33C6F008Fd95227dDeF28f53D8a7f3A1a';

const contracts: Contract[] = [
    // Define the contract configurations
    {
        contract_address: MultiSigWalletAddress,
        contract_abi: MultiSigWalletABI,
    },
];

const { contract_address, contract_abi } = contracts[0];

// Define the BlockchainReader component
const BlockchainReader: React.FC = () => {
    const [error, setError] = useState<string>();
    const [walletAddress, setWalletAddress] = useState<string | null>(null);
    const [balance, setBalance] = useState<BigNumberish | null>(null);
    const [isWalletConnected, setIsWalletConnected] = useState<boolean>(false);
    const [destination, setDestination] = useState('');
    const [value, setValue] = useState<string>('');
    const [data, setData] = useState('');

    useEffect(() => {
        if (isWalletConnected && walletAddress) {
            // Fetch wallet balance or perform other actions after wallet connection
            // Example: Fetch balance using walletAddress
            const fetchBalance = async () => {
                const provider = new ethers.JsonRpcProvider(networks[0].rpcUrl);
                const balance = await provider.getBalance(walletAddress);
                setBalance(balance);
            };

            fetchBalance();
        }
    }, [isWalletConnected, walletAddress]);

    const handleConnectWallet = async () => {
        if (window.ethereum) {
            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                const address = await signer.getAddress();
                setWalletAddress(address);
                setIsWalletConnected(true);
                setError('');
            } catch (error) {
                setError('Error connecting wallet. ' + error);
            }
        } else {
            setError('Metamask or Trust Wallet not found');
        }
    };

    const handleDisconnectWallet = () => {
        setWalletAddress(null);
        setIsWalletConnected(false);
        setBalance(null);
    };
    
    const sendEther = async (event: React.FormEvent) => {
        event.preventDefault()

        // Convert the "Data" value to bytes32 format
        const dataBytes = ethers.hexlify(ethers.toUtf8Bytes(data));

        try {
            // Connect to the Ethereum provider
            const provider = new ethers.BrowserProvider(window.ethereum)
            await provider.send('eth_requestAccounts', []);

            // Create a signer and connect to the MultiSigWallet contract
            const signer = await provider.getSigner()
            const multiSigWallet = new ethers.Contract(contract_address, contract_abi, signer)

            // Submit the transaction
            const transaction = await multiSigWallet.submitTransaction(destination, ethers.parseEther(value), dataBytes);
            console.log('Transaction ID:', transaction.id);

            // Reset the form inputs
            setDestination('');
            setValue('');
            setData('');

        } catch (error) {
            setError('Error submitting transaction. ' + error)
        }
    }

    return (
        <div className="p-4">
            <div>
                {isWalletConnected ? (
                    <>
                        <p className="text-gray-700">Wallet Address: {walletAddress}</p>
                        <p className="text-gray-700">
                            {balance ? `${ethers.formatEther(balance)} TBNB` : 'Loading balance...'}
                        </p>
                        <button
                            className="bg-pink-500 text-white px-4 py-2 mt-2 rounded"
                            onClick={handleDisconnectWallet}
                        >
                            Disconnect Wallet
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            className="bg-pink-500 text-white px-4 py-2 rounded"
                            onClick={handleConnectWallet}
                        >
                            Connect Wallet
                        </button>
                    </>
                )}

                <div className='my-4'>
                    <form onSubmit={sendEther} className='grid gap-y-2 max-w-md rounded-2xl px-6 py-5 shadow-2xl backdrop-blur-sm bg-inherit/30'>
                        <h2 className="text-gray-700 font-bold uppercase text-center py-3">Transfer Test BNB</h2>
                        <div className='grid gap-x-1'>
                            <label className="text-gray-700">
                                Destination:
                            </label>
                            <input
                                type="text"
                                value={destination}
                                onChange={(e) => setDestination(e.target.value)}
                                className="border-gray-300 border rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-pink-500"
                                required
                            />
                        </div>

                        <div className='grid gap-x-1'>
                            <label className="text-gray-700">
                                Value (TBNB):
                            </label>
                            <input
                                type="text"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                className="border-gray-300 border rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-pink-500"
                                required
                            />
                        </div>

                        <div className='grid gap-x-1'>
                            <label className="text-gray-700">
                                Data:
                            </label>
                            <input
                                type="text"
                                value={data}
                                onChange={(e) => setData(e.target.value)}
                                className="border-gray-300 border rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-pink-500"
                                // required
                            />
                        </div>

                        <button
                            type="submit"
                            className="bg-pink-500 text-white px-4 py-2 mt-2 rounded w-fit"
                        >
                            Submit Transaction
                        </button>
                    </form>
                </div>
            </div>
            <div className='box-border max-w-md'>
                <p className="text-gray-700 mt-4">{error}</p>
            </div>
        </div>
    );
};

export default BlockchainReader;
