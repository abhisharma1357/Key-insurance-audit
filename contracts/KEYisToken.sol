/*
 * Simple ERC20 Contract, what the KEY Token MAY look like
 */

pragma solidity 0.5.0;

import "./EIP20Interface.sol";

library SafeMath {
    function add(uint256 a, uint256 b) internal pure returns (uint256 c) {
        c = a + b;
        require(c >= a);
    }
    function sub(uint256 a, uint256 b) internal pure returns (uint256 c) {
        require(b <= a);
        c = a - b;
    }
    function mul(uint256 a, uint256 b) internal pure returns (uint256 c) {
        c = a * b;
        require(a == 0 || c / a == b);
    }
    function div(uint256 a, uint256 b) internal pure returns (uint256 c) {
        require(b > 0);
        c = a / b;
    }
}

contract KEYisToken is EIP20Interface {
	using SafeMath for uint256;

  address public owner;

	string public constant symbol = 'KEYis';
	string public constant name = 'KEYis Token';
	uint8 public constant decimals = 18;

	string public constant version = "KEYis 1.0";

	uint256 public totalSupply = 200000000 * 10**uint256(decimals);

	uint256 private constant MAX_UINT256 = 2**256 - 1;

	mapping (address => uint256) public balances;
	mapping (address => mapping (address => uint256)) public allowed;

  constructor() public {
		owner = msg.sender;
  }

  modifier onlyOwner() {
    require(msg.sender == owner, "You are not authorised to call this function");
    _;
  }

	function transfer(address _to, uint256 _value) public returns (bool success) {
				require(balances[msg.sender] >= _value);
				balances[msg.sender] = balances[msg.sender].sub(_value);
				balances[_to] = balances[_to].add(_value);
				emit Transfer(msg.sender, _to, _value);
				return true;
	}

	function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
				uint256 allowance = allowed[_from][msg.sender];
				require(balances[_from] >= _value && allowance >= _value);
				balances[_from] = balances[_from].sub(_value);
				balances[_to] = balances[_to].add(_value);
				if (allowance < MAX_UINT256) {
            allowed[_from][msg.sender] = allowed[_from][msg.sender].sub(_value);
        }
        emit Transfer(_from, _to, _value);
				return true;
	}

	function balanceOf(address _owner) public view returns (uint256 balance) {
				return balances[_owner];
	}

	function approve(address _spender, uint256 _value) public returns (bool success) {
        require(_value > 0);
				allowed[msg.sender][_spender] = _value;
				emit Approval(msg.sender, _spender, _value);
				return true;
	}

	function allowance(address _owner, address _spender) public view returns (uint256 remaining) {
				return allowed[_owner][_spender];
	}

  function burn(address _member, uint256 _value) public onlyOwner returns (bool success) {
    require (balances[_member] >= _value, "Not enough tokens in account to burn");
    balances[_member] = balances[_member].sub(_value);
    totalSupply = totalSupply.sub(_value);
    emit Transfer(_member, address(0x0), _value);
    return true;
  }
}
