import { IonContent, IonPage, IonLabel, IonGrid, IonRow, IonCol, IonList, IonListHeader, IonFab, IonIcon, IonFabButton } from '@ionic/react';
import { useState, useEffect} from 'react'
import { add } from 'ionicons/icons';
import ListItem from '../components/ListItem'
import { Item } from '../models'
import './Home.css';

const Home: React.FC = () => {
    const items: Item[] = [
        { id: 1, title: "Title 1", category: "category 1", amount: 100, sign: "+", timestamp: "2021-09-20" },
        { id: 2, title: "Title 2", category: "category 2", amount: 200, sign: "-", timestamp: "2021-09-20" },
        { id: 3, title: "Title 3", category: "category 3", amount: 300.50, sign: "+", timestamp: "2021-09-20" },
        { id: 4, title: "Title 4", category: "category 4", amount: 400, sign: "-", timestamp: "2021-09-20" },
    ]

    const [xpense, setXpense] = useState(0)
    const [income, setIncome] = useState(0)
    const [total, setTotal] = useState(0)

    useEffect(() => {
        getTotal(items)
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

    const showList = (items: Item[]) => {
        return items.map((i) => {
            return <ListItem key={i.id} item={i} />
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
                            <div className="item num">
                                <h4>$ {xpense.toFixed(2)}</h4>
                                <h5>Expense</h5>
                            </div>
                        </IonCol>
                        <IonCol>
                            <div className="item num">
                                <h4>$ {income.toFixed(2)}</h4>
                                <h5>Income</h5>
                            </div>
                        </IonCol>
                    </IonRow>
                </IonGrid>
                <IonList>
                    <IonListHeader>
                        <IonLabel>Recent Charges</IonLabel>
                    </IonListHeader>
                    { showList(items) }
                </IonList>
                <IonFab vertical="bottom" horizontal="end" slot="fixed">
                    <IonFabButton>
                        <IonIcon icon={add}></IonIcon>
                    </IonFabButton>
                </IonFab>
            </IonContent>
        </IonPage>
    );
};

export default Home;
