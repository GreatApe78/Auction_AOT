
var web3 = new Web3(ethereum);

import contract_data from "../build/contracts/Auction.json" assert {type: "json"}
var auction_abi = contract_data.abi

var auction_address = contract_data.networks[5].address


var visitors_btn = document.getElementsByClassName("visitors_btn")
var dives = document.getElementsByClassName("dives")
var start_minimun_bid_input = document.getElementById("start_minimun_bid_input")
var minimun_bid_input = document.getElementById("minimun_bid_input")
var Start_Auction_btn = document.getElementById("Start_Auction_btn")
var Stop_Auction_btn = document.getElementById("Stop_Auction_btn")

function getAddress() {
    dives[3].innerHTML = auction_address;
}
getAddress()
async function highest_bidder() {
    if (ethereum) {
        try {
            var ktr = new web3.eth.Contract(auction_abi, auction_address)
            let chamada = ktr.methods.highest_bidder().call()
            return chamada

        } catch (error) {
            console.log(error)
        }
    } else {
        alert(error)
    }
}
visitors_btn[1].addEventListener("click", () => {
    highest_bidder().then((chamada) => {
        dives[1].innerHTML = chamada
    }).catch((error) => {
        console.log(error)


    })
})

async function highest_bid() {
    if (ethereum) {
        try {
            var ktr = new web3.eth.Contract(auction_abi, auction_address)
            let chamada = ktr.methods.highest_bid().call()
            return chamada

        } catch (error) {
            console.log(error)
        }
    } else {
        alert(error)
    }
}
visitors_btn[2].addEventListener("click", () => {
    highest_bid().then((chamada) => {
        dives[2].innerHTML = chamada / (10 ** 18)
    }).catch((error) => {
        console.log(error)


    })
})
async function ether_balance() {
    if (ethereum) {
        try {
            var ktr = new web3.eth.Contract(auction_abi, auction_address)
            let chamada = ktr.methods.ether_balance().call()
            return chamada

        } catch (error) {
            console.log(error)
        }
    } else {
        alert(error)
    }
}
visitors_btn[0].addEventListener("click", () => {
    ether_balance().then((chamada) => {
        dives[0].innerHTML = chamada / (10 ** 18)
    }).catch((error) => {
        console.log(error)


    })
})
//fim dos getters





async function Start_Auction() {
    if (ethereum) {
        try {
            var ktr = new web3.eth.Contract(auction_abi, auction_address)
            let accounts = await ethereum.request({ method: "eth_requestAccounts" })
            let account = accounts[0]
            let lanceInicial = start_minimun_bid_input.value
            lanceInicial = BigInt(lanceInicial * 10 ** 18)

            let chamada = ktr.methods.Start_Auction(lanceInicial).send({ from: account, })

            return chamada


        } catch (error) {
            console.log(error)
        }

    } else {
        alert(error)
    }
}
Start_Auction_btn.addEventListener("click", () => {
    Start_Auction().then(() => {

    }).catch((error) => {
        console.log(error)
    })

})
async function Bid() {

    if (ethereum) {
        try {
            var ktr = new web3.eth.Contract(auction_abi, auction_address)
            let accounts = await ethereum.request({ method: "eth_requestAccounts" })
            let account = accounts[0]
            let lance = minimun_bid_input.value
            lance = lance * 10 ** 18

            let chamada = ktr.methods.Bid().send({ from: account, value: lance })

            return chamada


        } catch (error) {
            console.log(error)
        }

    } else {
        alert(error)
    }
}
visitors_btn[3].addEventListener("click", () => {
    Bid().then(() => { }).catch((error) => {
        console.log(error)
    })
})
async function End_Auction() {

    if (ethereum) {
        try {
            var ktr = new web3.eth.Contract(auction_abi, auction_address)
            let accounts = await ethereum.request({ method: "eth_requestAccounts" })
            let account = accounts[0]
            let lance = minimun_bid_input.value
            lance = lance * 10 ** 18

            let chamada = ktr.methods.End_Auction().send({ from: account, value: lance })

            return chamada


        } catch (error) {
            console.log(error)
        }

    } else {
        alert(error)
    }
}
Stop_Auction_btn.addEventListener("click", () => {
    End_Auction().then(() => { }).catch((error) => {
        console.log(error)
    })
})