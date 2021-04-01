import React from 'react';
import { connect } from 'react-redux';
import './styles.css';

import randomPuns from '../../apis/randomPuns';
import { fetchRandomPun } from '../../actions';

class LikeBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            likedStatus: undefined,
            likes: this.props.randomPun.likes,
            dislikes: this.props.randomPun.dislikes
        }
        this.handleLikedStatus = this.handleLikedStatus.bind(this);
    }
  
  handleLikedStatus = (status, id) => {
    if(this.state.likedStatus === undefined) {
        if(status === 'liked') {
            this.handleLikePun(id);
            this.setState({ likedStatus: 'liked' })
        } else if (status === 'disliked') {
            this.handleDislikePun(id);
            this.setState({ likedStatus: 'disliked' })
        }
    }
  }

  handleLikePun = async (id) => {
    const response = await randomPuns.patch(`/puns/${id}/like`);
    this.setState((prevState) => {
        return {
            ...prevState,
            likes: response.data.likes,
            dislikes: response.data.dislikes
        }
    })
  }

  handleDislikePun = async (id) => {
    const response = await randomPuns.patch(`/puns/${id}/dislike`);
    this.setState((prevState) => {
        return {
            ...prevState,
            likes: response.data.likes,
            dislikes: response.data.dislikes
        }
    })
  }

    render() {
        if(this.state.likedStatus === 'liked') {
            return (
            <div className="icons-wrapper">
                <i className="fas fa-thumbs-up status-icon liked-icon" onClick={async () => {await this.handleLikedStatus('liked', this.props.randomPun._id)}}></i>{this.state.likes}
                <i className="far fa-thumbs-down status-icon disliked-icon" onClick={async () => {await this.handleLikedStatus('disliked', this.props.randomPun._id)}}></i>{this.state.dislikes}
            </div>
            )
        } else if (this.state.likedStatus === 'disliked') {
            return (
            <div className="icons-wrapper">
                <i className="far fa-thumbs-up status-icon liked-icon" onClick={async () => {await this.handleLikedStatus('liked', this.props.randomPun._id)}}></i>{this.state.likes}
                <i className="fas fa-thumbs-down status-icon disliked-icon" onClick={async () => {await this.handleLikedStatus('disliked')}}></i>{this.state.dislikes}
            </div>
            )
        } else {
            return(
            <div className="icons-wrapper">
                <i className="far fa-thumbs-up status-icon liked-icon" onClick={async () => {await this.handleLikedStatus('liked', this.props.randomPun._id)}}></i>{this.state.likes}
                <i className="far fa-thumbs-down status-icon disliked-icon" onClick={async () => {await this.handleLikedStatus('disliked', this.props.randomPun._id)}}></i>{this.state.dislikes}
            </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
  return {
    randomPun: state.randomPun
  }
}

export default connect(mapStateToProps, { fetchRandomPun })(LikeBar);