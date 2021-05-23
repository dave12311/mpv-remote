<script>
    import { Button, Icon, Slider } from 'svelte-materialify/src';
    import { host, axios } from '../axiosSettings';
    import { createEventDispatcher } from 'svelte';
    import {    mdiPlay, mdiPause, mdiFastForward, mdiRewind, mdiSkipNext, mdiSkipPrevious,
                mdiVolumeMedium, mdiVolumeHigh, mdiFolder, mdiFullscreen, mdiFullscreenExit,
                mdiSubtitles, mdiTune} from '@mdi/js';

    import { metadata } from '../store';

    const dispatch = createEventDispatcher();

    let localTimer = null;

    let player = {
        playing: false,
        fullscreen: false,
        title: '',
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
        },
        pause: () => {
            if(localTimer !== null) {
                player.playing = false;
                clearInterval(localTimer);
                localTimer = null;
            }
        }
    };

    // Store 'player.duration' because Sliders can't reference it directly?
    let max = 0;

    const updateMetadata = data => {
        player = {...player, ...data};
        max = player.duration;
        player.previousPosition = player.position;

        player.play();
    }

    metadata.subscribe(updateMetadata);

    const toTimeCode = num => {
        const pad = num => {
            return num < 10 ? '0' + num : num;
        };

        let timeCode = '';
        if(num >= 3600) {
            timeCode += pad(Math.floor(num/3600)) + ':';
        }

        return timeCode + pad(Math.floor(num / 60)) + ':' + pad(Math.floor(num % 60));
    }

    const playOrPause = async () => {
        if(player.playing) {
            await axios.post(host + '/mpv/pause');
            player.pause();
        } else {
            player.play();
            await axios.post(host + '/mpv/play');
        }
        const sync = await axios.get(host + '/mpv/position');
        player.position = sync.data.position;
    }

    const setPosition = async () => {
        await axios.post(host + '/mpv/position', {
            position: player.position
        });
        player.previousPosition = player.position;
    }

    const folderView = () => {
        dispatch('back');
    }

    const toggleFullScreen = async () => {
        await axios.post(host + '/mpv/fullscreen', {
            fullscreen: !player.fullscreen
        });
        player.fullscreen = !player.fullscreen;
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
        <Button icon style="width: 15%; height: 100%;">
            <Icon path={mdiRewind} size="20%"/>
        </Button>
        <Button icon style="width: 40%; height: 100%" on:click={playOrPause}>
            {#if player.playing}
                <Icon path={mdiPause} size="50%"/>
            {:else}
                <Icon path={mdiPlay} size="50%"/>
            {/if}
        </Button>
        <Button icon style="width: 15%; height: 100%;">
            <Icon path={mdiFastForward} size="20%"/>
        </Button>
        <Button icon style="width: 15%; height: 100%;">
            <Icon path={mdiSkipNext} size="20%"/>
        </Button>
    </div>

    <!-- Volume -->
    <div class="mr-4 ml-4 mt-15">
        <Slider 0 100 bind:value={player.volume}>
          <span slot="prepend-outer">
            <Icon path={mdiVolumeMedium} />
          </span>
          <span slot="append-outer">
            <Icon path={mdiVolumeHigh} />
          </span>
        </Slider>
    </div>

    <!-- Control buttons -->
    <div class="d-flex flex-row justify-center mt-5">
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
        <Button icon size="x-large" class="mr-3 ml-3">
            <Icon path={mdiSubtitles}/>
        </Button>
        <Button icon size="x-large" class="mr-3 ml-3">
            <Icon path={mdiTune}/>
        </Button>
    </div>
</div>

