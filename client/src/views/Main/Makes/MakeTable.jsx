import React from "react";
import ReactTable from "react-table";
import { connect } from 'react-redux';
import { getMakesRequest, deleteMakeRequest, getCountriesRequest } from '../../../store/actions/wheelActions';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import BuildIcon from "@material-ui/icons/Build";
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

class MakeTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  componentDidMount() {
    // console.log('Before:' + JSON.stringify(this.props));
    this.props.getMakesRequest().then(res => {
      // console.log('After:' + JSON.stringify(this.props));
      this.props.getCountriesRequest().then(res_country => {
        this.setState({
          data: res.makes.map((prop, key) => {
            let country_obj = res_country.countries.find(o => o.country_id === prop.country_id);
            let country = (country_obj ? country_obj.country : '');
            return {
              id: key + 1,
              make_id: prop.make_id,
              make: prop.make,
              country: country,
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
                      this.props.history.push('/make/edit/' + obj.make_id);
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
                            this.props.deleteMakeRequest(o)
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
  }
  render() {
    const { classes } = this.props;
    return (
      <GridContainer>
        <GridItem xs={12}>
          <Card>
            <CardHeader color="primary" icon>
              <CardIcon color="primary">
                <BuildIcon />
              </CardIcon>
              <div style={{display:'flex', justifyContent: 'space-between'}}>
                <h4 className={classes.cardIconTitle}>Makes</h4>
                <Button color="info" className={classes.marginRight} onClick={() => {
                  return this.props.history.push('/make/add');
                }}>
                  Add Make
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
                    Header: "Make",
                    accessor: "make"
                  },
                  {
                    Header: "Country",
                    accessor: "country"
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
    makes: state.wheels.makes,
    countries: state.wheels.countries
  }
}

const mapDispatchToProps = dispatch => {
  return {
      getMakesRequest: () => dispatch(getMakesRequest()),
      deleteMakeRequest: (data) => dispatch(deleteMakeRequest(data)),
      getCountriesRequest: () => dispatch(getCountriesRequest())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MakeTable));
