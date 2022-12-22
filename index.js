require("dotenv/config");
require("express-async-handler");
const http = require("http");
const express = require("express");
const cors = require("cors");
const path = require("path");
const helmet = require("helmet");
const { logger } = require("./middleware/logger");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

const app = express();

// middleware

app.use(logger);
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(express.static("images"));

const server = http.createServer(app);
// const io = require("socket.io")(server, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"],
//   },
// });
// let activeUsers = [];

// io.on("connection", (socket) => {

//   console.log(`User Connected: ${socket.id}`);

//   socket.on("join_room", (data) => {
//     socket.join(data);
//   });

//   socket.on("send_message", (data) => {
//     socket.to(data.room).emit("receive_message", data);
//   });

// });

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    exposedHeaders: ["x-auth-token"],
  })
);

// Using Helmet

app.use(helmet());

// To check if server is running
app.get("/start", (req, res) => {
  res.send("Welcome");
});
app.use("/", express.static(path.join(__dirname, "public")));
app.use("/user", require("./Routes/auth_register/auth.routes"));
app.use("/gateway", require("./Routes/Gateway_access/gateway_access.routes"));
app.use(
  "/generateViaAadhar",
  require("./Routes/Abha_endpoints/register_aadhaar.routes")
);
app.use("/link", require("./Routes/Linking_abha/Linking_Abha.routes"));
app.use("/search", require("./Routes/Abha_endpoints/search.routes"));
app.use("/consentPin", require("./Routes/consent_pin/consent_pin.routes"));
app.use("/payment", require("./Routes/Payment/payment.routes"));
app.use("/cart", require("./Routes/shop_endpoints/User_cart"));
// app.use("/chat", require("./Routes/ChatWithDoctor/chat.routes"));
app.use("/images", express.static("images"));
app.use("/image", require("./Routes/Expert/uploadsImages.routes"));
app.use("/notifty", require("./Routes/notify/notify.routes"));
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});
// socket.io

require("./Database/db");
const PORT = process.env.PORT || 8080;
app.use(require("./middleware/errorHandler"));
server.listen(PORT, async (req, res) => {
  try {
    console.log(`Server: http://localhost:${PORT}`);
  } catch (error) {
    console.log(error);
  }
});
