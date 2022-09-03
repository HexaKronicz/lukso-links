//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@lukso/lsp-smart-contracts/contracts/LSP7DigitalAsset/LSP7DigitalAsset.sol";

contract LinksNFT is LSP7DigitalAsset {
    struct Link {
        string cid;
        address author;
        uint256 id;
    }

    Link latestLink;
    uint256[] public linksIds;
    mapping(uint256 => Link) public linkByTokenId;
    uint256 private linksCounter;
    address private admin;

    constructor(
        string memory _name,
        string memory _symbol,
        address _newOwner,
        bool _isNFT
    ) LSP7DigitalAsset(_name, _symbol, _newOwner, _isNFT) {
        admin = _newOwner;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin);
        _;
    }

    function createLink(string calldata _cid) public {
        latestLink.cid = _cid;
        latestLink.author = msg.sender;
        latestLink.id = ++linksCounter;

        linkByTokenId[linksCounter] = latestLink;
        linksIds.push(linksCounter);

        _mint(msg.sender, linksCounter, true, "");
    }

    function editLink(uint256 _tokenId, string calldata _cid) public {
        require(
            linkByTokenId[_tokenId].author == msg.sender,
            "Only author can edit post"
        );
        linkByTokenId[_tokenId].cid = _cid;
    }

    function fetchLinks()
        public
        view
        returns (
            Link[] memory links,
            uint256,
            address
        )
    {
        uint256 linksLength = linksIds.length;
        uint256[] memory linkArray = linksIds;
        links = new Link[](linksLength);

        for (uint256 i = 0; i < linksLength; ) {
            links[i] = linkByTokenId[linkArray[i]];
            unchecked {
                ++i;
            }
        }

        return (links, linksCounter, admin);
    }

    function changeAdmin(address _newAdmin) public onlyAdmin {
        admin = _newAdmin;
    }
}
