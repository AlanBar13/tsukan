import { IonLabel, IonList, IonListHeader, IonToolbar, IonButtons, IonButton, IonTitle, IonItem, IonInput, IonSelect, IonSelectOption, IonContent, IonRadio, IonRadioGroup, IonDatetime } from '@ionic/react';
import { useState } from 'react'
import { ScheduleEvery } from '@capacitor/local-notifications'

const AddReminderMd: React.FC<{ onDismiss: () => void; onSave: (body: string, selected: ScheduleEvery, selectedDate: string, day: number) => void}> = ({ onDismiss, onSave }) => {
    const now = new Date().toISOString()
    const [body, setBody] = useState<string>("")
    const [selected, setSelected] = useState<ScheduleEvery>("day")
    const [selectedDate, setSelectedDate] = useState<string>(now)
    const [day, setDay] = useState<number>(1)
    const [disable, setDisable] = useState<boolean>(true)
    const [type, setType] = useState<boolean>(false)

    return (
        <IonContent>
            <IonToolbar>
                <IonTitle>Add Reminder</IonTitle>
                <IonButtons slot="end">
                    <IonButton onClick={onDismiss}>Close</IonButton>
                </IonButtons>
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
                    <IonButton expand="block" onClick={() => {
                        onSave(body, selected, selectedDate, day)
                        onDismiss()
                        }}>Save</IonButton>
            </IonList>
        </IonContent>
    )
}

export default AddReminderMd
