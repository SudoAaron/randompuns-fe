import React from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../actions';
import './styles.css';

class Login extends React.Component {

    render(){
        const handleSubmit = async (e) => {
            e.preventDefault();
            await this.props.loginUser(e.target.email.value, e.target.password.value)
        }
        return (
            <div>
                <form onSubmit={handleSubmit}>
                    <input type="email" name="email" placeholder="email" />
                    <input type="password" name="password" placeholder="password" />
                    <input type="submit" value="Login"/>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, { loginUser })(Login);