<script>
    import { Button, Icon, Slider } from 'svelte-materialify/src';
    import {    mdiPlay, mdiPause, mdiFastForward, mdiRewind, mdiSkipNext, mdiSkipPrevious,
                mdiVolumeMedium, mdiVolumeHigh, mdiFolder, mdiFullscreen, mdiFullscreenExit,
                mdiSubtitles, mdiTune} from '@mdi/js';

    let slider = 0;
    let min = 4, max = 8;

    let playing = false;
    let fullscreen = false;

    const playOrPause = () => {
        playing = !playing;
    }

    const toggleFullScreen = () => {
        fullscreen = !fullscreen;
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
            Adventure.Time.With.Finn.And.Jake.S03E14.1080p.BluRay.x264-DEiMOS.mkv
        </div>
    </div>

    <!-- Timeline -->
    <div class="d-flex flex-row ml-4 mr-4">
        <span class="s-input s-icon time-code">0:00</span>
        <div style="flex-grow: 1" class="mr-3 ml-3">
            <Slider/>
        </div>
        <span class="s-input s-icon time-code">0:00</span>
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
                {#if playing}
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
        <Slider>
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
            {#if fullscreen}
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

