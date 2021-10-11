import { IonLabel, IonList, IonListHeader, IonToolbar, IonButtons, IonButton, IonTitle, IonItem, IonInput, IonSelect, IonSelectOption, IonContent, IonDatetime } from '@ionic/react';
import { useState, useEffect } from 'react'
import { readArray } from '../services/categoriesService'
import { Item } from '../models'

const EditTransaction: React.FC<{ onDismiss: () => void; editItem: (id: string, title: string, amount: number, category: string, date: string) => void; item: Item }> = ({ onDismiss, editItem, item }) => {
   const [title, setTitle] = useState<string>(item.title)
   const [amount, setAmount] = useState<string>(String(item.amount))
   const [category, setCategory] = useState<string>(item.category)
   const [sign, setSign] = useState<string>(item.sign)
   const [date, setDate] = useState<string>(item.timestamp)
   const [categories, setCategories] = useState<string[]>([])

   const sldItem = document.getElementById(item.id) as any
   
   useEffect(() => {
       setCategories(readArray(sign))
   }, [])

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
    }

    const onSave = () => {
        editItem(item.id, title, Number(amount), category, date)
        onDismiss()
        sldItem.close()
    }

    return (
        <IonContent>
            <IonToolbar>
                <IonTitle>Editar</IonTitle>
                <IonButtons slot="end">
                    <IonButton onClick={() => {
                        onDismiss()
                        sldItem.close()
                        }}>Cerrar</IonButton>
                </IonButtons>
            </IonToolbar>
            <IonList>
                <IonListHeader>
                    <IonLabel>Editar Transacción</IonLabel>
                </IonListHeader>
                <IonItem className="input">
                    <IonLabel position="floating">Titulo</IonLabel>
                    <IonInput value={title} onIonChange={(e) => setTitle(e.detail.value!)} type="text"></IonInput>
                </IonItem>
                <IonItem className="input">
                    <IonLabel position="floating">Monto</IonLabel>
                    <IonInput value={amount} onIonChange={(e) => setAmount(e.detail.value!)} type='number'></IonInput>
                </IonItem>
                <IonItem disabled className="input">
                    <IonLabel position="floating">Tipo</IonLabel>
                    <IonSelect value={sign} onIonChange={e => handleType(e.detail.value)} >
                        <IonSelectOption value={'+'}>Ingreso</IonSelectOption>
                        <IonSelectOption value={'-'}>Gasto</IonSelectOption>
                    </IonSelect>
                </IonItem>
                <IonItem className="input">
                    <IonLabel>Categoria</IonLabel>
                    <IonSelect value={category} onIonChange={e => setCategory(e.detail.value)}>
                        {showCategories()}
                    </IonSelect>
                </IonItem>
                <IonItem className="input">
                    <IonLabel position="floating">Fecha de Transacción</IonLabel>
                    <IonDatetime 
                        displayFormat="DD MMM YY"
                        monthShortNames="Ene, Feb, Mar, Abr, May, Jun, Jul, Ago, Sep, Oct, Nov, Dic"
                        value={date} 
                        onIonChange={e => setDate(e.detail.value!)}>
                    </IonDatetime>
                </IonItem>
                <IonItem className="input">
                    <IonLabel position="floating">Hora de Transacción</IonLabel>
                    <IonDatetime 
                        displayFormat="HH:mm"
                        value={date} 
                        onIonChange={e => setDate(e.detail.value!)}>
                    </IonDatetime>
                </IonItem>
            </IonList>
            <br />
            <IonButton onClick={onSave} expand="block">Guardar</IonButton>
        </IonContent>
    )
}

export default EditTransaction
