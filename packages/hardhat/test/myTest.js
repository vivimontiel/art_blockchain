const { ethers } = require("hardhat");
const { use, expect } = require("chai");
const { solidity } = require("ethereum-waffle");

use(solidity);

describe("My Dapp", function () {
  let myContract;

  describe("YourContract", function () {
    it("Should deploy YourContract", async function () {
      const YourContract = await ethers.getContractFactory("ArtMarketplace");

      myContract = await YourContract.deploy();
    });

    describe("setPurpose()", function () {
      it("Should be able to set a new purpose", async function () {
        const newPurpose = "Test Purpose";

        await myContract.setPurpose(newPurpose);
        expect(await myContract.purpose()).to.equal(newPurpose);
      });
    });

    describe("_createArt()", function () {
      it("Should be able to create a new artwork", async function () {
        const price = 20;
        const location = here;
        const description = "description";
        const owner;
        const date = "today";
        const sold = false;

        await myContract._createArt(price, location, description, msg.sender, date, false);
        expect(await myContract._createArt()).to.equal(newPurpose);
      });
    });


  });
});
