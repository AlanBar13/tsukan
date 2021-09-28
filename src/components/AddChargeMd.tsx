import { IonLabel, IonList, IonListHeader, IonToolbar, IonButtons, IonButton, IonTitle, IonItem, IonInput, IonSelect, IonSelectOption, } from '@ionic/react';
import { useState } from 'react'
import { readArray } from '../services/categoriesService'

const AddChargeMd: React.FC<{ onDismiss: () => void; addItem: (title: string, category: string, amount: number, sign: string) => void }> = ({ onDismiss, addItem }) => {
   const [title, setTitle] = useState<string>("")
   const [amount, setAmount] = useState<string>("")
   const [category, setCategory] = useState<string>("")
   const [sign, setSign] = useState<string>("")
   const [dis, setDis] = useState<boolean>(true)
   const [categories, setCategories] = useState<string[]>([])  

    const showCategories = () => {
        return categories.map((cat, i) => {
            return <IonSelectOption key={i} value={cat}>{cat}</IonSelectOption>
        })
    }

    const handleType = (sign: string) => {
        setSign(sign)
        if(sign === '+'){
            setCategories(readArray('+'))
        }else{
            setCategories(readArray('-'))
        }
        setDis(false)
    }

    const onSave = () => {
        addItem(title, category, Number(amount), sign)
        onDismiss()
    }

    return (
        <>
            <IonToolbar>
                <IonTitle>Add</IonTitle>
                <IonButtons slot="end">
                    <IonButton onClick={onDismiss}>Close</IonButton>
                </IonButtons>
            </IonToolbar>
            <IonList>
                <IonListHeader>
                    <IonLabel>New Item</IonLabel>
                </IonListHeader>
                <IonItem className="input">
                    <IonLabel position="floating">Title</IonLabel>
                    <IonInput onIonChange={(e) => setTitle(e.detail.value!)} type="text"></IonInput>
                </IonItem>
                <IonItem className="input">
                    <IonLabel position="floating">Amount</IonLabel>
                    <IonInput onIonChange={(e) => setAmount(e.detail.value!)} type='number'></IonInput>
                </IonItem>
                <IonItem className="input">
                    <IonLabel position="floating">Type</IonLabel>
                    <IonSelect onIonChange={e => handleType(e.detail.value)} >
                        <IonSelectOption value={'+'}>Income</IonSelectOption>
                        <IonSelectOption value={'-'}>Expense</IonSelectOption>
                    </IonSelect>
                </IonItem>
                <IonItem disabled={dis} className="input">
                    <IonLabel position="floating">Category</IonLabel>
                    <IonSelect onIonChange={e => setCategory(e.detail.value)}>
                        {showCategories()}
                    </IonSelect>
                </IonItem>
            </IonList>
            <br />
            <IonButton onClick={onSave} expand="block">Save</IonButton>
        </>
    )
}

export default AddChargeMd
