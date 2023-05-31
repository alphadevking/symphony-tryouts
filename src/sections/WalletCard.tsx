import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

interface EthereumWindow extends Window {
    ethereum?: any;
}
declare const window: EthereumWindow;

async function connectToMetaMask(): Promise<ethers.Signer> {
    if (!window.ethereum) {
        throw new Error('MetaMask not found');
    }

    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = provider.getSigner();
    return signer;
}

const WalletCard: React.FC = () => {
    const [accountAddress, setAccountAddress] = useState<string | null>(null);
    const [isConnected, setIsConnected] = useState<boolean>(false);

    useEffect(() => {
        const checkConnection = async () => {
            if (window.ethereum?.selectedAddress) {
                setAccountAddress(window.ethereum.selectedAddress);
                setIsConnected(true);
            } else {
                setIsConnected(false);
            }
        };

        checkConnection();

        if (window.ethereum && typeof window.ethereum.off === 'function') {
            window.ethereum.on('accountsChanged', checkConnection);
            window.ethereum.on('disconnect', checkConnection);

            return () => {
                window.ethereum.off('accountsChanged', checkConnection);
                window.ethereum.off('disconnect', checkConnection);
            };
        }
    }, []);

    const handleConnect = async () => {
        await connectToMetaMask()
            .then((signer) => signer.getAddress())
            .then((address) => {
                setIsConnected(true);
                setAccountAddress(address);
                // window.location.reload();
            })
            .catch((error) => console.error('Error connecting to MetaMask:', error));
    };

    const handleDisconnect = async () => {
        setIsConnected(false);
        setAccountAddress(null);
        // window.location.reload();
    };
    
    return (
        <div className="justify-center mx-auto w-96 box-border">
            <div className='max-w-fit m-2 py-5 px-5 border rounded-2xl shadow-md text-center'>
                <h2 className="text-md font-semibold opacity-70 mb-4">Wallet Connect</h2>
                {isConnected && accountAddress ? (
                    <div>
                        <p className="my-2 text-md">Connected Account: <span>{accountAddress}</span></p>
                        <button
                            className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600"
                            onClick={handleDisconnect}
                        >
                            Disconnect Wallet
                        </button>
                    </div>
                ) : (
                    <button
                        className="bg-cyan-600 text-white py-2 px-3 rounded-md hover:bg-cyan-700"
                        onClick={handleConnect}
                    >
                        Connect to Metamask
                    </button>
                )}
            </div>
        </div>
    );
};

export default WalletCard;