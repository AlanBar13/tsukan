import { IonContent, IonPage, IonLabel, IonList, IonListHeader, useIonModal, IonItem, IonTitle, IonButton, IonToolbar, IonInput, IonRadioGroup, IonRadio, IonDatetime, IonBackButton, IonButtons, IonSelect, IonSelectOption } from '@ionic/react';
import { useState } from 'react'
import { ScheduleEvery } from '@capacitor/local-notifications'

import Notification from '../../services/Notification';
import { setStorageList, readSotrageList} from '../../services/storageService'
import { Reminders } from '../../models'

import RemindersItems from '../../components/RemindersItems';
const remKey = "_remList"

const RemindersMd: React.FC = () => {
    const now = new Date().toISOString()
    const list: Reminders[] = readSotrageList(remKey)
    const [reminders, setReminders] = useState<Reminders[]>(list)
    const [body, setBody] = useState<string>("")
    const [selected, setSelected] = useState<ScheduleEvery>("day")
    const [selectedDate, setSelectedDate] = useState<string>(now)
    const [day, setDay] = useState<number>(1)
    const [disable, setDisable] = useState<boolean>(true)
    const [type, setType] = useState<boolean>(false)

    const deleteItem = (id: number) => {
        const filteredArr =  reminders.filter((item) => item.id !== id)
        console.log(filteredArr)
        setReminders(filteredArr)
        setStorageList(filteredArr, remKey)
    }

    const onSave = async () => {
        const date = new Date(selectedDate)
        const dateNumber = date.getDate()
        const hour = date.getHours()
        const minutes = date.getMinutes()
        if(selected === "week"){
            console.log("week")
            console.log(body, selected, hour, minutes, day)
            await Notification.repeatSchedule(body, selected, hour, minutes, day)
            const reminder: Reminders = {
                id: Math.floor(Math.random() * 1000),
                message: body,
                every: selected,
                day,
                hour,
                minutes
            }
            const newArr = [reminder, ...reminders]
            setReminders(newArr)
            setStorageList(newArr, remKey)
            return
        }
        if(selected === "month"){
            console.log("month")
            console.log(body, selected, hour, minutes, dateNumber)
            await Notification.repeatSchedule(body, selected, hour, minutes, dateNumber)
            const reminder: Reminders = {
                id: Math.floor(Math.random() * 100),
                message: body,
                every: selected,
                day: dateNumber,
                hour,
                minutes
            }
            const newArr = [reminder, ...reminders]
            setReminders(newArr)
            setStorageList(newArr, remKey)
            return
        }
        // do not save
        return
    }

    const showReminders = () => {
        return reminders.map((item, i) => {
            return <RemindersItems key={i} reminder={item} deleteItem={deleteItem} />
        })
    }

    return (
        <IonPage>
            <IonContent>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/settings" />
                    </IonButtons>
                    <IonTitle>Recordatorios</IonTitle>
                </IonToolbar>
                <IonList>
                    <IonListHeader>
                        <IonLabel>Añadir recordatorio</IonLabel>
                    </IonListHeader>
                    <IonItem className="input">
                        <IonLabel position="floating">Mensaje</IonLabel>
                        <IonInput onIonChange={(e) => setBody(e.detail.value!)} type="text"></IonInput>
                    </IonItem>
                    <IonRadioGroup value={selected} onIonChange={(e) => {
                        setSelected(e.detail.value)
                        if(e.detail.value === "week"){
                            setDisable(false)
                            setType(false)
                        }else{
                            setType(true)
                            setDisable(true)
                        }
                    }}>
                        <IonListHeader>
                            <IonLabel>Repetir (Selecciona uno)</IonLabel>
                        </IonListHeader>
                        <IonItem>
                            <IonLabel>Cada Semana</IonLabel>
                            <IonRadio slot="start" value="week" />
                        </IonItem>
                        <IonItem>
                            <IonLabel>Cada Mes</IonLabel>
                            <IonRadio slot="start" value="month" />
                        </IonItem>
                    </IonRadioGroup>
                    <IonListHeader>
                        <IonLabel>Cada:</IonLabel>
                    </IonListHeader>
                    <IonItem className="input">
                        <IonLabel>Dia</IonLabel>
                        <IonSelect disabled={disable} value={day} onIonChange={(e) => setDay(e.detail.value)}>
                            <IonSelectOption value="1">Lunes</IonSelectOption>
                            <IonSelectOption value="2">Martes</IonSelectOption>
                            <IonSelectOption value="3">Miercoles</IonSelectOption>
                            <IonSelectOption value="4">Jueves</IonSelectOption>
                            <IonSelectOption value="5">Viernes</IonSelectOption>
                            <IonSelectOption value="6">Sabado</IonSelectOption>
                            <IonSelectOption value="0">Domingo</IonSelectOption>
                        </IonSelect>
                    </IonItem>
                    {type ?
                        <IonItem className="input">
                            <IonLabel position="floating">Fecha (Dia Hora:Minutos)</IonLabel>
                            <IonDatetime displayFormat="DD HH:mm" value={selectedDate} onIonChange={(e) => setSelectedDate(e.detail.value!)}></IonDatetime>
                        </IonItem> :
                        <IonItem className="input">
                            <IonLabel position="floating">Hora (Hora:Minutos)</IonLabel>
                            <IonDatetime displayFormat="HH:mm" value={selectedDate} onIonChange={(e) => setSelectedDate(e.detail.value!)}></IonDatetime>
                        </IonItem>
                     }
                    <IonButton expand="block" onClick={onSave}>Save</IonButton>
                    <IonListHeader>
                        <IonLabel>Active Reminders</IonLabel>
                    </IonListHeader>
                    {showReminders()}
                </IonList>
            </IonContent>
        </IonPage>
    )
}

export default RemindersMd
