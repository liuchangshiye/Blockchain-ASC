let pool = require("./conn_pool");
let utils = require("./utils");

/*
* @功能: 数据库
* @作者: 刘长硕
*/

module.exports = {
  isaccount: async function (req, callback) {
    try {
      const conn = await pool.getConnection();
      let address = req.body.address;
      let checker_address_sql = "select address from checker;";
      let checker_address = await conn.query(checker_address_sql);
      let count_sql = "select count(*) from checker;"
      let count = await conn.query(count_sql);
      console.log(count);
      //console.log(req);
      // b=b.split("￥")[1];
      let i = 0;

      flag = req.body.flag;
      console.log("js.flag!");
      console.log(flag);
      flag = 0;
      // console.log(checker_address[0]);
      // console.log(checker_address[0][0]['address']);
      for (i = 0; i < count[0][0]['count(*)']; i++) {
        //console.log(i);
        if (address == checker_address[0][i]['address'])
          flag = 1;
      }
      console.log("Flag!");
      console.log(flag);
      //console.log(req.body.address);
      callback(undefined, flag);
      conn.release();
    } catch (err) {
      console.log("12321312312312312312");
      callback(err, undefined);
    }
  },

  modify_user: async function (req, callback) {
    try {
      console.log("modify_user");
      const conn = await pool.getConnection();
      let address = req.body.address;
      let modify_user_current_credit_sql = "select credit from user where address = '" + address + "';";
      let modify_user_current_credit = await conn.query(modify_user_current_credit_sql);
      let checker_sql = "select address from user;"
      let checker = await conn.query(checker_sql);
      let count_sql = "select count(*) from user;"
      let count = await conn.query(count_sql);
      let i = 0;
      i = parseInt(i);
      var order;
      var orderr;
      console.log(parseInt(count[0][0]['count(*)']));
      for (i = 0; i < parseInt(count[0][0]['count(*)']); i++) {
        console.log(i);
        if (checker[0][i]['address'] == address) {
          let sql = "select orderr from user where address ='" + address + "';";
          order = await conn.query(sql);
          break;
        }
      } console.log(parseInt(i));

      console.log(parseInt(i) + "==" + parseInt(count[0][0]['count(*)']));
      if (parseInt(i) == parseInt(count[0][0]['count(*)'])) {
        console.log("insert user!");
        let order_sql = "select max(orderr) from user where address = '" + address + "';";
        order = await conn.query(order_sql);
        console.log(order);
        orderr = order[0][0]['max(orderr)']
        if (orderr == "NaN")
          orderr = "";
        if (orderr == "")
          orderr = parseInt(1);
        else
          orderr += 1;
        console.log(orderr);
        let insert_user_sql = "insert into user values ('" + address + "' , '" + "-1" + "', " + orderr + ");";
        console.log(insert_user_sql);
        let insert_user = await conn.query(insert_user_sql);
      }
      let order_sql = "select max(orderr) from user where address = '" + address + "';";
      order = await conn.query(order_sql);

      orderr = order[0][0]['max(orderr)']
      conn.release();
      console.log("order!33333" + orderr);

      callback(undefined, orderr);
    } catch (err) {
      console.log(err);
      callback(err, undefined);
    }
  },

  modify_auditor: async function (req, callback) {
    try {
      let address = req.body.address;
      console.log("1111111111111111111111111");
      let sql = "select orderr from checker where address ='" + address + "';";
      order = await conn.query(sql);
      callback(undefined, order[0][0]['orderr']);
    }
    catch (err) {
      callback(err, undefined);
    }
  },



  result: async function (req, callback) {
    try {
      let hash = req.body.res;
      let address = req.session.token.address;
      const conn = await pool.getConnection();
      let hash_sql = "update file set item = '" + hash + "'where address = '" + address + "' and has";
      hash = await conn.query(hash_sql);
      console.log("hash!" + hash[0]);
      callback(undefined, hash[0][0][hash]);
      conn.release();

    } catch (err) {
      callback(err, undefined);
    }
  },
  // id : async function (req, callback) {
  //   try {
  //     const conn = await pool.getConnection();
  //     let address=ret.session.token.address;
  //     var flag=0;
  //     let checker_sql = "select address from user;"
  //     let checker = await conn.query(checker_sql);
  //     let count_sql = "select count(*) from user;"
  //     let count = await conn.query(count_sql);
  //     let i = 0;
  //     for (i = 0; i < count[0][0]['count(*)']; i++) {
  //       if (checker[0][i]['address'] == address) {

  //       }
  //     }

  //     let hash_sql = "insert into ";
  //     let hash = await conn.query(hash_sql);
  //     console.log("hash!"+hash[0]);
  //     callback(undefined,hash[0][0][hash]);
  //       conn.release();
  //   } catch (err) {
  //     callback(err, undefined);
  //   }
  // },
  store_hash: async function (req, callback) {
    try {
      const conn = await pool.getConnection();

      let address = req.session.token.address;
      let modify_user_current_credit_sql = "select credit from user where address = '" + address + "';";
      let modify_user_current_credit = await conn.query(modify_user_current_credit_sql);
      let orderr = req.session.token.order;
      current_credit = parseInt(modify_user_current_credit[0][0]['credit']) - 1;
      let modify_user_sql = "update user set credit = '" + current_credit + "' where address = '" + address + "';";
      //let modify_user_order_sql = "update user set orderr = '" + orderr + "' where address = '" + address + "';";
      //let modify_user_order = await conn.query(modify_user_order_sql);
      let modify_user = await conn.query(modify_user_sql);

      let hash = req.body.hash;
      address = req.session.token.address;
      let order_sql = "select orderr from user where address = '" + address + "';";
      let order = await conn.query(order_sql);
      let number_sql = "select max(number) from file where address = '" + address + "';";
      let number = await conn.query(number_sql);
      order = order[0][0]['orderr'];

      console.log("number--------------");
      number = number[0][0]['max(number)'];
      console.log(number);
      if (number == null) {
        console.log("111");
        number = "";
      }

      if (number == "") {
        number = 1;
        console.log("222");
      }
      else {
        console.log("333");

        number = parseInt(number);
        number = number + 1;
      }
      console.log("number " + number);
      let hash_sql = "insert into file values ( '" + order + "' ,'" + address + "' , '" + hash + "'," + number + ",0" + ",2 " + "); ";
      console.log(hash_sql);
      await conn.query(hash_sql);
      conn.release();
    } catch (err) {
      console.log("err" + err);
      callback(err, undefined);
    }
  },
  // modify_checker: async function (req, callback) {
  //   try {
  //     const conn = await pool.getConnection();
  //     let address = req.address;
  //     let modify_checker_current_credit_sql = "select credit from checker where address = '" + address + "';";
  //     let modify_checker_current_credit = await conn.query(modify_checker_current_credit_sql);
  //     modify_checker_current_credit += 10;

  //     let modify_checker_sql = "update checker set credit = '" + modify_checker_current_credit + "' where address = '" + address + "';";
  //     let modify_checker = await conn.query(modify_checker_sql);
  //     conn.release();
  //   } catch (err) {
  //     callback(err, undefined);
  //   }
  // }

  get_hash: async function (req, callback) {
    try {
      const conn = await pool.getConnection();
      let number = req.body.number;
      let hash_sql = "select hash from file where number = '" + number + "';";
      let hash = await conn.query(hash_sql);

      callback(undefined, hash);
      conn.release();
    } catch (err) {
      console.log("error" + err);
      callback(err, undefined);
    }
  },

  getuploadnumber: async function (req, callback) {
    try {
      const conn = await pool.getConnection();
      let address = req.session.token.address;


      let uploads_sql = "select count(*) from file where address = '" + address + "';";

      let pass_sql = "select count(*) from file where address = '" + address + "' and pass =  " + parseInt(1) + ";";
      console.log(uploads_sql);
      let uploads = await conn.query(uploads_sql);
      let pass = await conn.query(pass_sql);
      var passingrate;
      console.log(uploads[0][0]['count(*)']);
      if (parseInt(uploads[0][0]['count(*)']) == 0)
        passingrate = 0;
      else
        passingrate = (100 * parseInt(pass[0][0]['count(*)']) / parseInt(uploads[0][0]['count(*)'])).toFixed(2);
      var data = {
        uploads: uploads[0][0]['count(*)'],
        passingrate: passingrate
      }
      console.log(data);
      callback(undefined, data);
      conn.release();
    } catch (err) {
      console.log("error" + err);
      callback(err, undefined);
    }
  },

  getuploadnumber2: async function (req, callback) {
    try {
      const conn = await pool.getConnection();
      let address = req.session.token.address;

      let uploads_sql = "select count(*) from audit where address = '" + address + "';";
      let pass_sql = "select count(*) from audit where address = '" + address + "' and pass =  " + parseInt(1) + ";";
      let points_sql = "select credit from checker where address = '" + address + "';";
      console.log(uploads_sql);
      let uploads = await conn.query(uploads_sql);
      let pass = await conn.query(pass_sql);
      var passingrate;
      var points = await conn.query(points_sql);
      console.log(uploads[0][0]['count(*)']);
      if (parseInt(uploads[0][0]['count(*)']) == 0)
        passingrate = 0;
      else
        passingrate = (100 * parseInt(pass[0][0]['count(*)']) / parseInt(uploads[0][0]['count(*)'])).toFixed(2);
      var data = {
        uploads: uploads[0][0]['count(*)'],
        passingrate: passingrate,
        points: points[0][0]['credit']
      }
      console.log(data);
      callback(undefined, data);
      conn.release();
    } catch (err) {
      console.log("error" + err);
      callback(err, undefined);
    }
  },


  distribute: async function (req, callback) {
    try {
      const conn = await pool.getConnection();
      let number_sql = "select number from who";
      let number = await conn.query(number_sql);

      number = parseInt(number[0][0]['number']) + 1;
      let number_sql2 = "update who set number = '" + number + "';";
      await conn.query(number_sql2);
      number = parseInt(number) - 1;
      console.log("number!" + number);
      let sql = "select address from checker";
      address_all = await conn.query(sql);
      if ((number % 4) == 1) {

        let sql2 = "insert into audit values( '" + address_all[0][0]['address'] + "','" + req.body.hash + "','" + "-1'," + "'2" + "');";
        await conn.query(sql2);
        let sql3 = "insert into audit values( '" + address_all[0][1]['address'] + "','" + req.body.hash + "','" + "-1'," + "'2" + "');";
        await conn.query(sql3);
        let sql4 = "insert into audit values( '" + address_all[0][2]['address'] + "','" + req.body.hash + "','" + "-1'," + "'2" + "');";
        await conn.query(sql4);
        let sql5 = "insert into audit values( '" + address_all[0][3]['address'] + "','" + req.body.hash + "','" + "-1'," + "'2" + "');";
        await conn.query(sql5);
        let sql6 = "insert into audit values( '" + address_all[0][4]['address'] + "','" + req.body.hash + "','" + "-1'," + "'2" + "');";
        await conn.query(sql6);
      }
      else if ((number % 4) == 2) {

        let sql7 = "insert into audit values( '" + address_all[0][5]['address'] + "','" + req.body.hash + "','" + "-1'," + "'2" + "');";
        await conn.query(sql7);
        let sql8 = "insert into audit values( '" + address_all[0][6]['address'] + "','" + req.body.hash + "','" + "-1'," + "'2" + "');";
        await conn.query(sql8);
        let sql9 = "insert into audit values( '" + address_all[0][7]['address'] + "','" + req.body.hash + "','" + "-1'," + "'2" + "');";
        await conn.query(sql9);
        let sql10 = "insert into audit values( '" + address_all[0][8]['address'] + "','" + req.body.hash + "','" + "-1'," + "'2" + "');";
        await conn.query(sql10);
        let sql11 = "insert into audit values( '" + address_all[0][9]['address'] + "','" + req.body.hash + "','" + "-1'," + "'2" + "');";
        await conn.query(sql11);
      }
      else if ((number % 4) == 3) {

        let sql12 = "insert into audit values( '" + address_all[0][10]['address'] + "','" + req.body.hash + "','" + "-1'," + "'2" + "');";
        await conn.query(sql12);
        let sql13 = "insert into audit values( '" + address_all[0][11]['address'] + "','" + req.body.hash + "','" + "-1'," + "'2" + "');";
        await conn.query(sql13);
        let sql14 = "insert into audit values( '" + address_all[0][12]['address'] + "','" + req.body.hash + "','" + "-1'," + "'2" + "');";
        await conn.query(sql14);
        let sql15 = "insert into audit values( '" + address_all[0][13]['address'] + "','" + req.body.hash + "','" + "-1'," + "'2" + "');";
        await conn.query(sql15);
        let sql16 = "insert into audit values( '" + address_all[0][14]['address'] + "','" + req.body.hash + "','" + "-1'," + "'2" + "');";
        await conn.query(sql16);
      }
      else if ((number % 4) == 0) {

        let sql17 = "insert into audit values( '" + address_all[0][15]['address'] + "','" + req.body.hash + "','" + "-1'," + "'2" + "');";
        await conn.query(sql17);
        let sql18 = "insert into audit values( '" + address_all[0][16]['address'] + "','" + req.body.hash + "','" + "-1'," + "'2" + "');";
        await conn.query(sql18);
        let sql19 = "insert into audit values( '" + address_all[0][17]['address'] + "','" + req.body.hash + "','" + "-1'," + "'2" + "');";
        await conn.query(sql19);
        let sql20 = "insert into audit values( '" + address_all[0][18]['address'] + "','" + req.body.hash + "','" + "-1'," + "'2" + "');";
        await conn.query(sql20);
        let sql21 = "insert into audit values( '" + address_all[0][19]['address'] + "','" + req.body.hash + "','" + "-1'," + "'2" + "');";
        await conn.query(sql21);
      }
      callback(undefined, number);
      conn.release();
    } catch (err) {
      console.log("error" + err);
      callback(err, undefined);
    }

  },


  upload1: async function (req, callback) {
    try {

      const conn = await pool.getConnection();
      let address = req.session.token.address;


      let pendingfile_sql = "select * from file where address = '" + address + "' and pass = 2;";
      console.log(pendingfile_sql);
      let pendingfile = await conn.query(pendingfile_sql);
      let pendingfilec_sql = "select count(*) from file where address = '" + address + "' and pass = 2;";
      let pendingfilec = await conn.query(pendingfilec_sql);
      console.log(pendingfile[1][0]);

      let countreport_sql = "select count(*) from file where hash = '" + pendingfile[1][0]['hash'] + "' and pass != 2;";
      let countreport = await conn.query(countreport_sql);

      var rate;
      console.log("HOOOOOOPPPPPPPPPPPP");
      console.log(pendingfilec[0]);

      if (parseInt(pendingfilec[0][0]['count(*)']) == 0) {
        var data = {
          ordernumber: "None",
          hash_number: "None",
          progressget: "None"
        }
      }
      else {
        passingrate = (100 * parseInt(countreport[0][0]['count(*)']) / 5);
        var data = {
          ordernumber: pendingfile[0][0]['number'],
          hash_number: pendingfile[0][0]['hash'],
          progressget: passingrate + "%"
        }
        console.log(countreport[0][0]['count(*)']);
      }
      //         callback(undefined, data); 
      //         conn.release(); 
      //     }
      //     catch (err) {
      //         callback(err, undefined); 
      //     }
      // }, 
      // upload2:async function (req, callback) {
      //     try {
      //         const conn = await pool.getConnection(); 
      let address2 = req.session.token.address;
      let fileac_sql2 = "select count(*) from file where address = '" + address2 + "' and pass != 2;";
      let fileac2 = await conn.query(fileac_sql2);
      if (parseInt(fileac2[0][0]['count(*)']) == 0) {
        var data2 = {
          order_number2: "None",
          hash_number2: "None",
          result_report2: "00000000000000000",
          state2: "2"
        }
      }
      else {
        let filea_sql2 = "select max(number) from file where address = '" + address2 + "' and pass != 2;";
        let filea2 = await conn.query(filea_sql2);
        let resultaa_sql2 = "select * from file where hash = '" + filea2[0][0]['hash'] + "';";
        let resultaa2 = await conn.query(resultaa_sql2);
        console.log("22222");
        console.log(resultaa2);
        var data2 = {
          order_number2: filea2[0][0]['number'],
          hash_number2: filea2[0][0]['hash'],
          result_report2: resultaa2[0][0]['item'],
          state2: resultaa2[0][0]['pass']
        }
      }
      //     callback(undefined, data); 
      //     conn.release(); 
      // }
      // catch (err) {
      //     callback(err, undefined); 
      // }
      // }, 
      // upload3:async function (req, callback) {
      //     try {
      //         const conn = await pool.getConnection(); 
      let address3 = req.session.token.address;
      let fileac_sql3 = "select count(*) from file where address = '" + address3 + "' and pass != 1;";
      let fileac3 = await conn.query(fileac_sql3);
      if (parseInt(fileac3[0][0]['count(*)']) == 0 || parseInt(fileac3[0][0]['count(*)']) == 1) {
        var data3 = {
          order_number3: "None",
          hash_number3: "None",
          result_report3: "00000000000000000",
          state3: "2"

        }
      }
      else {
        console.log("33333");

        let filea_sql3 = "select *  from file where address = '" + address3 + "' and pass != 1 and number < (select max(number) from file);";
        let filea3 = await conn.query(filea_sql3);
        console.log(filea3);
        let resultaa_sql3 = "select * from file where hash = '" + filea3[0][0]['hash'] + "';";
        console.log(resultaa_sql3);
        let resultaa3 = await conn.query(resultaa_sql3);
        console.log(resultaa3[1][0]);
        var data3 = {
          order_number3: filea3[0][0]['number'],
          hash_number3: filea3[0][0]['hash'],
          result_report3: resultaa3[0][0]['item'],
          state3: resultaa3[0][0]['pass']
        }
      }
      data = { data, data2, data3 };
      console.log("data!!!!!!!!!!!!!!!");
      console.log(data['data']);
      console.log(data['data'].ordernumber);
      console.log(data['data']['ordernumber']);
      console.log(data['data']['ordernumber']);


      callback(undefined, data);
      conn.release();
    }
    catch (err) {
      console.log("err" + err);
      callback(err, undefined);
    }
  },
  get_audit_result: async function (req, callback) {
    try {
      const conn = await pool.getConnection();
      let address = req.body.address;
      let sql0 = "select hash from audit where address ='" + address + "'and pass = 2 ;";
      let hash = await conn.query(sql0);

      let sql = "select count(*) from audit where hash ='" + hash + "';";
      let count = await conn.query(sql);

      if (count[0][0]['count(*)'] == 5) {
        let sql1 = "select item from audit where hash ='" + hash + "';";
        let itemarray = await conn.query(sql1);

        let sql2 = "select address from audit where hash ='" + hash + "';";
        let audit_address = await conn.query(sql2);

        let result_audit = itemarray[0][0]['item'];
        let i = 0;
        for (i = 0; i < 17; i++) {
          let count = 0;
          if (itemarray[0][0]['item'][i] == "1") {
            count++;
          }
          if (itemarray[0][1]['item'][i] == "1") {
            count++;
          }
          if (itemarray[0][2]['item'][i] == "1") {
            count++;
          }
          if (itemarray[0][3]['item'][i] == "1") {
            count++;
          }
          if (itemarray[0][4]['item'][i] == "1") {
            count++;
          }
          if (count >= 3) result_audit[i] = "1";
          else result_audit[i] = "0";
        }

        let sql3 = "insert into result (hash, res, address1, address2, address3, address4, address5) values ('" + hash_contract + "','" + result_audit + "','" + audit_address[0][0]['address'] + "','" + audit_address[0][1]['address'] + "','" + audit_address[0][2]['address'] + "','" + audit_address[0][3]['address'] + "','" + audit_address[0][4]['address'] + "');";
        let order = await conn.query(sql3);

        let sql4 = "select address from audit where hash ='" + hash + "';";
        let audit_add = await conn.query(sql);

        let j = 0;
        for (j = 0; j < 5; j++) {
          let k = 0;
          let sql7 = "select item from audit where address ='" + audit_add[0][j]['address'] + "';";
          let itemarray2 = await conn.query(sql1);
          let count = 0;
          for (k = 0; k < 17; i++) {   
            if (itemarray2[0][0]['item'][k] == result_audit[k]) {
              count++;
            }
          }
          let sql5 = "select credit from checker where address ='" + audit_add[0][j]['address'] + "';";
          let cre = await conn.query(sql5);
          cre[0][0]['credit'] = cre[0][0]['credit'] + count;
          let sql6 = "update checker set credit = '" + cre[0][0]['credit'] + "' where address = '" + audit_add[0][j]['address'] + "';";
          await conn.query(sql6);
        }

      }

      callback(undefined, order);
      conn.release();
    }
    catch (err) {
      callback(err, undefined);
    }
  },

  auditor_upload_report: async function (req, callback) {
    try {
      const conn = await pool.getConnection();
      let address = req.session.token.address;
      console.log(address);
      let auditorreport_sql = "select * from audit where address = '" + address + "' and pass = 2;";
      let auditorreport = await conn.query(auditorreport_sql);
      console.log("12313213153153534534");
      let auditorreportc_sql = "select count(*) from audit where address = '" + address + "' and pass = 2;";
      let auditorreportc = await conn.query(auditorreportc_sql);
      console.log(parseInt(auditorreportc[0][0]['count(*)']));
      if (parseInt(auditorreportc[0][0]['count(*)']) == 0) {
      }
      else {
        let sql3 = "update audit set item = '" + req.body.res + "' where address = '" + address + "';";
        let order = await conn.query(sql3);
        console.log(sql3);
        let sql4 = "update file set item = '" + req.body.res + "' where hash = '" + auditorreport[0][0]['hash'] + "';";
        await conn.query(sql4);
        console.log(sql4);

        // let order = await conn.query(sql4);        
      }
      callback(undefined, undefined);
      conn.release();
    }
    catch (err) {
      callback(err, undefined);
    }
  },

  //!AUDIT MANAGE
  // auditor_upload_report:async function (req, callback) {
  //   try {
  //       console.log("testtesttest");
  //       const conn = await pool.getConnection(); 
  //       console.log("3123123123123123"); 
  //       let address = req.session.token.address;
  //       console.log("3123123123123123"); 
  //       let auditorreport_sql = "select * from audit where address = '" + address + "' and pass = 2;"; 
  //       let auditorreport = await conn.query(auditorreport_sql); 
  //       console.log("12313213153153534534"); 
  //       let auditorreportc_sql = "select count(*) from audit where address = '" + address + "' and pass = 2;"; 
  //       let auditorreportc = await conn.query(auditorreportc_sql);  
  //       console.log(parseInt(auditorreportc[0][0]['count(*)']));
  //       if (parseInt(auditorreportc[0][0]['count(*)']) == 0) {
  //       }
  //       else {
  //           let sql3 = "update audit set item = '" + req.body.res + "' where address = '" + address + "';";
  //           let order = await conn.query(sql3); 
  //           let sql4 = "update file set item = '" + req.body.res + "' where hash = '" + auditorreport[0][0]['hash'] + "';";
  //           let order = await conn.query(sql4);        
  //       }
  //       callback(undefined, order); 
  //       conn.release(); 
  //   }
  //   catch (err) {
  //     // console.log("err"+err);
  //       callback(err, undefined); 
  //   }
  // },

  last_report: async function (req, callback) {
    try {
      const conn = await pool.getConnection();
      let address = req.session.token.address;
      let auditorreport_sql = "select * from audit where address = '" + address + "' and pass = 2;";
      let auditorreport = await conn.query(auditorreport_sql);
      let auditorreportc_sql = "select count(*) from audit where address = '" + address + "' and pass = 2;";
      let auditorreportc = await conn.query(auditorreportc_sql);
      var data;
      if (parseInt(auditorreportc[0][0]['count(*)']) == 0) {
        data = {
          item_ret: "00000000000000000"
        }
        // alert("NO Submit!");
      }
      else {
        let sql3 = "select * from audit where address = '" + address + "' and pass = 2;";
        let order = await conn.query(sql3);

        data = {
          item_ret: order[0][0]['item']
        }
        console.log(data);


      }
      callback(undefined, data);
      conn.release();
    }
    catch (err) {
      callback(err, undefined);
    }
  },


  audit_upload1: async function (req, callback) {
    try {
      const conn = await pool.getConnection();
      let address = req.session.token.address;
      let pendingfile_sql = "select * from audit where address = '" + address + "' and pass = 2;";
      console.log(pendingfile_sql);
      let orderr_sql = "select orderr from checker where address = '" + address + "';"
      let orderr = await conn.query(orderr_sql);
      let pendingfile = await conn.query(pendingfile_sql);
      let pendingfilec_sql = "select count(*) from audit where address = '" + address + "' and pass = 2;";
      let pendingfilec = await conn.query(pendingfilec_sql);
      console.log(pendingfile[1][0]);

      let countreport_sql = "select count(*) from audit where hash = '" + pendingfile[1][0]['hash'] + "' and pass != 2;";
      let countreport = await conn.query(countreport_sql);
      // let pendingfile_sql = "select count(*) from audit where address = '" + address + "' and pass = 2;"; 
      // console.log("dasdsadasdsadas");

      // let pendingfile = await conn.query(pendingfile_sql); 
      // console.log(pendingfile);
      // let pendingfilec_sql = "select * from file where address = '" + address + "' and pass = 2;"; 
      // let pendingfilec = await conn.query(pendingfilec_sql); 
      // console.log(pendingfilec[1]);

      // let countreport_sql = "select count(*) from audit where hash = '" + pendingfile[1][0]['hash'] + "' and pass != 2;"; 
      // let countreport = await conn.query(countreport_sql); 

      var rate;
      console.log("HOOOOOOPPPPPPPPPPPP");
      console.log(pendingfilec[0][0]['count(*)']);

      if (parseInt(pendingfilec[0][0]['count(*)']) == 0) {
        var data = {
          ordernumber: "None",
          hash_number: "None",
          progressget: "None"
        }
      }
      else {
        passingrate = (100 * parseInt(countreport[0][0]['count(*)']) / 5);
        var data = {
          ordernumber: orderr[0][0]['orderr'],
          hash_number: pendingfile[0][0]['hash'],
          progressget: passingrate + "%"
        }
        console.log(countreport[0][0]['count(*)']);
      }
      //         callback(undefined, data); 
      //         conn.release(); 
      //     }
      //     catch (err) {
      //         callback(err, undefined); 
      //     }
      // }, 
      // upload2:async function (req, callback) {
      //     try {
      //         const conn = await pool.getConnection(); 
      let address2 = req.session.token.address;
      let fileac_sql2 = "select count(*) from audit where address = '" + address2 + "' and pass != 2;";
      let fileac2 = await conn.query(fileac_sql2);
      if (parseInt(fileac2[0][0]['count(*)']) == 0) {
        var data2 = {
          order_number2: "None",
          hash_number2: "None",
          result_report2: "00000000000000000",
          state2: "2"
        }
      }
      else {
        let filea_sql2 = "select max(number) from audit where address = '" + address2 + "' and pass != 2;";
        let filea2 = await conn.query(filea_sql2);
        let resultaa_sql2 = "select * from audit where hash = '" + filea2[0][0]['hash'] + "';";
        let resultaa2 = await conn.query(resultaa_sql2);
        console.log("22222");
        console.log(resultaa2);
        var data2 = {
          order_number2: filea2[0][0]['number'],
          hash_number2: filea2[0][0]['hash'],
          result_report2: resultaa2[0][0]['item'],
          state2: resultaa2[0][0]['pass']
        }
      }
      //     callback(undefined, data); 
      //     conn.release(); 
      // }
      // catch (err) {
      //     callback(err, undefined); 
      // }
      // }, 
      // upload3:async function (req, callback) {
      //     try {
      //         const conn = await pool.getConnection(); 
      let address3 = req.session.token.address;
      let fileac_sql3 = "select count(*) from audit where address = '" + address3 + "' and pass != 1;";
      let fileac3 = await conn.query(fileac_sql3);
      if (parseInt(fileac3[0][0]['count(*)']) == 0 || parseInt(fileac3[0][0]['count(*)']) == 1) {
        var data3 = {
          order_number3: "None",
          hash_number3: "None",
          result_report3: "00000000000000000",
          state3: "2"

        }
      }
      else {
        console.log("33333");

        let filea_sql3 = "select max(number) from audit where address = '" + address3 + "' and pass != 1 and number < (select max(number) from file);";
        let filea3 = await conn.query(filea_sql3);
        let resultaa_sql3 = "select * from file where hash = '" + filea3[0][0]['hash'] + "';";
        let resultaa3 = await conn.query(resultaa_sql3);
        console.log(resultaa3);
        var data3 = {
          order_number3: filea3[0][0]['number'],
          hash_number3: filea3[0][0]['hash'],
          result_report3: resultaa3[0][0]['item'],
          state3: resultaa3[0][0]['pass']
        }
      }
      data = { data, data2, data3 };
      console.log("data!!!!!!!!!!!!!!!");
      console.log(data['data']);
      console.log(data['data'].ordernumber);
      console.log(data['data']['ordernumber']);
      console.log(data['data']['ordernumber']);


      callback(undefined, data);
      conn.release();
    }
    catch (err) {
      console.log("err" + err);
      callback(err, undefined);
    }
  }



};

