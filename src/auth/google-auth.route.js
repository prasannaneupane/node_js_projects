import axios from "axios";
import { Router } from "express";

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URL;

const router = Router();

router.get("/auth/google", (req, res) => {
  const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=profile email`;
  res.redirect(url);
});


//  https://www.googleapis.com/auth/user.gender.read
router.get("/auth/google/callback", async (req, res) => {
  const  {code}  = req.query;

  try {
    const accessToken = await getGoogleUser(code);
    const userProfile = await getGoogleProfile(accessToken);
    // const genderData = await getGoogleProfileWithGender(accessToken);

    // Code to handle user authentication and retrieval using the profile data (store in database / check in database)
    res.json(userProfile);


  } catch (error) {
    console.log(error);
    // console.error("Error:", error.response.data.error);
    res.redirect("/login");
  }
});

async function getGoogleUser(code) {
  // Exchange authorization code for access token

  const res = await axios.post("https://oauth2.googleapis.com/token", {
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    redirect_uri: REDIRECT_URI,
    grant_type: "authorization_code",
    code,
  });

  return res.data.access_token; // Return access token
}

async function getGoogleProfile(accessToken) {
  const res = await axios.get(
    "https://www.googleapis.com/oauth2/v2/userinfo",
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );
  return res.data; // Returns Google profile data
}

// async function getGoogleProfileWithGender(accessToken) {
//     const { data } = await axios.get('https://people.googleapis.com/v1/people/me?personFields=birthdays', {
//         headers: { Authorization: `Bearer ${accessToken}` }
//     });
//     return data;
// }

export default router;