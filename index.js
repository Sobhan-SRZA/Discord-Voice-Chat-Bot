/**
 * @license
  BSD 3-Clause License

  Copyright (c) 2024, the respective contributors, as shown by Persian Caesar and Sobhan.SRZA (mr.sinre) file.

  All rights reserved.

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
  list of conditions and the following disclaimer.

  * Redistributions in binary form must reproduce the above copyright notice,
  this list of conditions and the following disclaimer in the documentation
  and/or other materials provided with the distribution.

  * Neither the name of the copyright holder nor the names of its
  contributors may be used to endorse or promote products derived from
  this software without specific prior written permission.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
  DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
  FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
  DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
  SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
  CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
  OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
  OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
// Packages 
require("dotenv").config();
const
  {
    Client,
    GatewayIntentBits,
    ApplicationCommandType,
    Partials,
    MessageFlags
  } = require("discord.js"),
  { addSpeechEvent } = require("discord-speech-recognition"),
  { getAPI, Player } = require("./functions"),
  { token, serverId, antiCrash } = require("./config.json"),
  axios = require("axios"),
  client = new Client({
    intents: Object.keys(GatewayIntentBits).filter(a => isNaN(a) && a !== "GuildPresences"),
    partials: Object.keys(Partials).filter(a => !isNaN(a)).map(a => Number(a))
  });

// Add listening feature to bot.
addSpeechEvent(client, {
  ignoreBots: true
});

// Ready event
client.on("ready", async () => {
  console.log(`The user (bot) is online! => ${client.user.tag}`);

  // Creating the command in server.
  client.guilds.cache.get(serverId)
    .commands.set(
      [
        {
          name: "join",
          description: "Join your voice channel to talk.",
          type: ApplicationCommandType.ChatInput
        }
      ]
    );
});

// Interaction Create event for handle the command.
client.on("interactionCreate", async (interaction) => {
  if (interaction.user.bot || !interaction.guild)
    return;

  if (interaction.isCommand()) {
    await interaction.deferReply({
      flags: MessageFlags.Ephemeral,
      withResponse: true
    }).catch(null);
    switch (interaction.commandName) {
      case "join": {
        const voiceChannel = interaction.member.voice?.channel;
        if (!voiceChannel)
          return await interaction
            .followUp({
              content: "You Need To Join Voice Channel",
            })
            .catch(null);

        console.log(voiceChannel.id);
        const connection = new Player()
          .setData({
            channelId: voiceChannel.id,
            guildId: interaction.guildId,
            adapterCreator: interaction.guild.voiceAdapterCreator
          })
          .join();

        return await interaction
          .followUp({
            content: `Joined ${voiceChannel} => ${connection.ping}ms`
          })
          .catch(null);

        break;
      };

      default: break;
    }
  }
});

// This envent will be help us to talk with bot in voice.
client.on("speech", async (message) => {
  const string = message.content;
  if (!string)
    return;

  const
    data = {
      message: {
        message: string,
        chatBotID: 6,
        timestamp: Math.floor(Date.now() / 1000)
      },
      user: {
        firstName: message.author.username,
        externalID: message.author.id
      }
    },
    url = getAPI(data),
    response = await axios.get(url).then((res) => res.data.message.message),
    player = new Player()
      .setData({
        channelId: voiceChannel.id,
        guildId: interaction.guildId,
        adapterCreator: interaction.guild.voiceAdapterCreator
      }),
    voiceConnection = await player.connection;

  if (response == "bye") {
    player.play(`http://tts.cyzon.us/tts?text=${response}`)
    setTimeout(() => {
      player.stop();
    }, 7000)
  }

  else
    player.play(`http://tts.cyzon.us/tts?text=${response}`)
});
client.on("error", (err) => {
  console.log(err);
});
client.login(token);

// Load Anti Crash
if (antiCrash) {
  process.on("unhandledRejection", e => console.log(e));
  process.on("rejectionHandled", e => console.log(e));
  process.on("uncaughtException", e => console.log(e));
  process.on("uncaughtExceptionMonitor", e => console.log(e));
}
/**
 * @copyright
 * Coded by Sobhan-SRZA (mr.sinre) | https://github.com/Sobhan-SRZA
 * @copyright
 * Work for Persian Caesar | https://dsc.gg/persian-caesar
 * @copyright
 * Please Mention Us "Persian Caesar", When Have Problem With Using This Code!
 * @copyright
 */