حتماً! در ادامه، فایل `README.md` را به‌روزرسانی کرده‌ام تا به زبان انگلیسی روان و با استفاده از ایموجی‌ها جذاب‌تر شود:

---

# Discord Voice Chat Bot 🤖🎤

This project is a **Discord Voice Chat Bot** that can join voice channels, convert your speech to text, interact with a chatbot API, and play the chatbot's response as audio in the voice channel. It’s like having a conversational AI directly in your Discord server! 🚀

---

## Features ✨

- Join Discord voice channels using the `/join` command.
- Convert speech to text using `discord-speech-recognition`.
- Interact with a chatbot API (e.g., Personality Forge) for intelligent responses.
- Convert the chatbot's text response to audio using Google’s Text-to-Speech API.
- Play the audio response in the voice channel.

---

## Prerequisites 📋

Before you begin, ensure you have the following:

- [Node.js](https://nodejs.org/) (version 16 or higher) installed.
- A **Discord Bot Token** from the [Discord Developer Portal](https://discord.com/developers/applications).
- A **Discord Server ID** where the bot will operate.
- An **API Key** and **API Secret** from [Personality Forge](https://www.personalityforge.com) for the chatbot functionality.

---

## Installation 🛠️

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/Discord-Voice-Chat-Bot.git
   cd Discord-Voice-Chat-Bot
   ```

2. Install the required dependencies:

   ```bash
   npm install
   ```

3. Configure the `config.json` file with your credentials:

   ```json
   {
     "token": "Your Discord Bot Token",
     "serverId": "Your Discord Server ID",
     "antiCrash": true, // or false
     "apiKey": "Your Personality Forge API Key",
     "apiSecret": "Your Personality Forge API Secret"
   }
   ```

4. Start the bot:

   ```bash
   npm start
   ```

---

## Used Packages 📦

Below is a table of the packages used in this project, along with their versions and installation commands:

| Package                      | Version  | Installation Command                     |
| ---------------------------- | -------- | ---------------------------------------- |
| `@discordjs/voice`           | ^0.18.0  | `npm install @discordjs/voice`           |
| `axios`                      | ^1.5.1   | `npm install axios`                      |
| `discord-speech-recognition` | ^3.4.1   | `npm install discord-speech-recognition` |
| `discord.js`                 | ^14.17.2 | `npm install discord.js`                 |
| `dotenv`                     | ^16.4.7  | `npm install dotenv`                     |
| `ffmpeg-static`              | ^5.2.0   | `npm install ffmpeg-static`              |
| `libsodium-wrappers`         | ^0.7.15  | `npm install libsodium-wrappers`         |
| `opusscript`                 | ^0.1.1   | `npm install opusscript`                 |
| `tweetnacl`                  | ^1.0.3   | `npm install tweetnacl`                  |

---

## How to Use 🎮

1. Invite the bot to your Discord server using the OAuth2 link from the Discord Developer Portal.
2. Join a voice channel in your server.
3. Use the `/join` command to make the bot join the voice channel.
4. Start speaking! The bot will:
   - Convert your speech to text.
   - Send the text to the chatbot API.
   - Convert the chatbot’s response to audio.
   - Play the audio in the voice channel.

---

## Configuration ⚙️

The `config.json` file contains the following settings:

- **`token`**: Your Discord bot token.
- **`serverId`**: The ID of the Discord server where the bot will operate.
- **`antiCrash`**: Enable or disable anti-crash functionality (`true` or `false`).
- **`apiKey`**: Your Personality Forge API Key.
- **`apiSecret`**: Your Personality Forge API Secret.

---

## Contributing 🤝

Contributions are welcome! If you’d like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes.
4. Submit a pull request.

---

## License 📜

This project is licensed under the **BSD 3-Clause License**. See the [LICENSE](./licence) file for details.

---

Enjoy building and using your Discord Voice Chat Bot! 🎉 If you have any questions or issues, feel free to open an issue on GitHub. Happy coding! 💻✨

--- 

## Contact 📞
 <div align="center">
  <a href="http://sobhan.epizy.com" target="_blank">
   <img align="left" src="https://github.com/user-attachments/assets/69b35053-17b1-48c6-a35b-4d3881a4dd2c" width=50%>
  </a>
  <a href="https://t.me/d_opa_mine" target="_blank">
   <img alt="Telegram"
    src="https://img.shields.io/static/v1?message=Telegram&logo=telegram&label=&color=229ED9&logoColor=white&labelColor=&style=flat"
    height="30" />
  </a>
  <a href="https://www.instagram.com/mr.sinre?igsh=cWk1aHdhaGRnOGg%3D&utm_source=qr" target="_blank">
   <img alt="Instagram"
    src="https://img.shields.io/static/v1?message=Instagram&logo=instagram&label=&color=C13584&logoColor=white&labelColor=&style=flat"
    height="30" />
  </a>
  <a href="https://www.twitch.tv/sobhan_srza" target="_blank">
   <img alt="Twitch"
    src="https://img.shields.io/static/v1?message=Twitch&logo=twitch&label=&color=6441A4&logoColor=white&labelColor=&style=flat"
    height="30" />
  </a>
  <a href="https://www.youtube.com/@mr_sinre?app=desktop&sub_confirmation=1" target="_blank">
   <img alt="YouTube"
    src="https://img.shields.io/static/v1?message=YouTube&logo=youtube&label=&color=FF0000&logoColor=white&labelColor=&style=flat"
    height="30" />
  </a>
  <a href="https://github.com/Sobhan-SRZA" target="_blank">
   <img alt="Github"
    src="https://img.shields.io/static/v1?message=Github&logo=github&label=&color=000000&logoColor=white&labelColor=&style=flat"
    height="30" />
  </a>
  </p>
  <p align="left">
   <a href="https://discord.gg/xh2S2h67UW" target="_blank">
    <img src="https://discord.com/api/guilds/1054814674979409940/widget.png?style=banner2" alt="pc-development.png">
   </a>
  </p>
  <p align="right">
   <a href="https://discord.gg/54zDNTAymF" target="_blank">
    <img src="https://discord.com/api/guilds/1181764925874507836/widget.png?style=banner2" alt="pc-club.png">
   </a>
  </p>
  <div align="center">
   <a href="https://discord.com/users/865630940361785345" target="_blank">
    <img alt="My Discord Account" src="https://discord.c99.nl/widget/theme-1/865630940361785345.png" />
   </a>
  </div>
 </div>