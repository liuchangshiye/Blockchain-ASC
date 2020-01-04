var amodel = require("../models/accountModel.js");
var express = require('express');
var router = express.Router();

//import
var Vnt = require("vnt");
let vnt = new Vnt();
var vntKit = require("vnt-kit");
var Tx = require("ethereumjs-tx").Transaction;
let Cm=require("ethereumjs-common").default
//commonData
const abiContent ='[{"name":"Transactions","constant":false,"inputs":[],"outputs":[],"type":"constructor"},{"name":"getFileHash","constant":true,"inputs":[],"outputs":[{"name":"output","type":"string","indexed":false}],"type":"function"},{"name":"GetTransState","constant":true,"inputs":[],"outputs":[{"name":"output","type":"bool","indexed":false}],"type":"function"},{"name":"SetTrans","constant":false,"inputs":[],"outputs":[],"type":"function"},{"name":"FinishTrans","constant":false,"inputs":[],"outputs":[],"type":"function"},{"name":"$Transfer","constant":false,"inputs":[],"outputs":[],"type":"function"},{"name":"getGrade","constant":true,"inputs":[],"outputs":[{"name":"output","type":"string","indexed":false}],"type":"function"},{"name":"setGrade","constant":false,"inputs":[{"name":"data","type":"string","indexed":false}],"outputs":[],"type":"function"},{"name":"setFileHash","constant":false,"inputs":[{"name":"hash","type":"string","indexed":false}],"outputs":[],"type":"function"},{"name":"WithdrawToSys","constant":false,"inputs":[{"name":"amount","type":"uint256","indexed":false}],"outputs":[],"type":"function"},{"name":"EVENT_SUCCESS","anonymous":false,"inputs":[{"name":"sys","type":"address","indexed":true},{"name":"user","type":"address","indexed":false},{"name":"price","type":"uint256","indexed":false},{"name":"time","type":"uint64","indexed":false}],"type":"event"},{"name":"EVENT_SETTRANS","anonymous":false,"inputs":[{"name":"from","type":"address","indexed":true},{"name":"price","type":"uint256","indexed":false},{"name":"time","type":"uint64","indexed":false}],"type":"event"},{"name":"EVENT_BUY","anonymous":false,"inputs":[{"name":"sys","type":"address","indexed":true},{"name":"user","type":"address","indexed":false},{"name":"price","type":"uint256","indexed":false},{"name":"time","type":"uint64","indexed":false}],"type":"event"}]'
const contractAddr = "0x561ed5aee0795bb2213b30911b7f0a1d006ff211";
const url='https://hubscan.vnt.link/rpc'; //rpc地址，就是测试网上那三个8880端口的
const CommonData = {
    abi:abiContent,
    contractAddr:contractAddr,
    url:url
}

const abi=JSON.parse(CommonData.abi);
vnt.setProvider(new vnt.providers.HttpProvider(CommonData.url)); //链接到rpc
//search
const GPC =()=>{
    let contract = vnt.core.contract(abi).at(CommonData.contractAddr); 
    let r
    try{
        r = contract.getFileHash.call({from: ""});  
    }
    catch(e){
        return 
    }
}

const search=()=>{    
    return (()=>{ 
        return GPC()
    }).call()
}
//send
async function SendData(funct,list,value)
{
    let contract = vnt.core.contract(JSON.parse(CommonData.abi));
    let data = contract.packFunctionData(funct,list);
    keystore='{"version":3,"id":"b7769f1a-5312-421f-897f-6e8dc9a5fbf5","address":"474f5d3c2ee33b49e3011c5279eec97174b0b0a9","crypto":{"ciphertext":"4e02516232f6dfea2ae7e650df956ddb2b958a3f2429a8db41896da27a9f6d23","cipherparams":{"iv":"8e231c2ec89e1ebd46f61ee151273830"},"cipher":"aes-128-ctr","kdf":"scrypt","kdfparams":{"dklen":32,"salt":"a94e2de0b435159b9e7c30d24f6dc146f247dde819ae1fccb9001fa825e86fca","n":262144,"r":8,"p":1},"mac":"1f09574a852f8aeb4d2d6a4663cd5d109a03bfcbb48b6070fea359dd58a04f3e"}}'
    pass="quan176235"
    let account
    try{
        account=vntKit.account.decrypt(keystore,pass, false);
        console.log(account.privateKey);
        console.log(account.address);
    }
    catch(e){
        console.log("send::SendData:unlock fail")
        console.log("发送失败！账户尚未解锁，请解锁后再试。");
        return
    }
    let nonce = vnt.core.getTransactionCount(account.address);
    let options = {
        to: CommonData.contractAddr,
        nonce: vnt.toHex(nonce),
        gasPrice: vnt.toHex(3000000000000),
        gasLimit: vnt.toHex(4000000),
        value: vnt.toWei(value),
        data: data
     }
    let chain=Cm.forCustomChain(1,{name:'testnet',networkId:2,chainId:2,url:CommonData.url},'petersburg'); 
    let tx = new Tx(options,{common: chain});
    tx.sign(Buffer.from(account.privateKey.substring(2,),"hex"));
    let serializedTx = tx.serialize();
    vnt.core.sendRawTransaction('0x' + serializedTx.toString('hex'),(err,txHash)=>{ 
        if(err) {
            console.log("err happedned: ",err);
            console.log("发送失败！不定错误，请联系客服处理。");
        }  
        else { 
            console.info("err:",err,"txHash:",txHash);
            var txHash = txHash;
            console.log("发送成功！交易号：" + txHash + "。");
        }
    })
   
}

const send=(funct,list,value)=>{
    (()=>{ 
      SendData(funct,list,value)
    }).call()
}


const ipfsFile = require('../models/ipfsFile');
const fs = require('fs');
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get("/index", function (req, res) {
    res.render("index");
});
/*router.get("/models", function(req, res) {
  res.render("../models");
});*/
router.get("/upload", function (req, res) {
  res.render("upload");
});

router.post("/api1", function (req, res) {
  Send("addGrade",[grade],0);
});
router.post("/api2", function (req, res) {
  Send("subGrade",[grade],0);
});
router.post("/api3", function (req, res) {
  Send("setFileHash",[req.body.hash],0);
});
router.post("/api4", function (req, res) {
  Send("Transfer",[],10000000000000000000);
});

router.get("/auditmanage", function (req, res) {
  res.render("auditmanage");
});
router.get("/profileuser", function (req, res) {
  let sql="select count()"
  res.render("profileuser");
});
router.get("/profileauditor", function (req, res) {
  console.log("token.address!"+req.session.token.address);
  res.render("profileauditor");
});

router.post("/userfile", function (req, res) {
  amodel.getuploadnumber(req,function(err,ret){
    console.log("This is ret!");
    console.log(ret);
    res.send(ret);
  });
});
router.post("/auditorfile", function (req, res) {
  amodel.getuploadnumber2(req,function(err,ret){
    console.log("This is ret!");
    console.log(ret);
    res.send(ret);
  });
});
router.post("/upload1", function (req, res) {
  amodel.upload1(req,function(err,ret){
    console.log("This is ret1111111!");
    console.log(ret);
    res.send(ret);
  });
});
router.post("/upload2", function (req, res) {
  amodel.upload1(req,function(err,ret1){
    console.log("This is ret122222222!");
    console.log(ret1);
    res.send(ret1);
  });
});

router.post("/upload3", function (req, res) {
  amodel.upload1(req,function(err,ret2){
    console.log("This is ret3333333!");
    console.log(ret2);
    res.send(ret2);
  });
});

router.post("/audit_upload1", function (req, res) {
  amodel.audit_upload1(req,function(err,ret){
    console.log("auditupload!!!!!!!!");
    console.log(ret);
    res.send(ret);
  });
});


router.post("/last_report", function (req, res) {
amodel.last_report(req,function(err,ret){
  if (err) {
    console.log(err);
    res.send({ status: -1 }).end(); //服务器异常
  } else {
    // var data = {
    //   'hash': ret
    // };
    console.log("111111111111111151111111111111");
    console.log(ret);
    res.send(ret);
}
});
}),
router.post("/result", function (req, res) {
  console.log("Dasdasdashdafhkufhwailhflanl;");
  amodel.auditor_upload_report(req,function(err,ret){
    console.log("2lcsszzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz");
    if (err) {
      console.log(err);
      res.send({ status: -1 }).end(); //服务器异常
    } else {
      // res.end();
      console.log("lcsszzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz");
      console.log(ret);
      send("setGrade",["100"],0)
      // res.send(ret);
  }
  });
  }),
  router.post("/hash", function (req, res) {
        console.log("modify the result successfully!");
        amodel.get_hash(req, function (err, ret)
        {
          console.log(ret[0][0]['hash']);
          res.send(ret[0][0]['hash']);
        });

    
    });
router.post("/index", function (req, res) {
  
  amodel.isaccount(req, function (err, ret) {
    var token={
      address:req.body.address,
        orderr:undefined
    }
    if(ret==0)
    {
    amodel.modify_user(req,function(err,ret1){
      token.orderr=ret1;
      //req.session.token.order=ret1;
      console.log(req.session.token);
    });
  }
    else
    {
      amodel.modify_auditor(req,function(err,ret2){
      token.orderr=ret2;
      //req.session.token.order=ret2;
      console.log(req.session.token);
    });}
    if (err) {
      console.log(err);
      res.send({ status: -1 }).end(); //服务器异常
    } else {
      //console.log(ret);
      //console.log(ret[0])

      console.log("token.address!"+token.address);
      req.session.token=token;
      var data = {
        'flag': ret
      };
      console.log("token!");
      console.log(req.session.token);

      //console.log("123213");
      //console.log(data);
      res.send(data);
      // res.render("index", {
      //   flag:ret
      // });
      //console.log("12312312"+flag);
    }
  });
  
}),

router.post("/upload", function (req, res) {
  console.log("aasd");
  //console.log("token!"+req.session.token.address)
  console.log(req.body.path);
   let addPath = req.body.path;
  let buff = fs.readFileSync(addPath);
  console.log("2");
  console.log(buff);
  var hash=new String('');
  //console.log("hash!"+hash);
  //console.log("hash!modified!"+hash.replace(/\"/g,"'"));
  ipfsFile.add(buff).then((hash) => {
    req.body.hash=hash;
    console.log(req.body.hash)
    amodel.store_hash(req, function (err, ret1){
    });
    console.log("send the file!");
    send("setFileHash",[req.body.hash],0)
    setTimeout(()=>{console.log(search())},4000)
    amodel.distribute(req, function (err, ret2){

    });
    
  }).then((buff) => {
    console.log("4");
    fs.writeFileSync(addPath, buff);
    console.log("file:" + addPath);
  }).catch((err) => {
    console.log(err);
  })
//  hash= hash;
  var data={
    hash:hash
  }
  console.log("upload.finish");
  res.send(data);
  res.end();
}),

module.exports = router;
