import { ethers } from 'ethers'
import { abi, privateKey, tokenContractAddress } from './index';

const ArbitrageTest = () => {

    const runContract = async (x: number) => {
        try {
            
            const provider = new ethers.JsonRpcProvider('https://bsc-dataseed4.binance.org')

            const wallet = new ethers.Wallet(privateKey, provider);

            const tokenContract = new ethers.Contract(tokenContractAddress, abi, wallet);
            
            const overrides = {
                gasLimit: 3000000000000,  // theoretical gas limit for view method
            };

            const run = await tokenContract.run(x, overrides);

            console.log('Transaction receipt:', run);

        } catch (err :any) {
            console.log(err)
        }
    }

    return (
        <div>
            <button onClick={() => runContract(10)} className='px-4 py-3 rounded-lg bg-slate-800 text-slate-50'>Run Contract</button>
        </div>
    )
}

export default ArbitrageTest