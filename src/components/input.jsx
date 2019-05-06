import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Axios from 'axios';

class Input extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleIns = this.handleIns.bind(this);
    this.handleIng = this.handleIng.bind(this);
    this.addIngredient = this.addIngredient.bind(this);
    this.rmIngredient = this.rmIngredient.bind(this);
    this.sendIt = this.sendIt.bind(this);

    this.state = {
      ingredients: [
        {
          ingAmount: 0,
          ingUnit: '',
          ingName: ''
        }
      ],
      instructions:"",
      dishName:""
    };

  }

  // generic event handler for instructions
  handleIns(event) {
    const name = event.target.name
    const value = event.target.value
    this.setState({ [name]: value })
  }

  // advanced handler for ingredients (update array of objects)
  handleIng(event, index) {
    // copy array from state
    let newArr = [...this.state.ingredients]
    // copy specific object from array in state
    let change = Object.assign({}, this.state.ingredients[index])
    // convert UTM string to lowercase for use in URL
    let val = event.target.value.toLowerCase();
    // loop through coppied object and change updated property
    for(var property in change) {
      if(property === event.target.name)
      if(event.target.name === 'content_utm'){
        const replace = val.replace(' ', '_');
        change[event.target.name] = replace
      }
      else{
          change[event.target.name] = event.target.value
      }
    }
    // cut out the outdated object and inject the updated one from the copied array
    newArr.splice(index, 1, change);
    // rewrite the updated array to state
    this.setState({ ingredients: newArr });
  }

  addIngredient() {
    const newArr = [...this.state.ingredients, {ingAmount: 0, ingUnit: '', ingName: '', _id: Date.now()}]
    this.setState({ingredients: newArr})
  }

  rmIngredient(index) {
    const newArr = [...this.state.ingredients]
    console.log(index);
    newArr.splice(index, 1);
    this.setState({ingredients: newArr})
  }

  sendIt() {
    Axios.post('http://localhost:3000/new', this.state );
  }

  updateDish(id,view) {
    Axios.post(`http://localhost:3000/update/${id}`, this.state ).then(() =>
      view()
  );
  }

  loadDish(id) {
    Axios.post(`http://localhost:3000/loadDish/${id}`)
    .then(response =>
      // set the state to the API response
      this.setState(response.data[0])
    );
  }

  render(){
    return (
      <Grid container className="new">
      {!this.state._id ? this.loadDish(this.props.edit) : null}
      <Grid item xs={12}>
      <h1>{this.props.edit ? "Edit" : "Input new"} recipe</h1>

      <TextField fullWidth type="text" onChange={(e) => this.handleIns(e)} value={this.state.dishName} name="dishName" placeholder="Name Dish"></TextField>
      </Grid>

        {this.state.ingredients.map((ing,index) => (
          <Grid container spacing={8} xs={12} key={ing._id}>
          <Grid item xs={2}>
            <TextField fullWidth type="number" name={"ingAmount"} placeholder="Ingredient Amount" onChange={(e) => this.handleIng(e, index)} value={this.state.ingredients[index].ingAmount}></TextField>
          </Grid>
          <Grid item xs={2}>
            <TextField fullWidth type="text" name={"ingUnit"} placeholder="Amount Unit" onChange={(e) => this.handleIng(e, index)} value={this.state.ingredients[index].ingUnit}></TextField>
          </Grid>
          <Grid item xs={7}>
            <TextField fullWidth type="text" name={"ingName"} placeholder="Ingredient Name" onChange={(e) => this.handleIng(e, index)} value={this.state.ingredients[index].ingName}></TextField>
          </Grid>
          <Grid item align="right" xs={1}>
            <Button onClick={()=> this.rmIngredient(index)}>x</Button>
          </Grid>


          </Grid>
        ))}
      <Button onClick={this.addIngredient}>Add Ingredient Row</Button>
      <TextField multiline fullWidth name="instructions" onChange={this.handleIns} rows="5" col="160" placeholder="Enter instructions on how to prepare this meal" value={this.state.instructions}></TextField>
      <Button onClick={this.props.edit ? () => this.updateDish(this.props.edit,this.props.view) : this.sendIt}>Save</Button>


      </Grid>
    );
  }

}

export default Input;
