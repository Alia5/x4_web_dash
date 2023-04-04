<script lang="ts">
import MessagesList, { selectedMessage } from '../../components/MessagesList.svelte';
import { sidebarContent } from '../../store/sidebar';
sidebarContent.set(MessagesList);

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
    
    