import { IonContent, IonPage, IonLabel, IonList, IonListHeader, useIonModal, IonItem, IonTitle, IonButton, IonToolbar, IonInput, IonRadioGroup, IonRadio, IonDatetime, IonBackButton, IonButtons, IonHeader } from '@ionic/react';

import { useState } from 'react'
import Notification from '../../services/Notification';

const RemindersMd: React.FC = () => {
    const [body, setBody] = useState<string>("")
    const [selected, setSelected] = useState<string>("")

    return (
        <IonPage>
            <IonContent>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonBackButton defaultHref="/settings" />
                        </IonButtons>
                        <IonTitle>Reminders</IonTitle>
                    </IonToolbar>
                </IonHeader>
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
                    <IonButton expand="block" onClick={() => { Notification.schedule(0, 8) }}>Save</IonButton>
                    <IonListHeader>
                        <IonLabel>Active Reminders</IonLabel>
                    </IonListHeader>
                </IonList>
            </IonContent>
        </IonPage>
    )
}

export default RemindersMd
