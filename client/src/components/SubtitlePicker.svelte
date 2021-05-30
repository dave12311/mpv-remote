<script>
    import { Dialog, List, ListItem } from 'svelte-materialify';
    import {createEventDispatcher} from "svelte";

    const dispatch = createEventDispatcher();

    let active = false;

    let subtitles = [];

    export function open(subs) {
        // Renumber subtitle IDs
        let fixed = [];
        let count = 1;
        subs.forEach(s => { fixed.push({ ...s, number: count++ }) });
        subtitles = [{number: -1, name: 'None'}, ...fixed];
        active = true;
    }

    function subSelect(e) {
        dispatch('selected', e.target.id);
        active = false;
    }
</script>

<Dialog bind:active>
    <List>
        {#each subtitles as subLine}
            <ListItem on:click={subSelect}>
                <div id={subLine.number}>
                    {#if subLine.hasOwnProperty('language')}
                        {subLine.language} -
                    {/if}

                    {subLine.name}
                </div>
            </ListItem>
        {/each}
    </List>
</Dialog>

