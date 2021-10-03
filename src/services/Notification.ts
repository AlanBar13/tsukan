import { LocalNotifications, ScheduleEvery } from '@capacitor/local-notifications'

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

    public async repeatSchedule(body: string, every: ScheduleEvery, hour: number, minute: number, day: number){
        try{
            if(!((await LocalNotifications.requestPermissions()).display === 'granted')) return;
            await LocalNotifications.schedule({
                notifications: [{
                    title: 'EXPENSE Reminder',
                    body: body,
                    id: Math.floor(Math.random() * 100),
                    schedule:{
                        every: every,
                        on:{
                            day: day,
                            hour: hour,
                            minute: minute
                        }
                    }
                }]
            })
        }catch(e){
            console.log(e)
        }
    }

    public async cancelPendingNotifications(){
        try {
            const pending = await LocalNotifications.getPending()
            if(pending.notifications.length > 0){
                console.log(pending)
                await LocalNotifications.cancel(pending)
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export default new Notifications()