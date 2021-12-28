const mpvAPI = require('node-mpv');
const { checkSubtitles } = require('./subtitles');

/**
 * Monitor ID to display MPV on
 * @type {number}
 */
let screenNum = 0;

/**
 * Additional arguments for MPV
 * @type {string[]}
 */
const args = [
    '--screen=' + screenNum
];

let client = new mpvAPI({}, args);

/**
 * Restarts mpv if closed
 * @returns {Promise<void>}
 */
async function restartAgent () {
    console.log('MPV instance closed, creating a new one...');
    client = new mpvAPI({}, args);
    client.on('quit', restartAgent);
    try {
        await client.start();
        console.log('MPV started');
    } catch (e) {
        console.log(e);
    }
}

client.start()
    .then(() => {
        console.log('MPV started');
    })

client.on('quit', restartAgent);

const mpvInterface = {
    /**
     * Open the specified file and start playing. Returns metadata about the opened file.
     * @param path
     * @returns {Promise<{duration, position, path, subtitles, title, volume}>}
     */
    playFile: async path => {
        let metadata = {};

        await client.load(path);
        metadata.duration = Math.floor(await client.getDuration());
        metadata.position = Math.floor(await client.getTimePosition());
        metadata.path = path;
        metadata.subtitles = await checkSubtitles(path);
        metadata.title = await client.getTitle();
        metadata.volume = await client.getProperty('volume');
        await client.play();

        return metadata;
    },

    /**
     * Start playback.
     * @returns {Promise<void>}
     */
    play: () => { return client.play(); },

    /**
     * Pause playback.
     * @returns {Promise<void>}
     */
    pause: () => { return client.pause(); },

    /**
     * Get the current position of the player (rounded to int)
     * @returns {Promise<number>}
     */
    getPosition: async () => { return Math.round(await client.getTimePosition()); },

    /**
     * Set the position of the player
     * @param pos - in seconds
     * @returns {Promise<void>}
     */
    setPosition: async pos => { return client.goToPosition(pos) },

    /**
     * Set fullscreen
     * @param state - boolean
     * @returns {Promise<void>}
     */
    setFullscreen: state => { return state ? client.fullscreen() : client.leaveFullscreen(); },

    /**
     * Set the volume of the player
     * @param volume - number between 0-100
     * @returns {Promise<void>}
     */
    setVolume: volume => { return client.volume(volume); },

    /**
     * Seek to a position relative to the current position
     * @param time - in seconds
     * @returns {Promise<void>}
     */
    seek: time => { return client.seek(time); },

    /**
     * Cycle to the next subtitle (including no subtitle state)
     * @returns {Promise<void>}
     */
    nextSubtitle: () => { return client.cycleSubtitles(); },

    /**
     * Hide subtitles
     * @returns {Promise<void>}
     */
    hideSubtitles: () => { return client.hideSubtitles(); },

    selectSubtitle: async id => {
        await client.selectSubtitles(id);
        await client.showSubtitles();
    },

    nextAudio: () => { return client.cycleAudioTracks(); }
};

module.exports = mpvInterface;
module.exports.client = client;