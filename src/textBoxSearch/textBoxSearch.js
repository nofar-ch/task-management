import React, { Component } from 'react';
import {withStyles} from '@material-ui/core';
import styles from './styles';

 class TextBoxSearch extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            input: null
        });
    }

    typing = (e) => {
        this.setState({input: e.target.value})
    }


render() {

    const {classes} = this.props;

  return (
    <div>
     <input className={classes.textField} type="text" id="fname" name="task" dir="rtl" placeholder="חיפש משימה..."></input>
    </div>
  );
 }
 }
 export default withStyles(styles)(TextBoxSearch);


