import { ScheduleEvery } from '@capacitor/local-notifications'

export interface Item {
    id: string;
    title: string;
    category: string;
    amount: number;
    sign: string;
    timestamp: string;
}

export interface Reminders {
    id: number;
    message: string;
    every: ScheduleEvery;
    day: number;
    hour: number;
    minutes: number;
}