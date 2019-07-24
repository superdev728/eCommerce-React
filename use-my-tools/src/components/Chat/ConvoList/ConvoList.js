import React from "react";
// import { withRouter } from "react-router-dom"
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
// import axios from 'axios';

import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
// import NoSsr from "@material-ui/core/NoSsr";
// import Typography from "@material-ui/core/Typography";

import { withFirebase } from "../../Firebase";

import Convos from './Convos';


const styles = {
    root: {
      flexGrow: 1,
      // border: '1px solid blue',
      // Changes from David
      height: '100vh',
      display: 'flex',
      flexDirection: 'column'
    },
    queueMenu: {
      // height: '100%',
      // border: '1px solid red',
      borderRadius: '0px',
      width: '100%',
      borderBottom: '1px gray solid',
    },
    queueList: {
      overflow: 'hidden',
      // height: '100% ',
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
  },
  paper: {
    // height: '100%'
    borderRadius: '0px'
  },
  paper2: {
    // height: '100%',
    borderRadius: '0px'
  },
  tabs1: {
    height: '100%'
  },
  tabElement: {
    width: '30%',
    minWidth: 50,
    maxWidth: 200
  },
  tab: {
    display: 'flex',
    justifyContent: 'space-around'
  },
  tabLabel: {
    fontSize: 16,
    padding: 0
  },
  convoCount: {
    padding: 0,
    color: '#69DB30',
    'font-weight': 'bold'
  }
};

class ConvoListBase extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          value: 0,  // value corresponding to Open tab to display the Open convo list on mount
          newConvosCount: 0,
          openConvos: [],
          closedConvos: []
        };
        // this.intervalID = 0;
    }

    componentDidMount() {
      const uid = this.props.uid;
      console.log(uid);
      let openConvos = [];
      let closedConvos = [];
      let convos = [];
      // one-time get of convos all convos (open and closed) where UIDs contains current user uid:
      this.props.firebase.db
        .collection('conversations')
        .where('UIDs', 'array-contains', `${uid}`)
        .get()
        .then(snapshot => {
          if (snapshot.empty) {
            console.log('No matching documents.');
            return;
          }  
      
          snapshot.forEach(doc => {
            convos.push(doc.data());
            // console.log(doc.id, '=>', doc.data());
          });
          console.log(convos);
          this.setState({ convos });
        })
        .catch(err => {
          console.log('Error getting documents', err);
        });


    }


    // getNewConvos is used by Convolist to check how many New Convos are in the database
    // in order to update the number icon on the New tab showing how many are in that list
    // even when another tab/list is selected:

    

    handleTabSelect= (event, value) => {
      this.setState({ value });
    };


    render() {
      const { classes } = this.props;
      // const { value } = this.state;
      // const newConvosCount = this.state.newConvosCount;
      return (

        <div className={classes.root}>
          <div className={classes.queueMenu}>
            <Paper className={classes.paper}>
              <Tabs
                className={classes.paper2}
                value={this.state.value}
                onChange={this.handleTabSelect}
                indicatorColor="primary"
                textColor="primary"
                centered
                >
                  {/* <Tab
                    className={classes.tabElement}
                    label={
                      <div className={classes.tab}>
                        <h1 className={classes.tabLabel}>NEW</h1>
                        
                          {newConvosCount > 0 ? ( <span className={classes.convoCount}>{newConvosCount}</span>
                            ) : ('')
                          }
                        
                      </div>
                    }
                  /> */}
                  <Tab className={classes.tabElement} label={<h1 className={classes.tabLabel}>Open</h1>} />
                  <Tab className={classes.tabElement} label={<h1 className={classes.tabLabel}>Closed</h1>} />
              </Tabs>
            </Paper>
          </div>

          <div className={classes.queueList}>
                {this.state.value === 0 && 
                  <Convos  
                    uid={this.props.uid}
                    isOpen={true} 
                    currentConvoId={this.props.currentConvoId} 
                    handleConvoSelect={this.props.handleOpenConvoSelect} 
                  />
                }
                {this.state.value === 1 && 
                  <Convos 
                    uid={this.props.uid}
                    isOpen={false} 
                    currentConvoId={this.props.currentConvoId} 
                    currentConvoClosed={this.props.currentConvoClosed} 
                    handleConvoSelect={this.props.handleClosedConvoSelect} 
                  />
                }
          </div>

        </div>
      );
    }
}

ConvoListBase.propTypes = {
    classes: PropTypes.object.isRequired
};

 
const ConvoList = withStyles(styles)(withFirebase(ConvoListBase));

export default ConvoList;
