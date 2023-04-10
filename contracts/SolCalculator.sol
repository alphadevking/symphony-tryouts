// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

contract SolCalculator {
    function add(uint256 a, uint256 b) public pure returns (uint256) {
        return a + b;
    }

    function subtract(uint256 a, uint256 b) public pure returns (uint256) {
        return a - b;
    }

    function multiply(uint256 a, uint256 b) public pure returns (uint256) {
        return a * b;
    }

    function divide(uint256 a, uint256 b) public pure returns (uint256) {
        require(b != 0, "Cannot divide by zero");
        return a / b;
    }

    function modulo(uint256 a, uint256 b) public pure returns (uint256) {
        require(b != 0, "Cannot find modulo with zero");
        return a % b;
    }

    function power(uint256 base, uint256 exponent) public pure returns (uint256) {
        return base ** exponent;
    }

    function factorial(uint256 n) public pure returns (uint256) {
        uint256 result = 1;
        for (uint256 i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    }

    function square(uint256 a) public pure returns (uint256) {
        return a * a;
    }

    function cube(uint256 a) public pure returns (uint256) {
        return a * a * a;
    }

    function max(uint256 a, uint256 b) public pure returns (uint256) {
        if (a > b) {
            return a;
        } else {
            return b;
        }
    }

    function min(uint256 a, uint256 b) public pure returns (uint256) {
        if (a < b) {
            return a;
        } else {
            return b;
        }
    }
}
