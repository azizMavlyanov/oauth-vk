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

  try {
    const response = await axios.get(
      `https://oauth.vk.com/access_token?client_id=7277202&client_secret=NHuM4xddzjBWIXEipLzp&code=${code}&redirect_uri=https://aziz-oauth-vk.herokuapp.com`
    );
    const { access_token, expires_in, user_id } = response.data;
    const { data } = await axios.get(
      `https://api.vk.com/method/getProfiles?uid=${user_id}&access_token=${access_token}&v=5.103`
    );
    console.log(response.data);
    // res.status(200).json({ access_token, expires_in, user_id, data });
    // console.log(`code: ${code}`);
    res.send(
      "Привет! ${data.response[0].first_name} ${data.response[0].last_name}"
    );
  } catch (error) {
    res.status(500).json({ error: "There is some error" });
  }
});

// const test = async () => {
//   try {
//     const codeResponse = await axios.get(
//       `https://oauth.vk.com/access_token?client_id=7277202&client_secret=NHuM4xddzjBWIXEipLzp&code=5c32c0796bd19bf4e6&redirect_uri=https://aziz-oauth-vk.herokuapp.com`
//     );
//     const { access_token, expires_in, user_id } = codeResponse.data;
//     console.log(access_token);
//     const { data } = await axios.get(
//       `https://api.vk.com/method/getProfiles?uid=${user_id}&access_token=${access_token}&v=5.103`
//     );

//     console.log(data);
//     // res.status(200).json({ access_token, expires_in, user_id });
//   } catch (error) {
//     console.log(error);
//     // res.status(500).json({ error: "There is some error" });
//   }
// };

// test();

app.listen(port, () => {
  console.log("Server is up!");
});
