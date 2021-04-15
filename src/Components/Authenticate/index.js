import React from 'react';
import { connect } from 'react-redux';
import Login from '../Login';

class Authenticate extends React.Component {

    render(){
        const isAuthenticated = (props) => {
            if (props.cookies.get('token') !== undefined) {
                return true;
            }
            return false;
        }
        if(isAuthenticated(this.props)) {
            return (
                <div>
                    {this.props.children}
                </div>
            )
        } else {
            return (
                <Login />
            )
        }
    }
}

const mapStateToProps = (state, ownProps) => {
  let cookieUser;
  if (ownProps.cookies.get('token') !== undefined) {
      cookieUser = { email: '', token: ownProps.cookies.get('token')}
  } else {
      cookieUser = state.user
  }
  return {
    user: cookieUser,
    cookies: ownProps.cookies
  }
}

export default connect(mapStateToProps,{})(Authenticate);