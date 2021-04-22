'use strict';

const line = require('@line/bot-sdk');
const express = require('express');

// create LINE SDK config from env variables
const config = {
  channelAccessToken: "2P0kJFv5wUhXiAhcile1OEhfNLdAONVWXAZCQ43/4OqVBLyg6K7pu5fApc6Aol5A8CDXZkK9UQcONhz093u+oTkQSOLaNjWYKgfGIZs0byV5jFFQaP6baFNeNVpg0opqYDnAl2on8fBWRFO4bRMZlwdB04t89/1O/w1cDnyilFU=",
  channelSecret: "7ad64e0d9df2626f5837860e99f0ce14",
};

const data = [
  {
    mainTitle: "main title 1",
    title: "title",
    description:"description",
    url: "https://www.youtube.com/channel/UCREO5WPqgVbmcsLyIeFzFjA",
    image: "https://ibb.co/fH3ycqv"
  },
  {
    mainTitle: "main title 2",
    title: "title",
    description:"description",
    url: "https://www.youtube.com/channel/UCREO5WPqgVbmcsLyIeFzFjA",
    image: "https://ibb.co/fH3ycqv"
  },
  {
    mainTitle: "main title 3",
    title: "title",
    description:"description",
    url: "https://www.youtube.com/channel/UCREO5WPqgVbmcsLyIeFzFjA",
    image: "https://ibb.co/fH3ycqv"
  },
  {
    mainTitle: "main title 4",
    title: "title",
    description:"description",
    url: "https://www.youtube.com/channel/UCREO5WPqgVbmcsLyIeFzFjA",
    image: "https://ibb.co/fH3ycqv"
  },
  {
    mainTitle: "main title 5",
    title: "title",
    description:"description",
    url: "https://www.youtube.com/channel/UCREO5WPqgVbmcsLyIeFzFjA",
    image: "https://ibb.co/fH3ycqv"
  },
]
const helpMessage = "Commands\n\n\
'part1' : ...\n\
'part2' : ...\n\
'part3' : ...\n\
'part4' : ...\n\
'part5' : ..."

// create LINE SDK client
const client = new line.Client(config);

// create Express app
// about Express itself: https://expressjs.com/
const app = express();

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/callback', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

// functions

const allowedKeywords = ["part1", "part2", "part3", "part4", "part5"]

const generateIndex = (message) => {
  let index = 0
  allowedKeywords.forEach((word,i)=> {
    if (word === message) index = i
  })
  return index
}

// event handler
function handleEvent(event) {
  
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  } else if (event.message.type === "message" || allowedKeywords.includes(event.message.text.toLowerCase())) {
    const index = generateIndex(event.message.text.toLowerCase())
    return client.replyMessage(event.replyToken, generatePayload(data, index));
  } else {
    const payload = {
      type: "text",
      text: helpMessage
    }
    return client.replyMessage(event.replyToken, payload);
  }
}

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});

const generatePayload = (data, index) => {
  const payload = {      
    type: 'flex',
    altText: `part${index}`,
    contents: generateFlexbox(data, index)    
  }
  return payload
}

const generateFlexbox = (data, index) => ({
  "type": "bubble",
  "hero": {
    "type": "image",
    "url": data[index].image,
    "size": "full",
    "aspectRatio": "20:13",
    "aspectMode": "cover",
    "action": {
      "type": "uri",
      "uri": data[index].url
    }
  },
  "body": {
    "type": "box",
    "layout": "vertical",
    "contents": [
      {
        "type": "text",
        "text": data[index].mainTitle,
        "weight": "bold",
        "size": "xl"
      },
      {
        "type": "box",
        "layout": "vertical",
        "margin": "lg",
        "spacing": "sm",
        "contents": [
          {
            "type": "box",
            "layout": "baseline",
            "spacing": "sm",
            "contents": [
              {
                "type": "text",
                "text": "Title",
                "color": "#aaaaaa",
                "size": "sm",
                "flex": 1
              },
              {
                "type": "text",
                "text": data[index].title,
                "wrap": true,
                "color": "#666666",
                "size": "sm",
                "flex": 5
              }
            ]
          },
          {
            "type": "box",
            "layout": "baseline",
            "spacing": "sm",
            "contents": [
              {
                "type": "text",
                "text": "Info",
                "color": "#aaaaaa",
                "size": "sm",
                "flex": 1
              },
              {
                "type": "text",
                "text": data[index].description,
                "wrap": true,
                "color": "#666666",
                "size": "sm",
                "flex": 5
              }
            ]
          }
        ]
      }
    ]
  },
  "footer": {
    "type": "box",
    "layout": "vertical",
    "spacing": "sm",
    "contents": [
      {
        "type": "button",
        "style": "link",
        "height": "sm",
        "action": {
          "type": "uri",
          "label": "Watch Now",
          "uri": data[index].url
        }
      },
      {
        "type": "spacer",
        "size": "sm"
      }
    ],
    "flex": 0
  }
})