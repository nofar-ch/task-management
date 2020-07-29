import React, { Component } from 'react';
import CustomerList from '../customerList/customerList';
import TextBoxSearch from '../textBoxSearch/textBoxSearch';
import MenuBar from '../menuBar/menuBar'
import styles from './styles';
import {withStyles} from '@material-ui/core/styles';


 class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            customers: [],
            agreements: []
        });
    }

    componentDidMount = () => {
       this.getCustomers();
       this.getAgreements();
    }

    getCustomers = () => { 
        fetch('http://localhost:4000/customers', {
            method: "get"
        })
        .then(res => res.json())
        .then(data => {
            this.setState({customers: data.customers});
        }).catch(err => console.log(err));
    }

    getAgreements = () => { 
        fetch('http://localhost:4000/agreements', {
            method: "get"
        })
        .then(res => res.json())
        .then(data => {
            this.setState({agreements: data.agreements});
        }).catch(err => console.log(err));
    }

    customersSortByName = (by) => { 
        if(by === 'up') {
        fetch('http://localhost:4000/sortbynameasc', {
            method: "get"
        })
        .then(res => res.json())
        .then(data => {
            this.setState({customers: data.customers});
        }).catch(err => console.log(err));
    }
    else {
        fetch('http://localhost:4000/sortbynamedesc', {
            method: "get"
        })
        .then(res => res.json())
        .then(data => {
            this.setState({customers: data.customers});
        }).catch(err => console.log(err));
    }
    }    

    customersSortByDate = (by) => { 
        if(by === 'up') {
        fetch('http://localhost:4000/sortbydateasc', {
            method: "get"
        })
        .then(res => res.json())
        .then(data => {
            this.setState({customers: data.customers});
        }).catch(err => console.log(err));
    }
    else {
        fetch('http://localhost:4000/sortbydatedesc', {
            method: "get"
        })
        .then(res => res.json())
        .then(data => {
            this.setState({customers: data.customers});
        }).catch(err => console.log(err));
    }
    }    
  

render() {
    const {customers, agreements} = this.state;
    const {classes} = this.props;

  return (
    <div>
        <MenuBar/>
        <br/><br/>
        <h2 className={classes.taskM}>ניהול משימות</h2>
        <TextBoxSearch/>
        <div>
            <CustomerList customers={customers} agreements={agreements} customersSortByNameFn={(e, by) => this.customersSortByName(e, by)}
                customersSortByDateFn = {(e, by) => this.customersSortByDate(e, by)}
            />
        </div>
    </div>
  );
}
 }
 export default withStyles(styles)(Dashboard);
