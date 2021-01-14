import React, { Component } from 'react';
import './App.css';
import ItemApp from './component/ItemApp';

class App extends Component {
    render() {
        return (
            <div className="container">
                <ItemApp />
            </div>
        );
    }
}

export default App;