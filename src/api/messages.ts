/*
Copyright 2021-2023 Peter Repukat - FlatspotSoftware

Use of this source code is governed by the MIT
license that can be found in the LICENSE file or at
https://opensource.org/licenses/MIT.
*/

import { api } from './apibase';


export enum MessageCategory {
    ALL = 'all',
    HIGHPRIO = 'highprio',
    LOWPRIO = 'lowprio',
}

export interface Message {
    'bonus': number,
    'category': MessageCategory,
    'cutscenekey': string,
    'entityname': string,
    'factionname': string,
    'highlighted': boolean,
    'id': number,
    'interaction': string,
    'interactioncomponent': number,
    'interactionshorttext': string,
    'interactiontext': string,
    'isread': boolean,
    'money': number,
    'source': string,
    'sourcecomponent': number,
    'text': string,
    'time': number,
    'title': string
}

export interface MessagesResponse {
    length: number,
    messages: Message[]
}

const messagesBuffer: MessagesResponse = {
    length: 0,
    messages: []
};

export const MessagesApi = {
    getNumMessages: async (
        category: MessageCategory = MessageCategory.ALL, onlyUnread?: boolean
    ) => (await api.get<number>('/GetNumMessages', {
        params: {
            category,
            unread: !!onlyUnread
        }
    })).data,
    getMessages: async (
        category: MessageCategory = MessageCategory.ALL, from?: number, count?: number, onlyUnread?: boolean
    ) => {
        if (category === MessageCategory.ALL && !from && !count && !onlyUnread) {
            const numMsgs = await MessagesApi.getNumMessages(category, onlyUnread);
            if (numMsgs === messagesBuffer.length) {
                return messagesBuffer;
            }
        }
        const msgs = (await api.get<MessagesResponse>('/GetMessages', {
            params: {
                category,
                unread: !!onlyUnread,
                from,
                count
            }
        })).data;
        if (category === MessageCategory.ALL && !from && !count && !onlyUnread) {
            Object.assign(messagesBuffer, msgs);
        }
        return msgs;
    }
} as const;