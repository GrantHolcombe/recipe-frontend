import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

class Menu extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {};
  }

  render(){
    return (
      <Grid align="right" item xs={12}>
        <Button onClick={this.props.toggleDrawer('right', true)}>Menu<MenuIcon/></Button>
        <Drawer anchor="right" open={this.state.right} onClose={this.props.toggleDrawer(false)}>
          <h2 style={{padding: 15}} >Holcombe Family Recipes</h2>
          <List>
            <ListItem button onClick={this.props.switchView(0)}>New Recipe</ListItem>
            <ListItem button onClick={this.props.switchView(1)}>Search Recipes</ListItem>
            <ListItem button onClick={this.props.switchView(2)}>View All Recipes</ListItem>
          </List>
        </Drawer>
      </Grid>
    );
  }


}

export default Menu;
