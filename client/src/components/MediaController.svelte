<!--suppress SpellCheckingInspection -->
<script>
    import { Button, Icon, Slider, Snackbar } from 'svelte-materialify/src';
    import { host, axios } from '../axiosSettings';
    import { createEventDispatcher } from 'svelte';
    import SubtitlePicker from './SubtitlePicker.svelte'
    import {    mdiPlay, mdiPause, mdiFastForward, mdiRewind, mdiSkipNext, mdiSkipPrevious,
                mdiVolumeMedium, mdiVolumeHigh, mdiFolder, mdiFullscreen, mdiFullscreenExit,
                mdiSubtitles, mdiSubtitlesOutline, mdiTune, mdiSpeaker} from '@mdi/js';

    import { metadata } from '../store';
    import silence from '../silence';

    const dispatch = createEventDispatcher();

    const seekAmount = 10;

    // Snackbar toggles
    let connectionFailed = false;
    let noSubtitles = false;

    let audio = null;

    let localTimer = null;

    // Cache list of subtitles
    let subtitleCache = null;

    // Subtitle picker dialog instance
    let subtitlePicker;

    let player = {
        playing: false,
        fullscreen: false,
        title: '',
        path: '',
        subtitles: 'none',
        duration: 0,
        position: 0,
        previousPosition: 0,
        volume: 0,
        play: () => {
            if(localTimer === null) {
                player.playing = true;
                localTimer = setInterval(() => {
                    if(player.position === player.previousPosition) {
                        player.position++;
                        player.previousPosition = player.position;
                    }
                    if(player.position === player.duration) { player.pause(); }
                }, 1000);
            }
            audio.play();

        },
        pause: () => {
            if(localTimer !== null) {
                player.playing = false;
                clearInterval(localTimer);
                localTimer = null;
            }
            audio.pause();
        }
    };

    // Store 'player.duration' because Sliders can't reference it directly?
    let max = 0;

    metadata.subscribe(mediaOpened);

    /**
     * Create timecode from a number [01:23]
     * @param num - in seconds
     * @returns string
     */
    function toTimeCode(num) {
        const pad = num => {
            return num < 10 ? '0' + num : num;
        };

        let timeCode = '';
        if(num >= 3600) {
            timeCode += pad(Math.floor(num/3600)) + ':';
        }

        return timeCode + pad(Math.floor(num / 60)) + ':' + pad(Math.floor(num % 60));
    }

    /**
     * Wrap function in a try-catch block
     * @param fn
     * @param arg
     * @returns {Promise<void>}
     */
    async function tcWrap(fn, arg) {
        try {
            return await fn(arg);
        } catch (e) {
            console.log(e);
            connectionFailed = true;
            if(player.playing) { player.pause(); }
        }
    }

    /**
     * Return to the folder view
     */
    function folderView() {
        dispatch('back');
    }

    /**
     * Synchronize the local playback timer to MPV
     * @returns {Promise<void>}
     */
    async function sync() {
        const t = await axios.get(host + '/mpv/position');
        player.position = t.data.position;
        player.previousPosition = player.position;
    }

    /**
     * Begin playback. Load metadata of the opened file and start the local timer and media session.
     * @param data
     */
    function mediaOpened(data) {
        player = {...player, ...data};
        max = player.duration;
        player.previousPosition = player.position;

        // New file opened, clear subtitle cache
        subtitleCache = null;

        // Initialize Media Session if available
        if('mediaSession' in navigator) {
            // noinspection JSUnresolvedFunction
            navigator.mediaSession.metadata = new MediaMetadata({
                title: player.title
            });

            audio = document.createElement('audio');
            audio.src = silence(player.duration);
            audio.currentTime = player.position;
            audio.play();

            // noinspection JSUnresolvedVariable
            navigator.mediaSession.playbackState = 'playing';
            // noinspection JSUnresolvedFunction, JSUnresolvedVariable
            navigator.mediaSession.setActionHandler('play', playOrPause);
            // noinspection JSUnresolvedFunction, JSUnresolvedVariable
            navigator.mediaSession.setActionHandler('pause', playOrPause);
            // noinspection JSUnresolvedFunction, JSUnresolvedVariable
            navigator.mediaSession.setActionHandler('seekbackward', function() { return seek(-seekAmount); });
            // noinspection JSUnresolvedFunction, JSUnresolvedVariable
            navigator.mediaSession.setActionHandler('seekforward', function() { return seek(seekAmount); });
            // noinspection JSUnresolvedFunction, JSUnresolvedVariable
            navigator.mediaSession.setActionHandler('previoustrack', function() { /* Code excerpted. */ });
            // noinspection JSUnresolvedFunction, JSUnresolvedVariable
            navigator.mediaSession.setActionHandler('nexttrack', function() { /* Code excerpted. */ });
        }

        player.play();
    }

    function playOrPause() {
        tcWrap(async () => {
            if(player.playing) {
                await axios.post(host + '/mpv/pause');
                player.pause();
                audio.pause();
                // noinspection JSUnresolvedVariable
                navigator.mediaSession.playbackState = 'paused';
            } else {
                await axios.post(host + '/mpv/play');
                player.play();
                audio.play();
                // noinspection JSUnresolvedVariable
                navigator.mediaSession.playbackState = 'playing';
            }
            await sync();
        })
    }

    function setPosition() {
        tcWrap(async () => {
            await axios.post(host + '/mpv/position', { position: player.position });
            audio.currentTime = player.position;
            player.previousPosition = player.position;
        })
    }

    function toggleFullScreen() {
        tcWrap(async () => {
            await axios.post(host + '/mpv/fullscreen', { fullscreen: !player.fullscreen });
            player.fullscreen = !player.fullscreen;
        })
    }

    function updateVolume() {
        tcWrap(async () => { await axios.post(host + '/mpv/volume', { volume: player.volume }) });
    }

    function seek(time) {
        tcWrap(async () => {
            await axios.post(host + '/mpv/seek', { time: time });
            await sync();
        }, time);
    }

    function nextAudio() {
        tcWrap(async () => await axios.post(host + '/mpv/audio/next'));
    }

    function setSubtitle(id) {
        if(id.detail === '-1') {
            tcWrap(async () => { await axios.post(host + '/mpv/subtitles/hide') });
        } else {
            tcWrap(async () => { await axios.post(host + '/mpv/subtitles/select', { id: id.detail }) });
        }
    }

    async function getSubtitles() {
        if (player.subtitles === 'embedded') {
            // Cache available subtitles if not already cached
            if(subtitleCache === null) {
                await tcWrap(async () => {
                    subtitleCache = (await axios.get(host + '/mpv/subtitles', { headers: {'path': player.path}})).data;
                })
            }

            if (subtitleCache.length === 1) {
                await tcWrap(async () => { await axios.post(host + '/mpv/subtitles/next'); });
            } else {
                subtitlePicker.open(subtitleCache);
            }
        } else if (player.subtitles === 'external') {
            await tcWrap(async () => { await axios.post(host + '/mpv/subtitles/next'); });
        } else {
            noSubtitles = true;
        }
    }
</script>

<style>
    .longtext {
        overflow: hidden;
        text-overflow: ellipsis;
        overflow-wrap: anywhere;
    }

    .time-code {
        flex-grow: 0;
        margin-bottom: 7px;
    }

    :global(.s-slider__label) {
        margin-right: 0 !important;
    }
</style>

<div class="d-flex flex-column flex-grow-1">
    <!--Filename-->
    <div class="d-flex flex-column justify-center flex-grow-1">
        <div class="pl-5 pr-5 text-subtitle-1 text-center longtext">
            {player.title}
        </div>
    </div>

    <!-- Timeline -->
    <div class="d-flex flex-row ml-4 mr-4">
        <span class="s-input s-icon time-code">{toTimeCode(player.position)}</span>
        <div style="flex-grow: 1" class="mr-3 ml-3">
            <Slider thumb={toTimeCode} 0 max={player.duration}
                    bind:value={player.position} on:change={setPosition}/>
        </div>
        <span class="s-input s-icon time-code">{'-' + toTimeCode(player.duration-player.position)}</span>
    </div>

    <!-- Media controls -->
    <div class="d-flex flex-row justify-center align-center mt-15">
        <Button icon style="width: 15%; height: 100%;">
            <Icon path={mdiSkipPrevious} size="20%"/>
        </Button>
        <Button icon style="width: 15%; height: 100%;" on:click={function() { return seek(-seekAmount); }}>
            <Icon path={mdiRewind} size="20%"/>
        </Button>
        <Button icon style="width: 40%; height: 100%" on:click={playOrPause}>
            {#if player.playing}
                <Icon path={mdiPause} size="50%"/>
            {:else}
                <Icon path={mdiPlay} size="50%"/>
            {/if}
        </Button>
        <Button icon style="width: 15%; height: 100%;" on:click={function() { return seek(seekAmount); }}>
            <Icon path={mdiFastForward} size="20%"/>
        </Button>
        <Button icon style="width: 15%; height: 100%;">
            <Icon path={mdiSkipNext} size="20%"/>
        </Button>
    </div>

    <!-- Volume -->
    <div class="mr-4 ml-4 mt-15">
        <Slider 0 100 bind:value={player.volume} on:change={updateVolume}>
          <span slot="prepend-outer">
            <Icon path={mdiVolumeMedium} />
          </span>
          <span slot="append-outer">
            <Icon path={mdiVolumeHigh} />
          </span>
        </Slider>
    </div>

    <!-- Control buttons -->
    <div class="d-flex flex-row justify-center mt-5 pb-5">
        <Button icon size="x-large" class="mr-3 ml-3" on:click={folderView}>
            <Icon path={mdiFolder}/>
        </Button>
        <Button icon size="x-large" class="mr-3 ml-3" on:click={toggleFullScreen}>
            {#if player.fullscreen}
                <Icon path={mdiFullscreenExit}/>
            {:else}
                <Icon path={mdiFullscreen}/>
            {/if}
        </Button>
        <Button icon size="x-large" class="mr-3 ml-3" on:click={getSubtitles}>
            {#if player.subtitles !== 'none'}
                <Icon path={mdiSubtitles}/>
            {:else}
                <Icon path={mdiSubtitlesOutline}/>
            {/if}
        </Button>
        <Button icon size="x-large" class="mr-3 ml-3" on:click={nextAudio}>
            <Icon path={mdiSpeaker}/>
        </Button>
        <Button icon size="x-large" class="mr-3 ml-3">
            <Icon path={mdiTune}/>
        </Button>
    </div>
</div>

<SubtitlePicker bind:this={subtitlePicker} on:selected={setSubtitle}/>

<Snackbar class="justify-space-between" bind:active={connectionFailed} center bottom timeout={5000}>
    Failed to connect to server.
    <Button text on:click={() => { connectionFailed = false; }}>
        Dismiss
    </Button>
</Snackbar>

<Snackbar class="flex-row justify-center" bind:active={noSubtitles} center top rounded timeout={3000}>
    No subtitles available
</Snackbar>
