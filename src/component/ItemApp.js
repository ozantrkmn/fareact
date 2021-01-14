import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import ListItemComponent from "./ListItemComponent";
import ItemComponent from "./ItemComponent"
import Codes from "./Codes"
import WeatherComponent from "./WeatherComponent";

class ItemApp extends Component {
    render() {
        return (
            <Router>
                <>
                    <h1 style={{textAlign: "center"}}>Items QR Application</h1>
                    <Switch>
                        <Route path="/" exact component={ListItemComponent} />
                        <Route path="/items/" exact component={ListItemComponent} />
                        <Route path="/codes/" exact component={Codes} />
                        <Route path="/items/:id" component={ItemComponent} />
                        <Route path="/weathers/" component={WeatherComponent} />
                    </Switch>
                </>
            </Router>
        )
    }
}
export default ItemApp