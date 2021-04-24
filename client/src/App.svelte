<script>
    import {Icon, Button, AppBar, MaterialApp} from 'svelte-materialify';
    import {mdiMenu} from '@mdi/js';
    import FileBrowser from "./components/FileBrowser.svelte";

    let theme = 'dark';
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

    <FileBrowser/>
</MaterialApp>