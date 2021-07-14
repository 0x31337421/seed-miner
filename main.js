#! /usr/bin/env node
const ethers = require('ethers');
const chalk = require('chalk');

const target = process.argv[2].toLowerCase();
const averageAttempt = 16 ** target.length;
let tries = averageAttempt;
let stillTrying = true;
let wallet;

function run() {
  while(stillTrying){
    console.clear();
    console.log(`Attempt ${chalk.blue(tries)}: Finding ${chalk.green.bold(target)}`)
    wallet = ethers.Wallet.createRandom();
    
    if(match(target, wallet)){
      console.log(`0x${chalk.red.bold(splitAddress(target, wallet))}${wallet.address.substring(target.length + 2)}}`)
      console.log(wallet.mnemonic)
      stillTrying = false
    }
    tries --;
  }
}

const splitAddress = (_target, _wallet) => {
  return _wallet.address.substring(2, _target.length + 2)
}

const match = (_target, _wallet) => {
  const address = splitAddress(_target, _wallet).toLowerCase();
  return (address == _target) ? true : false;
}

run();
