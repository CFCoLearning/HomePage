// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CFCToken is ERC20, ERC20Permit, ERC20Votes, Ownable {
    constructor() ERC20("CoLearnToken", "CLT") ERC20Permit("CoLearnToken") {}

    /// @notice 仅限管理员铸造代币
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }

    // 以下覆盖函数用于同时更新 ERC20 与 ERC20Votes 的状态

    function _afterTokenTransfer(address from, address to, uint256 amount)
        internal override(ERC20, ERC20Votes)
    {
        super._afterTokenTransfer(from, to, amount);
    }

    function _mint(address to, uint256 amount)
        internal override(ERC20, ERC20Votes)
    {
        super._mint(to, amount);
    }

    function _burn(address account, uint256 amount)
        internal override(ERC20, ERC20Votes)
    {
        super._burn(account, amount);
    }

    // 覆盖 _update 解决多重继承问题
    function _update(address from, address to, uint256 amount)
        internal override(ERC20, ERC20Votes)
    {
        super._update(from, to, amount);
    }

    // 重写 nonces，消除 ERC20Permit 与 Nonces 的冲突
    function nonces(address owner) public view override(ERC20Permit) returns (uint256) {
        return super.nonces(owner);
    }
}