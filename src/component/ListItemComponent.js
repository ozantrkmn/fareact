import React, { Component } from 'react';
import ItemDataService from "../service/ItemDataService";


class ListItemComponent extends Component {


    constructor(props) {
        super(props)
        this.state = {
            items: [],
            message: null,
            checked: false,
            options: [],
            value: '128',
            logo: null
        }
        this.refreshItems = this.refreshItems.bind(this)
        this.deleteItemClicked = this.deleteItemClicked.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.createqr = this.createqr.bind(this)
        this.updateCourseClicked = this.updateCourseClicked.bind(this)
        this.addCourseClicked = this.addCourseClicked.bind(this)
        this.imageupload = this.imageupload.bind(this)
    }



    componentDidMount() {
        this.refreshItems();
    }



    refreshItems() {
        ItemDataService.retrieveAllItems()
            .then(
                response => {
                    console.log(response);
                    this.setState({items: response.data})
                }
            )
    }


    deleteItemClicked(id) {
        ItemDataService.deleteItem(id)
            .then(
                response => {
                    this.setState({ message: `Delete of item ${id} Successful` })
                    this.refreshItems()
                }
            )

    }


    onChange(e) {

        const options = this.state.options
        let index

        if (e.target.checked) {
            options.push(e.target.value)
        } else {
            index = options.indexOf(+e.target.value)
            options.splice(index, 1)
        }

        this.setState({ options: options })


    }


    handleChange(event) {
        this.setState({value: event.target.value});
    }

    imageupload(event) {
        this.setState({
            logo: URL.createObjectURL(event.target.files[0])
        })
    }

    createqr(){
        this.props.history.push({
            pathname: '/codes',
            data: {
                qrs: this.state.options,
                size: this.state.value,
                png: this.state.logo
            }
        })
    }

    updateCourseClicked(id) {
        console.log('update ' + id)
        this.props.history.push(`/items/${id}`)
    }

    addCourseClicked() {
        this.props.history.push(`/items/-1`)
    }


    render() {
        return (
            <div className="container">
                <h3>All Items <button className="btn btn-success" onClick={this.addCourseClicked}>Add</button></h3>
                {this.state.message && <div class="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Update</th>
                            <th>Delete</th>
                            <th>Select</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.items.map(
                                item =>
                                    <tr key={item._id}>
                                        <td>{item.itemName}</td>
                                        <td>
                                            <button
                                            className="btn btn-success" onClick={() => this.updateCourseClicked(item._id)}>Update
                                            </button>
                                        </td>
                                        <td>
                                            <button className="btn btn-warning"
                                                    onClick={() => this.deleteItemClicked(item._id)}>Delete
                                            </button></td>
                                        <td>
                                            <input
                                            type="checkbox"
                                            value={item._id}
                                            onChange={this.onChange.bind(this)}

                                            />
                                        </td>
                                    </tr>
                            )
                        }
                        </tbody>
                    </table>
                </div>
                <div className="selected-items" >
                    <div>
                        <label >
                            Size:
                            <input type="text" value={this.state.value} onChange={this.handleChange} />
                        </label>
                    </div>
                    <div>
                        <label>
                            Browse Image if you want logo at the center of QRCode
                            <input className="btn btn-link" type="file" onChange={this.imageupload}/>
                        </label>
                    </div>
                    <div>
                        <button className="btn btn-danger"
                                onClick={() => this.createqr()}>Show QR Codes
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ListItemComponent