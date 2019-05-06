import React, { Component } from 'react';
import Single from './single';
import Input from './input';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import Axios from 'axios';

class All extends Component {
  constructor(props, context) {
    super(props, context);

    this.refresh = this.refresh.bind(this);
    this.editView = this.editView.bind(this);
    this.resetView = this.resetView.bind(this);
    this.singleRecipe = this.singleRecipe.bind(this);

    this.state = {
      data:[],
      singleRecipe: {},
      edit:{
        view:false,
        id:""
      }
    };
  }

  componentWillMount() {
    this.refresh();
  }

  refresh() {
    const newState = Axios.get('http://localhost:3000/all')
      .then(response =>
        // set the state to the API response
        this.setState({data:response.data})
      );
  }

  resetView(){
    this.setState({edit:{view:false}})
    this.refresh()
  }



  editView(id){
    this.setState({edit:{view:true,id:id}});
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
      <Grid container className="all">
          {this.state.edit.view ?
             <Grid item xs={12}>
              <Input edit={this.state.edit.id} view={this.resetView} />
             </Grid>
             :
             <Grid direction="row" container md={12} spacing={24}>
             <Grid item xs={12}>
               <h1>All Recepies</h1>
             </Grid>
               <Grid item md={4} sm={12}>
                  <List>
                  {this.state.data.map((item,index) => (
                    <ListItem button key={item._id} onClick={() => this.singleRecipe(item._id)}>{item.dishName}</ListItem>
                     ))}
                  </List>
               </Grid>
               <Grid item md={8}>
               {haveData ? <Single editable deletable editView={this.editView} data={this.state.singleRecipe[0]} refresh={this.refresh} /> : null}
               </Grid>
             </Grid>
           }
         </Grid>
    );
  }

}

export default All;
