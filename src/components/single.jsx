import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Axios from 'axios';

class Single extends Component {
  constructor(props, context) {
    super(props, context);

    this.rmRecipe = this.rmRecipe.bind(this);

    this.state = {data:this.props.data};
  }

  rmRecipe(id,refresh) {
    var twoStep = window.confirm('Are you sure you want to delete this? Cant be undone.');

    if(twoStep){
        Axios.get(`http://localhost:3000/delete/${id}`)
        .then(response =>
          // set the state to the API response
          console.log(response)
        );
     };
    if(refresh){refresh();};
  }

  render(){
    return (
      <Paper className="single-recipe" style={{padding: 15}}>
        <Grid container>
          <Grid align="center" item xs={10}>
            <h2>{this.props.data.dishName}</h2>
          </Grid>
          <Grid item xs={1} align="flex-end">
            {this.props.editable ?
              <Button onClick={ () => this.props.editView(this.props.data._id)}>Edit</Button>
              : null
            }
            </Grid>
            <Grid item xs={1} align="flex-end">
            {this.props.deletable ?
              <Button onClick={ () => this.rmRecipe(this.props.data._id,this.props.refresh)}>x</Button>
              : null
            }
          </Grid>
          <Grid item xs={6}>
            <ul>
              {this.props.data.ingredients.map((ingredient,index) => (
                <li key={index}>{ingredient.ingAmount}<sub>{ingredient.ingUnit}</sub> {ingredient.ingName} </li>
              ))}
            </ul>
          </Grid>
          <Grid item xs={6}>
            <p>{this.props.data.instructions}</p>
          </Grid>
        </Grid>
      </Paper>
    );
  }


}

export default Single;
