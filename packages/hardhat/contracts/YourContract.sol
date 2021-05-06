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

    function getArtworksByOwnerId() external view returns (Art[] memory){
        uint len = artworks.length;
        Art[] memory ownerArt = new Art[](len);
        uint j = 0;
        for (uint i = 0; i < len; i++) { 
            if (artworks[i].owner == msg.sender) {
                ownerArt[j] = artworks[i];
                j++;
            }   
        }
        return ownerArt;
    }

    function getAllArtworks() external view returns (Art[] memory){
        return artworks;
    }

}