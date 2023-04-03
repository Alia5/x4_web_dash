<script lang="ts">
import MessageDisplay from '../components/MessageDisplay.svelte';
import SideBar from '../components/SideBar.svelte';

const minPx = 100;
let sidebarWidth = Number(window.localStorage.getItem('sidebarWidth')) || 0;
let mouseDown = false;



</script>

<div class="base-grid" style="--sidebarWidth: {sidebarWidth <= minPx ? '25%' : `${sidebarWidth}px`}" on:mouseup={() => mouseDown = false} on:mousemove={(ev) => {
    if (mouseDown) {
        sidebarWidth = ev.x;
        window.localStorage.setItem('sidebarWidth', `${sidebarWidth}`);
    }
}}>
    <SideBar />
    <div class="handle" on:mousedown={() => {
        console.log('mousedown');
        mouseDown = true;
    }}/>
    <MessageDisplay />
</div>

<style>
  .base-grid {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: var(--sidebarWidth) 5px 1fr;
    position: absolute;
    inset: 0;
  }

  .handle {
    background-color: #00000075;
    cursor: ew-resize;
  }

</style>
