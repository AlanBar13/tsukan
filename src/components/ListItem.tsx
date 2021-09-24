import { IonItem, IonLabel, IonIcon } from '@ionic/react'
import { addCircleOutline, removeCircleOutline } from 'ionicons/icons';
import { Item } from '../models'


const ListItem: React.FC<{item: Item}> = ({item}) => {
    return(
        <IonItem>
                { item.sign === '+' ? <IonIcon icon={addCircleOutline}></IonIcon> : <IonIcon icon={removeCircleOutline}></IonIcon>}
                <IonLabel>{item.title}</IonLabel>
                <IonLabel>{item.category}</IonLabel>
                <IonLabel>$ {item.amount.toFixed(2)}</IonLabel>
        </IonItem>
    )
}

export default ListItem