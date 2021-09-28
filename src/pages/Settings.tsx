import { IonContent, IonPage, IonLabel, IonList, IonListHeader, useIonModal, IonItem } from '@ionic/react';
import { add } from 'ionicons/icons';

import CategoriesMd from '../components/CategoriesMd'

const Settings: React.FC = () => {
    const handleDismiss = () => [
        dismiss()
    ]
    const [present, dismiss] = useIonModal(CategoriesMd, {
        onDismiss: handleDismiss
    })

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
                <IonItem button onClick={() => {
                    present()
                }}>
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
