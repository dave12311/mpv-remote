const router = require('express').Router();
const mpv = require('../../mpvInterface');
const subtitles = require('./subtitles.route');

// Start playing the file specified in the request body
router.post('/open', async (req, res) => {
    try {
        const metadata = await mpv.playFile(req.body.path);
        res.status(200).send(metadata);
    } catch (e) {
        res.status(500).send(e);
    }
});

// Start playback
router.post('/play', async (req, res) => {
    try {
        await mpv.play();
        res.sendStatus(200);
    } catch (e) {
        res.sendStatus(500);
    }
});

// Pause playback
router.post('/pause', async (req, res) => {
    try {
        await mpv.pause();
        res.sendStatus(200);
    } catch (e) {
        res.sendStatus(500);
    }
});

// Get the current position
router.get('/position', async (req, res) => {
    try {
        const pos = await mpv.getPosition();
        res.status(200).send({position: pos});
    } catch (e) {
        res.status(500).send(e);
    }
});

router.post('/position', async (req, res) => {
    try {
        await mpv.setPosition(req.body.position);
        res.sendStatus(200);
    } catch (e) {
        res.sendStatus(500);
    }
});

router.post('/fullscreen', async (req, res) => {
    try {
        await mpv.setFullscreen(req.body.fullscreen);
        res.sendStatus(200);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.post('/volume', async (req, res) => {
    try {
        await mpv.setVolume(req.body.volume);
        res.sendStatus(200);
    } catch (e) {
        res.sendStatus(500);
    }
});

router.post('/seek', async (req, res) => {
    try {
        await mpv.seek(req.body.time);
        res.sendStatus(200);
    } catch (e) {
        res.sendStatus(500);
    }
});

router.post('/audio/next', async (req, res) => {
    try {
        await mpv.nextAudio();
        res.sendStatus(200);
    } catch (e) {
        res.sendStatus(500);
    }
})

router.use('/subtitles', subtitles);

module.exports = router;