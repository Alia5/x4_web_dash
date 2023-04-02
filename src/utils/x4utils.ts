/*
Copyright 2021-2023 Peter Repukat - FlatspotSoftware

Use of this source code is governed by the MIT
license that can be found in the LICENSE file or at
https://opensource.org/licenses/MIT.
*/

import { DateTime, Duration } from 'luxon';

export const xStringToNumber = (str: string) => 
    Number(str.replace(/(,)|( )|(Cr)/g, ''));

export const xDistanceToKmNumber = (str: string) => 
    xStringToNumber(str.replace(/(,)|( )|(km)|(m)/g, '')) / (str.includes('km') ? 1 : 1000);

export const xDurationStringToDuration = (str: string) => {
    const daySplit = str.split(' ');
    const timeSplit = (daySplit?.pop() ?? str).split(':');
    return Duration.fromObject({
        days: daySplit.length >= 1 ? Number(daySplit[0]) : 0,
        hours: timeSplit.length >= 1 ? Number(timeSplit[0]) : 0,
        minutes: timeSplit.length >= 2 ? Number(timeSplit[1]) : 0,
        seconds: timeSplit.length >= 3 ? Number(timeSplit[2]) : 0
    });
};

// X4 Base Date: 825-02-08 11:00
export const X4BaseDate = () => DateTime.fromObject({
    year: 825,
    month: 2,
    day: 8,
    hour: 11
});

export const X4DateStr = (date: DateTime, withSeconds?: boolean) =>
    date.toFormat(`yyyy-MM-dd HH:mm${withSeconds ? ':ss' : ''}`).replace(/^0/, '');

export const formatNumber = (num: number, suffix?: string) =>
    `${num.toLocaleString()}${suffix ? ` ${suffix}` : ''}`;