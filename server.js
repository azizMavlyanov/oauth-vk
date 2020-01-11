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
    // Retrieve access_token, expires_in, user_id
    const response = await axios.get(
      `https://oauth.vk.com/access_token?client_id=7277202&client_secret=NHuM4xddzjBWIXEipLzp&code=${code}&redirect_uri=https://aziz-oauth-vk.herokuapp.com`
    );
    const { access_token, expires_in, user_id } = response.data;

    const { data } = await axios.get(
      `https://api.vk.com/method/getProfiles?uid=${user_id}&access_token=${access_token}&v=5.103`
    );
    const userFirstName = data.response[0].first_name;
    const userLastName = data.response[0].last_name;

    const friendsResponse = await axios.get(
      `https://api.vk.com/method/friends.get?uid=${user_id}&order=random&count=5&access_token=${access_token}&v=5.103&fields=photo_100,names&name_case=ins`
    );
    const listOfFriends = friendsResponse.data.response.items;
    console.log(friendsResponse.data.response);

    res.send("hi");
  } catch (error) {
    res.status(500).json({ error: "There is some error" });
  }
});

// const test = async () => {
//   try {
//     // const codeResponse = await axios.get(
//     //   `https://oauth.vk.com/access_token?client_id=7277202&client_secret=NHuM4xddzjBWIXEipLzp&code=5c32c0796bd19bf4e6&redirect_uri=https://aziz-oauth-vk.herokuapp.com`
//     // );
//     // const { access_token, expires_in, user_id } = codeResponse.data;
//     // console.log(access_token);
//     // const { data } = await axios.get(
//     //   `https://api.vk.com/method/getProfiles?uid=${user_id}&access_token=${access_token}&v=5.103`
//     // );

//     // console.log(data);
//     // // res.status(200).json({ access_token, expires_in, user_id });

//     const codeResponse = await axios.get(
//       `https://api.vk.com/method/friends.get?uid=277578770&order=random&count=5&access_token=cfb5ee4a789a5fb2f6eac94165a51aff794ba378957916982bbeabe7dc51453f49bfb890da2956a33966c&v=5.103&fields=photo_100,names&name_case=ins`
//     );

//     console.log(codeResponse.data.response);
//   } catch (error) {
//     console.log(error);
//     // res.status(500).json({ error: "There is some error" });
//   }
// };

// test();

app.listen(port, () => {
  console.log("Server is up!");
});
