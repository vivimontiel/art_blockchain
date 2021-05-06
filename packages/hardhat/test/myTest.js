const { ethers } = require("hardhat");
const { use, expect } = require("chai");
const { solidity } = require("ethereum-waffle");

use(solidity);

describe("My Dapp", function () {
  let myContract;

  describe("YourContract", function () {

    it("Should Create Artwork", async function () {
      const accounts = await ethers.getSigners();
      const YourContractFactory = await ethers.getContractFactory("YourContract");
      const YourContract = await YourContractFactory.deploy();

      await YourContract.deployed();

      await YourContract._createArt(2, "Rue de du four", "beau tableau", "today");
      let test = await YourContract.artworks(0);
      console.log(await YourContract.artworks(0));
      expect(test.price).to.equal(2);
    });

    it("Should buy Artwork", async function () {
      const accounts = await ethers.getSigners();
      
      const YourContractFactory = await ethers.getContractFactory("YourContract");
      const YourContract = await YourContractFactory.deploy();
      await YourContract.deployed();

      const other_account = YourContract.connect(accounts[1]);

      await YourContract._createArt(2, "Rue de du four", "beau tableau", "today");

      let test = await YourContract.artworks(0);

      await other_account._buyArt(0, {value: 2});
      let test2 = await YourContract.artworks(0);
      
      console.log(await YourContract.artworks(0));
      console.log("NEW OWNER : ", test2.owner);
      console.log("BUYER ACCOUNT : ", other_account.signer.address);

      var newOwner = test2.owner;

      expect(newOwner).to.equal(other_account.signer.address);

    });

    it("Should get Artwork", async function () {
      const accounts = await ethers.getSigners();
      
      const YourContractFactory = await ethers.getContractFactory("YourContract");
      const YourContract = await YourContractFactory.deploy();
      await YourContract.deployed();

      await YourContract._createArt(2, "Rue de du four", "beau tableau", "today");
      let test = await YourContract.artworks(0);

      let artworksfromowner = await YourContract.getArtworksByOwnerId();  
      console.log("artworksfromowner",artworksfromowner)   
      var locationArt = test.location;
      expect(locationArt).to.equal(artworksfromowner[0].location);

    });

    it("Should get All Artwork", async function () {
      
      const YourContractFactory = await ethers.getContractFactory("YourContract");
      const YourContract = await YourContractFactory.deploy();
      await YourContract.deployed();

      await YourContract._createArt(2, "Rue de du four", "beau tableau", "today");
      await YourContract._createArt(3, "Boulevard St Germain", "tableau", "hier");

      let expectedArtworks0 = await YourContract.artworks(0);
      let expectedArtworks1 = await YourContract.artworks(1);

      let allArtworks = await YourContract.getAllArtworks();   
      console.log(allArtworks);
      
      expect(parseInt(allArtworks[0].price._hex)).to.equal(expectedArtworks0.price);
      expect(allArtworks[0].location).to.equal(expectedArtworks0.location);
      expect(allArtworks[0].description).to.equal(expectedArtworks0.description);
      expect(allArtworks[0].date).to.equal(expectedArtworks0.date);

      expect(parseInt(allArtworks[1].price._hex)).to.equal(expectedArtworks1.price);
      expect(allArtworks[1].location).to.equal(expectedArtworks1.location);
      expect(allArtworks[1].description).to.equal(expectedArtworks1.description);
      expect(allArtworks[1].date).to.equal(expectedArtworks1.date);
    });


  });
});
