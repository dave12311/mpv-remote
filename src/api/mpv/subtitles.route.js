const router = require('express').Router();
const { extractSubtitles } = require('../../subtitles');
const mpv = require('../../mpvInterface');

router.get('/', async (req, res) => {
    try {
        const subtitles = await extractSubtitles(req.headers.path);
        res.status(200).send(subtitles);
    } catch (e) {
        res.sendStatus(500);
    }
});

router.post('/next', async (req, res) => {
    try {
        await mpv.nextSubtitle();
        res.sendStatus(200);
    } catch (e) {
        res.sendStatus(500);
    }
});

router.post('/hide', async (req, res) => {
    try {
        await mpv.hideSubtitles();
        res.sendStatus(200);
    } catch (e) {
        res.sendStatus(500);
    }
});

router.post('/select', async (req, res) => {
    try {
        await mpv.selectSubtitle(req.body.id);
        res.sendStatus(200);
    } catch (e) {
        res.sendStatus(500);
    }
});

module.exports = router;