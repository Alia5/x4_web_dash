/*
Copyright 2021-2023 Peter Repukat - FlatspotSoftware

Use of this source code is governed by the MIT
license that can be found in the LICENSE file or at
https://opensource.org/licenses/MIT.
*/

import { ComponentsApi } from '../api/components';
import { PlayerInfoApi } from '../api/playerinfo';
import { createFetcherStoreFn } from './fetcherStoreUtil';

const P_INFO_CONFIG = {
    playerName: {
        fn: PlayerInfoApi.getPlayerName,
        intervalMs: 5000
    },
    playerFactionName: {
        fn: PlayerInfoApi.getPlayerFactionName,
        intervalMs: 5000
    },
    playerId: {
        fn: PlayerInfoApi.getPlayerID,
        intervalMs: 5000
    },
    playerOccupiedShipId: {
        fn: PlayerInfoApi.getPlayerOccupiedShipID,
        intervalMs: 3000
    },
    playerZoneId: {
        fn: PlayerInfoApi.getPlayerZoneID,
        intervalMs: 3000
    },
    playerSectorName: {
        data: {} as Record<string, string|number>,
        fn: async (zoneId?: number) => {
            if (!zoneId) {
                return P_INFO_CONFIG.playerSectorName.data.lastName || '';
            }
            if (zoneId === P_INFO_CONFIG.playerSectorName.data.lastZoneId) {
                return P_INFO_CONFIG.playerSectorName.data.lastName;
            }
            const sectorName = await ComponentsApi.getComponentData<[string]>(zoneId, ['sector']);
            P_INFO_CONFIG.playerSectorName.data.lastName = sectorName;
            P_INFO_CONFIG.playerSectorName.data.lastZoneId = zoneId;
            return sectorName;
        },
        intervalMs: 250,
        dependencies: ['playerZoneId']
    },
    playerMoney: {
        fn: PlayerInfoApi.getPlayerMoney,
        intervalMs: 3000
    },
    creditsDueFromPlayerTrades: {
        fn: PlayerInfoApi.getCreditsDueFromPlayerTrades,
        intervalMs: 3000
    },
    creditsDueFromPlayerBuilds: {
        fn: PlayerInfoApi.getCreditsDueFromPlayerBuilds,
        intervalMs: 3000
    },
    statistics: {
        fn: PlayerInfoApi.getStatistics,
        intervalMs: 0
    }
} as const;


type StoreValues = {
    [key in keyof typeof P_INFO_CONFIG]: Awaited<ReturnType<typeof P_INFO_CONFIG[key]['fn']>>;
}

export const playerInfo = createFetcherStoreFn<StoreValues>(P_INFO_CONFIG)();
