const path = require("path");
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
const publicPath = path.join(__dirname, "public");
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));
app.use(express.json());
app.use(cors());

app.get("*", (req, res) => {
  console.log(req);
  res.sendFile(path.join(publicPath, "index.html"));
});

app.get("/auth/vk", async (req, res) => {
  try {
    const response = await axios.get(
      "https://oauth.vk.com/authorize?client_id=7277202&scope=friends&redirect_uri=https://aziz-oauth-vk.herokuapp.com&response_type=code&v=5.103"
    );
    console.log(response);
    res.send("Hi from /auth/vk");
  } catch (error) {
    res.send({ error });
  }
});

app.listen(port, () => {
  console.log("Server is up!");
});
