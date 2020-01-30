import React from "react";
import { connect } from 'react-redux';
import { editWheelRequest } from '../../../store/actions/wheelActions';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

// @material-ui/icons
import DashboardIcon from "@material-ui/icons/Dashboard";

// core components
import GridContainer from "../../../components/Grid/GridContainer.jsx";
import GridItem from "../../../components/Grid/GridItem.jsx";
import CustomInput from "../../../components/CustomInput/CustomInput.jsx";
import Button from "../../../components/CustomButtons/Button.jsx";
import Card from "../../../components/Card/Card.jsx";
import CardHeader from "../../../components/Card/CardHeader.jsx";
import CardIcon from "../../../components/Card/CardIcon.jsx";
import CardBody from "../../../components/Card/CardBody.jsx";
import ImageUpload from "../../../components/CustomUpload/ImageUpload.jsx";

import regularFormsStyle from "../../../assets/jss/material-dashboard-pro-react/views/regularFormsStyle";
import { FormHelperText } from "@material-ui/core";

class EditWheel extends React.Component {
  state = {
    data: {
      make_id: '',
      model: '',
      image: '',
      year: '',
      lugpattern_id: '',
      diameter: '',
      widthfront: '',
      widthrear: '',
      offsetfront: '',
      offsetrear: '',
      color_id: '',
    },
    errors: {
      image: '',
    },
  }
  componentWillMount() {
    const id = this.props.match.params.id;
    let obj = this.props.wheels.find(o => o.wheel_id === id);

    if(obj) {
      this.setState(prevState => {
        return {
          ...prevState,
          data: { ...prevState.data, ...obj },
          errors: { ...prevState.errors }
        };
      });
    } else {
      this.props.history.push('/wheel');
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
  handleDropdownChange = (e) => {
    const field = e.target.name;
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
  handleImageChange = (file) => {
    console.log(file);
    this.setState((prevState) => {
      return {
        ...prevState,
        data: {
            ...prevState.data,
            image: file,
        },
        errors: {
          ...prevState.errors,
          image: (file ? '' : (prevState.errors.image ? prevState.errors.image: '')),
        }
      };
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    var hasError = false;
    if(this.state.data.make_id === null || this.state.data.make_id === '') {
      hasError = true;
      this.setState((prevState) => {
        return {
            ...prevState,
            data: {...prevState.data},
            errors: {
              ...prevState.errors,
              make_id: "This field is required"
            }
        };
      });
    }
    if(this.state.data.model === null || this.state.data.model === '') {
      hasError = true;
      this.setState((prevState) => {
        return {
            ...prevState,
            data: {...prevState.data},
            errors: {
              ...prevState.errors,
              model: "This field is required"
            }
        };
      });
    }
    if(this.state.data.image === null || this.state.data.image === '') {
      hasError = true;
      this.setState((prevState) => {
        return {
            ...prevState,
            data: {...prevState.data},
            errors: {
              ...prevState.errors,
              image: "This field is required"
            }
        };
      });
    }
    if(this.state.data.year === null || this.state.data.year === '') {
      hasError = true;
      this.setState((prevState) => {
        return {
            ...prevState,
            data: {...prevState.data},
            errors: {
              ...prevState.errors,
              year: "This field is required"
            }
        };
      });
    }
    if(this.state.data.lugpattern_id === null || this.state.data.lugpattern_id === '') {
      hasError = true;
      this.setState((prevState) => {
        return {
            ...prevState,
            data: {...prevState.data},
            errors: {
              ...prevState.errors,
              lugpattern_id: "This field is required"
            }
        };
      });
    }
    if(this.state.data.diameter === null || this.state.data.diameter === '') {
      hasError = true;
      this.setState((prevState) => {
        return {
            ...prevState,
            data: {...prevState.data},
            errors: {
              ...prevState.errors,
              diameter: "This field is required"
            }
        };
      });
    }
    if(this.state.data.widthfront === null || this.state.data.widthfront === '') {
      hasError = true;
      this.setState((prevState) => {
        return {
            ...prevState,
            data: {...prevState.data},
            errors: {
              ...prevState.errors,
              widthfront: "This field is required"
            }
        };
      });
    }
    if(this.state.data.widthrear === null || this.state.data.widthrear === '') {
      hasError = true;
      this.setState((prevState) => {
        return {
            ...prevState,
            data: {...prevState.data},
            errors: {
              ...prevState.errors,
              widthrear: "This field is required"
            }
        };
      });
    }
    if(this.state.data.offsetfront === null || this.state.data.offsetfront === '') {
      hasError = true;
      this.setState((prevState) => {
        return {
            ...prevState,
            data: {...prevState.data},
            errors: {
              ...prevState.errors,
              offsetfront: "This field is required"
            }
        };
      });
    }
    if(this.state.data.offsetrear === null || this.state.data.offsetrear === '') {
      hasError = true;
      this.setState((prevState) => {
        return {
            ...prevState,
            data: {...prevState.data},
            errors: {
              ...prevState.errors,
              offsetrear: "This field is required"
            }
        };
      });
    }
    if(this.state.data.color_id === null || this.state.data.color_id === '') {
      hasError = true;
      this.setState((prevState) => {
        return {
            ...prevState,
            data: {...prevState.data},
            errors: {
              ...prevState.errors,
              color_id: "This field is required"
            }
        };
      });
    }

    if(!hasError) {
      this.props.editWheelRequest(this.state.data)
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
          this.props.history.push('/wheel');
        }
      })
    }
  }
  render() {
    const { classes } = this.props;
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="success" icon>
              <CardIcon color="success">
                <DashboardIcon />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>Edit Wheel</h4>
            </CardHeader>
            <CardBody>
              <form onSubmit={this.handleSubmit}>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <FormControl>
                      <FormHelperText error={this.state.errors.image}>
                        {this.state.errors.image}
                      </FormHelperText>
                      <br/>
                      <ImageUpload
                        addButtonProps={{
                          color: "rose",
                          round: true
                        }}
                        changeButtonProps={{
                          color: "rose",
                          round: true
                        }}
                        removeButtonProps={{
                          color: "danger",
                          round: true
                        }}
                        handleChangeProps={this.handleImageChange}
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <GridContainer>
                      <GridItem xs={12} sm={4} md={4}>
                        <CustomInput
                          labelText="Enter the name of the model"
                          id="model"
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            onChange: this.handleInputChange,
                            value: this.state.data.model,
                          }}
                          error={this.state.errors.model !== undefined && this.state.errors.model !== '' && this.state.errors.model !== null}
                          helpText={this.state.errors.model}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={4} md={4}>
                        <CustomInput
                          labelText="Enter the year"
                          id="year"
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            onChange: this.handleInputChange,
                            value: this.state.data.year,
                          }}
                          error={this.state.errors.year !== undefined && this.state.errors.year !== '' && this.state.errors.year !== null}
                          helpText={this.state.errors.year}
                        />
                      </GridItem>
                    </GridContainer>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <GridContainer>
                      <GridItem xs={12} sm={4} md={4}>
                        <FormControl
                          fullWidth
                          className={classes.selectFormControl}
                          style={{marginBottom: '25px'}}
                          >
                          <InputLabel
                            htmlFor="simple-select"
                            className={classes.selectLabel}
                            error={this.state.errors.make_id}
                            >
                            Choose Make
                          </InputLabel>
                          <Select
                            MenuProps={{
                              className: classes.selectMenu
                            }}
                            classes={{
                              select: classes.select
                            }}
                            value={this.state.data.make_id}
                            onChange={this.handleDropdownChange}
                            inputProps={{
                              name: 'make_id',
                            }}
                            error={this.state.errors.make_id}
                            >
                            {
                              this.props.makes.map(((prop, key) => {
                                return (
                                  <MenuItem
                                    classes={{
                                      root: classes.selectMenuItem,
                                      selected: classes.selectMenuItemSelected
                                    }}
                                    value={prop.make_id}
                                    >
                                    {prop.make}
                                  </MenuItem>
                                );
                              }))
                            }
                          </Select>
                          <FormHelperText error={this.state.errors.make_id}>
                            {this.state.errors.make_id}
                          </FormHelperText>
                        </FormControl>
                      </GridItem>
                      <GridItem xs={12} sm={4} md={4}>
                        <FormControl
                          fullWidth
                          className={classes.selectFormControl}
                          style={{marginBottom: '25px'}}
                          >
                          <InputLabel
                            htmlFor="simple-select"
                            className={classes.selectLabel}
                            error={this.state.errors.lugpattern_id}
                            >
                            Choose Lugpattern
                          </InputLabel>
                          <Select
                            MenuProps={{
                              className: classes.selectMenu
                            }}
                            classes={{
                              select: classes.select
                            }}
                            value={this.state.data.lugpattern_id}
                            onChange={this.handleDropdownChange}
                            inputProps={{
                              name: 'lugpattern_id',
                            }}
                            error={this.state.errors.lugpattern_id}
                            >
                            {
                              this.props.lugpatterns.map(((prop, key) => {
                                return (
                                  <MenuItem
                                    classes={{
                                      root: classes.selectMenuItem,
                                      selected: classes.selectMenuItemSelected
                                    }}
                                    value={prop.lugpattern_id}
                                    >
                                    {prop.lugpattern}
                                  </MenuItem>
                                );
                              }))
                            }
                          </Select>
                          <FormHelperText error={this.state.errors.lugpattern_id}>
                            {this.state.errors.lugpattern_id}
                          </FormHelperText>
                        </FormControl>
                      </GridItem>
                      <GridItem xs={12} sm={4} md={4}>
                        <FormControl
                          fullWidth
                          className={classes.selectFormControl}
                          style={{marginBottom: '25px'}}
                          >
                          <InputLabel
                            htmlFor="simple-select"
                            className={classes.selectLabel}
                            error={this.state.errors.color_id}
                            >
                            Choose Color
                          </InputLabel>
                          <Select
                            MenuProps={{
                              className: classes.selectMenu
                            }}
                            classes={{
                              select: classes.select
                            }}
                            value={this.state.data.color_id}
                            onChange={this.handleDropdownChange}
                            inputProps={{
                              name: 'color_id',
                            }}
                            error={this.state.errors.color_id}
                            >
                            {
                              this.props.colors.map(((prop, key) => {
                                return (
                                  <MenuItem
                                    classes={{
                                      root: classes.selectMenuItem,
                                      selected: classes.selectMenuItemSelected
                                    }}
                                    value={prop.color_id}
                                    >
                                    {prop.color}
                                  </MenuItem>
                                );
                              }))
                            }
                          </Select>
                          <FormHelperText error={this.state.errors.color_id}>
                            {this.state.errors.color_id}
                          </FormHelperText>
                        </FormControl>
                      </GridItem>
                    </GridContainer>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <GridContainer>
                      <GridItem xs={12} sm={4} md={4}>
                        <CustomInput
                          labelText="Enter the diameter"
                          id="diameter"
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            onChange: this.handleInputChange,
                            value: this.state.data.diameter,
                          }}
                          error={this.state.errors.diameter !== undefined && this.state.errors.diameter !== '' && this.state.errors.diameter !== null}
                          helpText={this.state.errors.diameter}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={4} md={4}>
                        <CustomInput
                          labelText="Enter the front width"
                          id="widthfront"
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            onChange: this.handleInputChange,
                            value: this.state.data.widthfront,
                          }}
                          error={this.state.errors.widthfront !== undefined && this.state.errors.widthfront !== '' && this.state.errors.widthfront !== null}
                          helpText={this.state.errors.widthfront}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={4} md={4}>
                        <CustomInput
                          labelText="Enter the front offset"
                          id="offsetfront"
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            onChange: this.handleInputChange,
                            value: this.state.data.offsetfront,
                          }}
                          error={this.state.errors.offsetfront !== undefined && this.state.errors.offsetfront !== '' && this.state.errors.offsetfront !== null}
                          helpText={this.state.errors.offsetfront}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={4} md={4}>
                        <CustomInput
                          labelText="Enter the rear width"
                          id="widthrear"
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            onChange: this.handleInputChange,
                            value: this.state.data.widthrear,
                          }}
                          error={this.state.errors.widthrear !== undefined && this.state.errors.widthrear !== '' && this.state.errors.widthrear !== null}
                          helpText={this.state.errors.widthrear}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={4} md={4}>
                        <CustomInput
                          labelText="Enter the rear offset"
                          id="offsetrear"
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            onChange: this.handleInputChange,
                            value: this.state.data.offsetrear,
                          }}
                          error={this.state.errors.offsetrear !== undefined && this.state.errors.offsetrear !== '' && this.state.errors.offsetrear !== null}
                          helpText={this.state.errors.offsetrear}
                        />
                      </GridItem>
                    </GridContainer>
                  </GridItem>
                </GridContainer>
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
    wheels: state.wheels.wheels,
    makes: state.wheels.makes,
    lugpatterns: state.wheels.lugpatterns,
    colors: state.wheels.colors,
  }
}

const mapDispatchToProps = dispatch => {
  return {
      editWheelRequest: (data) => dispatch(editWheelRequest(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(regularFormsStyle)(EditWheel));
