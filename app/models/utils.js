//util.js用来存放一些公共的处理函数

let utils = {};

//解决数据库时区问题，得到东8区的时间（原时区0）
utils.formatDate = (date) => {
	let  y  =  date.getFullYear();      
	let  m  =  date.getMonth()  +  1;      
	m  =  m  <  10  ?  ('0'  +  m)  :  m;      
	let  d  =  date.getDate();      
	d  =  d  <  10  ?  ('0'  +  d)  :  d;      
	let  h  =  date.getHours();      
	let  minute  =  date.getMinutes();
	let second = date.getSeconds(); 
	minute  = minute  < 10  ? ('0'  + minute)  :  minute;
	second = second < 10 ? ('0' + second) : second;
	return  y  +  '-'  +  m  +  '-'  +  d + ' ' + h + ':' + minute + ":" + second;
}


//随机字符串
utils.randomString = (len) => {
　　len = len || 32;
　　let $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
　　let maxPos = $chars.length;
　　let pwd = '';
　　for (i = 0; i < len; i++) {
　　　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
　　}
　　return pwd;
}

//生成交易流水号
utils.createDealRecord = () => {
	const now = new Date();
	let month = now.getMonth() + 1;
	let day = now.getDate();
	let hour = now.getHours();
	let minutes = now.getMinutes();
	let seconds = now.getSeconds();
	month = month < 10 ? ('0' + month) : month;
	day = day < 10 ? ('0' + day) : day;
	hour = hour < 10 ? ('0' + hour) : hour;
	minutes = minutes < 10 ? ('0' + minutes) : minutes;
	seconds = seconds < 10 ? ('0' + seconds) : seconds;
	let res = now.getFullYear().toString() + month.toString() + day + hour + 
		minutes + seconds + (Math.round(Math.random() * 23 + 100)).toString();
	return res;
}


module.exports = utils;