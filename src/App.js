import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import All  from './components/all';
import Input  from './components/input';
import Search  from './components/search';


class App extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {view:3,right: false};
  }

  toggleDrawer = (open) => () => {
    this.setState({
      right: open
    });
  };

  switchView = (id) => () => {
    this.setState({
      view: id,
      right: false
    });
  };


  render(){
    return (
      <Grid container justify="center" className="App">
        <Grid align="right" item xs={12}>
          <Button onClick={this.toggleDrawer('right', true)}>Menu<MenuIcon/></Button>
          <Drawer anchor="right" open={this.state.right} onClose={this.toggleDrawer(false)}>
            <h2 style={{padding: 15}} onClick={() => this.setState({view: 3, right: false})}>Holcombe Family Recipes</h2>
            <List>
              <ListItem button onClick={this.switchView(0)}>New Recipe</ListItem>
              <ListItem button onClick={this.switchView(1)}>Search Recipes</ListItem>
              <ListItem button onClick={this.switchView(2)}>View All Recipes</ListItem>
            </List>
          </Drawer>
        </Grid>
        <Grid item align="left" xs={10} style={{padding: 15}}>


          {this.state.view === 0 ? <Input /> : null}
          {this.state.view === 1 ? <Search /> : null}
          {this.state.view === 2 ? <All /> : null}
          {this.state.view === 3 ? <div><h1>Holcombe Family Recipes</h1> <h3>a full stack MERN project</h3></div> : null}

        </Grid>
      </Grid>
    );
  }


}

export default App;
