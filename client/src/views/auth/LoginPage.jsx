import React from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { userLoginRequest } from '../../store/actions/usersActions';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
import Email from "@material-ui/icons/Email";

// core components
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import Button from "../../components/CustomButtons/Button.jsx";
import Card from "../../components/Card/Card.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardFooter from "../../components/Card/CardFooter.jsx";

import loginPageStyle from "../../assets/jss/material-dashboard-pro-react/views/loginPageStyle.jsx";

class LoginPage extends React.Component {
  state = {
    cardAnimaton: "cardHidden",
    userCredentials: {},
    errors: {},
  }
  componentDidMount() {
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    this.timeOutFunction = setTimeout(
      function() {
        this.setState({ cardAnimaton: "" });
      }.bind(this),
      700
    );
  }
  componentWillUnmount() {
    clearTimeout(this.timeOutFunction);
    this.timeOutFunction = null;
  }
  handleValidation = (field, value) => {
    let error = {};
    if (value === '') {
        error[field] = 'This field is required';
    } else {
        error[field] = '';
    }
    return error;
  }
  handleInputChange = (e) => {
    const field = e.target.id;
    const value = e.target.value;

    const errors = { ...this.state.errors, ...this.handleValidation(field, value) }
    if (errors.invalidCredentials) {
        delete errors.invalidCredentials;
    }

    this.setState((prevState) => {
        return {
            ...prevState,
            userCredentials: {
                ...prevState.userCredentials,
                [field]: value
            },
            errors: {...errors}
        };
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    let errors = {...this.state.errors};
    const userCredentialsValid = Object.keys(errors).filter(field => errors[field] !== "").length === 0 ? true : false;
    if ( !userCredentialsValid ) {
        return;
    } else {
        this.props.userLoginRequest({user: this.state.userCredentials})
        .then(res => {
            if (res.errors) {
                this.setState(prevState => {
                    return {
                        ...prevState,
                        userCredentials: {...prevState.userCredentials},
                        errors: {...prevState.errors, ...res.errors}
                    };
                });
                // alert(JSON.stringify(res));
            }
        })
    }
  }
  render() {
    const { classes } = this.props;
    if (this.props.isAuthenticated) {
      return (<Redirect to='/' />);
    }
    return (
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={6} md={4}>
            <form onSubmit={this.handleSubmit}>
              <Card login className={classes[this.state.cardAnimaton]}>
                <CardHeader
                  className={`${classes.cardHeader} ${classes.textCenter}`}
                  color="rose"
                >
                  <h4 className={classes.cardTitle}>Log in</h4>
                </CardHeader>
                <CardBody>
                  <CustomInput
                    labelText="Email..."
                    id="email"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      onChange: this.handleInputChange,
                      endAdornment: (
                        <InputAdornment position="end">
                          <Email className={classes.inputAdornmentIcon} />
                        </InputAdornment>
                      )
                    }}
                    error={this.state.errors.invalidCredentials ? this.state.errors.invalidCredentials : this.state.errors.email}
                    helpText={this.state.errors.invalidCredentials ? this.state.errors.invalidCredentials : this.state.errors.email}
                  />
                  <CustomInput
                    labelText="Password"
                    id="password"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      onChange: this.handleInputChange,
                      endAdornment: (
                        <InputAdornment position="end">
                          <Icon className={classes.inputAdornmentIcon}>
                            lock_outline
                          </Icon>
                        </InputAdornment>
                      )
                    }}
                    error={this.state.errors.password}
                    helpText={this.state.errors.password}
                  />
                </CardBody>
                <CardFooter className={classes.justifyContentCenter} style={{margin: 0, padding: 0}}>
                  <Button type='submit' color="rose" simple size="lg" block>
                    Login
                  </Button>
                </CardFooter>
              </Card>
            </form>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
      isAuthenticated: state.users.isAuthenticated
  }
}

const mapDispatchToProps = dispatch => {
  return {
      userLoginRequest: (userLoginDetails) => dispatch(userLoginRequest(userLoginDetails))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(loginPageStyle)(LoginPage));
