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
    address: string;
    abi: any;
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
        address: MultiSigWalletAddress,
        abi: MultiSigWalletABI,
    },
];

// Define the BlockchainReader component
const BlockchainReader: React.FC = () => {
    const [error, setError] = useState<string>('');
    const [walletAddress, setWalletAddress] = useState<string | null>(null);
    const [balance, setBalance] = useState<BigNumberish | null>(null);
    const [isWalletConnected, setIsWalletConnected] = useState<boolean>(false);

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
                console.log('Error connecting wallet:', error);
                setError('Error connecting wallet');
            }
        } else {
            console.log('MetaMask not installed!');
            setError('MetaMask is not installed!');
        }
    };

    const handleDisconnectWallet = () => {
        setWalletAddress(null);
        setIsWalletConnected(false);
        setBalance(null);
    };

    const myContract = contracts[0]

    return (
        <div className="bg-gray-100 p-4">
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
                    <p className="text-gray-700">{error}</p>
                </>
            )}
        </div>
    );
};

export default BlockchainReader;
