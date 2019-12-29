import React, {Fragment, useState} from 'react';
import HomePageContainer from './app/homepage/HomePageContainer'
import {Route, Switch} from 'react-router-dom'
import Login from './app/login/Login'
import AppContext from './app/shared/AppContext'
import UserContainer from './app/user/UserContainer'
import Header from './app/homepage/Header'
import Store from './app/store/Store'
import '@ionic/react/css/core.css';
/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
// import '@ionic/react/css/padding.css';
// import '@ionic/react/css/float-elements.css';
// import '@ionic/react/css/text-alignment.css';
// import '@ionic/react/css/text-transformation.css';
// import '@ionic/react/css/flex-utils.css';
// import '@ionic/react/css/display.css';

import './theme/tailwind/index.css'
import './theme/index.css'
import './theme/icofont/icofont.min.css'
import {IonApp, IonContent, IonHeader, IonRouterOutlet} from '@ionic/react'
import {IonReactRouter} from '@ionic/react-router'
import Shipper from './app/shipper/Shipper'
import Order from './app/order/Order'

const _token = localStorage.getItem('token')
const _user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null

function App() {
    const [token, setToken] = useState(_token)
    const [user, setUser] = useState(_user)

    const appContext = {
        token,
        setToken,
        user,
        setUser,
    }

    return (
        <AppContext.Provider value={appContext}>
            <IonReactRouter>
                <IonApp>
                    <IonHeader>
                        <Header/>
                    </IonHeader>
                    <IonContent>
                        <div className="w-screen">
                            <Switch>
                                <Route exact path={'/'} component={HomePageContainer}/>
                                <Route exact path={'/store/:id'} component={Store}/>
                                {!token ? <Route exact path={'/login'} component={Login}/> : <Fragment>
                                    <Route exact path={'/user'} component={UserContainer}/>
                                    {
                                        user.type === 'shipper' ? <Route exact path={'/shipper'} component={Shipper}/> :
                                            <Fragment>
                                                <Route exact path={'/order/:id'} component={Order}/>
                                            </Fragment>
                                    }
                                </Fragment>}
                            </Switch>
                        </div>
                    </IonContent>
                </IonApp>
            </IonReactRouter>
        </AppContext.Provider>
    )
}

export default App;
