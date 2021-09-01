pragma ton-solidity >= 0.43.0;

interface IJoke {
    function setValue(string value) external;
    function getValues(uint32 index) external returns (string);
    function getLenght() external returns (uint32);

}