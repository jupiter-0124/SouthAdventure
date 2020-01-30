import React from "react";
import { connect } from 'react-redux';
import { editLugpatternRequest } from '../../../store/actions/wheelActions';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import TextureIcon from "@material-ui/icons/Texture";

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

class EditLugpattern extends React.Component {
  state = {
    data: {
      lugpattern: '',
    },
    errors: {
    },
  }
  componentWillMount() {
    const id = this.props.match.params.id;
    let obj = this.props.lugpatterns.find(o => o.lugpattern_id === id);

    if(obj) {
      this.setState(prevState => {
        return {
          ...prevState,
          data: { ...prevState.data, ...obj },
          errors: { ...prevState.errors }
        };
      });
    } else {
      this.props.history.push('/lugpattern');
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
    if(this.state.data.lugpattern === null || this.state.data.lugpattern === '') {
      hasError = true;
      this.setState((prevState) => {
        return {
            ...prevState,
            data: {...prevState.data},
            errors: {
              ...prevState.errors,
              lugpattern: "This field is required"
            }
        };
      });
    }

    if(!hasError) {
      this.props.editLugpatternRequest(this.state.data)
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
          this.props.history.push('/lugpattern');
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
                <TextureIcon />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>Edit Lugpattern</h4>
            </CardHeader>
            <CardBody>
              <form onSubmit={this.handleSubmit}>
                <CustomInput
                  labelText="Enter the name of the lugpattern"
                  id="lugpattern"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    onChange: this.handleInputChange,
                    value: this.state.data.lugpattern
                  }}
                  error={this.state.errors.lugpattern !== undefined && this.state.errors.lugpattern !== '' && this.state.errors.lugpattern !== null}
                  helpText={this.state.errors.lugpattern}
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
    lugpatterns: state.wheels.lugpatterns
  }
}

const mapDispatchToProps = dispatch => {
  return {
      editLugpatternRequest: (data) => dispatch(editLugpatternRequest(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(regularFormsStyle)(EditLugpattern));
