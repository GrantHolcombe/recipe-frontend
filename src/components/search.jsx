import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import Single  from './single';
import Axios from 'axios';

class Search extends Component {
  constructor(props, context) {
    super(props, context);

    this.searchQuery = this.searchQuery.bind(this);
    this.singleRecipe = this.singleRecipe.bind(this);
    this.hangleChange = this.handleChange.bind(this);

    this.state = {
      query: '',
      searchResults: [],
      singleRecipe:{}
    };
  }

  // generic event handler for instructions
  handleChange(event) {
    const name = event.target.name
    const value = event.target.value
    this.setState({ [name]: value })
  }

  searchQuery(query) {
    const newState = Axios.post(`http://localhost:3000/search/${query}`)
      .then(response =>
        // set the state to the API response
        // var mergedObj = Object.assign{this.state, response.data};
        this.setState({ searchResults: response.data })
      );
  }

  singleRecipe(id) {
    console.log(id)
    const newState = Axios.post(`http://localhost:3000/single/${id}`)
      .then(response =>
        // set the state to the API response
        // var mergedObj = Object.assign{this.state, response.data};
        this.setState({ singleRecipe: response.data })
      );
  }


  render(){
    const haveData = this.state.singleRecipe.length

    return (
      <div className="All">
        <h1>Search</h1>
        <TextField type="text" name="query" placeholder='seperate ingredients by coma' onChange={(e) => this.handleChange(e)} value={this.state.query}/>
        <Button onClick={()=>this.searchQuery(this.state.query)}>Yeet!</Button>

        <Grid container spacing={24} direction="row">
          <Grid item md={4} xs={12}>
            <List>
              {this.state.searchResults.map((item, index) => (
                <ListItem button key={index} onClick={() => this.singleRecipe(item._id)}>{item.dishName}</ListItem>
              ))}
            </List>
          </Grid>
          <Grid item md={8}>
            {haveData ? <Single data={this.state.singleRecipe[0]} /> : null}
          </Grid>
        </Grid>

      </div>
    );
  }


}

export default Search;
