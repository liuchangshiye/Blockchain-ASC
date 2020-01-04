#include "vntlib.h"

         
KEY address sys;
         
KEY address user;
               
KEY address auditor;
                              
KEY uint256 price;
                           
bool initTrans;
                           
bool sysAllowed;
                           
bool userAllowed;
                     
bool transSuccess;
              
KEY string grade;
                  
KEY string FileHash;

EVENT EVENT_SETTRANS(indexed address from, uint256 price, uint64 time);
EVENT EVENT_BUY(indexed address sys, address user, uint256 price, uint64 time);
EVENT EVENT_SUCCESS(indexed address sys, address user, uint256 price, uint64 time);

               

void keyjyo6zmc4(){
AddKeyInfo( &grade, 6, &grade, 9, false);
AddKeyInfo( &FileHash, 6, &FileHash, 9, false);
AddKeyInfo( &sys, 7, &sys, 9, false);
AddKeyInfo( &user, 7, &user, 9, false);
AddKeyInfo( &auditor, 7, &auditor, 9, false);
AddKeyInfo( &price, 5, &price, 9, false);
}
constructor Transactions()
{
keyjyo6zmc4();
InitializeVariables();
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
keyjyo6zmc4();
    grade = SHA3(data);
}

UNMUTABLE
void subGrade(string data)
{
keyjyo6zmc4();
    grade = SHA3(data);
}

UNMUTABLE
void setFileHash(string hash)
{
keyjyo6zmc4();
    FileHash = hash;
}

                                 
                           
UNMUTABLE
bool GetTransState()
{
keyjyo6zmc4();
    return transSuccess;
}

                           
void checkTransState()
{
    Require(transSuccess == false, "The transaction has ended successfully");
}

                              
void checkinitTrans()
{
    Require(initTrans == true, "No initiation for the transaction");
}


                        
MUTABLE
void SetTrans()
{
keyjyo6zmc4();
    checkTransState();
    Require(initTrans == false, "The transaction has been initiated");
    initTrans = true;
    sysAllowed = true;
    uint64 time = GetTimestamp();
    EVENT_SETTRANS(sys, price, time);
}

                                          
                           
void checkContract(uint256 amount)
{
    uint256 contractBalance = GetBalanceFromAddress(GetContractAddress());
    Require(U256_Cmp(contractBalance, amount) != -1, "The money is not enough");
}

                  
MUTABLE
void WithdrawToSys(uint256 amount)
{
keyjyo6zmc4();
    checkContract(amount);
    TransferFromContract(sys, amount);
}

               
MUTABLE
void FinishTrans()
{
keyjyo6zmc4();
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

                                 
MUTABLE
void $Transfer()
{
keyjyo6zmc4();
    checkTransState();
    address sender = GetSender();
    Require(Equal(sender, sys) == false, "The system can't by his own patent");
    Require(sysAllowed == true, "The transaction is not allowed by the system");
    uint256 amount = GetValue();                   
    Require(U256_Cmp(amount, price) != -1, "The money is not enough");
    user = sender;
    amount = U256SafeSub(amount, price);
    SendFromContract(user, amount);
    userAllowed = true;
    uint64 time = GetTimestamp();
    EVENT_BUY(sys, user, price, time);
    FinishTrans();
}
