import React from 'react'
import { GlobalTypes } from '../AppWrapper'

export const WalletConnect:React.FC<GlobalTypes> = (
    {
        className
    }
) => {
    return (
        <div>
            <button className={`${className} duration-300 text-sm px-3 py-2 rounded-xl text-slate-200 hover:bg-slate-700 bg-slate-900`}>Connect Wallet</button>
        </div>
    )
}
