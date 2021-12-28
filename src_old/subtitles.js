const createReadStream = require('fs').createReadStream;
const exists = require('fs').existsSync;
const fileType = import('file-type');
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
 * Check if a file has any subtitles associated with it
 * @param path
 * @returns {Promise<'external'||'embedded'||'none'>}
 */
async function checkSubtitles (path) {
    let fileName = '';

    // Extract name of file without file extension
    if(path.charAt(path.length - 4) === '.') {
        fileName = path.slice(0, -4);
    } else {
        fileName = path;
    }

    if (exists(fileName + '.srt') || exists(fileName + '.ass')) {
        return 'external';
    } else {
        const embedded = await extractSubtitles(path);

        if (embedded.length === 0) {
            return 'none';
        } else {
            return 'embedded';
        }
    }
}

module.exports = {
    extractSubtitles,
    checkSubtitles
};
