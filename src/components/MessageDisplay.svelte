<script lang="ts">
import { selectedMessage } from './MessagesList.svelte';
</script>

<div>
    <p>
        {$selectedMessage?.text || ''}
    </p>
</div>

<style>
    div {
        padding: 4em;
    }
</style>