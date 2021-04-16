import React from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../../../actions';
import randomPuns from '../../../apis/randomPuns';
import AdminNav from '../../Header/AdminNav';
import './styles.css';

class UsersPanel extends React.Component {

    componentDidMount() {
        this.props.fetchUsers(this.props.cookies.get('token'));
    }


    render(){

        const deleteUser = async (id, token) => {
            await randomPuns.delete(`/user/${id}`,
            {
                headers: { Authorization: `Bearer ${token}` }
            }).then(() => {
                this.props.fetchUsers();
            })
        }

        const renderRoles = (roles) => {
            return roles.map((role, index) => {
                return (
                    <span key={index}> {role} </span>
                )
            })
        }

        return (
            <div>
                <AdminNav cookies={this.props.cookies} />
                <div className="admin-wrapper">
                    <table className="admin-table">
                        <tbody>
                            <tr>
                                <th>Created At</th>
                                <th>email</th>
                                <th>name</th>
                                <th>roles</th>
                                <th>Delete</th>
                            </tr>
                            {
                                this.props.users.map((user) => {
                                    return (
                                        <tr key={user._id}>
                                            <td>{user.createdAt}</td>
                                            <td>{user.email}</td>
                                            <td>{user.name}</td>
                                            <td>{renderRoles(user.roles)}</td>
                                            <td><span className="delete-user__link" onClick={() => {deleteUser(user._id, this.props.cookies.get('token'))}}>Delete</span></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

export default connect(mapStateToProps, { fetchUsers })(UsersPanel);