import { IonContent, IonPage, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonList, IonListHeader, IonLabel, useIonViewWillEnter } from '@ionic/react';
import { Doughnut, Line } from 'react-chartjs-2'
import { ChartData } from 'chart.js'
import { useState, useEffect} from 'react'
import { lineExpenseData, getExpCatData, getIncCatData } from '../../services/stadisticsService'

const Settings: React.FC = () => {
    const catXp: ChartData  = getExpCatData()!
    const catIn: ChartData  = getIncCatData()!
    const res: ChartData = {
        labels: [],
        datasets: [
          {
            label: 'Gastos',
            data: [],
            fill: false,
            backgroundColor: 'rgb(36, 97, 15)',
            borderColor: 'rgba(36, 97, 15, 0.2)',
          },
        ],
      };
    const [lineData, setLineData] = useState<ChartData>(res)
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
                        <IonLabel>Seguimiento</IonLabel>
                    </IonListHeader>
                </IonList>
                {hasData ? 
                    <div>
                        <IonCard>
                            <IonCardHeader>
                                <IonCardTitle>Gastos Totales por Mes</IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent>
                                <Line data={lineData} />
                            </IonCardContent>
                        </IonCard>
                        <IonCard>
                            <IonCardHeader>
                                <IonCardTitle>Top 3 Categorias de Gastos Mas Usados</IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent>
                                <Doughnut data={catXpData} options={{ 
                                    maintainAspectRatio: true, 
                                    plugins: {
                                        tooltip: {
                                            callbacks: {
                                                label: (context) => {
                                                    var label = context.label || ''
                                                    var value = context.parsed || 0
                                                    return `${label}: $ ${value}`
                                                }
                                            }
                                        }
                                    } 
                                }} />
                            </IonCardContent>
                        </IonCard>
                        <IonCard>
                            <IonCardHeader>
                                <IonCardTitle>Top 3 Categorias de Ingresos Mas Usados</IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent>
                                <Doughnut data={catInData} options={{ 
                                    maintainAspectRatio: true, 
                                    plugins: {
                                        tooltip: {
                                            callbacks: {
                                                label: (context) => {
                                                    var label = context.label || ''
                                                    var value = context.parsed || 0
                                                    return `${label}: $ ${value}`
                                                }
                                            }
                                        }
                                    } 
                                }} />
                            </IonCardContent>
                        </IonCard>
                    </div> :
                    <IonLabel>Por favor añade mas Transacciónes</IonLabel>
                }
                
            </IonContent>
        </IonPage>
    )
}

export default Settings
