<script>
    import { Icon, Button, AppBar, MaterialApp } from 'svelte-materialify/src';
    import { mdiMenu } from '@mdi/js';
    import MediaController from "./components/MediaController.svelte";
    import FileBrowser from "./components/FileBrowser.svelte";

    import { metadata } from './store';

    let theme = 'dark';

    let mediaOpen = false;

    const onPlay = (resMeta) => {
        metadata.set({...resMeta.detail});
        mediaOpen = true;
    }
</script>

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
        <MediaController/>
    {/if}
</MaterialApp>