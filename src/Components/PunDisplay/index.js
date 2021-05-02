import React from 'react';
import LikeBar from '../LikeBar';
import './styles.css';

import { connect } from 'react-redux';
import { fetchRandomPun } from '../../actions';

class PunDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reveal: false
    }
    this.handleReveal = this.handleReveal.bind(this);
  }
  
  handleReveal = () => {
    this.setState((prevState) => {
      return {
        ...prevState,
        reveal: !prevState.reveal
      }
    })
  }

  componentDidMount() {
      this.props.fetchRandomPun();
  }

  render(){
    return (
      Object.keys(this.props.randomPun).length > 0 ?
      <div className="pun-wrapper">
        <div className="pun-header">
          <LikeBar pun={this.props.randomPun} />
        </div>
        <p className="pun-setup">{this.props.randomPun.setUp}</p>
        {
          this.state.reveal ? 
          <p className="pun-punchline">{this.props.randomPun.punchline}</p>
          :
          <p className="pun-punchline reveal-button" onClick={this.handleReveal}>Click to Reveal</p>
        }
        <p className="pun-title">Title: {this.props.randomPun.title}</p>
        <p className="pun-submittedBy">Submitted By: {this.props.randomPun.submittedBy}</p>
        <p className="refresh-link" onClick={() => {window.location.reload()}}>Load New Pun</p>
      </div>
      :
      <div className="pun-wrapper">
        <i className="fas fa-circle-notch fa-spin pun-loader"></i>
        <p className="pun-error">Loading..</p>

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    randomPun: state.randomPun
  }
}

export default connect(mapStateToProps, { fetchRandomPun })(PunDisplay);