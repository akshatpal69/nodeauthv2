const express = require("express")
const router = express.Router()
const connection = require("../database")
//cookie value = randomStringLength12_generatedSessionID  ||  ** NEXT VERSION SUGGESTION **

/**http://65.0.102.151:3001/api/user/createuser */
router.post("/createuser", async (req, res) => {
  let id = 0
  if (!req.headers.cookie) {
    return res.status(401).json({ result: 'jana lode log in karke a pehle' })
  } else {
    let biscuits = {}
    const biscuitsArray = req.headers.cookie.split(';')
    biscuitsArray.forEach((biscuit) => {
      const [key, value] = biscuit.trim().split('=')
      biscuits[key] = value
    })
    let receivedsessionid = Object.values(biscuits)[0]
    console.log(receivedsessionid)
    let userCountQUery = `select count from usercount`
    connection.query(userCountQUery, function (err, result) {
      id = result[0].count
    })
    // trimmeedreceivedsessionid = receivedsessionid.substr(12)
    let sessionExistsCheckQuery = `select sessionid from usersessions where sessionid="${receivedsessionid}"`
    connection.query(sessionExistsCheckQuery, function (err, result) {
      //console.log(result)
      if (err) return res.status(204).json({ error: err })
      if (result.length > 0) {
        const { username, password, name } = req.body

        let createUserQuery = `insert into users (userid, username, password, name) values("${id + 1}", "${username}", "${password}", "${name}")`
        connection.query(createUserQuery, function (err, result) {
          if (err) return res.status(201).json({ error: err })
          increaseUserCountQuery = `update usercount set count = ${id + 1}`
          connection.query(increaseUserCountQuery, function (err, result) {
            // console.log(result)
          })
          return res.status(201).json({ result })
        })
      } else {
        res.clearCookie(Object.keys(biscuits));
        console.log(Object.keys(biscuits))
        return res.status(406).json({ err: 'loginagain' })
      }
    })
  }
})

/**http://65.0.102.151:3001/api/user/readUser */
router.post("/readUser", async (req, res) => {
  if (!req.headers.cookie) {
    return res.status(400).json({ result: 'jana lode log in karke a pehle' })
  } else {
    let biscuits = {}
    const biscuitsArray = req.headers.cookie.split(';')
    biscuitsArray.forEach((biscuit) => {
      const [key, value] = biscuit.trim().split('=')
      biscuits[key] = value
    })
    receivedSessionID = Object.values(biscuits)[0]
    console.log(receivedSessionID)
    let sessionExistsCheckQuery = `select userid from usersessions where sessionid="${receivedSessionID}"`
    connection.query(sessionExistsCheckQuery, function (err, result) {
      if (err) return res.status(401).json({ error: err })
      if (!err && result.length > 0) {
        const { username } = req.body
        console.log('56')
        let readUserQuery = `select * from users where username="${username}"`
        connection.query(readUserQuery, function (err, result) {
          if (err) return res.status(400).json({ error: err })
          console.log('59')
          return res.status(201).json({ result })
        })
      } else {
        console.log('62')
        return res.status(400).json({ err })
      }
    })
  }
})

/**http://65.0.102.151:3001/api/user/modifyUser */
router.post("/modifyUser", async (req, res) => {
  const { userid, username, password, name } = req.body
  console.log(`${ userid}, ${username}, ${password}, ${name}}`)
  if (!req.headers.cookie) {
    return res.status(400).json({ result: 'jana lode log in karke a pehle' })
  } else {
    let biscuits = {}
    const biscuitsArray = req.headers.cookie.split(';')
    biscuitsArray.forEach((biscuit) => {
      const [key, value] = biscuit.trim().split('=')
      biscuits[key] = value
    })
    receivedSessionID = Object.values(biscuits)[0]
    let sessionExistsCheckQuery = `select userid from usersessions where sessionid="${receivedSessionID}"`
    console.log(sessionExistsCheckQuery)
    connection.query(sessionExistsCheckQuery, function (err, result) {
      if (err) return res.status(201).json({ error: err })
      if (result.length > 0) {
        let modifyUserQuery
        if (name ) {
          modifyUserQuery = `update users set name="${name}" where userid="${userid}"`
         
        }else
        if (username) {
          modifyUserQuery = `update users set username="${username}" where userid="${userid}"`
        }
        else
        if (password ) {
          modifyUserQuery = `update users set password="${password}" where userid="${userid}"`
          
        } else {
          return res.status(400).json({ err })
        }
        console.log(modifyUserQuery)
        
        connection.query(modifyUserQuery, function (err, result) {
          if (err) return res.status(201).json({ error: err })
          return res.status(201).json({ result })
        })
      } else {
        return res.status(400).json({ err })
      }
    })
  }
})

/**http://65.0.102.151:3001/api/user/deleteUser */
router.post("/deleteUser", async (req, res) => {
  if (!req.headers.cookie) {
    userExists = false
    return res.status(400).json({ result: 'jana lode log in karke a pehle' })
  } else {
    let biscuits = {}
    const biscuitsArray = req.headers.cookie.split(';')
    biscuitsArray.forEach((biscuit) => {
      const [key, value] = biscuit.trim().split('=')
      biscuits[key] = value
    })
    sessionID = biscuits.authBiscuit.substr(12)

    let sessionExistsCheckQuery = `select userid from usersessions where sessionid="${sessionID}"`
    connection.query(sessionExistsCheckQuery, function (err, result) {
      if (err) return res.status(201).json({ error: err })
      if (!err && result.length > 0) {
        const { userid, username } = req.body
        if (userid !== null) {
          deleteUserQuery = `delete from users where userid="${userid}"`
        } if (username !== null) {
          deleteUserQuery = `delete from users where username="${username}"`
        } else {
          return res.status(400).json({ err })
        }
        connection.query(deleteUserQuery, function (err, result) {
          if (err) return res.status(201).json({ error: err })
          return res.status(201).json({ result })
        })
      } else {
        return res.status(400).json({ err })
      }
    })
  }
})



module.exports = router
