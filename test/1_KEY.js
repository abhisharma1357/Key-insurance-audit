const Crowdsale = artifacts.require('TokenSale.sol');

var Web3 = require("web3");
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

//account 0 Owner, cost tokens , team tokens , withdrawwallet initailly , 
//account 1 cost 
//account 2 Team  
//account 3 withdraw wallet
//account 4 beneficiary one 
//account 5 
//account 6 
//account 7 
//account 8 
//account 9 

contract('KEYIS Contract', async (accounts) => {

  it('Should correctly initialize constructor values of Contract', async () => {

    this.Crowdhold = await Crowdsale.new({gas: 600000000,from : accounts[0]});
    let contractBalance = await this.Crowdhold.balances.call(this.Crowdhold.address);
    let withdrawWallet = await this.Crowdhold.withdrawWallet.call();
    let teamsWallet = await this.Crowdhold.teamsWallet.call();
    let costsWallet = await this.Crowdhold.costsWallet.call();
    let investorAlloc = await this.Crowdhold.investorAlloc.call();
    let teamsAlloc = await this.Crowdhold.teamsAlloc.call();
    let costsAlloc = await this.Crowdhold.costsAlloc.call();
    let totalSupply = await this.Crowdhold.totalSupply.call();
    let owner = await this.Crowdhold.owner.call();

    assert.equal(totalSupply/ 10 ** 18, 200000000);
    assert.equal(owner, accounts[0]);
    assert.equal(contractBalance/ 10 ** 18, 200000000);
    assert.equal(withdrawWallet, accounts[0]);
    assert.equal(teamsWallet, accounts[0]);
    assert.equal(costsWallet, accounts[0]);
    assert.equal(investorAlloc/ 10 ** 18, 150000000);
    assert.equal(teamsAlloc/ 10 ** 18, 30000000);
    assert.equal(costsAlloc/ 10 ** 18, 20000000);
  });

  it('Should change Owner account from accoutns[0] to accounts[9]', async () => {

    let ownernow = await this.Crowdhold.owner.call();
    assert.equal(ownernow, accounts[0]);
    let chnagOwnerAccount = await this.Crowdhold.setOwner(accounts[9]);
    let ownerAccountNow = await this.Crowdhold.owner.call();
    assert.equal(ownerAccountNow, accounts[9]);

  });

  it('Should change Owner account from accoutns[9] to accounts[0]', async () => {

    let ownernow = await this.Crowdhold.owner.call();
    assert.equal(ownernow, accounts[9]);
    let chnagOwnerAccount = await this.Crowdhold.setOwner(accounts[0]);
    let ownerAccountNow = await this.Crowdhold.owner.call();
    assert.equal(ownerAccountNow, accounts[0]);

  });

  it('Should change cost allocation token account from accounts[0] to accounts[1]', async () => {

    let costWalletnow = await this.Crowdhold.teamsWallet.call();
    assert.equal(costWalletnow, accounts[0]);
    let changeCostWallet = await this.Crowdhold.setCostsWallet(accounts[1]);
    let costWalletnow1 = await this.Crowdhold.costsWallet.call();
    assert.equal(costWalletnow1, accounts[1]);

  });

  it('Should change Team allocation token account from accoutns[0] to accounts[2]', async () => {

    let teamsWalletnow = await this.Crowdhold.teamsWallet.call();
    assert.equal(teamsWalletnow, accounts[0]);
    let chnagTeamWallet = await this.Crowdhold.setTeamsWallet(accounts[2]);
    let teamsWalletnow1 = await this.Crowdhold.teamsWallet.call();
    assert.equal(teamsWalletnow1, accounts[2]);

  });

  it('Should change withdraw wallet account from accoutns[0] to accounts[3]', async () => {

    let teamsWalletnow = await this.Crowdhold.withdrawWallet.call();
    assert.equal(teamsWalletnow, accounts[0]);
    let chnagTeamWallet = await this.Crowdhold.setWithdrawWallet(accounts[3]);
    let teamsWalletnow1 = await this.Crowdhold.withdrawWallet.call();
    assert.equal(teamsWalletnow1, accounts[3]);

  });

  it('Should whitelist accounts[4] ', async () => {

    let whitelistCheckbefore = await this.Crowdhold.getWhitelistStatus(accounts[4]);
    assert.equal(whitelistCheckbefore, false);
    let whitelist = await this.Crowdhold.addToWhitelist(accounts[4]);
    let whitelistCheck = await this.Crowdhold.getWhitelistStatus(accounts[4]);
    assert.equal(whitelistCheck, true);
  });

  it('Should whitelist accounts[6] ', async () => {

    let whitelistCheckbefore = await this.Crowdhold.getWhitelistStatus(accounts[6]);
    assert.equal(whitelistCheckbefore, false);
    let whitelist = await this.Crowdhold.addToWhitelist(accounts[6]);
    let whitelistCheck = await this.Crowdhold.getWhitelistStatus(accounts[6]);
    assert.equal(whitelistCheck, true);
  });

  it('Should whitelist accounts[5] ', async () => {

    let whitelistCheckbefore = await this.Crowdhold.getWhitelistStatus(accounts[5]);
    assert.equal(whitelistCheckbefore, false);
    let whitelist = await this.Crowdhold.addToWhitelist(accounts[5]);
    let whitelistCheck = await this.Crowdhold.getWhitelistStatus(accounts[5]);
    assert.equal(whitelistCheck, true);
  });

  it('Should whitelist accounts[8] ', async () => {

    let whitelistCheckbefore = await this.Crowdhold.getWhitelistStatus(accounts[8]);
    assert.equal(whitelistCheckbefore, false);
    let whitelist = await this.Crowdhold.addToWhitelist(accounts[8]);
    let whitelistCheck = await this.Crowdhold.getWhitelistStatus(accounts[8]);
    assert.equal(whitelistCheck, true);
  });

  it('Should buy correct Tokens when manual tier is off accounts[4]', async () => {

    let tier1 = await this.Crowdhold.manualTiers.call();
    assert.equal(tier1, false);
    let balTokenbefore = await this.Crowdhold.balances.call(this.Crowdhold.address);
    assert.equal(balTokenbefore / 10 ** 18, 200000000);
    let bal1before = await this.Crowdhold.balances.call(accounts[4]);
    assert.equal(bal1before, 0);
    let buyTokens = await this.Crowdhold.buyTokens({from: accounts[4],value: web3.toWei("1", "ether")});
    let balTokenbAfter = await this.Crowdhold.balances.call(this.Crowdhold.address);
    //assert.equal(balTokenbAfter / 10 ** 18, 199998000);
    let bal1After = await this.Crowdhold.balances.call(accounts[4]);
    //console.log(bal1After/10**18);
    let tokenSold1 = await this.Crowdhold.tokensSold(0);
    //console.log(tokenSold1/10**18,'token sold in tier 1');
    let tokenSold2 = await this.Crowdhold.tokensSold(1);
    //console.log(tokenSold2/10**18,'token sold in tier 2');
    let tokenSold3 = await this.Crowdhold.tokensSold(2);
    //console.log(tokenSold3/10**18,'token sold in tier 3');

  });

  it('Should buy correct Tokens when manual tier is off accounts[5]', async () => {

    let tier1 = await this.Crowdhold.manualTiers.call();
    assert.equal(tier1, false);
    let bal1before = await this.Crowdhold.balances.call(accounts[5]);
    assert.equal(bal1before, 0);
    let buyTokens = await this.Crowdhold.buyTokens({from: accounts[5],value: web3.toWei("3", "ether")});
    let balTokenbAfter = await this.Crowdhold.balances.call(this.Crowdhold.address);
    let bal1After = await this.Crowdhold.balances.call(accounts[5]);
    //console.log(bal1After/10**18);
    let tokenSold1 = await this.Crowdhold.tokensSold(0);
    //console.log(tokenSold1/10**18,'token sold in tier 1');
    let tokenSold2 = await this.Crowdhold.tokensSold(1);
    //console.log(tokenSold2/10**18,'token sold in tier 2');
    let tokenSold3 = await this.Crowdhold.tokensSold(2);
    //console.log(tokenSold3/10**18,'token sold in tier 3');

  });

  it('Should buy correct Tokens when manual tier is off accounts[6]', async () => {

    let tier1 = await this.Crowdhold.manualTiers.call();
    assert.equal(tier1, false);
    let bal1before = await this.Crowdhold.balances.call(accounts[6]);
    assert.equal(bal1before, 0);
    let buyTokens = await this.Crowdhold.buyTokens({from: accounts[6],value: web3.toWei("6", "ether")});
    let balTokenbAfter = await this.Crowdhold.balances.call(this.Crowdhold.address);
    //assert.equal(balTokenbAfter / 10 ** 18, 199998000);
    let bal1After = await this.Crowdhold.balances.call(accounts[6]);
    //console.log(bal1After/10**18);
    //assert.equal(bal1After / 10 ** 18, 2000);
    let tierLimit = await this.Crowdhold.getTierLimit(0);
    //console.log(tierLimit/10**18,'Tier limit 1');
    let tierLimit2 = await this.Crowdhold.getTierLimit(1);
    //console.log(tierLimit2/10**18,'Tier limit 2');
    let tierLimit3 = await this.Crowdhold.getTierLimit(2);
    //console.log(tierLimit3/10**18,'Tier limit 3');
    let tokenSold1 = await this.Crowdhold.tokensSold(0);
    //console.log(tokenSold1/10**18,'token sold in tier 1');
    let tokenSold2 = await this.Crowdhold.tokensSold(1);
    //console.log(tokenSold2/10**18,'token sold in tier 2');
    let tokenSold3 = await this.Crowdhold.tokensSold(2);
    //console.log(tokenSold3/10**18,'token sold in tier 3');

  });

  it('pause and get sale status', async () => {

    let pause = await this.Crowdhold.pauseSale();
    let pauseStatus = await this.Crowdhold.enableSale.call();
    assert.equal(pauseStatus, false);

  });

  it('unpause and get sale status', async () => {

    let pause = await this.Crowdhold.unPauseSale();
    let pauseStatus1 = await this.Crowdhold.enableSale.call();
    assert.equal(pauseStatus1, true);
    //console.log(pauseStatus1);
  });

  it('Should Burn tokens', async () => {

    let bal = await this.Crowdhold.balances.call(accounts[4]);
    //console.log(bal/10**18);
    let burn = await this.Crowdhold.burn(accounts[4],web3.toHex(1000000000000000000));
    let bal1 = await this.Crowdhold.balances.call(accounts[4]);
    //console.log(bal1/10**18);

  });

  it('Should not Burn Negative tokens', async () => {

    try {
      let bal = await this.Crowdhold.balances.call(accounts[4]);
      //console.log(bal.toNumber());
      let burn = await this.Crowdhold.burn(accounts[4], -1, {
        from: accounts[0]
      });
      let bal1 = await this.Crowdhold.balances.call(accounts[4]);
      //console.log(bal1.toNumber());


    } catch (error) {
      var error_ = 'Returned error: VM Exception while processing transaction: revert Not enough tokens in account to burn -- Reason given: Not enough tokens in account to burn.';
      assert.equal(error.message, error_, 'Token ammount');
    }

  });
  it('Should remove whitelisted accounts[1] ', async () => {


    let whitelistCheck = await this.Crowdhold.getWhitelistStatus(accounts[4]);
    assert.equal(whitelistCheck, true);
    let whitelist = await this.Crowdhold.removeFromWhitelist(accounts[4], {
      from: accounts[0]
    });
    let whitelistCheck1 = await this.Crowdhold.getWhitelistStatus(accounts[4]);
    assert.equal(whitelistCheck1, false);
  });

  it("should Approve address to spend specific token ", async () => {

    let bal12 = await this.Crowdhold.balances.call(accounts[4]);
    //console.log(bal12.toNumber()/10**18);
    this.Crowdhold.approve(accounts[5], web3.toHex(1000000000000000000),{from: accounts[4]});
    let allowance = await this.Crowdhold.allowance.call(accounts[4], accounts[5]);
    //console.log(allowance.toNumber()/10**18,'account 4 to 5');
    assert.equal(allowance, 1000000000000000000, "allowance is wrong when approve");

  });

  it("should not Approve address to spend negative tokens ", async () => {

    this.Crowdhold.approve(accounts[6], web3.toHex(-1000000000000000000), {from: accounts[4]});
    let allowance = await this.Crowdhold.allowance.call(accounts[4], accounts[6]);
    //console.log(allowance.toNumber() / 10 ** 18,'allowance account 4 to 6');
  });

  it("should not be able to transfer negative approved tokens ", async () => {

   try{ let balacctbefore = await this.Crowdhold.balances.call(accounts[6]);
    //console.log(balacctbefore.toNumber() / 10 ** 18,'balance of accounts[6] before');
    this.Crowdhold.transferFrom(accounts[4], accounts[6], web3.toHex(1999000000000000000000),{from: accounts[6]});
    //let allowance = await this.Crowdhold.allowance.call(accounts[4], accounts[6]);
    //console.log(allowance.toNumber() / 10 ** 18);
    //let balacct = await this.Crowdhold.balances.call(accounts[6]);
    //console.log(balacct.toNumber() / 10 ** 18,'balance of accounts[6]');
  }catch(error)
    {
      var error_ = 'VM Exception while processing transaction: revert';
      assert.equal(error.message, error_, 'Token ammount');

    }
  });


})