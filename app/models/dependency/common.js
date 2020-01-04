const abiContent = 
	'[{"name":"Transactions","constant":false,"inputs":[],"outputs":[],"type":"constructor"},{"name":"$Transfer","constant":false,"inputs":[],"outputs":[],"type":"function"},{"name":"addGrade","constant":true,"inputs":[{"name":"data","type":"string","indexed":false}],"outputs":[],"type":"function"},{"name":"subGrade","constant":true,"inputs":[{"name":"data","type":"string","indexed":false}],"outputs":[],"type":"function"},{"name":"setFileHash","constant":true,"inputs":[{"name":"hash","type":"string","indexed":false}],"outputs":[],"type":"function"},{"name":"GetTransState","constant":true,"inputs":[],"outputs":[{"name":"output","type":"bool","indexed":false}],"type":"function"},{"name":"SetTrans","constant":false,"inputs":[],"outputs":[],"type":"function"},{"name":"WithdrawToSys","constant":false,"inputs":[{"name":"amount","type":"uint256","indexed":false}],"outputs":[],"type":"function"},{"name":"FinishTrans","constant":false,"inputs":[],"outputs":[],"type":"function"},{"name":"EVENT_SETTRANS","anonymous":false,"inputs":[{"name":"from","type":"address","indexed":true},{"name":"price","type":"uint256","indexed":false},{"name":"time","type":"uint64","indexed":false}],"type":"event"},{"name":"EVENT_BUY","anonymous":false,"inputs":[{"name":"sys","type":"address","indexed":true},{"name":"user","type":"address","indexed":false},{"name":"price","type":"uint256","indexed":false},{"name":"time","type":"uint64","indexed":false}],"type":"event"},{"name":"EVENT_SUCCESS","anonymous":false,"inputs":[{"name":"sys","type":"address","indexed":true},{"name":"user","type":"address","indexed":false},{"name":"price","type":"uint256","indexed":false},{"name":"time","type":"uint64","indexed":false}],"type":"event"}]';
const contractAddress = "0x597ec47fa348d30e42377d08f663dd1e2eb1257f";
var url = "https://hubscan.vnt.link/rpc";
const CommonData = {
	abi:abiContent,
	contractAddr:contractAddress,
	url:url
}

module.exports = CommonData;
