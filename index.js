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
    mainTitle: "Introduction",
    title: "Part 1",
    description:"Get to know the host and learn more about the podcast.",
    url: "https://youtu.be/jA8yZar9va4",
    image: "https://i.ibb.co/Hh2JBzQ/smol.jpg"
  },
  {
    mainTitle: "General Discussion",
    title: "Part 2",
    description:"Exploring different Thai culture concepts.",
    url: "https://youtu.be/882FUbJCJKU",
    image: "https://i.ibb.co/Hh2JBzQ/smol.jpg"
  },
  {
    mainTitle: "Research Sharing",
    title: "Part 3",
    description:"The hosts share interesting papers that they've read on the Thai Culture and CCC.",
    url: "https://youtu.be/zmrGrS1szcA",
    image: "https://i.ibb.co/Hh2JBzQ/smol.jpg"
  },
  {
    mainTitle: "Analysis with Cross-cultural Models",
    title: "Part 4",
    description:"The hosts take a look at Thai culture through Hofstede's and Lewis's model.",
    url: "https://youtu.be/0iL1e2YQCwA",
    image: "https://i.ibb.co/Hh2JBzQ/smol.jpg"
  },
  {
    mainTitle: "Experience Sharing",
    title: "Part 5",
    description:"The hosts share their own experiences of Thai culture influencing their lives.",
    url: "https://youtu.be/DgbJGQo0bWg",
    image: "https://i.ibb.co/Hh2JBzQ/smol.jpg"
  },
  {
    mainTitle: "Conclusion",
    title: "Part 6",
    description:"Conclusion",
    url: "https://youtu.be/pCwOQaTIKiE",
    image: "https://i.ibb.co/Hh2JBzQ/smol.jpg"
  },
  {
    mainTitle: "Full Podcast",
    title: "All parts",
    description:"Watch the full podcast.",
    url: "https://youtu.be/uLfbzAgxyEI",
    image: "https://i.ibb.co/Hh2JBzQ/smol.jpg"
  }
]
const helpMessage = "Commands: \n\n\
'part1' : Watch the Introduction\n\
'part2' : Watch the General Discussion\n\
'part3' : Watch the Research Sharing Session\n\
'part4' : Watch CCC Models Analysis\n\
'part5' : Watch the Experience Sharing\n\
'part6' : Watch the conclusion\n\
'full' : Watch all parts"


const client = new line.Client(config);
const app = express();
const allowedKeywords = ["part1", "part2", "part3", "part4", "part5", "part6", "full"]

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
    altText: `part${index+1}`,
    contents: generateFlexbox(data, index)    
  }
  return payload
}

// flexbox
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