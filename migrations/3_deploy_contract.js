const Auction = artifacts.require("Auction");

module.exports = async (deployer, network, accounts) => {

    deployer.deploy(Auction);








}