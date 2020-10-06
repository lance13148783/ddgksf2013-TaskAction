const axios = require("axios");
const cookie = process.env.V2EXCK;
const fs = require("fs");
const qmsgapi = process.env.QMSGAPI;
once = null;
ckstatus = 1; 
signstatus = 0;
time = new Date();
tmpHours = time.getHours();time.setHours(tmpHours + 8);
notice = time.toLocaleString() + "\n";
const header = {
    headers: {
        Referer: "https://www.v2ex.com/mission",
        Host: "www.v2ex.com",
        "user-agent": "Mozilla/5.0 (Linux; Android 10; Redmi K30) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.83 Mobile Safari/537.36",
        cookie: `'${cookie}'`,
    },
};

//获取once检查是否已签到
function check() {
    return new Promise(async (resolve) => {
        try {
            let url = "https://www.v2ex.com/mission/daily";
            let res = await axios.get(url, header);
            reg1 = /需要先登录/;
            if (reg1.test(res.data)) {
                console.log("cookie失效");
                ckstatus = 0;
                notice += "cookie失效";
            } else {
                reg = /每日登录奖励已领取/;
                if (reg.test(res.data)) {
                    notice += "今天已经签到过啦\n";
                    signstatus =1 ;
                } else {
                    reg = /redeem\?once=(.*?)'/;
                    once = res.data.match(reg)[1];
                    console.log(`获取成功 once:${once}`);
                }
            }
        } catch (err) {
            console.log(err);
        }
        resolve();
    });
}


//每日签到
function daily() {
    return new Promise(async (resolve) => {
        try {
            let url = `https://www.v2ex.com/mission/daily/redeem?once=${once}`;
            let res = await axios.get(url, header);
            reg = /已成功领取每日登录奖励/;
            if (reg.test(res.data)) {
                notice += "签到成功\n";
                signstatus =1 ;
            } else {
                notice += "签到失败\n";
            }
        } catch (err) {
            console.log(err);
        }
        resolve();
    });
}


//查询余额
function balance() {
    return new Promise(async (resolve) => {
        try {
            let url = "https://www.v2ex.com/balance";
            let res = await axios.get(url, header);
            reg = /\d+?\s的每日登录奖励\s\d+\s铜币/;
            console.log(res.data.match(reg)[0]);
            notice += res.data.match(reg)[0];
        } catch (err) {
            console.log(err);
        }
        resolve();
    });
}


//推送结果
function qmsg(msg) {
    return new Promise(async (resolve) => {
        try {
            let url = `${qmsgapi}?msg=${encodeURI(msg)}`;
            let res = await axios.get(url);
            if (res.data.code == 0) {
                console.log("Qmsg酱：发送成功");
            } else {
                console.log("Qmsg酱：发送失败!" + res.data.reason);
            }
        } catch (err) {
            console.log(err);
        }
        resolve();
    });
}

function sign() {
    return new Promise(async (resolve) => {
        try {
            if (!cookie) {
                console.log("你的cookie呢！！！");
                qmsg("你的cookie呢！！！");
                return;
            }
            await check();
            if (ckstatus == 1 ) {
                if (once&& signstatus==0) {
                    await daily();
                    if (signstatus==0) {                           
                     //如果签到失败
                       await check();
                       await daily();             
                    }
                }
                await balance();            
            } else {}
          
            console.log(notice);
            fs.writeFile("./signresult.txt",notice +  `\n`, {flag: "a", },
                (err) => {
                    if (err) {
                        throw err;
                    } else {
                        console.log("success");
                    }
                }
            );
            await qmsg(notice);
        } catch (err) {
            console.log(err);
        }
        resolve();
    });
}

sign();
