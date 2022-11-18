const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");


const useRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const connection = require("./database");



//middleware
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use("/api/user", useRoute);
app.use("/api/auth/", authRoute);
app.use("/", express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  console.log(req.session)
  res.send("/public/admin/login.html");
});

// app.use(function (req, res, next) {
//   return res.status(200).json({ ok: "home route, server.js " });
// });

app.listen(3001, () => {
  console.log("app running on http://65.0.102.151:3001");
});
