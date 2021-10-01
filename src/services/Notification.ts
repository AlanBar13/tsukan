import { LocalNotifications } from '@capacitor/local-notifications'

class Notifications {
    public async schedule(hour: number, minute: number){
        try{
            if(!((await LocalNotifications.requestPermissions()).display === 'granted')) return;
            console.log('pass')
            const pending = await LocalNotifications.getPending()
            if(pending.notifications.length > 0){
                await LocalNotifications.cancel(pending)
            }
            await LocalNotifications.schedule({
                notifications: [{
                    title: 'Testerino',
                    body: 'body test',
                    id: 1,
                    schedule: {
                        on: {
                            hour,
                            minute
                        }
                    }
                }]
            })
        }catch(e){
            console.log(e)
        }
    }
}

export default new Notifications()