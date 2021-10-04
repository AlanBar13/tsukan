import { LocalNotifications } from '@capacitor/local-notifications'
import { Reminders } from '../models'

class Notifications {
    public async schedule(hour: number, minute: number){
        try{
            if(!((await LocalNotifications.requestPermissions()).display === 'granted')) return;
            const pending = await LocalNotifications.getPending()
            if(pending.notifications.length > 0){
                await LocalNotifications.cancel(pending)
            }
            await LocalNotifications.schedule({
                notifications: [{
                    title: 'Testerino',
                    body: 'body test',
                    id: 1,
                }]
            })
        }catch(e){
            console.log(e)
        }
    }

    public async repeatSchedule(reminder: Reminders){
        try{
            if(!((await LocalNotifications.requestPermissions()).display === 'granted')) return;
            await LocalNotifications.schedule({
                notifications: [{
                    title: 'XPENSE Recordatorio',
                    body: reminder.message,
                    id: reminder.id,
                    schedule:{
                        every: reminder.every,
                        on:{
                            day: reminder.day,
                            hour: reminder.hour,
                            minute: reminder.minutes
                        }
                    }
                }]
            })
        }catch(e){
            console.log(e)
        }
    }

    public async cancelPendingNotifications(id: number){
        try {
            const pending = await LocalNotifications.getPending()
            if(pending.notifications.length > 0){
                await LocalNotifications.cancel({ notifications: [{ id }]})
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export default new Notifications()