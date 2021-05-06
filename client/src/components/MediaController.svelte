<script>
    import { Button, Icon, } from 'svelte-materialify';
    import { mdiPlay, mdiPause, mdiSkipForward, mdiSkipBackward, mdiSkipNext, mdiSkipPrevious} from '@mdi/js';
</script>

<div class="d-flex justify-center">
    <Button icon size="x-large">
        <Icon path={mdiSkipPrevious} size="60px"/>
    </Button>
    <Button icon size="x-large">
        <Icon path={mdiSkipBackward} size="60px"/>
    </Button>
    <Button icon size="x-large">
        <Icon path={mdiPlay} size="60px"/>
    </Button>
    <Button icon size="x-large">
        <Icon path={mdiSkipForward} size="60px"/>
    </Button>
    <Button icon size="x-large">
        <Icon path={mdiSkipNext} size="60px"/>
    </Button>
</div>