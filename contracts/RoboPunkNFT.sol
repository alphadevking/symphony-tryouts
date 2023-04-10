// SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.14;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RoboPunkNFT is ERC721, Ownable {
    // minting price for each nft
    uint256 public mintPrice;
    // total number of nfts available for minting
    uint256 public totalSupply;
    // total number of nfts
    uint256 public maxSupply;
    // max number of nfts a wallet can mint
    uint256 public maxPerWallet;
    // this can be toggled true or false base on user preference
    bool public isPublicMintEnabled;
    // this is the access from places like opensea where you need to specify where the nfts are located
    string internal baseTokenUri;
    // this accesses a user account where all the money for the mint are sent
    address payable public withdrawWallet;
    // just a function to keep track of how many nfts an address has minted
    mapping (address => uint256) public walletMints;

    constructor() payable ERC721('RoboPunks', 'RP') {
        mintPrice = 0.02 ether;
        totalSupply = 0;
        maxSupply = 1000;
        maxPerWallet = 10;
        // set withdraw wallet address
    }

    function setIsPublicMintEnabled(bool isPublicMintEnabled_) external onlyOwner {
        isPublicMintEnabled = isPublicMintEnabled_;
    }

    function setBaseTokenUri(string calldata baseTokenUri_) external onlyOwner {
        baseTokenUri = baseTokenUri_;
    }

    function tokenURI(uint256 tokenId_) public view override returns (string memory) {
        require(_exists(tokenId_), 'Token does not exist!');
        return string(abi.encodePacked(baseTokenUri, Strings.toString(tokenId_),".json"));
    }

    function withdraw() external onlyOwner {
        (bool success,) = withdrawWallet.call{value: address(this).balance}("");
        require(success, "Withdrawal failed!");
    }

    function mint(uint256 quantity_) public payable {
        require(isPublicMintEnabled, "Minting not enabled!");
        require(msg.value == quantity_ * mintPrice, "wrong mint value");
        require(totalSupply + quantity_ <= maxSupply, "Sold out!");
        require(walletMints[msg.sender] + quantity_ <= maxPerWallet, "exceeds max wallet");
    }
}