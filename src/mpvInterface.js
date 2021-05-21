const mpvAPI = require('node-mpv');

let client = null;

const mpvInterface = {
    start: async () => {
        if(client === null) {
            client = new mpvAPI();
        }

        client.on('quit', () => {
            client = null;
        })

        try {
            await client.start();
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    },
    playFile: async path => {
        let metadata = {};

        if(client === null) {
            await mpvInterface.start();
        }

        try {
            await client.load(path);
            metadata.duration = await client.getDuration();
            metadata.position = (await client.getTimePosition());
            metadata.title = await client.getTitle();
        } catch (err) {
            console.log(err);
        }

        return metadata;
    }
};

module.exports = mpvInterface;