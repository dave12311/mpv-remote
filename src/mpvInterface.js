const mpvAPI = require('node-mpv');

let screenNum = 0;

const args = [
    '--screen=' + screenNum
];

let client = new mpvAPI({}, args);

const restartAgent = async () => {
    console.log('MPV instance closed, creating a new one...');
    client = new mpvAPI({}, args);
    client.on('quit', restartAgent);
    try {
        await client.start();
        console.log('MPV started');
    } catch (e) {
        console.log(e);
    }
};

client.start()
    .then(() => {
        console.log('MPV started');
    })

client.on('quit', restartAgent);

const mpvInterface = {
    playFile: async path => {
        let metadata = {};

        try {
            await client.load(path);
            metadata.duration = Math.floor(await client.getDuration());
            metadata.position = Math.floor(await client.getTimePosition());
            metadata.title = await client.getTitle();
            metadata.volume = await client.getProperty('volume');
            await client.play();
        } catch (err) {
            console.log(err);
        }

        return metadata;
    },
    play: () => {
        return client.play();
    },
    pause: () => {
        return client.pause();
    },
    getPosition: () => {
        return client.getTimePosition();
    },
    setPosition: pos => {
        return client.goToPosition(pos);
    }
};

module.exports = mpvInterface;