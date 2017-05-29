# WebSpeechDemo

Routes are as follows:
***
`localhost:3333/1`
***
`localhost:3333/2`
***
`localhost:3333/3`
***
/1 & /2 are simple speech output views

/3: This application will search YouTube for a video using the [Web Speech API](https://developers.google.com/web/updates/2013/01/Voice-Driven-Web-Apps-Introduction-to-the-Web-Speech-API?hl=en).
Here's a video demo: https://youtu.be/qyu0W-yCUAM

## For YouTube authentication
Make a config.js and include it inside the project root. Make sure you replace the API key with your own. If you do not have a Youtube Data API key get it
[here](https://developers.google.com/youtube/registering_an_application).

config.js:
```javascript
  module.exports = {
    key: <YOUR YOUTUBE API KEY>
  }
```

To run the application enter the following code:
```
npm install
npm start
```
