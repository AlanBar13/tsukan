import { IonLabel, IonList, IonListHeader, IonToolbar, IonButtons, IonButton, IonTitle, IonItem, IonInput, IonSelect, IonSelectOption, } from '@ionic/react';
import { useState } from 'react'

const AddChargeMd: React.FC<{ onDismiss: () => void; categories: string[]; addItem: (title: string, category: string, amount: number, sign: string) => void }> = ({ onDismiss, categories, addItem }) => {
   const [title, setTitle] = useState<string>("")
   const [amount, setAmount] = useState<string>("")
   const [category, setCategory] = useState<string>("")
   const [sign, setSign] = useState<string>("")

    const showCategories = () => {
        return categories.map((cat, i) => {
            return <IonSelectOption key={i} value={cat}>{cat}</IonSelectOption>
        })
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
                    <IonLabel position="floating">Category</IonLabel>
                    <IonSelect onIonChange={e => setCategory(e.detail.value)}>
                        {showCategories()}
                    </IonSelect>
                </IonItem>
                <IonItem className="input">
                    <IonLabel position="floating">Type</IonLabel>
                    <IonSelect onIonChange={e => setSign(e.detail.value)} >
                        <IonSelectOption value={'+'}>Income</IonSelectOption>
                        <IonSelectOption value={'-'}>Expense</IonSelectOption>
                    </IonSelect>
                </IonItem>
            </IonList>
            <br />
            <IonButton onClick={onSave} expand="block">Save</IonButton>
        </>
    )
}

export default AddChargeMd