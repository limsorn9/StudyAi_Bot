const { MsEdgeTTS, OUTPUT_FORMAT } = require("msedge-tts");

async function testTTS() {
  try {
    console.log("Init TTS...");
    const edgeTts = new MsEdgeTTS();
    await edgeTts.setMetadata("en-US-AriaNeural", OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
    
    console.log("Generating stream...");
    const stream = edgeTts.toStream("Hello this is a test");
    const chunks = [];
    
    console.log("Waiting for data...");
    await new Promise((resolve, reject) => {
      stream.on('data', (chunk) => {
        console.log("Got chunk of size:", chunk.length);
        chunks.push(chunk);
      });
      stream.on('end', () => {
        console.log("Stream ended.");
        resolve();
      });
      stream.on('error', (err) => {
        console.error("Stream error:", err);
        reject(err);
      });
      stream.on('close', () => {
        console.log("Stream closed.");
      });
    });

    const buffer = Buffer.concat(chunks);
    console.log("Total buffer size:", buffer.length);
  } catch(e) {
    console.error("Error:", e);
  }
}

testTTS();
