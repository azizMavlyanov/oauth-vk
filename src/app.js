const path = require("path");
const express = require("express");
const hbs = require("hbs");
const cors = require("cors");
const axios = require("axios");

const app = express();
const port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));
app.use(express.json());
app.use(cors());

const clientId = "7277202";
const clientSecret = "NHuM4xddzjBWIXEipLzp";
const redirectUrl = "https://aziz-oauth-vk.herokuapp.com";

app.get("/", async (req, res) => {
  const code = req.query.code;
  if (!code) return res.render("auth", {});

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

    // const friendsResponse = await axios.get(
    //   `https://api.vk.com/method/friends.get?uid=${user_id}&order=random&count=5&access_token=${access_token}&v=5.103&fields=photo_100,names&name_case=ins`
    // );
    // const listOfFriends = friendsResponse.data.response.items;
    // console.log(friendsResponse.data.response);

    res.render("index", { userFirstName, userLastName });
  } catch (error) {
    res.status(500).json({ error: "There is some error" });
  }
});

app.listen(port, () => {
  console.log("Server is up!");
});
