import { IonLabel, IonItem, IonItemSliding, IonItemOptions, IonItemOption, IonIcon } from '@ionic/react';
import { closeOutline } from 'ionicons/icons';

const CategoriesItems: React.FC<{ name: string; type: string; deleteItem: (name: string, type: string) => void }> = ({ name, type, deleteItem }) => {
    return (
        <>
            <IonItem >
                <IonLabel>{name}</IonLabel>
                <IonIcon slot="end" onClick={() => deleteItem(name, type)} icon={closeOutline} />
            </IonItem>

        </>
    )
}

export default CategoriesItems
