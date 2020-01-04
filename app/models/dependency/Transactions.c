#include "vntlib.h"

// 系统
KEY address sys;
// 用户
KEY address user;
// 审计人员
KEY address auditor;
// 用户需要转账的金额
KEY uint256 price;
// 是否初始化过交易
bool initTrans;
// 系统是否允许交易
bool sysAllowed;
// 用户是否允许交易
bool userAllowed;
// 交易是否成功
bool transSuccess;
//用户积分
KEY string grade;
//文件的hash值
KEY string FileHash;
var common = require("../models/dependency/common.js");
var send = require("../models/dependency/send.js");
var transcation = require("../models/dependency/Transactions/Transactions.abi");
var common = require("../models/dependency/common.js");
var send = require("../models/dependency/send.js");
var transcation = require("../models/dependency/Transactions/Transactions.abi");e);
EVENT EVENT_BUY(indexed address sys, address user, uint256 price, uint64 time);
EVENT EVENT_SUCCESS(indexed address sys, address user, uint256 price, uint64 time);

// 构造函数
constructor Transactions()
{
    sys = GetSender();
    initTrans = false;
    sysAllowed = false;
    userAllowed = false;
    transSuccess = false;
    grade = 0;
    FileHash = "";
}

UNMUTABLE
void addGrade(string data)
{
    grade = SHA3(data);
}

UNMUTABLE
void subGrade(string data)
{
    grade = SHA3(data);
}

UNMUTABLE
void setFileHash(string hash)
{
    FileHash = hash;
}

// 以下函数是system调用的
// 获取交易状态信息
UNMUTABLE
bool GetTransState()
{
    return transSuccess;
}

// 检验交易是否结束
void checkTransState()
{
    Require(transSuccess == false, "The transaction has ended successfully");
}

// 检验交易是否初始化
void checkinitTrans()
{
    Require(initTrans == true, "No initiation for the transaction");
}

// 初始化设置交易
MUTABLE
void SetTrans()
{
    checkTransState();
    Require(initTrans == false, "The transaction has been initiated");
    initTrans = true;
    sysAllowed = true;
    uint64 time = GetTimestamp();
    EVENT_SETTRANS(sys, price, time);
}

// 以下的几个函数都是用户调用
// 检验转账是否足够
void checkContract(uint256 amount)
{
    uint256 contractBalance = GetBalanceFromAddress(GetContractAddress());
    Require(U256_Cmp(contractBalance, amount) != -1, "The money is not enough");
}

// 向system转账
MUTABLE
void WithdrawToSys(uint256 amount)
{
    checkContract(amount);
    TransferFromContract(sys, amount);
}

// 完成交易
MUTABLE
void FinishTrans()
{
    Require(sysAllowed == true, "The transaction is not allowed by the sys");
    Require(userAllowed == true, "The transaction is not allowed by the user");
    Require(Equal(user, sys) == false, "The system can't by his own patent");
    uint256 amount = GetBalanceFromAddress(GetContractAddress());
    Require(U256_Cmp(amount, price) != -1, "The money is not enough");
    WithdrawToSys(price);
    transSuccess = true;
    uint64 time = GetTimestamp();
    EVENT_SUCCESS(sys, user, price, time);
}

// 用户转账并且允许交易
MUTABLE
void $Transfer()
{
    checkTransState();
    address sender = GetSender();
    Require(Equal(sender, sys) == false, "The system can't by his own patent");
    Require(sysAllowed == true, "The transaction is not allowed by the system");
    uint256 amount = GetValue();        //转账值
    Require(U256_Cmp(amount, price) != -1, "The money is not enough");
    user = sender;
    amount = U256SafeSub(amount, price);
    SendFromContract(user, amount);
    userAllowed = true;
    uint64 time = GetTimestamp();
    EVENT_BUY(sys, user, price, time);
    FinishTrans();
}