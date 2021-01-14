import React, { Component } from 'react';
import ListItemComponent from "./ListItemComponent";
import {Col, Grid, Row} from "react-flexbox-grid";
import {PDFDownloadLink, Document, Page, Font, View, Image, StyleSheet, PDFViewer, Text} from '@react-pdf/renderer'
import ReactDOM from 'react-dom'




const QRCode = require('qrcode.react');


class Codes extends Component {

    constructor(props) {
        super(props)
        this.state = {
            codes: [],
            size: 0,
            MyDocument: Document,
        }

        this.printDocument = this.printDocument.bind(this)
        this.renderIcon = this.renderIcon.bind(this);

    }

    componentDidMount(){
        var canvas = document.getElementsByTagName('canvas');

        var i;
        for(i = 0 ; i < canvas.length ; i++){
            this.state.codes[i] = canvas[i].toDataURL('image/png', 0.3);
            console.log(this.state.codes[i]);
        }
    }


    printDocument(){

        let size = this.state.size;

        const doc = () => (
            <Document>
                <Page size="A4" style={{ paddingTop: '8px' }}>
                    <View style={{ display: 'flex', flexFlow: 'row wrap', flexDirection: 'row', flexWrap:'wrap', justifyContent: 'center' }}>
                        {
                            this.state.codes.map(
                                number =>
                                    <Image style={{ width: size , padding: '8px'}} src={ {uri: number}}/>
                            )
                        }
                    </View>
                </Page>
            </Document>
        )

        this.setState({ MyDocument: doc })

        document.getElementById("link").style.display = "block";
        document.getElementById("gen").style.display = "none";
    }


    renderIcon(){

    }




    render() {

        const {data} = this.props.location;
        this.state.size = data.size;

        var bool;

        if(typeof data.png != "undefined"
            && data.png != null
            && data.png.length != null
            && data.png.length > 0)
            bool = true;
        else
            bool = false;




        return(
            <div style={{textAlign: "center"}}>
                <div id="gen">
                    <button className="btn btn-danger" onClick={this.printDocument} style={{margin: "10px"}}>
                        Generate PDF
                    </button>
                </div>
                <div id="link"  style={{display:'none', paddingTop:"10px", paddingBottom:"10px"}}>
                    <PDFDownloadLink type="button" id="link" className="btn btn-success" document={<this.state.MyDocument />} fileName="qrcodes.pdf">
                        {"Download Now!"}
                    </PDFDownloadLink>
                </div>
                <div id="qrcodes" style={{display: 'flex', flexFlow: 'row wrap', flexDirection: 'row', flexWrap:'wrap',
                    textAlign: "center", marginBottom: "10px", justifyContent: 'center'}}>
                    {data.qrs.map(
                        number =>
                                        <QRCode
                                            style={{ padding: '8px'}}
                                            value={"http://localhost:3000/items/"+number}
                                            size={data.size}
                                            bgColor={"#ffffff"}
                                            fgColor={"#000000"}
                                            level={"L"}
                                            includeMargin={false}
                                            renderAs={"canvas"}
                                            imageSettings={
                                                bool
                                                    ? {
                                                        src: data.png,
                                                        height: data.size/5,
                                                        width: data.size/5,
                                                        centerImage: true,
                                                        excavate: false
                                                    }
                                                    : null
                                            }
                                        />
                    )}
                </div>
            </div>

        )


    }

}

export default Codes