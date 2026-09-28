# StudyAi_Bot Project Rules

## Gemini Models Constraint
- **ALWAYS** use `gemini-3.8-flash` and `gemini-3.1-pro` for Gemini interactions.
- **NEVER** revert to `gemini-1.5-flash` or `gemini-1.0-pro` unless explicitly requested.

## API Key Rotation
- The API key rotation mechanism (e.g. `getNextGeminiKey()`, `getNextGroqKey()`) is CRITICAL to prevent quota exhaustion.
- **NEVER** modify or remove the loops that iterate over `geminiKeys` or `groqKeys`.

## Feature Stability
- The Voice Text-to-Speech (TTS) feature using `msedge-tts` is currently stable. Ensure that generating and sending the voice message works automatically without hanging.
- The `handleUserMessage` and `bot.on('voice')` logic contain important processing messages (e.g., "⏳ គ្រូសនកំពុងគិត..."). These must be properly deleted before sending the final AI response to avoid clutter.
