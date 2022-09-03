const { ethers } = require("hardhat");

const deployLinksNFT = async ({ deployments, getNamedAccounts }) => {
  const { deploy } = deployments;
  const { owner } = await getNamedAccounts();

  await deploy("ForumNFT", {
    from: owner,
    args: [
      "LuksoLinks",
      "LL",
      "0x0CEd2afBb9d4d9023059b2F7Cc07f24C4058CF30",
      false,
    ],
    gasPrice: ethers.BigNumber.from(20_000_000_000),
    log: true,
  });
};

module.exports = deployLinksNFT;
module.exports.tags = ["LinksNFT"];
