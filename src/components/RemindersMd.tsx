import { IonLabel, IonList, IonListHeader, IonToolbar, IonButtons, IonButton, IonTitle, IonContent, IonItem, IonInput, IonDatetime, IonRadioGroup, IonRadio } from '@ionic/react';
import { useState } from 'react'
import Notification from '../services/Notification';

const RemindersMd: React.FC<{ onDismiss: () => void }> = ({ onDismiss }) => {
    const [body, setBody] = useState<string>("")
    const [selected, setSelected] = useState<string>("")

    return (
        <IonContent>
            <IonToolbar>
                <IonTitle>Reminders</IonTitle>
                <IonButtons slot="end">
                    <IonButton onClick={onDismiss}>Close</IonButton>
                </IonButtons>
            </IonToolbar>
            <IonList>
                <IonListHeader>
                    <IonLabel>Set Reminder</IonLabel>
                </IonListHeader>
                <IonItem className="input">
                    <IonLabel position="floating">Message</IonLabel>
                    <IonInput onIonChange={(e) => setBody(e.detail.value!)} type="text"></IonInput>
                </IonItem>
                <IonRadioGroup value={selected} onIonChange={(e) => setSelected(e.detail.value)}>
                    <IonListHeader>
                        <IonLabel>Repeat</IonLabel>
                    </IonListHeader>
                    <IonItem>
                        <IonLabel>Every Day</IonLabel>
                        <IonRadio slot="start" value="day" />
                    </IonItem>
                    <IonItem>
                        <IonLabel>Every Week</IonLabel>
                        <IonRadio slot="start" value="week" />
                    </IonItem>
                    <IonItem>
                        <IonLabel>Every Two Weeks</IonLabel>
                        <IonRadio slot="start" value="two-weeks" />
                    </IonItem>
                </IonRadioGroup>
                <IonItem className="input">
                    <IonLabel position="floating">Time</IonLabel>
                    <IonDatetime displayFormat="HH:mm"></IonDatetime>
                </IonItem>
                <IonButton expand="block" onClick={() => { Notification.schedule(0,8)}}>Save</IonButton>
                <IonListHeader>
                    <IonLabel>Active Reminders</IonLabel>
                </IonListHeader>
            </IonList>
        </IonContent>
    )
}

export default RemindersMd
