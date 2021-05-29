const createReadStream = require('fs').createReadStream;
const fileType = require('file-type');
const { SubtitleParser } = require('matroska-subtitles');

/**
 * Returns the array of subtitles in a matroska file
 * @param path
 * @returns {Promise<array>}
 */
function extractSubtitles (path) {
    return new Promise((resolve, reject) => {
        const sub = new SubtitleParser();
        const stream = createReadStream(path);

        fileType.fromStream(stream)
            .then(type => {
                if(type.ext === 'mkv') {
                    try {
                        sub.on('tracks', tracks => resolve(tracks));
                        stream.pipe(sub);
                    } catch (e) {
                        reject(e);
                    }
                } else {
                    resolve([]);
                }
            })
            .catch(err => {
                reject(err);
            });
    });
}

/**
 * Checks if a media file has any subtitles associated with it
 * @param path
 * @returns {Promise<boolean>}
 */
async function hasSubtitles (path) {
    const embedded = await extractSubtitles(path);

    if(embedded.length === 0) {

    } else {
        return true;
    }
}

module.exports = {
    extractSubtitles,
    hasSubtitles
};