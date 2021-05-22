<script>
    import { Button, Icon, Slider } from 'svelte-materialify/src';
    import { host, axios } from '../axiosSettings';
    import {    mdiPlay, mdiPause, mdiFastForward, mdiRewind, mdiSkipNext, mdiSkipPrevious,
                mdiVolumeMedium, mdiVolumeHigh, mdiFolder, mdiFullscreen, mdiFullscreenExit,
                mdiSubtitles, mdiTune} from '@mdi/js';

    import { metadata } from '../store';

    let localTimer = null;

    let player = {
        playing: false,
        fullscreen: false,
        title: '',
        duration: 0,
        position: 0,
        volume: 0,
        play: () => {
            if(localTimer === null) {
                player.playing = true;
                localTimer = setInterval(() => { player.position++ }, 1000);
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
        const sync = await axios.get(host + '/mpv/sync');
        player.position = sync.data.position;
    }

    const toggleFullScreen = () => {
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

<div class="d-flex flex-column" style="height: 90vh;">
    <!--Filename-->
    <div class="d-flex flex-column flex-grow-1 justify-center">
        <div class="pl-5 pr-5 text-subtitle-1 text-center longtext">
            {player.title}
        </div>
    </div>

    <!-- Timeline -->
    <div class="d-flex flex-row ml-4 mr-4">
        <span class="s-input s-icon time-code">{toTimeCode(player.position)}</span>
        <div style="flex-grow: 1" class="mr-3 ml-3">
            <Slider thumb={toTimeCode} 0 max={Math.floor(player.duration)} bind:value={player.position}/>
        </div>
        <span class="s-input s-icon time-code">{'-' + toTimeCode(player.duration-player.position)}</span>
    </div>

    <!-- Media controls -->
    <div>
        <div class="d-flex justify-center mt-15">
            <Button icon style="width: 50px; height: 50px; margin-top: 28px" class="mr-3 ml-3">
                <Icon path={mdiSkipPrevious} size="60px"/>
            </Button>
            <Button icon style="width: 50px; height: 50px; margin-top: 28px" class="mr-3 ml-3">
                <Icon path={mdiRewind} size="60px"/>
            </Button>
            <Button icon class="mr-3 ml-3" style="width: 104px; height: 104px;" on:click={playOrPause}>
                {#if player.playing}
                    <Icon path={mdiPause} size="130px"/>
                {:else}
                    <Icon path={mdiPlay} size="130px"/>
                {/if}
            </Button>
            <Button icon style="width: 50px; height: 50px; margin-top: 28px" class="mr-3 ml-3">
                <Icon path={mdiFastForward} size="60px"/>
            </Button>
            <Button icon style="width: 50px; height: 50px; margin-top: 28px" class="mr-3 ml-3">
                <Icon path={mdiSkipNext} size="60px"/>
            </Button>
        </div>
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
        <Button icon size="x-large" class="mr-3 ml-3">
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

