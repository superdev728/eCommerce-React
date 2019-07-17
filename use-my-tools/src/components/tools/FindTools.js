import React, { Component } from 'react';
import { withRouter, Link } from "react-router-dom"
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ImageCarousel from './ImageCarousel';
import FilterMenu from './FilterMenu';

import './css/FindTools.css';

import axios from 'axios';

const styles = theme => ({
    card: {
        height: "100%",
        display: "flex",
        flexDirection: "column"
    },
    cardContent: {
        flexGrow: 1,
        maxHeight: 100,
        minHeight: 100,
        overflow: "hidden"
    },

})

class FindTools extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tools: [],
            maxPrice: 100,
            keywords: []
        };
    }

    componentDidMount() {
        // Get available tools in the renter's city:
        const criteria = { city: 'renter' };
        axios.post('/api/tools/findtools', criteria)
            .then(tools => {
                this.setState({
                    tools: tools.data
                }, () => console.log('FindTools state.tools after GET /findtools: ', this.state.tools)) ;
            })
            .catch(error => {
                console.log(error.message);
            })
    }

    // openToolView = event => {

    // }

    updateFilter = (name, value) => {
        // if updating the keywords filter with a search string, 
        // split the string and put each word into the state.keywords array:
        if (name === 'searchString') {
            let keywords = [];
            let searchString = value;
            // Return if searchString is null:
            if (!searchString) {
                return;
            }
            // If searchString is not null,
            // split searchString into words 
            // and push each word in lowerCase into state.keywords array:
            for (let word of searchString.split(' ')) {
                keywords.push(word.toLowerCase());
            }
            // console.log(keywords);
            this.setState({ keywords }) 
        }
        this.setState({ [name]: value });
    }

    render() {
        const { classes } = this.props;
        const { tools, maxPrice, keywords } = this.state;

        const filteredTools = tools.filter(tool => 
            tool.price <= maxPrice 
            && (
                keywords.length === 0
                || tool.brand.split(' ').some(word => keywords.indexOf(word.toLowerCase()) >=0)
                || tool.name.split(' ').some(word => keywords.indexOf(word.toLowerCase()) >= 0)
                || tool.description.split(' ').some(word => keywords.indexOf(word.toLowerCase()) >= 0)
            )
        );

        return (
            <div className="page-container">
                <h1>Find tools to rent</h1>

                <div className="main-container">

                    <div className="filter-menu-container">
                        <FilterMenu updateFilter={this.updateFilter} />
                    </div>

                    <div className="tools-list-container">

                        <Grid container spacing={40}>

                            {filteredTools.map((tool, index) =>  {
                                return (
                                    <Grid item xs={3} key={index}>
                                        <Card className={classes.card}>
                                            <ImageCarousel toolImages={tool.images} />
                                            <CardContent className={classes.cardContent}>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    {tool.brand}{' '}{tool.name}
                                                </Typography>
                                                <Typography>
                                                    {tool.description}
                                                </Typography>
                                                <Typography>
                                                    {tool.city}{', '}{tool.state}
                                                </Typography>
                                            </CardContent>
                                            <CardActions>
                                                <Button
                                                    component={Link}
                                                    to={`/toolviewrenter/${tool.id}`}
                                                    size="small"
                                                    color="primary"
                                                >
                                                    View Tool Details
                                                </Button>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                );
                            })}

                        </Grid>
                            
                    </div>
                </div>
            </div>

        );
    }
}

export default withRouter(withStyles(styles)(FindTools));