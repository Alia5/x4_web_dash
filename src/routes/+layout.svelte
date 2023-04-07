<!--
Copyright 2021-2023 Peter Repukat - FlatspotSoftware

Use of this source code is governed by the MIT
license that can be found in the LICENSE file or at
https://opensource.org/licenses/MIT.
-->
<script lang="ts">
import SectorMap from '../components/SectorMap.svelte';
import SideBar from '../components/SideBar.svelte';
const minPx = 200;
let sidebarWidth = 
    // Number(window.localStorage.getItem('sidebarWidth')) || 
    0;
let mouseDown = false;
    
    
    
</script>
    
<div
    class="base-grid"
    style="--sidebarWidth: {sidebarWidth <= minPx ? '25%' : `${sidebarWidth}px`}"
    on:mouseup={() => mouseDown = false} on:mousemove={(ev) => {
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
    <div class="main-content">
        <SectorMap />

        <div class="overlay-container">
            <slot></slot>
        </div>
    </div>
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

    .main-content {
        position: relative;
        display: flex;
        :first-child {
            width: 100%;
            height: 100%;
        }
    }

    .overlay-container {
        position: absolute;
        inset: 0;
        display: grid;
    }
    
    </style>
    