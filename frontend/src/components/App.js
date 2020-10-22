import React from 'react';
import '../css/minireset.min.css';
import '../css/style.css';
import '../css/util.css';
import {Switch, Route} from "react-router-dom";
import Home from "./pages/Home";
import CreateRoom from "./pages/CreateRoom";
import JoinRoom from "./pages/JoinRoom";
import Footer from "./Footer";
import Header from "./Header";
import Util from "../util/Util";
import Loader from "./misc/Loader";
import Login from "./pages/Login";
import Register from "./pages/Register";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            userId: null,
            userName: null,
        }
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
                        <Header/>
                        {/*<img src="http://localhost:8081/resources/toto.jpg" alt="Logo" />*/}
                        <div id="page-content">
                            <Switch>
                                <Route exact path="/" component={Home}/>
                                <Route exact path="/login" component={Login}/>
                                <Route exact path="/register" component={Register}/>
                                <Route exact path="/create-room" component={CreateRoom}/>
                                <Route exact path="/join-room" component={JoinRoom}/>
                            </Switch>
                        </div>
                    </div>
                    <Footer/>
                </div>
            );
        }
    }

    componentDidMount = async () => {
        await Util.onApplicationLoad();
        Util.verbose('Application loaded');

        const newState = {
            isLoading: false,
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
