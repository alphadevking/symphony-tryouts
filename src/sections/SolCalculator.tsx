import { ethers } from 'ethers'
import React, { useState } from 'react'
import contractAbi from '@/utils/abi/SolCalculatorABI.json'

// BSC Testnet URL
const providerUrl = 'https://data-seed-prebsc-1-s1.binance.org:8545/';

// Instantiate the ethers library
const provider = new ethers.JsonRpcProvider(providerUrl);

// Your deployed contract address
const contractAddress = '0xA08B00484ceCB5535427A62Ba1022F6Ab2B4438b';

// Create a contract instance
const contract = new ethers.Contract(contractAddress, contractAbi, provider);

export const add = async (a: number, b: number) => {
    const result = await contract.add(a, b);
    return result;
}

export const cube = async (a: number) => {
    const result = await contract.cube(a);
    return result;
}

export const divide = async (a: number, b: number) => {
    const result = await contract.divide(a, b);
    return result;
}

export const factorial = async (n: number) => {
    const result = await contract.factorial(n);
    return result;
}

export const max = async (a: number, b: number) => {
    const result = await contract.max(a, b);
    return result;
}

export const min = async (a: number, b: number) => {
    const result = await contract.min(a, b);
    return result;
}

export const modulo = async (a: number, b: number) => {
    const result = await contract.modulo(a, b);
    return result;
}

export const multiply = async (a: number, b: number) => {
    const result = await contract.multiply(a, b);
    return result;
}

export const power = async (base: number, exponent: number) => {
    const result = await contract.power(base, exponent);
    return result;
}

export const square = async (a: number) => {
    const result = await contract.square(a);
    return result;
}

export const subtract = async (a: number, b: number) => {
    const result = await contract.subtract(a, b);
    return result;
}

const SolCalculator = () => {
    const [inputA, setInputA] = useState(0);
    const [inputB, setInputB] = useState(0);
    const [result, setResult] = useState(0);
    const [error, setError] = useState('');

    const performOperation = async (operation: string) => {
        try {
            let res;
            switch (operation) {
                case "add":
                    res = await add(inputA, inputB);
                    break;
                case "subtract":
                    res = await subtract(inputA, inputB);
                    break;
                case "multiply":
                    res = await multiply(inputA, inputB);
                    break;
                case "divide":
                    res = await divide(inputA, inputB);
                    break;
                case "modulo":
                    res = await modulo(inputA, inputB);
                    break;
                case "power":
                    res = await power(inputA, inputB);
                    break;
                case "factorial":
                    res = await factorial(inputA);
                    break;
                case "square":
                    res = await square(inputA);
                    break;
                case "cube":
                    res = await cube(inputA);
                    break;
                case "max":
                    res = await max(inputA, inputB);
                    break;
                case "min":
                    res = await min(inputA, inputB);
                    break;
            }
            // console.log(res)
            const result = res.toString()
            setResult(result)
            // alert(result)
        } catch (err: any) {
            // console.log(err.message)
            setError(err.message)
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
            <div>{error}</div>
            <div className="p-6 bg-white shadow-md rounded-md">
                <input type="number" className="mb-4 p-2 border rounded" value={inputA} onChange={(e) => setInputA(Number(e.target.value))} />
                <input type="number" className="mb-4 p-2 border rounded" value={inputB} onChange={(e) => setInputB(Number(e.target.value))} />
                <div>
                    <button className="m-2 p-2 bg-blue-500 text-white rounded" onClick={() => performOperation("add")}>Add</button>
                    <button className="m-2 p-2 bg-blue-500 text-white rounded" onClick={() => performOperation("subtract")}>Subtract</button>
                    <button className="m-2 p-2 bg-blue-500 text-white rounded" onClick={() => performOperation("multiply")}>Multiply</button>
                    <button className="m-2 p-2 bg-blue-500 text-white rounded" onClick={() => performOperation("divide")}>Divide</button>
                    <button className="m-2 p-2 bg-blue-500 text-white rounded" onClick={() => performOperation("modulo")}>Modulo</button>
                    <button className="m-2 p-2 bg-blue-500 text-white rounded" onClick={() => performOperation("power")}>Power</button>
                    <button className="m-2 p-2 bg-blue-500 text-white rounded" onClick={() => performOperation("factorial")}>Factorial</button>
                    <button className="m-2 p-2 bg-blue-500 text-white rounded" onClick={() => performOperation("square")}>Square</button>
                    <button className="m-2 p-2 bg-blue-500 text-white rounded" onClick={() => performOperation("cube")}>Cube</button>
                    <button className="m-2 p-2 bg-blue-500 text-white rounded" onClick={() => performOperation("max")}>Max</button>
                    <button className="m-2 p-2 bg-blue-500 text-white rounded" onClick={() => performOperation("min")}>Min</button>
                </div>
                <div>Result: {result}</div>
            </div>
        </div>
    );
}

export default SolCalculator