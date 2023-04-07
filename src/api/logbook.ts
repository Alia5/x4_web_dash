/*
Copyright 2021-2023 Peter Repukat - FlatspotSoftware

Use of this source code is governed by the MIT
license that can be found in the LICENSE file or at
https://opensource.org/licenses/MIT.
*/
import {api} from './apibase';

export enum LogbookCategory {
    ALL = 'all', 
    GENERAL = 'general',
    MISSIONS = 'missions',
    NEWS = 'news',
    ALERTS = 'alerts',
    UPKEEP = 'upkeep',
    TIPS = 'tips',
}

export interface LogbookEntry {
    id: number;

    'factionname': string,
    'entityname': string,
    'time': number,
    'title': string,
    'bonus': number,
    'category': LogbookCategory,
    'highlighted': boolean,
    'money': number,
    'text': string
}

const logbookBuffers: {
    [K in LogbookCategory]:  LogbookEntry[];
} = {
    [LogbookCategory.ALL]: [],
    [LogbookCategory.GENERAL]: [],
    [LogbookCategory.MISSIONS]: [],
    [LogbookCategory.NEWS]: [],
    [LogbookCategory.ALERTS]: [],
    [LogbookCategory.UPKEEP]: [],
    [LogbookCategory.TIPS]: []
};

const PAGE_SIZE=100;

export const LogbookApi = {
    getNumLogbook: async (category: LogbookCategory = LogbookCategory.ALL) => 
        (await api.get<number>('/GetNumLogbook', {
            params: {
                category
            }
        })).data,
    getLogbook: async (category: LogbookCategory = LogbookCategory.ALL, page = 0): Promise<LogbookEntry[]> => {
        if (page <= 0) {
            const numLogbook = await LogbookApi.getNumLogbook(category);
            if (logbookBuffers[category].length == numLogbook) {
                return logbookBuffers[category];
            }
            if (logbookBuffers[category].length + 99 < numLogbook) {
                logbookBuffers[category] = (await api.get<LogbookEntry[]>('/GetLogbook', {
                    params: {
                        category,
                        page
                    }
                })).data.flat().map((e, idx) => {
                    e.id = idx;
                    return e;
                });
                return logbookBuffers[category];
            }
            const newestEntries = (await LogbookApi.getLogbook(category, 1)).map((e, idx) => {
                e.id = idx;
                return e;
            });
            logbookBuffers[category].length = numLogbook - PAGE_SIZE;
            logbookBuffers[category].push(...newestEntries);
            return logbookBuffers[category];
        }
        return (await api.get<LogbookEntry[]>('/GetLogbook', {
            params: {
                category,
                page
            }
        })).data; 
    }
};