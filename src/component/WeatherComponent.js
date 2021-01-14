import React, { Component } from 'react'
import ItemDataService from "../service/ItemDataService";

class WeatherComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            weathers: [],
            option: '',
            filteredWeathers: []
        }

        this.refreshWeathers = this.refreshWeathers.bind(this)
        this.onValueChange = this.onValueChange.bind(this)
    }

    async componentDidMount() {
        this.refreshWeathers();
        try {
            setInterval(async () => {
                if(this.state.filteredWeathers  === undefined || this.state.filteredWeathers.length == 0){
                    this.refreshWeathers();
                }else{
                    this.onValueChange(this.state.option);
                }
            }, 30000);
        } catch(e) {
            console.log(e);
        }
    }



    onValueChange(e) {
        this.refreshWeathers();
        let first = this.state.weathers[0].time.match(/^([0-5]?\d):([0-5]?\d)/)[2];

        if(e == "hourly"){
            this.setState({
                filteredWeathers: this.state.weathers.filter(function(weather) {

                    return weather.time.match(/^([0-5]?\d):([0-5]?\d)/)[2] == first;
                })
            });
            this.setState({
                option: "hourly"
            });
        }else if(e == "30min"){
            this.setState({
                filteredWeathers: this.state.weathers.filter(function(weather) {

                    return weather.time.match(/^([0-5]?\d):([0-5]?\d)/)[2] == first ||
                        weather.time.match(/^([0-5]?\d):([0-5]?\d)/)[2] == parseInt(first)+15 ||
                        weather.time.match(/^([0-5]?\d):([0-5]?\d)/)[2] == parseInt(first)+30 ||
                        weather.time.match(/^([0-5]?\d):([0-5]?\d)/)[2] == parseInt(first)+45;
                })
            });
            this.setState({
                option: "30min"
            });
        }

    }


    refreshWeathers() {
        ItemDataService.retrieveAllWeather()
            .then(
                response => {
                    console.log(response);
                    this.setState({weathers: response.data})
                }
            )
    }

    render() {
        let list;

        if(this.state.filteredWeathers  === undefined || this.state.filteredWeathers.length == 0){
            list = this.state.weathers;
        }else{
            list = this.state.filteredWeathers;
        }


        return (
            <div className="container">
                <div className="container">
                    <table className="table">
                        <thead style={{display:"block"}}>
                        <tr style={{width:"100%"}}>
                            <th style={{width:"500px"}}>Time</th>
                            <th>Temp</th>
                        </tr>
                        </thead >
                        <tbody style={{display:"block", height: "400px", overflowX: "hidden", overflowY: "500px", width:"600px"}}>
                        {
                            list.map(
                                weather =>
                                    <tr key={weather._id}>
                                        <td style={{width:"500px"}}>{weather.time}</td>
                                        <td>{weather.temp}</td>
                                    </tr>
                            )
                        }
                        </tbody>
                    </table>
                    <div style={{display: "flex", flexDirection: "row", marginLeft:"15px"}}>
                        <div>
                            <button className="btn btn-danger"
                                    onClick={() => this.onValueChange("hourly")}>1 Hour
                            </button>
                        </div>
                        <div>
                            <button className="btn btn-danger" style={{marginLeft: "15px"}}
                                    onClick={() => this.onValueChange("30min")}>30 Minutes
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default WeatherComponent