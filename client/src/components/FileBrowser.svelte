<script>
    import { Snackbar, TextField, Icon, Button, List, ListItem } from 'svelte-materialify/src'
    import { mdiMagnify, mdiFolder, mdiFolderUpload, mdiFile, mdiMoviePlay } from '@mdi/js';
    import { onMount, createEventDispatcher } from "svelte";
    import { host, axios } from '../axiosSettings';

    const dispatch = createEventDispatcher();

    let files;
    let path = '';
    let snackbar = false;

    onMount(() => {
        axios.get(host + '/dir')
        .then(result => {
            files = result.data.contents;
            path = result.data.path;
        })
        .catch(e => {
            snackbar = true;
            console.log(e);
        })
    });

    const changeFolder = p => {
        if (!p) { p = '/' }
        axios.get(host + '/dir', {
            headers: {
                'path': p
            }
        })
            .then(result => {
                files = result.data.contents;
                path = p;
            })
    }

    const onFolderSelect = e => {
        let selected = files.find(o => o.name === e.target.innerText);
        if (selected.type === 'folder') {
            changeFolder(path === '/' ? path + selected.name : path + '/' + selected.name);
        } else if(selected.type === 'media') {
            axios.post(host + '/mpv/open', {
                path: path + '/' + selected.name
            })
            .then(res => {
                dispatch('play', res.data);
            })
        }
    }

    const onUpDirectory = e => {
        changeFolder(path.substr(0, path.lastIndexOf('/')));
    }
</script>

<style>
    .float {
        position:fixed;
        width:60px;
        height:60px;
        bottom:30px;
        right:30px;
        text-align:center;
    }

    .scroll {
        overflow-x: auto;
    }

    .scroll::-webkit-scrollbar {
        display: none;
    }

</style>

<div>
    <TextField class="mt-8 mr-5 ml-5 text-white" value={path}>
        <div slot="prepend">
            <Icon path={mdiMagnify}/>
        </div>
        Path
    </TextField>
</div>

<div class="d-flex justify-center flex-grow-1">
    {#if files}
    <List class="mt-4 pb-0 pt-0" style="width: 90%;">
        {#each files as file}
            <ListItem class="d-flex" on:click={onFolderSelect}>
                <span slot="prepend">
                    {#if file.type === 'folder'}
                        <Icon path={mdiFolder}/>
                    {:else if file.type === 'media'}
                        <Icon path={mdiMoviePlay}/>
                    {:else}
                        <Icon path={mdiFile}/>
                    {/if}
                </span>
                <div class="scroll">
                    {file.name}
                </div>
            </ListItem>
        {/each}
    </List>
    {/if}
</div>

<div class="float">
    <Button fab on:click={onUpDirectory}>
        <Icon path={mdiFolderUpload}/>
    </Button>
</div>

<Snackbar class="justify-space-between" bind:active={snackbar} center bottom timeout={5000}>
    Failed to connect to server.
    <Button text on:click={() => { snackbar = false; }}>
        Dismiss
    </Button>
</Snackbar>
