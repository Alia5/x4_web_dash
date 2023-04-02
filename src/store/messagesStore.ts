/*
Copyright 2021-2023 Peter Repukat - FlatspotSoftware

Use of this source code is governed by the MIT
license that can be found in the LICENSE file or at
https://opensource.org/licenses/MIT.
*/

import { MessageCategory, MessagesApi } from '../api/messages';
import { createFetcherStoreFn } from './fetcherStoreUtil';

const CONFIG = {
    numAllMessages: {
        fn: MessagesApi.getNumMessages,
        intervalMs: 0
    },
    numUnreadMessages: {
        fn: () => MessagesApi.getNumMessages(MessageCategory.ALL, true),
        intervalMs: 3000
    },
    messages: {
        fn: MessagesApi.getMessages,
        intervalMs: 0
    }
} as const;


type StoreValues = {
    [key in keyof typeof CONFIG]: Awaited<ReturnType<typeof CONFIG[key]['fn']>>;
}

export const messages = createFetcherStoreFn<StoreValues>(CONFIG)();
