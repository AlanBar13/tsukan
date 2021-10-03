import { IonItem, IonLabel, IonIcon } from '@ionic/react';
import { closeOutline } from 'ionicons/icons';

import { Reminders } from '../models'

const RemindersItems: React.FC<{reminder: Reminders, deleteItem: (id: number) => void }> = ({reminder, deleteItem}) => {
    const converter = (n: number) =>{
        if(n < 10){
            return "0" + n
        }else{
            return n
        }
    }

    const getWeekDay = (n: number) => {
        switch(Number(n)){
            case 0:
                return "Domingo"
            case 1:
                return "Lunes"
            case 2:
                return "Martes"
            case 3:
                return "Miercoles"
            case 4:
                return "Jueves"
            case 5:
                return "Viernes"
            case 6:
                return "Sabado" 
        }
    }
    return (
        <IonItem>
            <IonLabel>
                <h2>{reminder.message}</h2>
                {reminder.every === "week" ? 
                    <p>Cada {getWeekDay(reminder.day)} a las {converter(reminder.hour)}:{converter(reminder.minutes)}</p> :
                    <p>Dia: {reminder.day} a las {converter(reminder.hour)}:{converter(reminder.minutes)}</p>
                }
            </IonLabel>
            <IonIcon slot="end" onClick={() => {deleteItem(reminder.id)}} icon={closeOutline} />
        </IonItem>
    )
}

export default RemindersItems
