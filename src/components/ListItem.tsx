import { IonItem, IonLabel, IonIcon, IonItemSliding, IonItemOptions, IonItemOption, useIonModal, } from '@ionic/react'
import { addCircleOutline, removeCircleOutline, trashOutline, createOutline } from 'ionicons/icons';
import { Item } from '../models'
import moment from 'moment';
import "./ListItem.css"

import EditTransaction from './EditTransactions';

const numberWithCommas = (x: string) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const ListItem: React.FC<{ item: Item, deleteItem: (id: string) => void, editItem: (id: string, title: string, amount: number, category: string) => void }> = ({ item, deleteItem, editItem }) => {
    const handleDismiss = () => {
        dismiss()
    }
    
    const [present, dismiss] = useIonModal(EditTransaction, {
        onDismiss: handleDismiss,
        editItem,
        item,
    })
    
    return (
        <div className="list-item">
            <IonItemSliding id={item.id}>
                <IonItem>
                    {item.sign === '+' ? <IonIcon slot="start" icon={addCircleOutline}></IonIcon> : <IonIcon slot="start" icon={removeCircleOutline}></IonIcon>}
                    <IonLabel>
                        <h2 className="custom-font-size">{item.title}</h2>
                        <h3>{item.category}</h3>
                        <p>{moment(item.timestamp).format("DD/MM/YY hh:mm")}</p>
                    </IonLabel>
                    <IonLabel>
                        <h4 className="amount">$ {numberWithCommas(item.amount.toFixed(2))}</h4>
                    </IonLabel>
                </IonItem>
                <IonItemOptions side="end">
                    <IonItemOption color="secondary">
                        <IonIcon slot="icon-only" onClick={() => present()} icon={createOutline} />
                    </IonItemOption>
                    <IonItemOption color="danger">
                        <IonIcon slot="icon-only" onClick={() => deleteItem(item.id)} icon={trashOutline} />
                    </IonItemOption>
                </IonItemOptions>
            </IonItemSliding>
        </div>
    )
}

export default ListItem