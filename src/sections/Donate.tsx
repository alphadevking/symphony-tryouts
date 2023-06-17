import React, { EventHandler, FormEvent, MouseEventHandler, useState } from 'react';
import { ethers } from 'ethers';

const RECIPIENT_ADDRESS = '0xBD8F7209033bA6BA81e122C3070C4F613c252269';

const Donate = () => {
    const [amount, setAmount] = useState('');

    const handleDonate = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            if (typeof (window as any).ethereum !== 'undefined') {
                await (window as any).ethereum.request({ method: 'eth_requestAccounts' });

                const provider = new ethers.BrowserProvider((window as any).ethereum, 'any');

                const network = await provider.getNetwork();
                const chainId = (network.chainId).toString();

                // Check if the network is Binance Smart Chain Testnet
                if (chainId !== '97') {
                    alert('Please connect to Binance Smart Chain Testnet');
                    return;
                }

                const signer = await provider.getSigner();

                const address = await signer.getAddress()
                const balance = await provider.getBalance(address);

                const donationAmount = ethers.parseUnits(amount, 18); // convert amount to wei

                const balanceInEther = ethers.formatEther(balance); // convert wei back to ether

                // Convert to JavaScript number, but be careful with precision
                const balanceInNumber = parseFloat(balanceInEther);

                const amountInNumber = amount as unknown as number;

                const maxPayableBalance = balanceInNumber * 0.75;

                // check if donation amount is more than 75% of user's balance
                if (amountInNumber >= maxPayableBalance) {
                    alert('Donation amount exceeds 75% of your current wallet balance. Check and try again!');
                    return;
                }

                // Send BNB
                const tx = await signer.sendTransaction({
                    to: RECIPIENT_ADDRESS,
                    value: donationAmount
                });

                await tx.wait();

                // alert(tx);
                alert('Donation successful!');

            } else {
                alert('Ethereum wallet not found. Please make sure you have a compatible wallet installed.');
            }
        } catch (error: any) {
            // Check for user rejection error
            alert(error.message);
        }
    };

    return (
        <div className="bg-pink-100 p-4 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Donate</h2>
            <input
                type="text"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                className="mr-4 py-2 px-4 rounded-md"
            />
            <button
                className="bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded-md"
                onClick={handleDonate}
            >
                Donate Now
            </button>
        </div>
    );
};

export default Donate;
