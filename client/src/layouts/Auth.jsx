import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from "../components/CustomButtons/Button.jsx";

import authRoutes from "../routes/auth.jsx";
import pagesStyle from "../assets/jss/material-dashboard-pro-react/layouts/pagesStyle.jsx";
import bgImage from "../assets/img/register.jpeg";

class Auth extends React.Component {
  componentDidMount() {
    document.body.style.overflow = "unset";
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className={classes.wrapper}>
          <AppBar position="static" className="session-header">
            <Toolbar>
              <div className="container">
                <div className="d-flex justify-content-between">
                  <div>
                    <a className="mr-15" onClick={() => this.onUserSignUp()}>Create New account?</a>
                    <Button variant="raised" className="btn-light" onClick={() => this.onUserSignUp()}>Sign Up</Button>
                  </div>
                </div>
              </div>
            </Toolbar>
          </AppBar>

          <div
            className={classes.fullPage}
            style={{ backgroundImage: "url(" + bgImage + ")" }}
          >
            <Switch>
              {authRoutes.map((prop, key) => {
                if (prop.collapse) {
                  return null;
                }
                if (prop.redirect) {
                  return (
                    <Redirect from={prop.path} to={prop.pathTo} key={key} />
                  );
                }
                return (
                  <Route
                    path={prop.path}
                    component={prop.component}
                    key={key}
                  />
                );
              })}
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

Auth.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(pagesStyle)(Auth);
