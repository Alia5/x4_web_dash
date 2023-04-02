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
    playerMoney: {
        fn: PlayerInfoApi.getPlayerMoney,
        intervalMs: 1500
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
