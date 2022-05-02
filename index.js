const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios").default;
const PORT = process.env.PORT || 3000;
const app = express();

/* swagger Info */
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const options = {
  swaggerDefinition: {
    info: {
      title: "System-Integration-Final-Project",
      version: "1.0.0",
      description: "Final project using Image Analytics from Azure",
      contact: {
        name: "Sree Gauthami Gundaram",
        url: "https://github.com/Sree-Gauthami-Gundaram",
        email: "sree.gauthami1@gmail.com",
      },
    },
    host: "localhost:3000",
    basePath: "/",
  },
  apis: ["./index.js"],
};

const specs = swaggerJsDoc(options);
require("dotenv").config();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
const apikey = process.env.API_KEY;
const headers = {
  "Ocp-Apim-Subscription-Key": apikey,
  "Content-Type": "application/json",
};

/**
 * @swagger
 * /ocr-analyze:
 *   post:
 *     tags:
 *       - Optical Character Recognition
 *     description: Calls the Optical Character Recognition (OCR) API from Azure Text Analytics
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: Input send to OCR API in Microsoft Azure.
 *         in: body
 *         required: true
 *         schema:
 *           type: string
 *           items:
 *              type: string
 *           example: ["Url"]
 *     responses:
 *       200:
 *         description: Image Information Successfully Retrieved 
 *       400:
 *          description: Request body is invalid
 *       401: 
 *          description: Access denied due to invalid subscription key
 */
app.post("/ocr-analyze", (req, res) => {
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

/**
 * @swagger
 * /ocr-read:
 *   post:
 *     tags:
 *       - Optical Character Recognition
 *     description: Calls the Optical Character Recognition (OCR) API from Azure Text Analytics
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: Input send to OCR API in Microsoft Azure.
 *         in: body
 *         required: true
 *         schema:
 *           type: string
 *           items:
 *              type: string
 *           example: ["Url"]
 *     responses:
 *       200:
 *         description: Image Information Successfully Retrieved 
 *       400:
 *          description: Request body is invalid
 *       401: 
 *          description: Access denied due to invalid subscription key
 */

app.post("/ocr-read", (req, res) => {
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

/**
 * @swagger
 * /image-analyze:
 *   post:
 *     tags:
 *       -  Image Understanding Recognition
 *     description: Calls the Image Understanding (image-analyze) API from Azure Text Analytics
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: Input send to image-analyze API in Microsoft Azure.
 *         in: body
 *         required: true
 *         schema:
 *           type: string
 *           items:
 *              type: string
 *           example: ["Url"]
 *     responses:
 *       200:
 *         description: Image Information Successfully Retrieved 
 *       400:
 *          description: Request body is invalid
 *       401: 
 *          description: Access denied due to invalid subscription key
 */

app.post("/image-analyze", (req, res) => {
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
