import React, { Component } from 'react';

import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

import ImageCarousel from './ImageCarousel';
import RequestDatesPopUp from '../checkout/RequestDatesPopUp';
import DeleteDialog from './DeleteDialog';

import axios from 'axios';

import './css/ToolViewOwner.css';


const styles = theme => ({
    card: {
        height: "100%",
        display: "flex",
        flexDirection: "column"
    },
    cardContent: {
        flexGrow: 1,
        // maxHeight: 100,
        minHeight: 200,
        overflowY: "scroll"
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit
    },
    dense: {
        marginTop: 16
    },
    menu: {
        width: 200
    }

})

class ToolViewOwner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tool: {},
            renterUid: '',
            brand: '',
            name: '',
            description: '',
            price: 0,
            available: false,
            rented: false,
            rating: 0,
            selectedFile: null,
        };
    }

    componentDidMount() {
        let tool_id = this.props.match.params.id;
        console.log(tool_id);
        this.getToolInfo(tool_id);
        console.log(this.state.tool.images);
    }

    getToolInfo = tool_id => {
        console.log('getToolInfo called');
        axios.get(`/api/tools/owner/singletool/${tool_id}`)
            .then(tool => {
                // console.log('getToolInfo tool:', tool);
                // console.log('getToolInfo tool.data:', tool.data);

                this.setState({
                    tool: tool.data,
                    renterUid: tool.data.renter_uid,
                    brand: tool.data.brand,
                    name: tool.data.name,
                    description: tool.data.description,
                    price: tool.data.price,
                    available: tool.data.available,
                    rented: tool.data.rented,
                    rating: tool.data.rating,
                }, () => { 
                    console.log("ToolView state.tool after getToolInfo:", this.state.tool);
                    // console.log(this.state.tool.images);

                });
            })
            .catch(error => {
                console.log(error.message);
            })
    }

    handleFileChange = event => {
        // this.setState({
        //   selectedFile: event.target.files[0]
        // });
        let tool_id = this.props.match.params.id;
        const newImageData = new FormData();
        newImageData.append('id', this.props.match.params.id);
        newImageData.append('image_file', event.target.files[0]);
        axios.post('/api/tools/newimage', newImageData)
            .then(response => {
                console.log('/newimage response: ', response);
            })
            .catch(error => {
                console.log(error.messages);
            })
    };

    handleToolDelete = event => {
        this.props.history.push({        
            pathname: "/yourtools"
        });
    }

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value
        });
    };

    render() {
        const { tool } = this.state;
        const { classes } = this.props;

        return (
            <div className="pageContainer">
                <div className="title">
                    <Typography gutterBottom variant="h5" component="h2">
                        {tool.brand}{' '}{tool.name}
                    </Typography>
                    
                </div>

                <div className="mainContainer">

                    <div className="leftContainer">

                        {tool.images ? (
                            <ImageCarousel toolImages={tool.images} />
                        ) : (
                            ''
                        )}

                        <div className ="add-image">
                            <p>Add image:</p>
                            <input
                                accept="image/*"
                                className="image-input"
                                id="contained-button-file"
                                multiple
                                type="file"
                                name="image"
                                onChange={this.handleFileChange}
                            />
                        </div>

                    </div>

                    <div className="rightContainer">
                        <div className="toolInfo">
                            {/* <Typography gutterBottom variant="h5" component="h2">
                                Description
                            </Typography>
                            <Typography>
                                {tool.description}
                            </Typography>
                            <br/>
                            
                            <br/>
                            <Typography>
                                Daily rental price: ${tool.price}
                            </Typography> */}

                            {/* Change Price */}

                            {/* {tool.available === true ? (
                                <Typography>
                                    This tool is available to be reserved and rented.
                                </Typography>
                            ) : (
                                <Typography>
                                    This tool is not available to be reserved or rented.
                                </Typography>
                            )}

                            {tool.rented === true ? (
                                <Typography>
                                    This tool is currently rented.
                                </Typography>
                            ) : (
                                <Typography>
                                    This tool is not currently rented.
                                </Typography>
                            )} */}

                            {/* View reserved rental dates */}

                            <form onSubmit={this.updateUserDetails}>

                                <TextField
                                    id="outlined-description"
                                    label="Description"
                                    className={classes.textField}
                                    value={this.state.description}
                                    onChange={this.handleChange("description")}
                                    margin="normal"
                                    variant="outlined"
                                />

                                <TextField
                                    id="outlined-price"
                                    label="Price"
                                    className={classes.textField}
                                    value={this.state.price}
                                    onChange={this.handleChange("price")}
                                    margin="normal"
                                    variant="outlined"
                                />

                                <Button variant="outlined" color="primary" className="save-button" type="submit" >
                                    Save
                                </Button>

                            </form>
                        </div>

                        <DeleteDialog toolId={this.props.match.params.id} handleToolDelete={this.handleToolDelete}/>

                    </div>
                </div>

            </div>
        )
    }
}

export default withStyles(styles)(ToolViewOwner);