import React from "react";
import ReactTable from "react-table";
import { connect } from 'react-redux';
import { getLugpatternsRequest, deleteLugpatternRequest } from '../../../store/actions/wheelActions';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import TextureIcon from "@material-ui/icons/Texture";
// import Dvr from "@material-ui/icons/Dvr";
// import Favorite from "@material-ui/icons/Favorite";
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

class LugpatternTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  deleteItem = (obj) => {
  }
  componentDidMount() {
    this.props.getLugpatternsRequest().then(res => {
      // alert(JSON.stringify(res));
      this.setState({
        data: res.lugpatterns.map((prop, key) => {
          return {
            id: key + 1,
            lugpattern_id: prop.lugpattern_id,
            lugpattern: prop.lugpattern,
            actions: (
              // we've added some custom button actions
              <div className="actions-right">
                {/* use this button to add a like kind of action */}
                {/* <Button
                  justIcon
                  round
                  simple
                  onClick={() => {
                    let obj = this.state.data.find(o => o.id === key);
                    alert(
                      "You've clicked LIKE button on \n{ \nLugpattern: " +
                        obj.lugpattern +
                        "\n}."
                    );
                  }}
                  lugpattern="info"
                  className="like"
                >
                  <Favorite />
                </Button>{" "} */}
                {/* use this button to add a edit kind of action */}
                <Button
                  justIcon
                  round
                  simple
                  onClick={() => {
                    let obj = this.state.data.find(o => o.id === key + 1);
                    this.props.history.push('/lugpattern/edit/' + obj.lugpattern_id);
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
                          this.props.deleteLugpatternRequest(o)
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
  }
  render() {
    const { classes } = this.props;
    return (
      <GridContainer>
        <GridItem xs={12}>
          <Card>
            <CardHeader color="primary" icon>
              <CardIcon color="primary">
                <TextureIcon />
              </CardIcon>
              <div style={{display:'flex', justifyContent: 'space-between'}}>
                <h4 className={classes.cardIconTitle}>Lugpatterns</h4>
                <Button color="info" className={classes.marginRight} onClick={() => {
                  return this.props.history.push('/lugpattern/add');
                }}>
                  Add Lugpattern
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
                    Header: "Lugpattern",
                    accessor: "lugpattern"
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
    lugpatterns: state.wheels.lugpatterns
  }
}

const mapDispatchToProps = dispatch => {
  return {
      getLugpatternsRequest: () => dispatch(getLugpatternsRequest()),
      deleteLugpatternRequest: (data) => dispatch(deleteLugpatternRequest(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LugpatternTable));
