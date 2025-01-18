const
  {
    joinVoiceChannel,
    createAudioPlayer,
    createAudioResource,
    NoSubscriberBehavior,
    getVoiceConnection
  } = require("@discordjs/voice"),
  audioPlayer = new Map(),
  audioPlayerData = {
    behaviors: {
      maxMissedFrames: Math.round(5000 / 20),
      noSubscriber: NoSubscriberBehavior.Pause
    }
  },
  audioResourceData = {
    inlineVolume: true
  };

module.exports = {

  /**
   * 
   * @param {string[]} string_array An array of strings to encoding
   * @returns {string} The encoding of the return value. 
   */
  toHash: function (string_array) {
    const
      crypto = require("crypto"),
      hash = crypto.createHmac("sha256", string_array[0]);

    for (let index = 1; index < string_array.length; index++)
      hash.update(string_array[index])

    return hash.digest("hex")
  },

  /**
   * 
   * @param {object} object
   * @returns {string} 
   */
  getAPI: function (object) {
    object = JSON.stringify(object);
    const
      { apiKey, apiSecret } = require("./config.json"),
      host = "https://www.personalityforge.com/api/chat/",
      hash = this.toHash([apiSecret, object]),
      url = `${host}?apiKey=${apiKey}&hash=${hash}&message=${encodeURIComponent(object)}`;

    return url;
  },

  /**
   * @description This is player class can be use play online resource in discord voice channel.
   * @example
   * ```js
   * // Load class.
   * const player = new Player(interaction);
   * 
   * // Play the url.
   * player.play("url");
   * 
   * // Get connection volume.
   * console.log(player.volume);  // output: <player.volume> like 100
   * 
   * // Set connection volume.
   * console.log(player.setVolume(50)); // output: 50
   * 
   * // Pause the player.
   * if(player.isPaused()) // If it's true it should be resumed.
   *  player.resume();
   * 
   * else
   *  // This one sould be paused.
   *  player.pause();
   * 
   * // Radio mode.
   * player.radio(["url"]);
   * 
   * // Stop the player.
   * player.stop();
   * ```
   */
  Player: class Player {

    /**
     * 
     * @description To use this class with default settings you may to add "interaction" to it.
     * @param {import("discord.js").CommandInteraction} interaction 
     * @returns {Player}
     */
    constructor(interaction) {
      if (interaction)
        this.data = {
          channelId: interaction.member.voice?.channel.id,
          guildId: interaction.guild.id,
          adapterCreator: interaction.guild.voiceAdapterCreator,
          selfDeaf: true
        };

      return this;
    }

    /**
     * 
     * @description Set player data's for using the class.
     * @param {import("@discordjs/voice").JoinVoiceChannelOptions & import("@discordjs/voice").CreateVoiceConnectionOptions} param0 
     * @returns {Player}
     */
    setData({ channelId, guildId, adapterCreator, selfDeaf = true }) {
      this.data = {
        channelId,
        guildId,
        adapterCreator,
        selfDeaf
      };

      return this;
    }

    /**
     * 
     * @description Set guild id of player data.
     * @param {string} guildId 
     * @returns {Player}
     */
    setGuildId(guildId) {
      this.data.guildId = guildId;
      return this;
    }

    /**
     * 
     * @description Set adapterCreator of player data.
     * @param {import("discord.js").InternalDiscordGatewayAdapterCreator} adapterCreator 
     * @returns {Player}
     */
    setAdapterCreator(adapterCreator) {
      this.data.adapterCreator = adapterCreator;
      return this;
    }

    /**
     * 
     * @description Set bot deaf in the voice channel.
     * @param {boolean} selfDeaf 
     * @returns {Player}
     */
    setSelfDeaf(selfDeaf) {
      this.data.selfDeaf = selfDeaf;
      return this;
    }

    /**
     * 
     * @description Set voice channel id to join or play something there.
     * @param {string} channelId 
     * @returns {Player}
     */
    setVoiceChannelId(channelId) {
      this.data.channelId = channelId;
      return this;
    }

    /**
     * 
     * @description Start playing resource in the voice.
     * @param {string} resource 
     * @returns {import("@discordjs/voice").AudioPlayer}
     */
    async play(resource) {
      const connection = this.join();
      const player = createAudioPlayer(audioPlayerData);
      player.play(
        createAudioResource(await this.#createStream(resource), audioResourceData)
      );
      connection.subscribe(player);
      audioPlayer.set(this.data.guildId, player);
      return player;
    }

    /**
     * 
     * @description Join to voice channel.
     * @param {string} guildId
     * @returns {import("@discordjs/voice").VoiceConnection}
     */
    join() {
      if (this.isConnection(this.data.guildId))
        return getVoiceConnection(this.data.guildId);

      return joinVoiceChannel(this.data);
    }

    /**
     * 
     * @description Find a voice connection and return it.
     * @returns {import("@discordjs/voice").VoiceConnection}
     */
    get connection() {
      return getVoiceConnection(this.data.guildId);
    }

    /**
     * 
     * @description Find a voice connection and return it to boolean.
     * @param {string} guildId
     * @returns {boolean}
     */
    isConnection(guildId) {
      if (getVoiceConnection(guildId))
        return true;

      return false;
    }

    /**
     * 
     * @description Get player volume numver and return it.
     * @returns {number}
     */
    get volume() {
      const player = audioPlayer.get(this.data.guildId);
      return Number(player.state.resource.volume.volume * 100);
    }

    /**
     * 
     * @description Find a voice connection and return it to boolean.
     * @param {number} input 
     * @returns {number}
     */
    setVolume(input) {
      const connection = this.connection;
      const player = audioPlayer.get(this.data.guildId);
      if (input <= 200 && input >= 0)
        player.state.resource.volume.volume = input / 100;

      connection.subscribe(player);
      return Number(this.volume);
    }

    /**
     * 
     * @description Check is player paused or not and return boolean.
     * @returns {boolean}
     */
    isPaused() {
      const player = audioPlayer.get(this.data.guildId);
      if (player.state.status === "paused")
        return true;

      else return false;
    }

    /**
     * 
     * @description Pausing the player.
     * @returns {void}
     */
    pause() {
      const connection = this.connection;
      const player = audioPlayer.get(this.data.guildId);
      if (!this.isPaused())
        player.pause();

      connection.subscribe(player);
      return this;
    }

    /**
     * 
     * @description Resuming the player.
     * @returns {void}
     */
    resume() {
      const connection = this.connection;
      const player = audioPlayer.get(this.data.guildId);
      if (this.isPaused())
        player.unpause();

      connection.subscribe(player);
      return this;
    }

    /**
     * 
     * @description Stop the player and break the connection.
     * @returns {void}
     */
    stop() {
      const connection = this.connection;
      const player = audioPlayer.get(this.data.guildId);
      player.stop();
      connection.disconnect();
      audioPlayer.delete(this.data.guildId);
      return this;
    }

    /**
     * 
     * @param {string} url 
     * @returns {stream}
     */
    async #createStream(url) {
      try {
        const response = await fetch(url);
        url = response.url;
      } catch {
        url = url;
      }

      return url;
    }
  }
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