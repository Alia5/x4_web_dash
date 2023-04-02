<!--
Copyright 2021-2023 Peter Repukat - FlatspotSoftware

Use of this source code is governed by the MIT
license that can be found in the LICENSE file or at
https://opensource.org/licenses/MIT.
-->

<script lang="ts">
import { Duration } from 'luxon';
import { onDestroy, onMount } from 'svelte';
import { gameCommons } from '../store/gameCommons';
import { messages } from '../store/messagesStore';
import { pollingIntervals } from '../store/pollingInterval';
import { fade, slide } from 'svelte/transition';
import { MessageCategory, type Message } from '../api/messages';

import FluentMailMultiple from '~icons/fluent/mail-multiple-24-regular';
import FluentMailWarning from '~icons/fluent/mail-warning-24-regular';
import FluentMail from '~icons/fluent/mail-24-regular';
import MdiClose from '~icons/mdi/close';
import MdiSearch from '~icons/mdi/search';

$: msgStore = $messages;
$: currentGameTime = $gameCommons.currentGameTime;

let searchTerm = '';
let category: MessageCategory = MessageCategory.ALL;
$: msgList = [...(msgStore?.messages?.messages || [])]
    .filter((msg) => msg.category === category || category === MessageCategory.ALL)
    .filter((msg) => msg.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => b.time - a.time);

let selectedMessage: Message|undefined = undefined;

onMount(() => {
    pollingIntervals.set('messages', 2000);
});

onDestroy(() => {
    pollingIntervals.set('messages', 0);
});


</script>

<div class="messages-container">
    <div class="category-picker">
        <button
            title="All messages"
            on:click={() => category = MessageCategory.ALL}
            class:active-category={category === MessageCategory.ALL}
        ><FluentMailMultiple /></button>
        <button
            title="High priority messages"
            on:click={() => category = MessageCategory.HIGHPRIO}
            class:active-category={category === MessageCategory.HIGHPRIO}
        ><FluentMailWarning /></button>
        <button
            title="Low priority messages"
            on:click={() => category = MessageCategory.LOWPRIO}
            class:active-category={category === MessageCategory.LOWPRIO}
        ><FluentMail /></button>
    </div>
    <div class="searchbox">
        <input placeholder="Search" bind:value={searchTerm} />
        <div class="search-icon">
            <MdiSearch />
        </div>
        {#if searchTerm}
            <button on:click={() => searchTerm = ''} transition:fade={{duration: 200}}> <MdiClose /> </button>
        {/if}
    </div>
    <div class="messagelist-wrapper">
        <div class="messagelist">
            {#each msgList as message (message.id) }
                <div class="message-wrapper" transition:fade|local>
                    <button
                        class={`message ${message.isread ? '' : 'unread'}`} 
                        on:click={() => selectedMessage = message}
                        class:message-selected={selectedMessage?.id === message.id}
                        transition:slide|local
                    >
                        <p>{message.title}</p>
                        <p>{
                            (Duration.fromMillis(((currentGameTime || 0) - message.time) * 1000)
                                .toFormat('dD hhH mm')+'m ago').toLowerCase().replace(/0d /g, '')
                        }</p>
                    </button>
                </div>
            {/each}
        </div>
    </div>
</div>


<style>

    .messages-container {
        flex: 1;
        position: relative;
        display: flex;
        flex-direction: column;
    }

    .category-picker {
        display: flex;
        flex-direction: row;
        gap: 0.5em;
        margin-bottom: 0.5em;
    }

    .category-picker > button {
        padding: 0.4rem;
        font-size: 2em;
        margin: 0;
    }

    .active-category {
        box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.5);
        background-color: var(--colorPrimaryActive);
    }

    .searchbox {
        position: relative;
        display: block
    }

    .search-icon {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        height: 100%;
        margin: auto;
        padding: 0.25em;
    }

    .searchbox > input {
        width: 100%;
        padding-left: 1.5em;
    }

    .searchbox > button {
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

    .messagelist-wrapper {
        flex: 1;
        position: relative;
    }

    .messagelist {
        position: absolute;
        max-height: 100%;
        overflow: overlay;
        display: flex;
        flex-direction: column;
        padding-right: var(--scrollBarWidth);
    }

    .message-wrapper {
        display: flex;
        flex-direction: column;
        gap: 0.5em;
    }

    .message {
        padding: 0.25em 0.25em 0em 0.25em;
        margin: 0.25em;
        border: 1px solid transparent;
        border-radius: 6px;
        transition: border 0.1s ease-in-out;
        box-shadow: none;
        background-color: transparent;
        display: flex;
        flex-direction: row;
        text-align: start;
        gap: 2em;
        justify-content: space-between;
        font-size: 0.9em;
        align-items: center;
    }

    .message :nth-child(even) {
        text-align: end;
        white-space: nowrap;
        font-size: 0.8em;
        opacity: 0.7;
    }

    .message:hover {
        border-bottom: 1px solid rgba(255, 255, 255, 0.66)
    }

    .message:focus {
        border-bottom: 1px solid rgba(255, 255, 255, 0.3)
    }
    .message-selected, .message:active {
        border-bottom: 1px solid rgba(255, 255, 255, 0.9) !important
    }

    .unread {
        font-weight: bold;
    }
</style>