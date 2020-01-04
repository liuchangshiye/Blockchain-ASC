// import CommonData from "./common.js"
// import Vnt from "vnt"
// import vntKit from "vnt-kit"
// import {Transaction as Tx} from "ethereumjs-tx"

var common = require("./common");
var Vnt = require("vnt");
var vntKit = require("vnt-kit");
var tx = require("ethereumjs-tx");


let Cm=require("ethereumjs-common").default
let vnt = new Vnt();
// console.log(common.url);
vnt.setProvider(new vnt.providers.HttpProvider(common.url)); //链接到rpc
async function SendData(funct,list,value)
{
    let contract = vnt.core.contract(JSON.parse(common.abi));
    let data = contract.packFunctionData(funct,list);
    if(window.vnt!==undefined){
        window.vnt.core.sendTransaction({
            from: window.vnt.core.coinbase,
            to: common.contractAddress,
            gasPrice: 30000000000000,
            gasLimit: 4000000,
            data: data,
            value: vnt.toWei(value)
          },function(err,txHash){
              if (err) {
                console.log("err happedned: ",err);
                alert("发送失败！请在插件上通过交易。");
              } else {
                var txHash = txHash;
                alert("发送成功！交易号：" + txHash + "。");
              }
    
          })
        return;
    }
    let userState=JSON.parse(localStorage.getItem("userState"))
    let account
    try{
        account=vntKit.account.decrypt(userState.userName,userState.password, false);
    }
    catch(e){
        console.log("send::SendData:unlock fail")
        alert("发送失败！账户尚未解锁，请解锁后再试。");
        return
    }
    let nonce = vnt.core.getTransactionCount(account.address);
    let options = {
        to: common.contractAddress,
        nonce: vnt.toHex(nonce),
        gasPrice: vnt.toHex(30000000000000),
        gasLimit: vnt.toHex(4000000),
        value: vnt.toWei(value),
        data: data,
        chainId:2
     }
    let chain=Cm.forCustomChain(1,{name:'testnet',networkId:2,chainId:2,url:common.url},'petersburg'); 
    //let tx = new Tx(options,{common: chain});
    tx.sign(Buffer.from(account.privateKey.substring(2,),"hex"));
    let serializedTx = tx.serialize();
    vnt.core.sendRawTransaction('0x' + serializedTx.toString('hex'),(err,txHash)=>{ 
        if(err) {
            console.log("err happedned: ",err);
            alert("发送失败！不定错误，请联系客服处理。");
        }  
        else { 
            console.info("err:",err,"txHash:",txHash);
            var txHash = txHash;
            alert("发送成功！交易号：" + txHash + "。");
        }
    })
   
}

const send=(funct,list,value)=>{
    (()=>{ 
    SendData(funct,list,value)
    }).call()
}

//module.exports = send;
export Send;