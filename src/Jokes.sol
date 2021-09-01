pragma ton-solidity >= 0.43.0;
pragma AbiHeader time;
pragma AbiHeader expire;
import './interfaces/IJokes.sol';

contract Joke is IJoke{
    mapping (uint32=>string) public _jokes;
    uint256 [] public _keys;
    
    constructor() public {
        tvm.accept(); //some comment
    }
    function setValue(string value) public override {
        tvm.accept();
        if(_jokes.empty()){
            _jokes[0] = value;
        } else {
            optional (uint32,string) prop = _jokes.max();
            (uint32 index, ) = prop.get();
            _jokes[index+1] = value;
        }
        
    }
    function getValues(uint32 index) public override returns (string) {   
        tvm.accept();
        return _jokes[index];
    }
    function getLenght() public override returns (uint32) {
        tvm.accept();
        optional (uint32,string) prop = _jokes.min();
        uint32 count = 0;
        while (prop.hasValue()) {
            (uint32 semiIndex, ) = prop.get();
            prop = _jokes.next(semiIndex);
            count += 1;}
        return count;
    }
}