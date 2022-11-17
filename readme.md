# **TO RUN PROJECT**
**STEP1**: `npm install`
**STEP2**: edit the ENV.js as per your environment
**STEP3**: make a database with these tables
+---------------------+
| Tables_in_nodelogin |
+---------------------+
| admins              |
| adminsessions       |
| logs                |
| usercount           |
| users               |
| usersessions        |
+---------------------+
**with following columns**
admins: ADMINID, ADMINNAME, PASSWORD, NAME

adminsessions: SESSIONID, ADMINID

logs: USERID, IPADDRESS, TIMESPASSWORDCHANGED, LASTPASSWORDCHANGED, LASTLOGINTIMESTAMP, LASTLOGOUTTIMESTAMP

usercount: ID, COUNT

users: USERID, USERNAME, PASSWORD, NAME

usersessions: SESSIONID, USERID


>put foreign key on adminid in admionsessions as child,
>put foreign key on userid in usersessions as child
>put foreign key on userid in logs as child


**STEP5**: `npm start`



********************************************************
#PUBLIC ROUTES

user:
http://65.0.102.151:3001/user/login.html
http://65.0.102.151:3001/user/index.html


admin:
http://65.0.102.151:3001/admin/login.html
http://65.0.102.151:3001/admin/index.html
http://65.0.102.151:3001/admin/createuser.html



###API ROUTES

user
    *userAuth
    http://65.0.102.151:3001/api/auth/userlogin
    http://65.0.102.151:3001/api/auth/userlogout
    
    *userPrivilages
    http://65.0.102.151:3001/api/user/readUser  (to fetch password)
    http://65.0.102.151:3001/api/user/modifyUser    (to change password)

admin
    *adminAuth
    http://65.0.102.151:3001/api/auth/adminlogin
    http://65.0.102.151:3001/api/auth/adminlogout

    *adminPrivilages
    http://65.0.102.151:3001/api/user/createuser
    http://65.0.102.151:3001/api/user/readUser
    http://65.0.102.151:3001/api/user/modifyUser
    http://65.0.102.151:3001/api/user/deleteuser

