import React from 'react';
import '../css/minireset.min.css';
import '../css/style.css';
import '../css/util.css';
import 'toastr2/dist/toastr.min.css';
import '../css/toastr.override.css';
import {Switch, Route} from "react-router-dom";
import Home from "./pages/Home";
//import CreateRoom from "./pages/CreateRoom";
import CreateGame from "./pages/CreateGame";
import JoinRoom from "./pages/JoinRoom";
import Footer from "./Footer";
import Header from "./Header";
import Util from "../util/Util";
import Loader from "./misc/Loader";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ChooseCategories from "./views/CreateGame/ChooseCategories";
import Settings from "./pages/Settings/Settings";

import Toastr from "toastr2";
const toastr = new Toastr();

class App extends React.Component {

    static GLOBAL = null;

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            user: null,
        }

        App.GLOBAL = this;
    }

    render = () => {
        if(this.state.isLoading) {
            return (
                <div className="app loading">
                    <div className="app-loader">
                        <Loader width="max(8vw, 100px)" />
                    </div>
                </div>
            );
        } else {
            return (
                <div className="app">
                    <div className="content-wrapper">
                        <Header user={this.state.user} />
                        {/*<img src="http://localhost:8081/resources/toto.jpg" alt="Logo" />*/}
                        <div id="page-content">
                            <Switch>
                                <Route exact path="/" component={Home}/>
                                <Route exact path="/login" render={() => <Login setUser={this.setUser} currentUser={this.state.user} />}/>
                                <Route exact path="/register" component={Register}/>
                                <Route exact path="/settings" component={Settings}/>
                                <Route exact path="/create-room/game-mode" component={CreateGame}/>
                                <Route exact path="/join-room" component={JoinRoom}/>
                            </Switch>
                        </div>
                    </div>
                    <Footer/>
                </div>
            );
        }
    }

    setUser = (user) => {
        this.setState({
            user,
        });
    }

    logoutUser = async () => {
        Util.verbose('User logout');

        if(this.state.user === null) {
            return false;
        }

        const response = await Util.performAPIRequest('/auth/logout', {
            method: 'POST',
        });

        if(!response.ok) {
            toastr.error('Une erreur inconnue est survenue');
            return false;
        }

        try {
            await Util.getNewAccessToken();
        } catch(e) {
            console.error(e);
            toastr.error('Une erreur inconnue est survenue');
            return false;
        }

        this.setUser(null);

        toastr.success("Vous n'êtes plus connecté");

        return true;
    }

    componentDidMount = async () => {
        await Util.onApplicationLoad();
        Util.verbose('Application loaded');

        const newState = {
            isLoading: false,
            user: Util.accessTokenPayload.user ? Util.accessTokenPayload.user : null,
        };

        const accessTokenPayload = Util.accessTokenPayload;

        if(accessTokenPayload.hasOwnProperty('user')) {
            newState.userId = accessTokenPayload.user.id;
            newState.userName = accessTokenPayload.user.username;
        }

        this.setState(newState);
    }
}

export default App;
