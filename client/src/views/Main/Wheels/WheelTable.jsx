import React from "react";
import ReactTable from "react-table";
import { connect } from 'react-redux';
import { getWheelsRequest, deleteWheelRequest, getMakesRequest,getCountriesRequest, getLugpatternsRequest, getColorsRequest } from '../../../store/actions/wheelActions';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import DashboardIcon from "@material-ui/icons/Dashboard";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
// core components
import GridContainer from "../../../components/Grid/GridContainer.jsx";
import GridItem from "../../../components/Grid/GridItem.jsx";
import Button from "../../../components/CustomButtons/Button.jsx";
import Card from "../../../components/Card/Card.jsx";
import CardBody from "../../../components/Card/CardBody.jsx";
import CardIcon from "../../../components/Card/CardIcon.jsx";
import CardHeader from "../../../components/Card/CardHeader.jsx";

import { cardTitle } from "../../../assets/jss/material-dashboard-pro-react.jsx";

const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  }
};

class WheelTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  componentDidMount() {
    this.props.getWheelsRequest().then(res => {
      this.props.getMakesRequest().then(res_make => {
        this.props.getLugpatternsRequest().then(res_lugpattern => {
          this.props.getColorsRequest().then(res_color => {
            this.setState({
              data: res.wheels.map((prop, key) => {
                let make_obj = res_make.makes.find(o => o.make_id === prop.make_id);
                let lugpattern_obj = res_lugpattern.lugpatterns.find(o => o.lugpattern_id === prop.lugpattern_id);
                let color_obj = res_color.colors.find(o => o.color_id === prop.color_id);
                let make = (make_obj ? make_obj.make : '');
                let lugpattern = (lugpattern_obj ? lugpattern_obj.lugpattern : '');
                let color = (color_obj ? color_obj.color : '');
                return {
                  id: key + 1,
                  wheel_id: prop.wheel_id,
                  image: (
                    <div style={{paddingLeft: '10px', paddingRight: '10px'}}>
                      <img src={prop.image} style={{maxWidth: '99%', minWidth: '99%'}}/>
                    </div>
                  ),
                  make: make,
                  model: prop.model,
                  year: prop.year,
                  lugpattern: lugpattern,
                  diameter: prop.diameter,
                  widthfront: prop.widthfront,
                  widthrear: prop.widthrear,
                  offsetfront: prop.offsetfront,
                  offsetrear: prop.offsetrear,
                  color: color,
                  actions: (
                    // we've added some custom button actions
                    <div className="actions-right">
                    {/* use this button to add a edit kind of action */}
                      <Button
                        justIcon
                        round
                        simple
                        onClick={() => {
                          let obj = this.state.data.find(o => o.id === key + 1);
                          this.props.history.push('/wheel/edit/' + obj.wheel_id);
                        }}
                        color="success"
                        className="edit"
                        >
                        <Edit />
                      </Button>{" "}
                      {/* use this button to remove the data row */}
                      <Button
                        justIcon
                        round
                        simple
                        onClick={() => {
                          var data = this.state.data;
                          data.find((o, i) => {
                            if (o.id === key + 1) {
                              if (window.confirm('Are you sure you wish to delete this item?')) {
                                this.props.deleteWheelRequest(o)
                                .then(res => {
                                  if (!res.errors) {
                                    window.location.reload();
                                  }
                                })
                              }
                              return true;
                            }
                            return false;
                          });
                        }}
                        color="danger"
                        className="remove"
                        >
                        <Close />
                      </Button>{" "}
                    </div>
                  )
                };
              })  
            })    
          })
        })
      })
    })
  }
  render() {
    const { classes } = this.props;
    return (
      <GridContainer>
        <GridItem xs={12}>
          <Card>
            <CardHeader color="primary" icon>
              <CardIcon color="primary">
                <DashboardIcon />
              </CardIcon>
              <div style={{display:'flex', justifyContent: 'space-between'}}>
                <h4 className={classes.cardIconTitle}>Wheels</h4>
                <Button color="info" className={classes.marginRight} onClick={() => {
                  return this.props.history.push('/wheel/add');
                }}>
                  Add Wheel
                </Button>
              </div>
            </CardHeader>
            <CardBody>
              <ReactTable
                data={this.state.data}
                filterable
                columns={[
                  {
                    Header: "No",
                    accessor: "id"
                  },
                  {
                    Header: "Image",
                    accessor: "image"
                  },
                  {
                    Header: "Make",
                    accessor: "make"
                  },
                  {
                    Header: "Model",
                    accessor: "model"
                  },
                  {
                    Header: "Year",
                    accessor: "year"
                  },
                  {
                    Header: "Lug pattern",
                    accessor: "lugpattern"
                  },
                  {
                    Header: "Diameter",
                    accessor: "diameter"
                  },
                  {
                    Header: "Front width",
                    accessor: "widthfront"
                  },
                  {
                    Header: "Rear width",
                    accessor: "widthrear"
                  },
                  {
                    Header: "Front offset",
                    accessor: "offsetfront"
                  },
                  {
                    Header: "Rear offset",
                    accessor: "offsetrear"
                  },
                  {
                    Header: "Color",
                    accessor: "color"
                  },
                  {
                    Header: "Actions",
                    accessor: "actions",
                    sortable: false,
                    filterable: false
                  }
                ]}
                defaultPageSize={10}
                showPaginationTop
                showPaginationBottom={false}
                className="-striped -highlight"
              />
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
    countries: state.wheels.countries,
    lugpatterns: state.wheels.lugpatterns,
    colors: state.wheels.colors,
  }
}

const mapDispatchToProps = dispatch => {
  return {
      getWheelsRequest: () => dispatch(getWheelsRequest()),
      deleteWheelRequest: (data) => dispatch(deleteWheelRequest(data)),
      getMakesRequest: () => dispatch(getMakesRequest()),
      getCountriesRequest: () => dispatch(getCountriesRequest()),
      getLugpatternsRequest: () => dispatch(getLugpatternsRequest()),
      getColorsRequest: () => dispatch(getColorsRequest()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(WheelTable));
