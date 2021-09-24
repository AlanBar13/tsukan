import { IonContent, IonPage, IonLabel, IonGrid, IonRow, IonCol, IonList, IonListHeader, IonFab, IonIcon, IonFabButton } from '@ionic/react';
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

    const showList = (items: Item[]) => {
        return items.map((i) => {
            return <ListItem key={i.id} item={i} />
        })
    }

    return (
        <IonPage>
            <IonContent fullscreen>
                <div className="title">
                    <IonLabel><h1>Total: $100 MXN</h1></IonLabel>
                </div>
                <IonGrid>
                    <IonRow>
                        <IonCol>
                            <div className="item num">
                                <h4>$ 1000</h4>
                                <h5>Expense</h5>
                            </div>
                        </IonCol>
                        <IonCol>
                            <div className="item num">
                                <h4>$ 1000</h4>
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
