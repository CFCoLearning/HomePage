// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CFCNFT is ERC721URIStorage, Ownable {
    uint256 private _nextTokenId;

    constructor() ERC721("CFCNFT", "CFCNFT") {
        _nextTokenId = 1; // tokenId 从 1 开始
    }

    /// @notice 仅限管理员调用，铸造 NFT 并记录 IPFS URI
    function mintNFT(address to, string calldata tokenURI_) external onlyOwner returns (uint256) {
        uint256 tokenId = _nextTokenId;
        _nextTokenId++;
        _mint(to, tokenId);
        _setTokenURI(tokenId, tokenURI_);
        return tokenId;
    }
    
    /// @notice 批量铸造NFT，用于项目结算时批量发放
    function batchMintNFT(address[] calldata recipients, string[] calldata tokenURIs) external onlyOwner returns (uint256[] memory) {
        require(recipients.length == tokenURIs.length, "Recipients and URIs length mismatch");
        uint256[] memory tokenIds = new uint256[](recipients.length);
        
        for (uint256 i = 0; i < recipients.length; i++) {
            uint256 tokenId = _nextTokenId;
            _nextTokenId++;
            _mint(recipients[i], tokenId);
            _setTokenURI(tokenId, tokenURIs[i]);
            tokenIds[i] = tokenId;
        }
        
        return tokenIds;
    }
}