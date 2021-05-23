const router = require('express').Router();
const fs = require('fs');

const homedir = require('os').homedir();

const playableFormats = ['mkv', 'mp4', 'mp3', 'avi', 'mov', 'wav'];

router.get('/', (req, res) => {
    const path = req.headers.path ? req.headers.path : homedir;
    try {
        fs.readdir(path, (err, files) => {
            if(!err) {
                let dir = [];
                files.forEach((file) => {
                    if(file.charAt(0) !== '.') {
                        if(fs.lstatSync(path + '/' + file).isDirectory()) {
                            dir.push({type: 'folder', name: file});
                        } else {
                            if(file.charAt(file.length - 4) === '.') {
                                if(playableFormats.includes(file.slice(-3))) {
                                    dir.push({type: 'media', name: file});
                                } else {
                                    dir.push({type: 'file', name: file});
                                }
                            } else {
                                dir.push({type: 'file', name: file});
                            }
                        }
                    }
                })
                res.json({path: homedir, contents: dir});
            }
        })
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

module.exports = router;