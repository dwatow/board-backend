var Dynamodb = require('./db_connect.js');
var docClient = Dynamodb.docClient;

module.exports = createSpeech = () => {
    return new Promise((resolve, reject) => {
        //資料庫取得資料的動作
        const params = {
            TableName: "speech",
        };
        docClient.scan(params, (err, data) => {
            // console.log("data: " + data);
            if (!err) {
                resolve(data);
            } else {
                // console.log(err);
                reject("get data error.");
            }
        });
    })
}

