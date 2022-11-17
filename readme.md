# **TO RUN PROJECT**
**1**: `npm install`

**2**: edit the ENV.js as per your environment

**3**: make a database with these tables

**Tables_in_nodelogin**
* ADMINS              
* ADMINSESSIONS       
* LOGS                
* USERCOUNT           
* USERS               
* USERSESSIONS        

**WITH FOLLOWING COLUMNS**

    ADMINS: adminid, adminname, password, name

    ADMINSESSIONS: sessionid, adminid

    LOGS: userid, ipaddress, timespasswordchanged, lastpasswordchanged, lastlogintimestamp, lastlogouttimestamp

    USERCOUNT: id, count

    USERS: userid, username, password, name

    USERSESSIONS: sessionid, userid


*put foreign key on adminid in admionsessions as child,

*put foreign key on userid in usersessions as child

*put foreign key on userid in logs as child


**STEP5**: `npm start`



********************************************************
**PUBLIC ROUTES**

USER

    http://65.0.102.151:3001/user/login.html
    http://65.0.102.151:3001/user/index.html


ADMIN

    http://65.0.102.151:3001/admin/login.html
    http://65.0.102.151:3001/admin/index.html
    http://65.0.102.151:3001/admin/createuser.html



**API ROUTES**

USER

    userAuth
        http://65.0.102.151:3001/api/auth/userlogin
        http://65.0.102.151:3001/api/auth/userlogout
    
    userPrivilages
        http://65.0.102.151:3001/api/user/readUser  (to fetch password)
        http://65.0.102.151:3001/api/user/modifyUser    (to change password)

ADMIN

    adminAuth

        http://65.0.102.151:3001/api/auth/adminlogin
        http://65.0.102.151:3001/api/auth/adminlogout

    
    adminPrivilages

        http://65.0.102.151:3001/api/user/createuser
        http://65.0.102.151:3001/api/user/readUser
        http://65.0.102.151:3001/api/user/modifyUser
        http://65.0.102.151:3001/api/user/deleteuser

