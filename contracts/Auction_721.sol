// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Auction_721 is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("Titans", "TNTS") {}

    function createTokens(address _to) internal {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        string
            memory uri = "ipfs://QmdjPHnyggQPVkuTKpz6J2N4v5EKaGxa9bD5Xe43KAFX2p/";
        string memory format = ".json";
        string memory finalURI = string(
            abi.encodePacked(uri, uint2str(newItemId), format)
        );
        _mint(_to, newItemId);
        _setTokenURI(newItemId, finalURI);
    }

    function uint2str(uint256 _i)
        internal
        pure
        returns (string memory _uintAsString)
    {
        if (_i == 0) {
            return "0";
        }
        uint256 j = _i;
        uint256 len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint256 k = len;
        while (_i != 0) {
            k = k - 1;
            uint8 temp = (48 + uint8(_i - (_i / 10) * 10));
            bytes1 b1 = bytes1(temp);
            bstr[k] = b1;
            _i /= 10;
        }
        return string(bstr);
    }
}
