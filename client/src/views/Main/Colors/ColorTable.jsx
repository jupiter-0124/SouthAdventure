import React from "react";
import ReactTable from "react-table";
import { connect } from 'react-redux';
import { getColorsRequest, deleteColorRequest } from '../../../store/actions/wheelActions';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import ColorLensIcon from "@material-ui/icons/ColorLens";
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

class ColorTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  deleteItem = (obj) => {
  }
  componentDidMount() {
    this.props.getColorsRequest().then(res => {
      // alert(JSON.stringify(res));
      this.setState({
        data: res.colors.map((prop, key) => {
          return {
            id: key + 1,
            color_id: prop.color_id,
            color: prop.color,
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
                      "You've clicked LIKE button on \n{ \nColor: " +
                        obj.color +
                        "\n}."
                    );
                  }}
                  color="info"
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
                    this.props.history.push('/color/edit/' + obj.color_id);
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
                    let obj = this.state.data.find(o => o.id === key + 1);
                    if(obj) {
                      if (window.confirm('Are you sure you wish to delete this item?')) {
                        this.props.deleteColorRequest(obj)
                        .then(res => {
                          if (!res.errors) {
                            window.location.reload();
                          }
                        })
                      }
                    }
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
                <ColorLensIcon />
              </CardIcon>
              <div style={{display:'flex', justifyContent: 'space-between'}}>
                <h4 className={classes.cardIconTitle}>Colors</h4>
                <Button color="info" className={classes.marginRight} onClick={() => {
                  return this.props.history.push('/color/add');
                }}>
                  Add Color
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
    colors: state.wheels.colors
  }
}

const mapDispatchToProps = dispatch => {
  return {
      getColorsRequest: () => dispatch(getColorsRequest()),
      deleteColorRequest: (data) => dispatch(deleteColorRequest(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ColorTable));
