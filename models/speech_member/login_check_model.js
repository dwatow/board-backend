var Dynamodb = require('../../models/db_connect.js');
var docClient = Dynamodb.docClient;

module.exports = loginCheck = (loginData) => {
    return new Promise((resolve, reject) => {
    // console.log("loginData: " + JSON.stringify(loginData));
    //搜尋會員id
    const searchParams = {
        TableName: "speech_member",
        Key: {
            "id": loginData.id
        }
      }
      const inputParams = {
        TableName: "speech_member",
        Item: {
            "id": loginData.id,
            "email": loginData.email,
            "displayName": loginData.displayName,
            "photos": loginData.photos,
            "gender": loginData.gender,
        }
    };
      //查詢是否有這位會員
      docClient.get(searchParams, async function(err, result) {
        if (err) {
        //   console.log(err);
          reject("search member error.");
        } else {
          // console.log("result.Item" + result.Item);
        // 如果資料庫沒有該會員資料則進行新增動作
          if (result.Item === 'undefined' || result.Item === undefined || result.Item === "null") {
            docClient.put(inputParams, async function(err, data) {
                if (err) {
                //   console.log(err);
                  reject("create member error.");
                  return;
                } else {
                  resolve("create member successful.");
                }
              })
          } else {
            // console.log("success: " + result.Item);
            resolve(result.Item);
          }
        }
      });
    })
};