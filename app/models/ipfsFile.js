const ipfsAPI = require('ipfs-http-client');
const ipfs = ipfsAPI({ host: 'localhost', port: '5001', protocol: 'http' });

exports.add = (buffer) => {
    console.log("11");
    return new Promise((resolve, reject) => {
        try {
            console.log("12");
            ipfs.add(buffer, function (err, files) {
                if (err || typeof files == "undefined") {
                    console.log("13");
                    reject(err);
                } else {
                    console.log("4");
                    resolve(files[0].hash);
                }
            })
        } catch (ex) {
            reject(ex);
        }
    })
}
exports.get = (hash) => {
    console.log("21");
    return new Promise((resolve, reject) => {
        try {
            console.log("2123123131");
            ipfs.get(hash, function (err, files) {
                console.log("1234");
                if (err || typeof files == "undefined") {
                    console.log("1234err");
                    reject(err);
                } else {
                    console.log("1234correct");
                    resolve(files[0].content);
                }
            })
        } catch (ex) {
            reject(ex);
        }
    });
}