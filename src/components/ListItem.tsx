import { IonItem, IonLabel, IonIcon, IonItemSliding, IonItemOptions, IonItemOption, useIonAlert, } from '@ionic/react'
import { addCircleOutline, removeCircleOutline, trashOutline, createOutline } from 'ionicons/icons';
import { Item } from '../models'
import moment from 'moment';
import "./ListItem.css"

const numberWithCommas = (x: string) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const ListItem: React.FC<{ item: Item, deleteItem: (id: string) => void, editItem: (id: string, title: string, amount: number) => void }> = ({ item, deleteItem, editItem }) => {

    const [present] = useIonAlert()
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
                        <IonIcon slot="icon-only" onClick={() => {
                            present({
                                header: 'Editar Titulo y Monto',
                                inputs: [
                                    {
                                        name: 'title',
                                        type: 'text',
                                        label: 'Titulo',
                                        value: item.title
                                    },
                                    {
                                        name: 'amount',
                                        type: 'number',
                                        label: 'Monto',
                                        value: item.amount
                                    }
                                ],
                                buttons: [
                                    {text: 'Cancelar', handler: (d) => {
                                        const slidingItem = document.getElementById(item.id) as any
                                        slidingItem.close()
                                    }},
                                    { text: 'Ok', handler: (d) => {
                                        editItem(item.id, d.title, d.amount)
                                        const slidingItem = document.getElementById(item.id) as any
                                        slidingItem.close()
                                    } },
                                ],
                            })
                        }} icon={createOutline} />
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