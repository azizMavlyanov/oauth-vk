const path = require("path");
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
const publicPath = path.join(__dirname, "public");
const port = process.env.PORT || 3000;

// app.use(express.static(publicPath));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  if (!req.query.code) return res.send('<a href="/auth/vk">Log in via VK</a>');
  console.log(req.query.code);
  // res.sendFile(path.join(publicPath, "index.html"));
  res.send(`code: ${req.query.code}`);
});

app.get("/auth/vk", async (req, res) => {
  try {
    const response = await axios.get(
      "https://oauth.vk.com/authorize?client_id=7277202&scope=friends&redirect_uri=https://aziz-oauth-vk.herokuapp.com&response_type=code&v=5.103"
    );
    console.log(response.data);
    res.send(response.data);
  } catch (error) {
    res.send({ error });
  }
});

app.listen(port, () => {
  console.log("Server is up!");
});
