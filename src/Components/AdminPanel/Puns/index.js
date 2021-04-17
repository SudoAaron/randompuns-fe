import React from 'react';
import { connect } from 'react-redux';
import { fetchPuns } from '../../../actions';
import randomPuns from '../../../apis/randomPuns';
import AdminNav from '../../Header/AdminNav';
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
        const bulkApprovePuns = async (punsArr, token) => {
            await randomPuns.patch(`/puns/approve/bulk`,
            {
                items: punsArr
            },
            {
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }).then(() => {
                this.props.fetchPuns();
            })
        }
        const bulkDeletePuns = async (punsArr, token) => {
            await randomPuns.delete(`/puns/delete/bulk`,
            {
                data: { items: punsArr },
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
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

        const checkAllBoxes = () => {
            const formRows = [...document.getElementById('puns-form-body').childNodes];
            const checkAllBoxStatus = document.getElementById('check-all-box').checked;
            formRows.forEach((row, index) => {
                if (index !== 0) {
                    row.getElementsByTagName("td")[0].getElementsByTagName("input")[0].checked = checkAllBoxStatus;
                }
            })
        }

        const submitAllUpdates = async (e) => {
            e.preventDefault();
            const formRows = [...document.getElementById('puns-form-body').childNodes];
            let rowsToUpdate = [];
            formRows.forEach((row, index) => {
                if (index !== 0) {
                    const boxStatus = row.getElementsByTagName("td")[0].getElementsByTagName("input")[0].checked;
                    if(boxStatus) {
                        const boxID = row.getElementsByTagName("td")[0].getElementsByTagName("input")[0].id;
                        rowsToUpdate.push(boxID);
                    }
                }
            })
            switch (e.target.updateOption.value){
                case 'approve':
                    await bulkApprovePuns(rowsToUpdate, this.props.cookies.get('token'))
                    .then(() => {
                        this.props.fetchPuns();
                    })
                    break;
                case 'delete':
                    await bulkDeletePuns(rowsToUpdate, this.props.cookies.get('token'))
                    .then(() => {
                        this.props.fetchPuns();
                    })
                    break;
                default:
                    break;
            }
        }

        return (
            <div>
                <AdminNav cookies={this.props.cookies}/>
                <div className="mass-update-wrapper">
                    <form onSubmit={submitAllUpdates}>
                        <select name="updateOption" defaultValue="approve">
                            <option value="approve">Approve</option>
                            <option value="delete">Delete</option>
                        </select>
                        <input type="submit" value="submit" />
                    </form>
                </div>
                <div className="admin-wrapper">
                    <table className="admin-table">
                        <tbody id="puns-form-body" >
                            <tr>
                                <th><input id="check-all-box" type="checkbox" onChange={checkAllBoxes}/></th>
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
                                            <td><input id={pun._id} type="checkbox" /></td>
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