import React, { Component } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import ItemDataService from "../service/ItemDataService";

class ItemComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            itemName: ''
        }

        this.onSubmit = this.onSubmit.bind(this)

    }

    componentDidMount() {

        console.log(this.state.id)

        // eslint-disable-next-line
        if (this.state.id == -1) {
            return
        }

        ItemDataService.retrieveItem(this.state.id)
            .then(response => this.setState({
                itemName: response.data.itemName
            }))
    }


    onSubmit(values) {

        let course = {
            id: this.state.id,
            itemName: values.itemName
        }
        // eslint-disable-next-line
        if (this.state.id == -1) {
            ItemDataService.createItem(course)
                .then(() => this.props.history.push('/items/'))
        } else {
            ItemDataService.updateItem(this.state.id, course)
                .then(() => this.props.history.push('/items/'))
        }

        console.log(values);
    }

    render() {

        let { itemName, id } = this.state

        return (
            <div>
                <h3>Item</h3>
                <div className="container">
                    <Formik
                        initialValues={{ id, itemName }}
                        onSubmit={this.onSubmit}
                        validateOnChange={false}
                        validateOnBlur={false}
                        enableReinitialize={true}
                    >
                        {
                            (props) => (
                                <Form>
                                    <ErrorMessage name="Name" component="div"
                                                  className="alert alert-warning" />
                                    <fieldset className="form-group">
                                        <label>Id</label>
                                        <Field className="form-control" type="text" name="id" disabled />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Name</label>
                                        <Field className="form-control" type="text" name="itemName" />
                                    </fieldset>
                                    <button className="btn btn-success" type="submit">Save</button>
                                </Form>
                            )
                        }
                    </Formik>

                </div>
            </div>
        )
    }
}

export default ItemComponent