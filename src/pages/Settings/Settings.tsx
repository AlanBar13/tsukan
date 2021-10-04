import { IonContent, IonPage, IonLabel, IonList, IonListHeader, IonItem } from '@ionic/react';
import { add } from 'ionicons/icons';

const Settings: React.FC = () => {
    return (
        <IonPage>
            <IonContent>
                <IonList>
                    <IonListHeader>
                        <IonLabel>Ajustes</IonLabel>
                    </IonListHeader>
                </IonList>
                <IonItem button routerLink="/settings/categories" >
                    <IonLabel>
                        <h2>Categorias</h2>
                        <p>Cambiar categorias</p>
                    </IonLabel>
                </IonItem>
                <IonItem button routerLink="/settings/reminders">
                    <IonLabel>
                        <h2>Recordatorios</h2>
                        <p>Añadir recordatorios (Permisos requeridos)</p>
                    </IonLabel>
                </IonItem>
            </IonContent>
        </IonPage>
    )
}

export default Settings
