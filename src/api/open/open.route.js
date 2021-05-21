const router = require('express').Router();
const mpv = require("../../mpvInterface");

router.post('/', async (req, res) => {
    mpv.playFile(req.body.path)
        .then(metadata => {
            res.status(200).send(metadata);
        });
});

module.exports = router;