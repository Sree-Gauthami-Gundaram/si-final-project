const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios").default;
const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const apikey = "df63dff6bbc649bbbb1c16838a6c3f4d";
const headers = {
  "Ocp-Apim-Subscription-Key": apikey,
  "Content-Type": "application/json",
};

app.get("/ocr-analyze", (req, res) => {
  let imgUrl = req.body;
  let opLocation = "";

  axios
    .post(
      "https://si-gau.cognitiveservices.azure.com/vision/v3.2/read/analyze",
      imgUrl,
      {
        headers: headers,
      }
    )
    .then((resp) => {
      if (resp.status == 202) {
        opLocation = resp.headers["operation-location"];
        return res.json({ url: opLocation });
      }
    })
    .catch((e) => {
      console.log(e);
    });
});

app.get("/ocr-read", (req, res) => {
  let readUrl = req.body.url;
  axios
    .get(readUrl, { headers: headers })
    .then((resp) => {
      res.json(resp.data);
    })
    .catch((e) => {
      console.log(e);
    });
});

app.get("/image-analyze", (req, res) => {
  let imgUrl = req.body;
  axios
    .post(
      "https://si-gau.cognitiveservices.azure.com/vision/v3.2/analyze?visualFeatures=Categories,Description&details=Landmarks",
      imgUrl,
      {
        headers: headers,
      }
    )
    .then((resp) => {
      return res.json(resp.data);
    })
    .catch((e) => {
      console.log(e);
    });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
