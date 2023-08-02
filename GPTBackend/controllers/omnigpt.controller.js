const { textToSpeech } = require("../pipelines/text-to-speech")
const { textToText } = require("../pipelines/text-to-text")
const { speechToText } = require("../pipelines/speech-to-text")

module.exports.omnigpt = async (req, res, next) => {
  const key = process.env.AZURE_COGNITIVE_SPEECH_KEY
  const region = process.env.REGION
  const { input, output } = req.query

  if (input === "text") {
    const { payload } = req.body

    console.log(payload)

    if (payload === undefined) {
      res.send(400)
    }
    const gptResponse = await textToText(payload)

    if (output === "speech") {
      const audioStream = await textToSpeech(key, region, gptResponse, null) // filename is null

      res.set({
        "Content-Type": "audio/mpeg",
        "Transfer-Encoding": "chunked",
      })
      audioStream.pipe(res)
    } else {
      res.send(gptResponse)
    }
  } else {
    // console.log("ENTER SPEECH PIPELINE")

    // const userText =
    //   speechToText(req, key, region) ?? "Repeat: The speech you provided could not be recognized"
    // const gptResponse = await textToText(userText)

    // if (output === "speech") {
    //   const audioStream = await textToSpeech(key, region, gptResponse, null) // filename is null

    //   res.set({
    //     "Content-Type": "audio/mpeg",
    //     "Transfer-Encoding": "chunked",
    //   })
    //   audioStream.pipe(res)
    // } else {
    //   res.send(gptResponse)
    // }
  }

  //   if (!key || !region || !phrase) res.status(404).send("Invalid query string")

  // stream from file or memory
  //   if (file && file === true) {
  //     fileName = `./temp/stream-from-file-${timeStamp()}.mp3`
  //   }
}
