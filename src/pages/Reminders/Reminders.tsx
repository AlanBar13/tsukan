import { IonContent, IonPage, IonLabel, IonList, IonListHeader, useIonModal, IonItem, IonTitle, IonButton, IonToolbar, IonInput, IonRadioGroup, IonRadio, IonDatetime, IonBackButton, IonButtons, IonSelect, IonSelectOption } from '@ionic/react';
import { useState } from 'react'
import { ScheduleEvery } from '@capacitor/local-notifications'

import Notification from '../../services/Notification';
import { setStorageList, readSotrageList } from '../../services/storageService'
import { Reminders } from '../../models'

import RemindersItems from '../../components/RemindersItems';
import AddReminderMd from '../../components/AddReminderMd';
const remKey = "_remList"

const RemindersMd: React.FC = () => {
    const list: Reminders[] = readSotrageList(remKey)
    const [reminders, setReminders] = useState<Reminders[]>(list)

    const handleDismiss = () => dismiss()
    
    const deleteItem = async (id: number) => {
        const filteredArr = reminders.filter((item) => item.id !== id)
        setReminders(filteredArr)
        setStorageList(filteredArr, remKey)
        await Notification.cancelPendingNotifications(id)
    }

    const onSave = async (body: string, selected: ScheduleEvery, selectedDate: string, day: number) => {
        const date = new Date(selectedDate)
        const dateNumber = date.getDate()
        const hour = date.getHours()
        const minutes = date.getMinutes()
        if (selected === "week") {
            const reminder: Reminders = {
                id: Math.floor(Math.random() * 1000),
                message: body,
                every: selected,
                day,
                hour,
                minutes
            }
            await Notification.repeatSchedule(reminder)
            const newArr = [reminder, ...reminders]
            setReminders(newArr)
            setStorageList(newArr, remKey)
            return
        }
        if (selected === "month") {
            const reminder: Reminders = {
                id: Math.floor(Math.random() * 100),
                message: body,
                every: selected,
                day: dateNumber,
                hour,
                minutes
            }
            await Notification.repeatSchedule(reminder)
            const newArr = [reminder, ...reminders]
            setReminders(newArr)
            setStorageList(newArr, remKey)
            return
        }
        // do not save
        return
    }
    const [present, dismiss] = useIonModal(AddReminderMd, {
        onDismiss: handleDismiss,
        onSave
    })

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
                        <IonLabel>Active Reminders</IonLabel>
                        <IonButton onClick={ () => { present()}}>Add</IonButton>
                    </IonListHeader>
                    {showReminders()}
                </IonList>
            </IonContent>
        </IonPage>
    )
}

export default RemindersMd
