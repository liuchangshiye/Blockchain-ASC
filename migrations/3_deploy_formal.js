const FormalVerification = artifacts.require("FormalVerification");

module.exports = function(deployer) {
  deployer.deploy(FormalVerification);
};
