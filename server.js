const path = require("path");
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
const publicPath = path.join(__dirname, "public");
const port = process.env.PORT || 3000;

const clientId = "7277202";
const clientSecret = "NHuM4xddzjBWIXEipLzp";
const redirectUrl = "https://aziz-oauth-vk.herokuapp.com";

// app.use(express.static(publicPath));
app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  const code = req.query.code;
  if (!code) return res.sendFile(path.join(publicPath, "index.html"));

  // console.log(code);

  try {
    const response = await axios.get(
      `https://oauth.vk.com/access_token?client_id=7277202&client_secret=NHuM4xddzjBWIXEipLzp&code=bd2b34adc1de13b59e&redirect_uri=https://aziz-oauth-vk.herokuapp.com`
    );
    console.log(response.body);
    res.status(200).json({ ...response.body });
  } catch (error) {
    res.status(500).json({ error: "There is some error" });
  }

  // res.send(`code: ${code}`);
});

// app.get("/auth/vk", async (req, res) => {
//   try {
//     const response = await axios.get(
//       `https://oauth.vk.com/authorize?client_id=${clientId}&scope=friends&redirect_uri=${redirectUrl}&response_type=code&v=5.103`
//     );
//     console.log(response.data);
//     res.send(response.data);
//   } catch (error) {
//     res.send({ error });
//   }
// });

app.listen(port, () => {
  console.log("Server is up!");
});
