pragma solidity >=0.6.0 <0.9.0;
pragma abicoder v2;
//SPDX-License-Identifier: UNLICENSED

contract YourContract {
    
    struct Art {
        uint price;
        string location;
        string description;
        address owner;
        string date;
        bool sold;
    }
    
    event NewArt(uint artId, uint price, string location, string description, address owner, string date);
    event Buy(uint artId,  address owner, address buyer);
    
    mapping(uint => address) public artToSeller;

    Art[] public artworks;
    Art[] public ownerArtworks;

    function _createArt(uint _price, string memory _location, string memory _description, string memory _date) public {
        artworks.push(Art(_price, _location, _description, msg.sender, _date, false));
        uint id = artworks.length - 1;
        emit NewArt(id, _price, _location, _description, msg.sender, _date);
    }
    
    function _buyArt(uint _id) public payable {
        require(artworks[_id].price == msg.value, "Montant incorrect ");
        address payable owner = payable(address(artworks[_id].owner));
        owner.transfer(msg.value);
        emit Buy(_id, owner, msg.sender);
        artworks[_id].owner = msg.sender;
    }

    function getArtworksByOwnerId() public returns (Art[] memory result){
        delete ownerArtworks;
        for (uint i = 0; i < artworks.length; i++) { 
            if (artworks[i].owner == msg.sender) {
                ownerArtworks.push(Art(artworks[i].price, artworks[i].location, artworks[i].description, msg.sender, artworks[i].date, false));
            }   
        }
        return ownerArtworks;
    }

}