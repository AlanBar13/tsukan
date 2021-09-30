import { IonContent, IonPage, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonItem, IonList, IonListHeader, IonLabel, IonGrid, IonRow, IonCol, useIonViewWillEnter } from '@ionic/react';
import { Doughnut, Line } from 'react-chartjs-2'
import { ChartData } from 'chart.js'
import { useState, useEffect} from 'react'
import { lineExpenseData, getExpCatData, getIncCatData } from '../services/stadisticsService'

const Settings: React.FC = () => {
    const data: ChartData  = lineExpenseData()!
    const catXp: ChartData  = getExpCatData()!
    const catIn: ChartData  = getIncCatData()!
    const [lineData, setLineData] = useState<ChartData>(data)
    const [catXpData, setCatXpData] = useState<ChartData>(catXp)
    const [catInData, setCatInData] = useState<ChartData>(catIn)
    const [hasData, setHasData] = useState<boolean>(true)

    useIonViewWillEnter(() => {
        const data: ChartData  = lineExpenseData()!
        const catXp: ChartData  = getExpCatData()!
        const catIn: ChartData  = getIncCatData()!
        setLineData(data)
        setCatXpData(catXp)
        setCatInData(catIn)
    })

    useEffect(() => {
        if(lineData){
            setHasData(true)
        }else{
            setHasData(false)
        }
    })
    
    return (
        <IonPage>
            <IonContent>
                <IonList>
                    <IonListHeader>
                        <IonLabel>Tracking</IonLabel>
                    </IonListHeader>
                </IonList>
                {hasData ? 
                    <div>
                        <IonCard>
                            <IonCardHeader>
                                <IonCardTitle>Total Expenses By Month</IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent>
                                <Line data={lineData} />
                            </IonCardContent>
                        </IonCard>
                        <IonCard>
                            <IonCardHeader>
                                <IonCardTitle>Top 3 Expense Category Most Used</IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent>
                                <Doughnut data={catXpData} options={{ maintainAspectRatio: true }} />
                            </IonCardContent>
                        </IonCard>
                        <IonCard>
                            <IonCardHeader>
                                <IonCardTitle>Top 3 Income Category Most Used</IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent>
                                <Doughnut data={catInData} options={{ maintainAspectRatio: true }} />
                            </IonCardContent>
                        </IonCard>
                    </div> :
                    <IonLabel>Please add transactions</IonLabel>
                }
                
            </IonContent>
        </IonPage>
    )
}

export default Settings
