<!--
Copyright 2021-2023 Peter Repukat - FlatspotSoftware

Use of this source code is governed by the MIT
license that can be found in the LICENSE file or at
https://opensource.org/licenses/MIT.
-->

<script lang="ts">
import BasePlayerInfo from './BasePlayerInfo.svelte';
import MessagesList from './MessagesList.svelte';

</script>


<div class="sidebar">
    <BasePlayerInfo />

    <MessagesList />
</div>

<style>
    .sidebar {
        display: flex;
        flex-direction: column;
        margin: 1rem;
        gap: 1em;
    }
</style>