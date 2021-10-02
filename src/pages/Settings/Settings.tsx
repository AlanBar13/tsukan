import { IonContent, IonPage, IonLabel, IonList, IonListHeader, IonItem } from '@ionic/react';
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
                <IonItem button routerLink="/categories" >
                    <IonLabel>
                        <h2>Categories</h2>
                        <p>Change displayed categories</p>
                    </IonLabel>
                </IonItem>
                <IonItem button routerLink="/reminders">
                    <IonLabel>
                        <h2>Reminders</h2>
                        <p>Set reminders</p>
                    </IonLabel>
                </IonItem>
            </IonContent>
        </IonPage>
    )
}

export default Settings
