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
            let myString = '';
            roles.forEach((role, index) => {
                if((index +1) !== roles.length) {
                    myString += `${role} `;
                } else {
                    myString += `${role}`;
                }
            });
            return myString;
        }

        const rolesToArray = (roles) => {
            return roles.split(" ");
        }

        const editField = async (e, originalValue, id) => {
            const fieldName = e.target.name;
            const fieldUpdateData = {};
            const newValue = e.target.value;

            if(fieldName === 'roles') {
                fieldUpdateData[fieldName] = rolesToArray(newValue);
                if (newValue !== renderRoles(originalValue)) {
                    await randomPuns.patch(`/user/${id}`,
                    fieldUpdateData,
                    {
                        headers: { 
                            'Authorization': `Bearer ` + this.props.cookies.get('token'),
                            'Content-Type': 'application/json'
                        }
                    }).then(() => {
                        this.props.fetchUsers(this.props.cookies.get('token'));
                    })
                }
            } else {
                fieldUpdateData[fieldName] = newValue;
                if (newValue !== originalValue) {
                    await randomPuns.patch(`/user/${id}`,
                    fieldUpdateData,
                    {
                        headers: { 
                            'Authorization': `Bearer ` + this.props.cookies.get('token'),
                            'Content-Type': 'application/json'
                        }
                    }).then(() => {
                        this.props.fetchUsers(this.props.cookies.get('token'));
                    })
                }
            }
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
                                            <td><input type="text" name="email" defaultValue={user.email} onBlur={(e) => {editField(e,user.email, user._id)}}/></td>
                                            <td><input type="text" name="name" defaultValue={user.name} onBlur={(e) => {editField(e,user.name, user._id)}}/></td>
                                            <td><input type="text" name="roles" defaultValue={renderRoles(user.roles)} onBlur={(e) => {editField(e,user.roles, user._id)}}/></td>
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