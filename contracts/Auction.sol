// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "./Auction_721.sol";

error NotOwner();

contract Auction is Auction_721 {
    constructor() {
        i_owner = msg.sender;

    }

    modifier onlyOwner() {
        if (msg.sender != i_owner) {
            revert NotOwner();
        }
        _;
    }
    //VARIAVEIS

    uint256 public tempo_leilao;

    address public i_owner;

    uint256 public highest_bid;

    address public highest_bidder;

    bool auction_status = false;

    uint256 public fila_bidders = 0;

    uint256 public ether_balance = 0;

    uint256 public titans_nft = 1;

    //VARIAVEIS

    function Start_Auction(uint256 _minimun_bid) public onlyOwner {
        require(titans_nft < 10, "Todos os NFTS ja foram usados");
        require(auction_status==false,"o leilao esta ativo");
        tempo_leilao = block.timestamp + 2 minutes;
        highest_bid = _minimun_bid;

        auction_status = true;
    }

    function Bid() public payable {
        //checa se o valor eh valido
        require(msg.value > highest_bid, "ERROR!Send more Bid.");
        //checa se o auction estah ativo
        require(auction_status, "Auction is not active");
        //o dono do maior lance nao pode cobrir o prohximo lance
        require(
            msg.sender != highest_bidder,
            "You are the current highest bidder"
        );
        require(block.timestamp<=tempo_leilao,"");
        ether_balance = msg.value;
        //logica para devolver dinheiro ao lance anterior
        if (fila_bidders != 0) {
            (bool callSuccess, ) = payable(highest_bidder).call{
                value: (address(this).balance) - msg.value
            }("");

            require(callSuccess, "Call failed");
        }

        fila_bidders = fila_bidders + 1;

        highest_bid = msg.value;

        highest_bidder = msg.sender;
    }

    function End_Auction() public onlyOwner {
        (bool callSuccess, ) = payable(i_owner).call{
            value: (address(this).balance)
        }("");
        require(callSuccess, "Call failed");

        createTokens(highest_bidder);

        auction_status = false;

        fila_bidders = 0;

        ether_balance = 0;

        highest_bid = 0;

        highest_bidder = address(0);

        titans_nft = titans_nft + 1;

        tempo_leilao = 0;
    }

    //ativadas quando se utiliza o metamask para enviar ether ao contrato
    receive() external payable {
        Bid();
    }

    fallback() external payable {
        Bid();
    }
}
