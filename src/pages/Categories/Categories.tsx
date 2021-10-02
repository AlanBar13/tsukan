import { IonLabel, IonList, IonListHeader, IonToolbar, IonButtons, IonButton, IonTitle, useIonAlert, IonContent, IonPage, IonBackButton } from '@ionic/react';
import { useState, useEffect } from 'react'
import { readArray, addToArray, delFromArray } from '../../services/categoriesService'

import CategoriesItems from '../../components/CategoriesItems'


const CategoriesMd: React.FC = () => {
    const [present] = useIonAlert()
    const [xpCat, setXpCat] = useState<string[]>([])
    const [inCat, setInCat] = useState<string[]>([])

    useEffect(() => {
        if (xpCat.length === 0 || inCat.length === 0) {
            reloadData()
        }
    })

    const reloadData = () => {
        setXpCat(readArray('-'))
        setInCat(readArray('+'))
    }

    const addCat = (name: string, type: string) => {
        if (type === "+") {
            const arr = addToArray(name, '+')
            console.log(arr)
            reloadData()
        } else {
            const arr = addToArray(name, '-')
            console.log(arr)
            reloadData()
        }
    }

    const deleteItem = (item: string, type: string) => {
        if (type === '+') {
            const arr = delFromArray(item, '+')
            console.log(arr)
            reloadData()
        } else {
            const arr = delFromArray(item, '-')
            console.log(arr)
            reloadData()
        }
    }

    const showInCat = () => {
        return inCat.map((item, i) => {
            return (
                <CategoriesItems key={i} name={item} type={'+'} deleteItem={deleteItem} />
            )
        })
    }

    const showXpCat = () => {
        return xpCat.map((item, i) => {
            return (
                <CategoriesItems key={i} name={item} type={'-'} deleteItem={deleteItem} />
            )
        })
    }

    return (
        <IonPage>
            <IonContent>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/settings" />
                    </IonButtons>
                    <IonTitle>Categories</IonTitle>
                </IonToolbar>
                <IonList>
                    <IonListHeader>
                        <IonLabel>Income Categories</IonLabel>
                        <IonButton onClick={() => {
                            present({
                                header: 'Add Income Category',
                                inputs: [
                                    {
                                        name: 'cat',
                                        type: 'text',
                                        placeholder: 'New Category'
                                    },
                                ],
                                buttons: [
                                    'Cancel',
                                    { text: 'Ok', handler: (d) => addCat(d.cat, '+') },
                                ],
                            })
                        }} >Add</IonButton>
                    </IonListHeader>
                    {showInCat()}
                </IonList>
                <IonList>
                    <IonListHeader>
                        <IonLabel>Expense Categories</IonLabel>
                        <IonButton onClick={() => {
                            present({
                                header: 'Add Expense Category',
                                inputs: [
                                    {
                                        name: 'cat',
                                        type: 'text',
                                        placeholder: 'New Category'
                                    },
                                ],
                                buttons: [
                                    'Cancel',
                                    { text: 'Ok', handler: (d) => addCat(d.cat, '-') },
                                ],
                            })
                        }}>Add</IonButton>
                    </IonListHeader>
                    {showXpCat()}
                </IonList>
            </IonContent>
        </IonPage>
    )
}

export default CategoriesMd
