import React from 'react';
import { Link } from 'react-router-dom';
import { logoutUser } from '../../../actions';
import { connect } from 'react-redux';
import './styles.css';

class AdminNav extends React.Component {
    render(){

        const handleLogout = () => {
            this.props.logoutUser(this.props.cookies.get('token'));
        }

        const isAuthenticated = (props) => {
            if (props.cookies.get('token') !== undefined) {
                return true;
            }
            return false;
        }

        if(isAuthenticated(this.props)) {
            return (
                <div className="user-nav--container">
                    <div className="left-container">
                        <Link className="user-nav__link" to="/admin/puns">Puns</Link>
                        <Link className="user-nav__link" to="/admin/users">Users</Link>
                    </div>
                    <div className="right-container">
                        <Link className="user-nav__link" onClick={handleLogout} to="#">Logout</Link>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="user-nav--container">
                    <Link className="user-nav__link" to={"/login"}>Login</Link>
                </div>
            )
        }
    }
}

const mapStateToProps = (state, ownProps) => {
  let cookieUser;
  if (ownProps.cookies.get('token') !== '') {
      cookieUser = { email: '', token: ownProps.cookies.get('token')}
  } else {
      cookieUser = state.user
  }
  return {
    user: cookieUser,
    cookies: ownProps.cookies
  }
}

export default connect(mapStateToProps,{ logoutUser })(AdminNav);