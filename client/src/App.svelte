<script>
    import {Icon, Button, AppBar, MaterialApp} from 'svelte-materialify';
    import {mdiMenu} from '@mdi/js';
    import FileBrowser from "./components/FileBrowser.svelte";
    import MediaController from "./components/MediaController.svelte";
    import TopAppBar, {Row, Section, Title} from '@smui/top-app-bar'
    import IconButton from '@smui/icon-button';

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

    {#if !{mediaOpen}}
        <FileBrowser/>
    {:else}
        <MediaController/>
    {/if}
</MaterialApp>