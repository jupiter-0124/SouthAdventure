import React from "react";
import { connect } from 'react-redux';
import { addColorRequest } from '../../../store/actions/wheelActions';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import ColorLens from "@material-ui/icons/ColorLens";

// core components
import GridContainer from "../../../components/Grid/GridContainer.jsx";
import GridItem from "../../../components/Grid/GridItem.jsx";
import CustomInput from "../../../components/CustomInput/CustomInput.jsx";
import Button from "../../../components/CustomButtons/Button.jsx";
import Card from "../../../components/Card/Card.jsx";
import CardHeader from "../../../components/Card/CardHeader.jsx";
import CardIcon from "../../../components/Card/CardIcon.jsx";
import CardBody from "../../../components/Card/CardBody.jsx";

import regularFormsStyle from "../../../assets/jss/material-dashboard-pro-react/views/regularFormsStyle";

class AddColor extends React.Component {
  state = {
    data: {
      color: '',
    },
    errors: {
    },
  }
  handleInputChange = (e) => {
    const field = e.target.id;
    const value = e.target.value;

    this.setState((prevState) => {
      return {
          ...prevState,
          data: {
              ...prevState.data,
              [field]: value
          },
          errors: {
            ...prevState.errors,
            [field]: ''
          }
      };
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    var hasError = false;
    if(this.state.data.color === null || this.state.data.color === '') {
      hasError = true;
      this.setState((prevState) => {
        return {
            ...prevState,
            data: {...prevState.data},
            errors: {
              ...prevState.errors,
              color: "This field is required"
            }
        };
      });
    }

    if(!hasError) {
      this.props.addColorRequest(this.state.data)
      .then(res => {
        if (res.errors) {
          this.setState(prevState => {
            return {
              ...prevState,
              data: {...prevState.data},
              errors: {...prevState.errors, ...res.errors}
            };
          });
        } else {
          this.props.history.push('/color');
        }
      })
    }
  }
  render() {
    const { classes } = this.props;
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="info" icon>
              <CardIcon color="info">
                <ColorLens />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>Add Color</h4>
            </CardHeader>
            <CardBody>
              <form onSubmit={this.handleSubmit}>
                <CustomInput
                  labelText="Enter the name of the color"
                  id="color"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    onChange: this.handleInputChange,
                  }}
                  error={this.state.errors.color !== undefined && this.state.errors.color !== '' && this.state.errors.color !== null}
                  helpText={this.state.errors.color}
                />
                <Button type="submit" color="info">Submit</Button>
              </form>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    colors: state.wheels.colors
  }
}

const mapDispatchToProps = dispatch => {
  return {
      addColorRequest: (data) => dispatch(addColorRequest(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(regularFormsStyle)(AddColor));
