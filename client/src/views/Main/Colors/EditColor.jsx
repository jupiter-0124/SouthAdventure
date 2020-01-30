import React from "react";
import { connect } from 'react-redux';
import { editColorRequest } from '../../../store/actions/wheelActions';

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

class EditColor extends React.Component {
  state = {
    data: {
      color: '',
    },
    errors: {
    },
  }
  componentWillMount() {
    const id = this.props.match.params.id;
    let obj = this.props.colors.find(o => o.color_id === id);

    if(obj) {
      this.setState(prevState => {
        return {
          ...prevState,
          data: { ...prevState.data, ...obj },
          errors: { ...prevState.errors }
        };
      });
    } else {
      this.props.history.push('/color');
    }
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
      this.props.editColorRequest(this.state.data)
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
            <CardHeader color="success" icon>
              <CardIcon color="success">
                <ColorLens />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>Edit Color</h4>
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
                    value: this.state.data.color
                  }}
                  error={this.state.errors.color !== undefined && this.state.errors.color !== '' && this.state.errors.color !== null}
                  helpText={this.state.errors.color}
                />
                <Button type="submit" color="success">Submit</Button>
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
      editColorRequest: (data) => dispatch(editColorRequest(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(regularFormsStyle)(EditColor));
