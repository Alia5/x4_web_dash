<!--
Copyright 2021-2023 Peter Repukat - FlatspotSoftware

Use of this source code is governed by the MIT
license that can be found in the LICENSE file or at
https://opensource.org/licenses/MIT.
-->
<script lang="ts">
import { onMount, onDestroy } from 'svelte';
import { pollingIntervals } from '../store/pollingInterval';
import { gameCommons } from '../store/gameCommons';
import { LogbookCategory } from '../api/logbook';
import { logbook } from '../store/logbook';

import Input from './Input.svelte';

import MdiSearch from '~icons/ic/baseline-search';
import Coins from '~icons/majesticons/coins-line';
import Person from '~icons/ic/baseline-person';
import { fade } from 'svelte/transition';
import { Duration } from 'luxon';

import { formatNumber } from '../utils/x4utils';

let searchTerm = '';
let category: LogbookCategory = LogbookCategory.ALL;

const PAGE_SIZE = 100;

$: currentGameTime = $gameCommons.currentGameTime;
let pageString = '1';
$: page = (() => {
    const parsed = parseInt(pageString);
    if (parsed <= 0 || isNaN(parsed)) {
        return 1;
    }
    return parsed;
})();
$: filteredEntries = ($logbook?.logbookEntries || []).filter(
    (entry) =>
        (entry.category === category || category === LogbookCategory.ALL) &&
            (searchTerm == '' ||
                entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                entry.text.toLowerCase().includes(searchTerm.toLowerCase()))
);
$: entryList = (() => {
    const start = filteredEntries.length - PAGE_SIZE * page;
    if (start < 0) {
        return (filteredEntries || []).slice(0, -start).reverse();
    }
    return (filteredEntries || []).slice(start, start + PAGE_SIZE).reverse();
})();

onMount(() => {
    pollingIntervals.set('logbookEntries', 2667);
});

onDestroy(() => {
    pollingIntervals.set('logbookEntries', 0);
});
</script>

<div class="wrapper">
    <h2>Logbook</h2>
    <div class="category-picker">
        {#each Object.values(LogbookCategory) as c}
            <button
                title={c}
                on:click={() => (category = c)}
                class:active-category={category === c}>{c}</button
            >
        {/each}
    </div>
    <div class="search-wrapper">
        <Input
            placeholder="Search..."
            bind:value={searchTerm}
            icon={MdiSearch}
            clearable
            style="font-size: 1.4em"
        />
        <div style="position: relative; display: grid; font-size: 1.4em;">
            <input
                placeholder=""
                type="number"
                min="1"
                max={Math.ceil(filteredEntries.length / PAGE_SIZE)}
                bind:value={pageString}
                on:change={() => {
                    const parsed = parseInt(pageString);
                    if (parsed <= 0 || isNaN(parsed)) {
                        pageString = '1';
                    }
                    if (parsed > Math.ceil(filteredEntries.length / PAGE_SIZE)) {
                        pageString = `${Math.ceil(filteredEntries.length / PAGE_SIZE)}`;
                    }
                }}
                style="text-align: end;"
            />
            <div
                style="position: absolute; inset: 0 auto 0 0.5em; display: grid; place-items: center;"
            >
                <p>Page:</p>
            </div>
        </div>
    </div>
    <div class="entrylist-wrapper">
        <div class="entrylist">
            {#each entryList as entry (entry.id)}
                <div class="entry-wrapper" transition:fade|local>
                    <div class="logbook-title">
                        <h3>{entry.title}</h3>
                        <span
                        >{(
                            Duration.fromMillis(
                                ((currentGameTime || 0) - entry.time) * 1000
                            ).toFormat('dD hhH mm') + 'm ago'
                        )
                            .toLowerCase()
                            .replace(/0d /g, '')
                            .replace(/^00h /g, '')}</span
                        >
                    </div>
                    <div class="logbook-text"><p>{entry.text}</p></div>
                    <div class="logbook-footer">
                        <span>
                            {#if entry.factionname || entry.entityname}
                                <Person />
                                {#if entry.factionname}
                                    {entry.factionname}
                                {/if}
                                {#if entry.factionname && entry.entityname}
                                    {' - '}
                                {/if}
                                {#if entry.entityname}
                                    {entry.entityname}
                                {/if}
                            {/if}
                        </span>
                        <span>
                            {#if entry.money >= 1}
                                <Coins />
                                {formatNumber(Math.trunc(entry.money ?? 0), 'Cr')}
                            {/if}
                        </span>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</div>

<style lang="postcss">
  .wrapper {
    flex: 1;
    position: relative;
    display: flex;
    flex-direction: column;
    & h2 {
      padding: 0.5em 1em 0.5em 0;
    }
  }

  .category-picker {
    display: flex;
    flex-direction: row;
    gap: 0.5em;
    margin-bottom: 0.5em;
    flex-wrap: wrap;
    justify-content: space-evenly;
    width: fit-content;
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

  .search-wrapper {
    display: grid;
    grid-template-columns: 1fr 10em;
    gap: 0.5em;
  }

  .entrylist-wrapper {
    flex: 1;
    position: relative;
  }

  .entrylist {
    position: absolute;
    max-height: 100%;
    overflow: overlay;
    display: flex;
    flex-direction: column;
    padding-right: var(--scrollBarWidth);
    width: 100%;
    gap: 0.5em;
  }

  .entry-wrapper {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    margin: 0.5em;
    padding-bottom: 0.5em;
    border-bottom: 1px solid rgb(255 255 255 / 0.4);
  }

  .logbook-title {
    display: flex;
    flex-direction: row;
    gap: 1em;
    justify-content: space-between;
    & :nth-child(even) {
      text-align: end;
      white-space: nowrap;
      font-size: 0.8em;
      opacity: 0.7;
    }
  }

  .logbook-text {
    opacity: 0.9;
    padding: 0.5em;
  }

  .logbook-footer {
    opacity: 0.7;
    display: flex;
    flex-direction: row;
    gap: 1em;
    font-size: 0.9em;
    justify-content: space-between;
    & span {
      display: flex;
      align-items: center;
      gap: 0.5em;
      :global svg {
        width: 1.5em;
        height: 1.5em;
      }
    }
    & :nth-child(even) {
      text-align: end;
      white-space: nowrap;
    }
  }
</style>
