<script>
    import {Icon, Button, AppBar, MaterialApp} from 'svelte-materialify/src';
    import {mdiMenu} from '@mdi/js';
    import MediaController from "./components/MediaController.svelte";
    import FileBrowser from "./components/FileBrowser.svelte";

    let theme = 'dark';

    let mediaOpen = true;
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
        <FileBrowser/>
    {:else}
        <MediaController/>
    {/if}
</MaterialApp>