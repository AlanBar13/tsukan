import { IonContent, IonPage, IonLabel, IonGrid, IonRow, IonCol, IonList, IonListHeader, IonFab, IonIcon, IonFabButton, useIonModal, IonSelect, IonSelectOption } from '@ionic/react';
import { useState, useEffect } from 'react'
import { add } from 'ionicons/icons';

import ListItem from '../components/ListItem'
import AddChargeMd from '../components/AddChargeMd'

import { setStorageList, readSotrageList } from '../services/storageService'
import { Item } from '../models'
import { nanoid } from 'nanoid'
import _ from 'lodash';

import './Home.css';
const key = "_xplist"

const customActionSheetOptions = {
    header: 'Orden por:',
};

const numberWithCommas = (x: string) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Home: React.FC = () => {
    const [list, setList] = useState<Item[]>([])
    const [xpense, setXpense] = useState<string>("0")
    const [income, setIncome] = useState<string>("0")
    const [total, setTotal] = useState<string>("0")
    const [order, setOrder] = useState<string>("recents")

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
            if (i.sign === '+') {
                inc = inc + i.amount
            } else {
                xp = xp + i.amount
            }
        })
        ttl = inc - xp
        setIncome(numberWithCommas(inc.toFixed(2)))
        setXpense(numberWithCommas(xp.toFixed(2)))
        setTotal(numberWithCommas(ttl.toFixed(2)))
    }

    const deleteItem = async (id: string) => {
        const filteredArr = list.filter((item) => item.id !== id)
        await setList(filteredArr)
        setStorageList(filteredArr, key)
    }

    const editItem = async (id: string, title: string, amount: number, category: string, date: string) => {
        const newArr = list.map((item) => {
            if (item.id === id) {
                return { ...item, title, amount: Number(amount), category, timestamp: date }
            } else {
                return item
            }
        })
        const orderedList = sortList(order, newArr)
        setStorageList(orderedList, key)
    }

    const showList = (items: Item[]) => {
        return items.map((i) => {
            return <ListItem key={i.id} deleteItem={deleteItem} editItem={editItem} item={i} />
        })
    }

    const sortList = (type: string, listToOrder = list) => {
        let newArr
        if (type === "category") {
            newArr = _.orderBy(listToOrder, ["category"], ["asc"])
        } else {
            newArr = _.orderBy(listToOrder, ["timestamp"], ["desc"])
        }
        setList(newArr)
        return newArr
    }

    return (
        <IonPage>
            <IonContent fullscreen>
                <div className="title">
                    <IonLabel>
                        <h1>$ {total} MXN</h1>
                        <h2>Total</h2>
                    </IonLabel>
                </div>
                <IonGrid>
                    <IonRow>
                        <IonCol>
                            <div className="main-block">
                                <h4>$ {xpense}</h4>
                                <h5>Gastos</h5>
                            </div>
                        </IonCol>
                        <IonCol>
                            <div className="main-block">
                                <h4>$ {income}</h4>
                                <h5>Ingresos</h5>
                            </div>
                        </IonCol>
                    </IonRow>
                </IonGrid>
                <IonList>
                    <IonListHeader>
                        <IonLabel>Transacciones recientes</IonLabel>
                        <IonSelect style={{ fontSize: "12px" }} interfaceOptions={customActionSheetOptions} value={order} onIonChange={e => {
                            setOrder(e.detail.value)
                            sortList(e.detail.value)
                        }}>
                            <IonSelectOption value="recents">Recientes</IonSelectOption>
                            <IonSelectOption value="category">Categoria</IonSelectOption>
                        </IonSelect>
                    </IonListHeader>
                    {showList(list)}
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
