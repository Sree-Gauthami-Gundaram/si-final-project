# SI-Final-Project
Si-Final-Project

# Introduction:
The Computer Vision service in Azure allows users to use complex ways to analyze images and deliver data depending on the visual elements you are concerned with.

My project contains two API’s

1.Text extraction- Optical character recognition((OCR) 

2.Image understanding

This project contains three endpoints:

# 1./ocr-analyze
This endpoint is used to analyze the image provided by the user.
The desired output of this endpoint will give a url to the cognitive services of the Azure which contains the detailed analysis of the image.

# 2./ocr-read
This endpoint is provided with the response of /ocr-analyze as its input.
This is used to retrieve the detailed analysis of the textual part in the image provided to the /ocr-analyze.
The various properties of the image such as the text, its location, confidence scores are provided as responses to this endpoint. 

# 3./image-analyze
This endpoint is provided with a url of an image given by the user.
This extracts a wide range of visual features from the provided image.
Objects, faces, creatures, places are recognised as the responses for this endpoint.

# Source Code:
Github link: https://github.com/Sree-Gauthami-Gundaram/si-final-project

Link to live API: http://137.184.125.91:3000/api-docs/


