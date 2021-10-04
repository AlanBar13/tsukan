import { IonLabel, IonList, IonListHeader, IonToolbar, IonButtons, IonButton, IonTitle, IonItem, IonInput, IonSelect, IonSelectOption, IonContent } from '@ionic/react';
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
        <IonContent>
            <IonToolbar>
                <IonTitle>Añadir</IonTitle>
                <IonButtons slot="end">
                    <IonButton onClick={onDismiss}>Cerrar</IonButton>
                </IonButtons>
            </IonToolbar>
            <IonList>
                <IonListHeader>
                    <IonLabel>Nueva Transacción</IonLabel>
                </IonListHeader>
                <IonItem className="input">
                    <IonLabel position="floating">Titulo</IonLabel>
                    <IonInput onIonChange={(e) => setTitle(e.detail.value!)} type="text"></IonInput>
                </IonItem>
                <IonItem className="input">
                    <IonLabel position="floating">Monto</IonLabel>
                    <IonInput onIonChange={(e) => setAmount(e.detail.value!)} type='number'></IonInput>
                </IonItem>
                <IonItem className="input">
                    <IonLabel position="floating">Tipo</IonLabel>
                    <IonSelect onIonChange={e => handleType(e.detail.value)} >
                        <IonSelectOption value={'+'}>Ingreso</IonSelectOption>
                        <IonSelectOption value={'-'}>Gasto</IonSelectOption>
                    </IonSelect>
                </IonItem>
                <IonItem disabled={dis} className="input">
                    <IonLabel position="floating">Categoria</IonLabel>
                    <IonSelect onIonChange={e => setCategory(e.detail.value)}>
                        {showCategories()}
                    </IonSelect>
                </IonItem>
            </IonList>
            <br />
            <IonButton onClick={onSave} expand="block">Guardar</IonButton>
        </IonContent>
    )
}

export default AddChargeMd
