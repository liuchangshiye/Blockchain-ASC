pragma solidity >=0.4.17 <=0.6.0;
contract FormalVerification {

    address auditor;
    address user;
    address payable Beneficiary;
    uint timeOutLimit;
    mapping(address => uint) auditors;            // 审计人员的积分
    mapping(uint => string) reportHash;      // 审计人员的报告hash
    mapping(uint => uint) reportScore;            // 智能合约报告的分数(bytes可以是hash的字符串形式)

    constructor() public { 
        auditor = msg.sender;        // 审计人员 
        user = msg.sender;           // 用户
        timeOutLimit = 259200;       // 审计人员审核智能合约的时间为三天
        Beneficiary = 0x1EBD9225519E4549ad418c814951da2d84Ac6438;       //收款方的地址
    }


    function setReportScore(uint flag,uint reportFlag ,uint reportscore) public {          // 上链智能合约当前的分数
        require(flag == 1 && msg.sender == auditor,"Warning: You are not permitted!");
        reportScore[reportFlag] = reportscore;
    }

    function getReportScore(uint flag,uint reportFlag) public view returns(uint ret){
        require(flag == 1 && msg.sender == auditor,"Warning: You are not permitted!");
        ret = reportScore[reportFlag];
    }

    function setAuditScore(uint flag,uint currentScore) public {                 // 上链当前审计人员的新分数和当前审计报告的个数
        require(flag == 1 && msg.sender == auditor,"Warning: You are not permitted!");
        auditors[msg.sender] = currentScore;
    }

    function getAuditScore(uint flag) public view returns(uint ret){
        require(flag == 1 && msg.sender == auditor,"Warning: You are not permitted!");
        ret = auditors[msg.sender];
    }

    function setAuditorScore() public{
        auditors[0xf25bb2d9f47da0B0acA59f73d677E651Dd8aAf20] = 0;
        auditors[0x8f3cc6254AAE17815de13BbA0081C72476Db5abE] = 0;
        auditors[0x53C30f23c397eBE5811D5f0CE482938E0B7220ac] = 0;
        auditors[0x1242C0939a04A9d73C54907184C0D8f6A50D7c51] = 0;
        auditors[0x36344Fc242c2ac775B845262adA4B9F313f3329b] = 0;
    }

    function TimeOut(uint flag,uint period) public view returns(uint ret){            // 判断审计人员是否超时
        require(flag == 1 && msg.sender == auditor,"Warning: You are not permitted!");      // 审计人员
        if(period <= timeOutLimit){
            ret = 1;
        }
        else{
            ret = 2;
       }
    }

    function AfterAudit(uint flag,uint timeOut,uint count,string memory Hash) public {          // 审计人员提交后获得新的积分
        require(flag == 1 && msg.sender == auditor,"Warning: You are not permitted!");          // 审计人员
        reportHash[count] = Hash;                                             // 存储新审计的报告hash值
        if(timeOut == 2){                                                     // 判断是否超时，并计算新的积分
            auditors[msg.sender] += 50;
        }
        else{
            auditors[msg.sender] += 100;
        }
    }

    function getAuditorScore(uint flag) public view returns(uint ret){
        require(flag == 1 && msg.sender == auditor,"Warning: You are not permitted!");      // 审计人员
        ret = auditors[msg.sender];
    }

    function Transfer(uint flag) public payable {           // 用户在提交智能合约审计时转账
        require(flag == 0 && msg.sender == user,"Warning: You are not permitted!");
        require(user.balance >= 10000000000000000 wei,"Warning: Your account balance is insufficient.");
        Beneficiary.transfer(msg.value);
    }

    function getBalance() public view returns(uint ret){
        ret = msg.sender.balance;
    }
}