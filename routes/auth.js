const express = require("express")
const router = express.Router()
const connection = require("../database")


/**http://65.0.102.151:3001/api/auth/adminlogin */
router.post("/adminlogin", async (req, res) => {
    let { adminname, password } = req.body
    if (!req.headers.cookie) {
        let checkCredentialsQuery = `select adminid, name, adminname, password from admins where adminname ="${adminname}"`
        connection.query(checkCredentialsQuery, function (err, result) {
            if (err) return res.status(201).json({ error: err })
            if (result.length > 0) {
                if (password !== result[0].password) {
                    return res.status(400).json({ response: 'wrong password' })
                } else {
                    let sessionid = 'randomString' + adminname
                    res.cookie('authBiscuit', sessionid);
                    let saveSessionQuery = `INSERT INTO adminsessions (sessionid, adminid) VALUES ("${sessionid}", "${result[0].adminid}")`
                    connection.query(saveSessionQuery, (err, result) => {
                        if (err) res.status(400).json({ err })
                    })
                    return res.status(200).json({ responseName: result[0].name ,responseAdminname: adminname, biscuitStatus:'newlywed'})

                }
            } else {
                return res.status(400).json({ response:'wrong adminname' })
            }
        })
    } else {
        let biscuits = {}
        const biscuitsArray = req.headers.cookie.split(';')
        biscuitsArray.forEach((biscuit) => {
            const [key, value] = biscuit.trim().split('=')
            biscuits[key] = value
        })
        let receivedsessionid = Object.values(biscuits)[0]
        console.log(receivedsessionid)
        let verifySessionQuery = `select sessionid from adminsessions where sessionid="${receivedsessionid}"`
        console.log(verifySessionQuery)
        connection.query(verifySessionQuery, (err, result) => {
            if (err) res.status(400).json({ err })
            if (result.length > 0) {
                let getadminname = result[0].sessionid.substr(12)
                console.log(getadminname)
                let checkAdminOfSessionQuery = `select adminname from admins where adminname = "${getadminname}"`
                connection.query(checkAdminOfSessionQuery, (err, result) => {
                    if (err) res.status(400).json({ err })
                    if (result.length > 0) {
                        return res.status(200).json({ biscuitStatus: 'alreadywed' })
                    } else {
                        return res.status(200).json({ err })
                    }
                })
            } else {
                res.clearCookie(Object.keys(biscuits));
                return res.status(200).json({ redirect: 'true' })
            }

        })
    }
})


/**http://65.0.102.151:3001/api/auth/adminlogout */
router.get('/adminlogout', (req, res, next) => {
    if (!req.headers.cookie) {
        return res.status(200).json({ biscuitStatus: 'alredyloggedOut' })
    } else {
        let biscuits = {};
        const biscuitsArray = req.headers.cookie.split(';');
        biscuitsArray.forEach((biscuit) => {
            const [key, value] = biscuit.trim().split('=');
            biscuits[key] = value;
        });
        console.log(Object.keys(biscuits))
        res.clearCookie(Object.keys(biscuits));
        return res.status(200).json({ biscuitStatus: 'loggedOut' });
    }
});

/**http://65.0.102.151:3001/api/auth/userlogin */
router.post("/userlogin", async (req, res) => {
    let { username, password } = req.body
    if (!req.headers.cookie) {
        let checkCredentialsQuery = `select userid, username, password, name from users where username ="${username}"`
        connection.query(checkCredentialsQuery, function (err, result) {
            if (err) return res.status(400).json({ error: err })
            if (result.length > 0) {
                if (password !== result[0].password) {
                    return res.status(400).json({ response: 'wrong password' })
                } else {
                    let sessionid = 'randomString' + username
                    res.cookie('authBiscuit', sessionid);
                    let saveSessionQuery = `INSERT INTO usersessions (sessionid, userid) VALUES ("${sessionid}", "${result[0].userid}")`
                    connection.query(saveSessionQuery, (err, result) => {
                        if (err) res.status(400).json({ err })
                    })
                    // let name = 
                    return res.status(200).json({ responseName: result[0].name ,responseUsername: username, biscuitStatus:'newlywed'})
                }
            } else {
                return res.status(400).json({ response:'wrong username' })
            }
        })
    } else {
        let biscuits = {}
        const biscuitsArray = req.headers.cookie.split(';')
        biscuitsArray.forEach((biscuit) => {
            const [key, value] = biscuit.trim().split('=')
            biscuits[key] = value
        })
        let receivedsessionid = Object.values(biscuits)[0]
        console.log(receivedsessionid)
        let verifySessionQuery = `select sessionid from usersessions where sessionid="${receivedsessionid}"`
        console.log(verifySessionQuery)
        connection.query(verifySessionQuery, (err, result) => {
            if (err) res.status(400).json({ err })
            if (result.length > 0) {
                let getusername = result[0].sessionid.substr(12)
                console.log(getusername)
                let checkuserOfSessionQuery = `select username from users where username = "${getusername}"`
                connection.query(checkuserOfSessionQuery, (err, result) => {
                    if (err) res.status(400).json({ err })
                    if (result.length > 0) {
                        return res.status(200).json({ biscuitStatus: 'alreadywed' })
                    } else {
                        return res.status(400).json({ err })
                    }
                })
            } else {
                res.clearCookie(Object.keys(biscuits));
                return res.status(200).json({ redirect: 'true' })
            }

        })
    }
})


/**http://65.0.102.151:3001/api/auth/userlogout */
router.get('/userlogout', (req, res, next) => {
    if (!req.headers.cookie) {
        return res.status(200).json({ biscuitStatus: 'alredyloggedOut' })
    } if(req.headers.cookie) {
        let biscuits = {};
        const biscuitsArray = req.headers.cookie.split(';');
        biscuitsArray.forEach((biscuit) => {
            const [key, value] = biscuit.trim().split('=');
            biscuits[key] = value;
        });
        console.log(Object.keys(biscuits))
        res.clearCookie(Object.keys(biscuits));
        return res.status(200).json({ biscuitStatus: 'loggedOutNow' });
    }else{
        return res.status(400).json({ biscuitStatus: 'err'});
    }
});

module.exports = router