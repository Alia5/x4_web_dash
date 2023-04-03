<script lang="ts">
import MessageDisplay from '../components/MessageDisplay.svelte';
import SideBar from '../components/SideBar.svelte';
</script>

<div class="base-grid">
    <SideBar />
    <MessageDisplay />
</div>

<style>
  .base-grid {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: 25% 1fr;
    position: absolute;
    inset: 0;
  }
</style>
