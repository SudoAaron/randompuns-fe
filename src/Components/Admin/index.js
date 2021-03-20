import React, { useContext, useEffect } from 'react';
import { StateContext } from '../../Context';
import './styles.css';

function Admin() {
    const { puns, actions } = useContext(StateContext);
    useEffect(() => {
        actions.getPuns();
    },[]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="admin-wrapper">
            <table className="admin-table">
                <tbody>
                    <tr>
                        <th>Title</th>
                        <th>Set-Up</th>
                        <th>Punchline</th>
                        <th>Author</th>
                        <th>Date Created</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                    {
                        puns.map((pun) => {
                            return (
                                <tr key={pun._id}>
                                    <td>{pun.title}</td>
                                    <td>{pun.setUp}</td>
                                    <td>{pun.punchline}</td>
                                    <td>{pun.author}</td>
                                    <td>{pun.createdAt}</td>
                                    <td>{pun.approved ? 'Approved' : 'Not Approved'}</td>
                                    <td><span onClick={() => {actions.approvePun(pun._id)}}>Approve</span> / <span onClick={() => {actions.deletePun(pun._id)}}>Delete</span></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Admin;