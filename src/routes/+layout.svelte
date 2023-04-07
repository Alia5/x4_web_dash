<!--
Copyright 2021-2023 Peter Repukat - FlatspotSoftware

Use of this source code is governed by the MIT
license that can be found in the LICENSE file or at
https://opensource.org/licenses/MIT.
-->
<script lang="ts">
import BasePlayerInfo from '../components/BasePlayerInfo.svelte';
import Logbook from '../components/Logbook.svelte';
import MessagesList from '../components/MessagesList.svelte';
</script>

<div class="wrapper">
    <div class="base-grid">
        <div class="column-wrapper">
            <BasePlayerInfo />
            <MessagesList />
        </div>
        <Logbook />
    </div>

    <div class="overlay-container">
        <slot />
    </div>
</div>

<style lang="postcss">
  .base-grid {
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: repeat(4, 1fr);
    position: absolute;
    inset: 0;
  }

  .column-wrapper {
    display: flex;
    flex-direction: column;
    margin: 1rem;
    gap: 1em;
  }

  .overlay-container {
    position: absolute;
    inset: 0;
    display: flex;
    pointer-events: none;
  }
  .overlay-container :global(> *) {
    pointer-events: auto;
  }
</style>
