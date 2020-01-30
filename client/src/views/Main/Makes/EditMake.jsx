import React from "react";
import { connect } from 'react-redux';
import { editMakeRequest } from '../../../store/actions/wheelActions';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

// @material-ui/icons
import BuildIcon from "@material-ui/icons/Build";

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
import { FormHelperText } from "@material-ui/core";

class EditMake extends React.Component {
  state = {
    data: {
      make: '',
      country_id: '',
    },
    errors: {
    },
  }
  componentWillMount() {
    const id = this.props.match.params.id;
    let obj = this.props.makes.find(o => o.make_id === id);

    if(obj) {
      this.setState(prevState => {
        return {
          ...prevState,
          data: { ...prevState.data, ...obj },
          errors: { ...prevState.errors }
        };
      });
    } else {
      this.props.history.push('/make');
    }
  }
  handleInputChange = (e) => {
    const field = e.target.id;
    const value = e.target.value;

    // console.log(field + ',' + value);

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
  handleDropdownChange = (e) => {
    const field = e.target.name;
    const value = e.target.value;

    // console.log(field + ',' + value);

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
    if(this.state.data.make === null || this.state.data.make === '') {
      hasError = true;
      this.setState((prevState) => {
        return {
            ...prevState,
            data: {...prevState.data},
            errors: {
              ...prevState.errors,
              make: "This field is required"
            }
        };
      });
    }
    if(this.state.data.country_id === null || this.state.data.country_id === '') {
      hasError = true;
      this.setState((prevState) => {
        return {
            ...prevState,
            data: {...prevState.data},
            errors: {
              ...prevState.errors,
              country_id: "This field is required"
            }
        };
      });
    }

    if(!hasError) {
      this.props.editMakeRequest(this.state.data)
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
          this.props.history.push('/make');
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
                <BuildIcon />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>Add Make</h4>
            </CardHeader>
            <CardBody>
              <form onSubmit={this.handleSubmit}>
                <CustomInput
                  labelText="Enter the name of the make"
                  id="make"
                  name="make"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    onChange: this.handleInputChange,
                    value: this.state.data.make
                  }}
                  error={this.state.errors.make !== undefined && this.state.errors.make !== '' && this.state.errors.make !== null}
                  helpText={this.state.errors.make}
                />
                <FormControl
                  fullWidth
                  className={classes.selectFormControl}
                  style={{marginBottom: '25px'}}
                  >
                  <InputLabel
                    htmlFor="simple-select"
                    className={classes.selectLabel}
                    error={this.state.errors.country_id}
                    >
                    Choose Country
                  </InputLabel>
                  <Select
                    MenuProps={{
                      className: classes.selectMenu
                    }}
                    classes={{
                      select: classes.select
                    }}
                    value={this.state.data.country_id}
                    onChange={this.handleDropdownChange}
                    inputProps={{
                      name: 'country_id',
                    }}
                    error={this.state.errors.country_id}
                    >
                    {
                      this.props.countries.map(((prop, key) => {
                        return (
                          <MenuItem
                            classes={{
                              root: classes.selectMenuItem,
                              selected: classes.selectMenuItemSelected
                            }}
                            value={prop.country_id}
                            >
                            {prop.country}
                          </MenuItem>
                        );
                      }))
                    }
                  </Select>
                  <FormHelperText error={this.state.errors.country_id}>
                    {this.state.errors.country_id}
                  </FormHelperText>
                </FormControl>
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
    makes: state.wheels.makes,
    countries: state.wheels.countries
  }
}

const mapDispatchToProps = dispatch => {
  return {
      editMakeRequest: (data) => dispatch(editMakeRequest(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(regularFormsStyle)(EditMake));
