import React from 'react';
//import axios from 'axios';
import API from '../../utils/API';

export default class Home extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: ''};
    }
   
    componentDidMount() {
      API
        .get("https://localhost:8080/home")
        .then(response => {
          const value = response.data;
          this.setState({ value });
        })
        .catch(error => console.log(error));
  }
  
    render() {
      return (
        <div class="about">
            <h3>Welcome to DiS <br/> The Social App for the di community<br/> { this.state.value.bold } </h3>
        </div>
      );
    }
  }
