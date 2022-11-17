TO RUN PROJECT
      STEP1: npm install
      STEP2: edit the ENV.js as per your environment
      STEP3: make a database with these tables
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
with following columns
admins: ADMINID, ADMINNAME, PASSWORD, NAME

adminsessions: SESSIONID, ADMINID

logs: USERID, IPADDRESS, TIMESPASSWORDCHANGED, LASTPASSWORDCHANGED, LASTLOGINTIMESTAMP, LASTLOGOUTTIMESTAMP

usercount: ID, COUNT

users: USERID, USERNAME, PASSWORD, NAME

usersessions: SESSIONID, USERID


put foreign key on adminid in admionsessions as child,
put foreign key on userid in usersessions as child
put foreign key on userid in logs as child


STEP5: npm test



********************************************************
PUBLIC ROUTES

user:
http://localhost/user/login.html
http://localhost/user/index.html


admin:
http://localhost/admin/login.html
http://localhost/admin/index.html
http://localhost/admin/createuser.html



API ROUTES

user
    *userAuth
    http://localhost:80/api/auth/userlogin
    http://localhost:80/api/auth/userlogout
    
    *userPrivilages
    http://localhost:80/api/user/readUser   (to fetch password)
    http://localhost/api/user/modifyUser    (to change password)

admin
    *adminAuth
    http://localhost:80/api/auth/adminlogin
    http://localhost:80/api/auth/adminlogout

    *adminPrivilages
    http://localhost/api/user/createuser
    http://localhost:80/api/user/readUser
    http://localhost/api/user/modifyUser
    http://localhost/api/user/deleteuser

