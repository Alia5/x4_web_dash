<!--
Copyright 2021-2023 Peter Repukat - FlatspotSoftware

Use of this source code is governed by the MIT
license that can be found in the LICENSE file or at
https://opensource.org/licenses/MIT.
-->
<script lang="ts">
import type { ComponentType } from 'svelte';
import { fade } from 'svelte/transition';

import MdiClose from '~icons/mdi/close';

export let clearable = false;
export let icon: ComponentType|undefined = undefined;
export let value = '';

const inputPaddingLeft = icon ? '1.6em' : '0.5em';

</script>

<div class="inputbox" style="--input-padding-left: {inputPaddingLeft};">
    <input {...$$props} bind:value={value} />
    <div class="icon">
        {#if icon}
            <svelte:component this={icon} />
        {/if}
    </div>
    {#if clearable && value}
        <button on:click={() => (value = '')} transition:fade={{ duration: 200 }}>
            <MdiClose />
        </button>
    {/if}
</div>

<style lang="postcss">
.inputbox {
    position: relative;
    > input {
        width: 100%;
        padding-left: var(--input-padding-left);
        padding-right: 1.6em;
    }
    > button {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        height: 100%;
        background-color: transparent;
        border: none;
        box-shadow: none;
        margin: auto;
        padding: 0.25em;
    }
    
    .icon {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        height: 100%;
        margin: auto;
        padding: 0.25em;

    }
}

.inputbox :global(svg) {
    width: 100%;
    height: 100%;
}

</style>
