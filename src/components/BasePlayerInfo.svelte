<!--
Copyright 2021-2023 Peter Repukat - FlatspotSoftware

Use of this source code is governed by the MIT
license that can be found in the LICENSE file or at
https://opensource.org/licenses/MIT.
-->

<script lang="ts">
import { Duration } from 'luxon';
import { gameCommons } from '../store/gameCommons';
import { playerInfo } from '../store/playerInfo';
import { formatNumber, X4BaseDate, X4DateStr } from '../utils/x4utils';
</script>

<div class="player-info">
    <p>
        {$playerInfo.playerName ?? ' '}{'\n'}<span class="faction">{$playerInfo.playerFactionName ?? ' '}</span>
    </p>
    <p>
        {$playerInfo.playerSectorName ?? ' '}
    </p>
    <p>
        {formatNumber($playerInfo.playerMoney ?? 0, 'Cr')}
    </p>
    <p>
        {X4DateStr(
            X4BaseDate()
                .plus(
                    Duration.fromMillis(($gameCommons.currentGameTime ?? 0) * 1000)
                )
        )}
    </p>
    {#if $playerInfo.creditsDueFromPlayerTrades || $playerInfo.creditsDueFromPlayerBuilds}
        <p class="credits-due">
            Credits due: {
                formatNumber(($playerInfo.creditsDueFromPlayerTrades ?? 0) + ($playerInfo.creditsDueFromPlayerBuilds ?? 0), 'Cr')
            }{
                #if $playerInfo.creditsDueFromPlayerTrades && !$playerInfo.creditsDueFromPlayerBuilds
            }{' '}(trades){/if}{
                #if !$playerInfo.creditsDueFromPlayerTrades && $playerInfo.creditsDueFromPlayerBuilds
            }{' '}(builds){/if}
        </p>
        {#if $playerInfo.creditsDueFromPlayerTrades && $playerInfo.creditsDueFromPlayerBuilds}
            <p class="credits-due">
                {#if $playerInfo.creditsDueFromPlayerTrades}
                    Trades: {formatNumber($playerInfo.creditsDueFromPlayerTrades ?? 0, 'Cr')}{'\n'}
                {/if}
                {#if $playerInfo.creditsDueFromPlayerBuilds}
                    Builds: {formatNumber($playerInfo.creditsDueFromPlayerBuilds ?? 0, 'Cr')}
                {/if}
            </p>
        {/if}
    {/if}
</div>

<style lang="postcss">
    .player-info {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1em;
        background-color: #00000075;
        padding: 1em;
        border-radius: 8px;
        box-shadow: 0px 4px 4px 0px #0000002a;
        & p {
            min-width: 40%;
            margin: auto 0 auto 0;
            white-space: pre-line;
        }
        & :nth-child(even) {
            text-align: end;
        }
    }

    .credits-due {
        opacity: 0.7;
        font-size: 0.9em;
    }

    .faction {
        font-size: 0.8em;
        opacity: 0.7;
    }

</style>
