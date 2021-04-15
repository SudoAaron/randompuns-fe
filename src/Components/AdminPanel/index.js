import React from 'react';
import { connect } from 'react-redux';
import { fetchPuns } from '../../actions';
import randomPuns from '../../apis/randomPuns';
import UserNav from '../Header/UserNav';
import './styles.css';

class AdminPanel extends React.Component {

    componentDidMount() {
        this.props.fetchPuns();
    }

    render(){
        const approvePun = async (id, token) => {
            await randomPuns.patch(`/puns/${id}/approve`,
            {},
            {
                headers: { Authorization: `Bearer ${token}` }
            }).then(() => {
                this.props.fetchPuns();
            })
        }
        const deletePun = async (id, token) => {
            await randomPuns.delete(`/puns/${id}`,
            {
                headers: { Authorization: `Bearer ${token}` }
            }).then(() => {
                this.props.fetchPuns();
            })
        }

        return (
            <div>
                <UserNav cookies={this.props.cookies}/>
                <div className="admin-wrapper">
                    <table className="admin-table">
                        <tbody>
                            <tr>
                                <th>Title</th>
                                <th>Set-Up</th>
                                <th>Punchline</th>
                                <th>Submitted By</th>
                                <th>Date Created</th>
                                <th>Status</th>
                                <th>Likes</th>
                                <th>Dislikes</th>
                                <th>Approve</th>
                                <th>Delete</th>
                            </tr>
                            {
                                this.props.puns.map((pun) => {
                                    return (
                                        <tr key={pun._id}>
                                            <td>{pun.title}</td>
                                            <td>{pun.setUp}</td>
                                            <td>{pun.punchline}</td>
                                            <td>{pun.submittedBy}</td>
                                            <td>{pun.createdAt}</td>
                                            <td>{pun.approved ? 'Approved' : 'Not Approved'}</td>
                                            <td>{pun.likes}</td>
                                            <td>{pun.dislikes}</td>
                                            <td><span className="approved-link" onClick={() => {approvePun(pun._id, this.props.cookies.get('token'))}}>Approve</span></td>
                                            <td><span className="approved-link" onClick={() => {deletePun(pun._id, this.props.cookies.get('token'))}}>Delete</span></td>
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
    puns: state.puns
  }
}

export default connect(mapStateToProps, { fetchPuns })(AdminPanel);