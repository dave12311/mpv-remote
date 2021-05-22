const router = require('express').Router();
const mpv = require("../../mpvInterface");

// Start playing the file specified in the request body
router.post('/open', async (req, res) => {
    const metadata = await mpv.playFile(req.body.path);
    res.status(200).send(metadata);
});

// Start playback
router.post('/play', async (req, res) => {
    await mpv.play();
    res.sendStatus(200);
});

// Pause playback
router.post('/pause', async (req, res) => {
    await mpv.pause();
    res.sendStatus(200);
});

// Get the current position
router.get('/sync', async (req, res) => {
    const pos = await mpv.getPosition();
    res.send({position: pos});
});

module.exports = router;