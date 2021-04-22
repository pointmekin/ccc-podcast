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
    image: "https://lh3.googleusercontent.com/lW0V0ZsbCXfhzd-5jzGxMNZ_5RItpwt_TB5n_KckwyCez1lbiAedNPFt7A2BClypNMH-Z3WTrqy4V5x_I_0yl_iWndlFpPSWyBvj9H1H0PATvUvEG7mpQaHJit2Y-J5zF5x3-Pdgvqh4ySuOSoLiaD9Ujz2M-eEj7Sic1aJjnPEvCYVoGdwxkKDep09bxm-EwTBj3HCvUjAQ5k1XcAIAlUSAZ7J7JZaJdTEugeNNrh6kO74vGflkvgwsBqRqesyUaCMft_A_vY-FrroCpb7j1f_ShHx85gwT9KqyhCV7TwgsVCYGgKyT8tsr2ZvX3dhZdgrUeJqD8wI-r-x-Xfrm_jFoBPwj9DMUiCdm5NX3WS0jp9KI2LoOSwb4UxDLRt_Sq1brbPFYaZyKrtxtAfb0d5NEvpHYeQNf9fLczvheWaYzt0XZqdFNjG8opkWgcDesnZ2K23U4_23bMYeKwZp5rjMqVhsxunsdPfugQkE_C0bX_pzPGf6ZhBRdddARqZKuYId7DqHrnTb6rMQuBw0OnXQBLPPdIJN_G3Fyzw5kzBBvVLPDFXx0DrZpiFh7D3n1O9292kihFz1q93w_2P10GKRXeNY7y0kFxS9rdsyhtSwrsZWi2rm93EIkDPrHtDDZP_qOyjBPOQUnW5OZV6FqmyVxHWivFGTMpDbIHULU4A0sCh6Bsz5nbAG8SnIEi2UW_9O9EoP5SXjdc7XbbZDITlmM=w500-h397-no?authuser=0"
  },
  {
    mainTitle: "main title 2",
    title: "title",
    description:"description",
    url: "https://www.youtube.com/channel/UCREO5WPqgVbmcsLyIeFzFjA",
    image: "https://lh3.googleusercontent.com/lW0V0ZsbCXfhzd-5jzGxMNZ_5RItpwt_TB5n_KckwyCez1lbiAedNPFt7A2BClypNMH-Z3WTrqy4V5x_I_0yl_iWndlFpPSWyBvj9H1H0PATvUvEG7mpQaHJit2Y-J5zF5x3-Pdgvqh4ySuOSoLiaD9Ujz2M-eEj7Sic1aJjnPEvCYVoGdwxkKDep09bxm-EwTBj3HCvUjAQ5k1XcAIAlUSAZ7J7JZaJdTEugeNNrh6kO74vGflkvgwsBqRqesyUaCMft_A_vY-FrroCpb7j1f_ShHx85gwT9KqyhCV7TwgsVCYGgKyT8tsr2ZvX3dhZdgrUeJqD8wI-r-x-Xfrm_jFoBPwj9DMUiCdm5NX3WS0jp9KI2LoOSwb4UxDLRt_Sq1brbPFYaZyKrtxtAfb0d5NEvpHYeQNf9fLczvheWaYzt0XZqdFNjG8opkWgcDesnZ2K23U4_23bMYeKwZp5rjMqVhsxunsdPfugQkE_C0bX_pzPGf6ZhBRdddARqZKuYId7DqHrnTb6rMQuBw0OnXQBLPPdIJN_G3Fyzw5kzBBvVLPDFXx0DrZpiFh7D3n1O9292kihFz1q93w_2P10GKRXeNY7y0kFxS9rdsyhtSwrsZWi2rm93EIkDPrHtDDZP_qOyjBPOQUnW5OZV6FqmyVxHWivFGTMpDbIHULU4A0sCh6Bsz5nbAG8SnIEi2UW_9O9EoP5SXjdc7XbbZDITlmM=w500-h397-no?authuser=0"
  },
  {
    mainTitle: "main title 3",
    title: "title",
    description:"description",
    url: "https://www.youtube.com/channel/UCREO5WPqgVbmcsLyIeFzFjA",
    image: "https://lh3.googleusercontent.com/lW0V0ZsbCXfhzd-5jzGxMNZ_5RItpwt_TB5n_KckwyCez1lbiAedNPFt7A2BClypNMH-Z3WTrqy4V5x_I_0yl_iWndlFpPSWyBvj9H1H0PATvUvEG7mpQaHJit2Y-J5zF5x3-Pdgvqh4ySuOSoLiaD9Ujz2M-eEj7Sic1aJjnPEvCYVoGdwxkKDep09bxm-EwTBj3HCvUjAQ5k1XcAIAlUSAZ7J7JZaJdTEugeNNrh6kO74vGflkvgwsBqRqesyUaCMft_A_vY-FrroCpb7j1f_ShHx85gwT9KqyhCV7TwgsVCYGgKyT8tsr2ZvX3dhZdgrUeJqD8wI-r-x-Xfrm_jFoBPwj9DMUiCdm5NX3WS0jp9KI2LoOSwb4UxDLRt_Sq1brbPFYaZyKrtxtAfb0d5NEvpHYeQNf9fLczvheWaYzt0XZqdFNjG8opkWgcDesnZ2K23U4_23bMYeKwZp5rjMqVhsxunsdPfugQkE_C0bX_pzPGf6ZhBRdddARqZKuYId7DqHrnTb6rMQuBw0OnXQBLPPdIJN_G3Fyzw5kzBBvVLPDFXx0DrZpiFh7D3n1O9292kihFz1q93w_2P10GKRXeNY7y0kFxS9rdsyhtSwrsZWi2rm93EIkDPrHtDDZP_qOyjBPOQUnW5OZV6FqmyVxHWivFGTMpDbIHULU4A0sCh6Bsz5nbAG8SnIEi2UW_9O9EoP5SXjdc7XbbZDITlmM=w500-h397-no?authuser=0"
  },
  {
    mainTitle: "main title 4",
    title: "title",
    description:"description",
    url: "https://www.youtube.com/channel/UCREO5WPqgVbmcsLyIeFzFjA",
    image: "https://lh3.googleusercontent.com/lW0V0ZsbCXfhzd-5jzGxMNZ_5RItpwt_TB5n_KckwyCez1lbiAedNPFt7A2BClypNMH-Z3WTrqy4V5x_I_0yl_iWndlFpPSWyBvj9H1H0PATvUvEG7mpQaHJit2Y-J5zF5x3-Pdgvqh4ySuOSoLiaD9Ujz2M-eEj7Sic1aJjnPEvCYVoGdwxkKDep09bxm-EwTBj3HCvUjAQ5k1XcAIAlUSAZ7J7JZaJdTEugeNNrh6kO74vGflkvgwsBqRqesyUaCMft_A_vY-FrroCpb7j1f_ShHx85gwT9KqyhCV7TwgsVCYGgKyT8tsr2ZvX3dhZdgrUeJqD8wI-r-x-Xfrm_jFoBPwj9DMUiCdm5NX3WS0jp9KI2LoOSwb4UxDLRt_Sq1brbPFYaZyKrtxtAfb0d5NEvpHYeQNf9fLczvheWaYzt0XZqdFNjG8opkWgcDesnZ2K23U4_23bMYeKwZp5rjMqVhsxunsdPfugQkE_C0bX_pzPGf6ZhBRdddARqZKuYId7DqHrnTb6rMQuBw0OnXQBLPPdIJN_G3Fyzw5kzBBvVLPDFXx0DrZpiFh7D3n1O9292kihFz1q93w_2P10GKRXeNY7y0kFxS9rdsyhtSwrsZWi2rm93EIkDPrHtDDZP_qOyjBPOQUnW5OZV6FqmyVxHWivFGTMpDbIHULU4A0sCh6Bsz5nbAG8SnIEi2UW_9O9EoP5SXjdc7XbbZDITlmM=w500-h397-no?authuser=0"
  },
  {
    mainTitle: "main title 5",
    title: "title",
    description:"description",
    url: "https://www.youtube.com/channel/UCREO5WPqgVbmcsLyIeFzFjA",
    image: "https://lh3.googleusercontent.com/lW0V0ZsbCXfhzd-5jzGxMNZ_5RItpwt_TB5n_KckwyCez1lbiAedNPFt7A2BClypNMH-Z3WTrqy4V5x_I_0yl_iWndlFpPSWyBvj9H1H0PATvUvEG7mpQaHJit2Y-J5zF5x3-Pdgvqh4ySuOSoLiaD9Ujz2M-eEj7Sic1aJjnPEvCYVoGdwxkKDep09bxm-EwTBj3HCvUjAQ5k1XcAIAlUSAZ7J7JZaJdTEugeNNrh6kO74vGflkvgwsBqRqesyUaCMft_A_vY-FrroCpb7j1f_ShHx85gwT9KqyhCV7TwgsVCYGgKyT8tsr2ZvX3dhZdgrUeJqD8wI-r-x-Xfrm_jFoBPwj9DMUiCdm5NX3WS0jp9KI2LoOSwb4UxDLRt_Sq1brbPFYaZyKrtxtAfb0d5NEvpHYeQNf9fLczvheWaYzt0XZqdFNjG8opkWgcDesnZ2K23U4_23bMYeKwZp5rjMqVhsxunsdPfugQkE_C0bX_pzPGf6ZhBRdddARqZKuYId7DqHrnTb6rMQuBw0OnXQBLPPdIJN_G3Fyzw5kzBBvVLPDFXx0DrZpiFh7D3n1O9292kihFz1q93w_2P10GKRXeNY7y0kFxS9rdsyhtSwrsZWi2rm93EIkDPrHtDDZP_qOyjBPOQUnW5OZV6FqmyVxHWivFGTMpDbIHULU4A0sCh6Bsz5nbAG8SnIEi2UW_9O9EoP5SXjdc7XbbZDITlmM=w500-h397-no?authuser=0"
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

const allowedKeywords = ["part1", "part2", "part3", "part4", "part5"]

const generateIndex = (message) => {
  allowedKeywords.forEach((word,i)=> {
    if (word === message) return i
  })
}

// event handler
function handleEvent(event) {
  
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  } else if (event.message.type === "message" || allowedKeywords.includes(event.message.text.toLowerCase())) {
    const index = generateIndex(event.message.text.toLowerCase())
    return client.replyMessage(event.replyToken, generatePayload(data, index));
  
  
    // } else if (event.message.type === "message" || event.message.text.toLowerCase() === "part1") {
  //   return client.replyMessage(event.replyToken, generatePayload(data, 0));
  // } else if (event.message.type === "message" || event.message.text.toLowerCase() === "part2") {
  //   return client.replyMessage(event.replyToken, generatePayload(data, 1));
  // }else if (event.message.type === "message" || event.message.text.toLowerCase() === "part3") {
  //   return client.replyMessage(event.replyToken, generatePayload(data, 2));
  // }else if (event.message.type === "message" || event.message.text.toLowerCase() === "part4") {
  //   return client.replyMessage(event.replyToken, generatePayload(data, 3));
  // }else if (event.message.type === "message" || event.message.text.toLowerCase() === "part5") {
  //   return client.replyMessage(event.replyToken, generatePayload(data, 4));
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