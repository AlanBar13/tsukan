import { IonContent, IonPage, IonLabel, IonGrid, IonRow, IonCol, IonList, IonListHeader, IonFab, IonIcon, IonFabButton, useIonModal } from '@ionic/react';
import { useState, useEffect} from 'react'
import { add } from 'ionicons/icons';

import ListItem from '../components/ListItem'
import AddChargeMd from '../components/AddChargeMd'

import { setStorageList, readSotrageList } from '../services/storageService'
import { Item } from '../models'
import { nanoid } from 'nanoid'

import './Home.css';
const key = "_xplist"

const Home: React.FC = () => {  
    const [list, setList] = useState<Item[]>([])  
    const [xpense, setXpense] = useState<number>(0)
    const [income, setIncome] = useState<number>(0)
    const [total, setTotal] = useState<number>(0)

    useEffect(() => {
        setList(readSotrageList(key))
    }, [])

    useEffect(() => {
        getTotal(list)
    }, [list])

    const handleDimiss = () => {
        dismiss()
    }

    const addItem = (title: string, category: string, amount: number, sign: string) => {
        const dt = new Date()
        const newItem: Item = {
            id: nanoid(),
            title,
            category,
            amount,
            sign,
            timestamp: dt.toISOString()
        }
        console.log(newItem)
        const newArr = [newItem, ...list]
        setList(newArr)
        setStorageList(newArr, key)
    } 

    const [present, dismiss] = useIonModal(AddChargeMd, {
        onDismiss: handleDimiss,
        addItem,
    })

    const getTotal = (items: Item[]) => {
        let xp = 0, inc = 0, ttl = 0
        items.map((i) => {
            if(i.sign === '+'){
                inc = inc + i.amount
            }else{
                xp = xp + i.amount
            }
        })
        ttl = inc - xp
        setIncome(inc)
        setXpense(xp)
        setTotal(ttl)
    }

    const deleteItem = async (id: string) => {
        const filteredArr =  list.filter((item) => item.id !== id)
        console.log(filteredArr)
        await setList(filteredArr)
        setStorageList(filteredArr, key)
    }

    const showList = (items: Item[]) => {
        return items.map((i) => {
            return <ListItem key={i.id} deleteItem={deleteItem} item={i} />
        })
    }

    return (
        <IonPage>
            <IonContent fullscreen>
                <div className="title">
                    <IonLabel><h1>Total: $ {total.toFixed(2)} MXN</h1></IonLabel>
                </div>
                <IonGrid>
                    <IonRow>
                        <IonCol>
                            <div className="main-block">
                                <h4>$ {xpense.toFixed(2)}</h4>
                                <h5>Expense</h5>
                            </div>
                        </IonCol>
                        <IonCol>
                            <div className="main-block">
                                <h4>$ {income.toFixed(2)}</h4>
                                <h5>Income</h5>
                            </div>
                        </IonCol>
                    </IonRow>
                </IonGrid>
                <IonList>
                    <IonListHeader>
                        <IonLabel>Recent Transactions</IonLabel>
                    </IonListHeader>
                    { showList(list) }
                </IonList>
                <IonFab vertical="bottom" horizontal="end" slot="fixed">
                    <IonFabButton onClick={() => {
                        present()
                    }}>
                        <IonIcon icon={add}></IonIcon>
                    </IonFabButton>
                </IonFab>
            </IonContent>
        </IonPage>
    );
};

export default Home;
