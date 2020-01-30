import React from "react";
import PropTypes from "prop-types";
import { Switch, Redirect } from "react-router-dom";
import RegisterPage from './RegisterPage.jsx';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

import pagesStyle from "../../assets/jss/material-dashboard-pro-react/layouts/pagesStyle.jsx";
import bgImage from "../../assets/img/register.jpeg";

class Register extends React.Component {
  componentDidMount() {
    document.body.style.overflow = "unset";
  }
  render() {
    const { classes } = this.props;
    if (this.props.collapse) {
      return null;
    }
    if (this.props.redirect) {
      return (
        <Redirect from={this.props.path} to={this.props.pathTo} />
      );
    }
    return (
      <div>
        <div className={classes.wrapper}>
          <div
            className={classes.fullPage}
            style={{ backgroundImage: "url(" + bgImage + ")" }}
          >
            <div style={{position: 'absolute', width: '100%', height: '60px', top: 0, zIndex: 10}}>
              <div style={{marginLeft: '40px', marginRight: '40px', height: '100%'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', height: '100%'}}>
                  <div />
                  <div style={{display: 'flex', alignItems: 'center', height: '100%'}}>
                    <a style={{textDecoration: 'none'}} href='/login'>
                      <h5 style={{color: 'white'}}>Login</h5>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <Switch>
              <RegisterPage/>
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(pagesStyle)(Register);
