const router = require('express').Router();
const fs = require('fs');

const homedir = require('os').homedir();

router.get('/', (req, res) => {
    const path = req.headers.path ? req.headers.path : homedir;
    fs.readdir(path, (err, files) => {
        if(!err) {
            let dir = [];
            files.forEach((file) => {
                if(file.charAt(0) !== '.') {
                    if(fs.lstatSync(path + '/' + file).isDirectory()) {
                        dir.push({type: 'folder', name: file});
                    } else {
                        dir.push({type: 'file', name: file});
                    }
                }
            })
            res.json({path: homedir, contents: dir});
        }
    })
});

module.exports = router;