<script>
    import { Icon, Button, AppBar, MaterialApp } from 'svelte-materialify/src';
    import { mdiMenu } from '@mdi/js';
    import MediaController from "./components/MediaController.svelte";
    import FileBrowser from "./components/FileBrowser.svelte";

    import { metadata } from './store';

    let theme = 'dark';

    let mediaOpen = false;

    function onPlay(resMeta) {
        metadata.set({...resMeta.detail});
        mediaOpen = true;
    }

    function onBack() {
        mediaOpen = false;
    }
</script>

<style>
    :global(.s-app) {
        display: flex;
        flex-direction: column;
    }
    :global(.s-app-bar) {
        flex-grow: 0 !important;
    }
    :global(body, html) {
        background-color: #212121;
    }
</style>

<MaterialApp {theme}>
    <AppBar class="primary-color">
        <div slot="icon">
            <Button fab depressed class="primary-color">
                <Icon path={mdiMenu} />
            </Button>
        </div>
        <span slot="title">MPV Remote</span>
    </AppBar>

    {#if !mediaOpen}
        <FileBrowser on:play={onPlay}/>
    {:else}
        <MediaController on:back={onBack}/>
    {/if}
</MaterialApp>