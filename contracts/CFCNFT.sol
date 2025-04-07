// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CoLearnNFT is ERC721URIStorage, Ownable {
    uint256 private _nextTokenId;

    constructor() ERC721("CoLearnNFT", "CLNFT") Ownable(msg.sender) {
        _nextTokenId = 1; // tokenId 从1开始
    }

    /// @notice 仅限管理员调用，铸造 NFT 并将 IPFS URI 上链
    /// @param to NFT 接收者地址
    /// @param tokenURI_ 存储在 IPFS 上的 metadata URI
    /// @return tokenId 新生成的 NFT tokenId
    function mintNFT(address to, string calldata tokenURI_) external returns (uint256) {
        uint256 tokenId = _nextTokenId;
        _nextTokenId++;
        _mint(to, tokenId);
        _setTokenURI(tokenId, tokenURI_);
        return tokenId;
    }

    /// @notice 批量铸造 NFT
    /// @param recipients 接收者地址数组
    /// @param tokenURIs 存储在 IPFS 上的 metadata URI 数组
    /// @return tokenIds 新生成的 NFT tokenId 数组
    function batchMintNFT(address[] calldata recipients, string[] calldata tokenURIs) external returns (uint256[] memory) {
        require(recipients.length == tokenURIs.length, "Mismatched input lengths");
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