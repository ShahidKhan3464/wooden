import React, {Component, useEffect } from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {LayoutSplashScreen} from "../../../../_metronic/layout";
import * as auth from "../_redux/authRedux";

// class Logout extends Component {
//   componentDidMount() {
//     this.props.logout();
    
//   }

//   render() {
//     const { hasAuthToken } = this.props;
//     console.log(hasAuthToken)
//     return hasAuthToken ? <LayoutSplashScreen /> : <Redirect to="/auth/login" />;
//   }
// }

function Logout(props){
  let { hasAuthToken } = props;
  useEffect(() => {
    props.logout();
  });
  
  console.log('hasAuthToken',hasAuthToken)
  return <Redirect to="/" />;
}

export default connect(
  ({ auth }) => ({ hasAuthToken: Boolean(auth.authToken) }),
  auth.actions
)(Logout);
