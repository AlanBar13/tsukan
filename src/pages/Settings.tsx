import { IonContent, IonPage, IonLabel, IonList, IonListHeader, useIonModal, IonItem } from '@ionic/react';
import { add } from 'ionicons/icons';

const Settings: React.FC = () => {
    return (
        <IonPage>
            <IonContent>
                <IonList>
                    <IonListHeader>
                        <IonLabel>Settings</IonLabel>
                    </IonListHeader>
                </IonList>
                <IonItem button>
                    <IonLabel>
                        <h2>Reminders</h2>
                        <p>Program reminders to make some payments</p>
                    </IonLabel>
                </IonItem>
                <IonItem button>
                    <IonLabel>
                        <h2>Categories</h2>
                        <p>Change displayed categories</p>
                    </IonLabel>
                </IonItem>
            </IonContent>
        </IonPage>
    )
}

export default Settings
