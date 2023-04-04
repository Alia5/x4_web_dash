<script lang="ts">
import SideBar from '../components/SideBar.svelte';
const minPx = 200;
let sidebarWidth = 
    // Number(window.localStorage.getItem('sidebarWidth')) || 
    0;
let mouseDown = false;
    
    
    
</script>
    
<div class="base-grid" style="--sidebarWidth: {sidebarWidth <= minPx ? '25%' : `${sidebarWidth}px`}" on:mouseup={() => mouseDown = false} on:mousemove={(ev) => {
    if (mouseDown) {
        sidebarWidth = ev.x;
    // window.localStorage.setItem('sidebarWidth', `${sidebarWidth}`);
    }
}}>
    <SideBar />
    <div class="handle" on:mousedown={() => {
        console.log('mousedown');
        mouseDown = true;
    }}><div/></div>
    <slot></slot>
</div>
    
<style lang="postcss">
      .base-grid {
        display: grid;
        grid-auto-flow: column;
        grid-auto-columns: var(--sidebarWidth) 5px 1fr;
        position: absolute;
        inset: 0;
      }
    
      .handle {
        background-color: transparent;
        cursor: ew-resize;
        display: flex;
        justify-content: center;
        & * {
            background-color: #0000001F;
            width: 1px;
        }
        &:hover * {
                width: 100%;
        }
      }
    
    </style>
    