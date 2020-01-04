var Vnt = require("vnt")
var vntKit = require("vnt-kit")
var Cm = require("ethereumjs-common").default
var Tx = require("ethereumjs-tx").Transaction

var vnt = new Vnt();
vnt.setProvider(new vnt.providers.HttpProvider("https://hubscan.vnt.link/rpc"));	//链接到rpc地址

var keystore = '{"version":3,"id":"8b3da4b6-1276-4d79-9b4a-9394996aea44","address":"f0f5acaab770a9443b6c239fc1b3a19061db4098","crypto":{"ciphertext":"bc76fe4f794e47404e3993aa40e68eaf68cced214b51146042ae8c73e0a85740","cipherparams":{"iv":"202fe3ad6b8766141f4d33d5e82fc16d"},"cipher":"aes-128-ctr","kdf":"scrypt","kdfparams":{"dklen":32,"salt":"d59507513dbf6999489ee1010e191e78512fe09a1efc7d17f0ceead99df63a13","n":262144,"r":8,"p":1},"mac":"d0dc49d77c7ab4e5829521a1d2701df5464178cede24bd374cd6e1ec33062fbb"}}'
var pass = "lcs170736"

var codeFile = '/home/lcs/dependency/Transactions/Transactions.compress'		//定义代码路径
var abiFile = '/home/lcs/dependency/Transactions/Transactions.abi'			//定义abi路径
var wasmabi = '[{"name":"Transactions","constant":false,"inputs":[],"outputs":[],"type":"constructor"},{"name":"$Transfer","constant":false,"inputs":[],"outputs":[],"type":"function"},{"name":"addGrade","constant":true,"inputs":[{"name":"data","type":"string","indexed":false}],"outputs":[],"type":"function"},{"name":"subGrade","constant":true,"inputs":[{"name":"data","type":"string","indexed":false}],"outputs":[],"type":"function"},{"name":"setFileHash","constant":true,"inputs":[{"name":"hash","type":"string","indexed":false}],"outputs":[],"type":"function"},{"name":"GetTransState","constant":true,"inputs":[],"outputs":[{"name":"output","type":"bool","indexed":false}],"type":"function"},{"name":"SetTrans","constant":false,"inputs":[],"outputs":[],"type":"function"},{"name":"WithdrawToSys","constant":false,"inputs":[{"name":"amount","type":"uint256","indexed":false}],"outputs":[],"type":"function"},{"name":"FinishTrans","constant":false,"inputs":[],"outputs":[],"type":"function"},{"name":"EVENT_SETTRANS","anonymous":false,"inputs":[{"name":"from","type":"address","indexed":true},{"name":"price","type":"uint256","indexed":false},{"name":"time","type":"uint64","indexed":false}],"type":"event"},{"name":"EVENT_BUY","anonymous":false,"inputs":[{"name":"sys","type":"address","indexed":true},{"name":"user","type":"address","indexed":false},{"name":"price","type":"uint256","indexed":false},{"name":"time","type":"uint64","indexed":false}],"type":"event"},{"name":"EVENT_SUCCESS","anonymous":false,"inputs":[{"name":"sys","type":"address","indexed":true},{"name":"user","type":"address","indexed":false},{"name":"price","type":"uint256","indexed":false},{"name":"time","type":"uint64","indexed":false}],"type":"event"}]'

var abi=JSON.parse(wasmabi.toString("utf-8"));
var account = vntKit.account.decrypt(keystore, pass, false);

//这是合约创建主函数
function deployWasmContract() 
{
	// 通过abi与代码路径初始化合约
	var contract = vnt.core.contract(abi).codeFile(codeFile)
	// 生成合约创建的数据
	var data = contract.packContructorData()
	// 预估一个gas值
	var gas = vnt.core.estimateGas({data: data});
	// 获取账户的下一个nonce值
	var nonce = vnt.core.getTransactionCount(account.address);
	// 生成交易的结构体，指定nonce, gasPirce, gasLimit, value, data等字段
	var options = {
		nonce: vnt.toHex(nonce),
		gasPrice: vnt.toHex(30000000000000),
		gasLimit: vnt.toHex(gas),
		value: '0x00',
		data: data,
		//chainId: 1  //这里必须指定chainId，即你所连接的node的chainId，否则交易签名将出错
	}
	// 生成交易
	var chain=Cm.forCustomChain(1,{name:'testnet',networkId:2,chainId:2,url:'https://hubscan.vnt.link/rpc'},'petersburg'); 
	var tx = new Tx(options,{common: chain});
	// 使用之前准备好的私钥，对交易签名
	tx.sign(Buffer.from(account.privateKey.substring(2,), "hex"));
	// 将交易数据进行序列化
	var serializedTx = tx.serialize();
	// 发送交易
	vnt.core.sendRawTransaction('0x' + serializedTx.toString('hex'),(err,txHash)=>{
		if(err)
		{
			console.log("err happened:",err);
		}
	})
}

(()=>{ 
	deployWasmContract();
}).call();
