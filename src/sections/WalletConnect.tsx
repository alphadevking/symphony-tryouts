import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

const WalletConnect: React.FC = () => {
    const [walletAddress, setWalletAddress] = useState<string | null>(null);
    const [balance, setBalance] = useState<string>('')
    const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Initialize the provider and set it in the state
        const initializeProvider = async () => {
            try {
                // Create an instance of the WalletConnect provider
                const walletConnectProvider = new ethers.BrowserProvider((window as any).ethereum);

                // Enable the WalletConnect provider and get the signer
                await walletConnectProvider.send('eth_requestAccounts', []);
                const signer = await walletConnectProvider.getSigner();

                // Get the connected wallet address
                const address = await signer.getAddress();

                setProvider(walletConnectProvider);
                setWalletAddress(address);
                setError(null);
            } catch (error) {
                setError(`Error connecting wallet: ${error}`);
            }
        };

        initializeProvider();
    }, []);

    const connectWallet = async () => {
        try {
            // Create an instance of the WalletConnect provider
            const walletConnectProvider = new ethers.BrowserProvider((window as any).ethereum);

            // Enable the WalletConnect provider and get the signer
            await walletConnectProvider.send('eth_requestAccounts', []);
            const signer = await walletConnectProvider.getSigner();

            // Get the connected wallet address
            const address = await signer.getAddress();

            setProvider(walletConnectProvider);
            setWalletAddress(address);
            setError(null);
        } catch (error) {
            setError(`Error connecting wallet: ${error}`);
        }
    }

    const handleDisconnectWallet = () => {
        setWalletAddress(null);
        setProvider(null);
        setError(null);
    };

    const getBalance = async () => {
        if (!provider || !walletAddress) return;

        try {
            // Get the balance of the connected wallet address
            const balance = await provider.getBalance(walletAddress);

            // console.log(`Wallet Balance: ${ethers.formatEther(balance)}`);
            setBalance(ethers.formatEther(balance))
        } catch (error) {
            setError(`Error getting balance: ${error}`);
        }
    };

    return (
        <div className="p-4 bg-gray-100 min-h-screen">
            <div className="bg-white/30 rounded-md p-4 shadow-md backdrop-blur-sm max-w-fit">
                <h1 className="text-2xl font-bold mb-4">Wallet Connect Integration</h1>
                {walletAddress ? (
                    <>
                        <p className="text-gray-800 mb-2">Connected Wallet Address: {walletAddress}</p>
                        {
                            balance && (
                                <p className="text-gray-800 mb-2">Wallet Balance: {balance} TBNB</p>
                            )
                        }
                        <button
                            className="bg-pink-500 text-white px-4 py-2 rounded mr-2"
                            onClick={handleDisconnectWallet}
                        >
                            Disconnect Wallet
                        </button>
                        <button
                            className="bg-pink-500 text-white px-4 py-2 rounded"
                            onClick={getBalance}
                        >
                            Get Balance
                        </button>
                    </>
                ) : (
                    <div className='my-2'>
                        <p className="text-gray-800 mb-2">No wallet connected.</p>
                        <button className='bg-gray-800/30 text-white backdrop-blur-sm px-4 py-2 rounded' onClick={connectWallet}>Connect Wallet</button>
                    </div>
                )}
                {error && <p className="">{error}</p>}
            </div>
        </div>
    );
};

export default WalletConnect;
