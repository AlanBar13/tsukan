import { IonItem, IonLabel, IonIcon, IonItemSliding, IonItemOptions, IonItemOption } from '@ionic/react'
import { addCircleOutline, removeCircleOutline, createOutline, trashOutline } from 'ionicons/icons';
import { Item } from '../models'


const ListItem: React.FC<{ item: Item, deleteItem: (id: string) => void }> = ({ item, deleteItem }) => {
    return (
        <div className="list-item">
            <IonItemSliding>
                <IonItem>
                    {item.sign === '+' ? <IonIcon icon={addCircleOutline}></IonIcon> : <IonIcon icon={removeCircleOutline}></IonIcon>}
                    <IonLabel>{item.title}</IonLabel>
                    <IonLabel>{item.category}</IonLabel>
                    <IonLabel>$ {item.amount.toFixed(2)}</IonLabel>
                </IonItem>
                <IonItemOptions side="end">
                    <IonItemOption color="danger">
                        <IonIcon slot="icon-only" onClick={() => deleteItem(item.id)} icon={trashOutline} />
                    </IonItemOption>
                </IonItemOptions>
            </IonItemSliding>
        </div>
    )
}

export default ListItem