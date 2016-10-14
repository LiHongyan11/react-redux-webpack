import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { isEqual } from 'lodash'
import { getNoticeInfo } from '../actions/welcome';

// const banner1 = require('./banner/images/banner1.png');

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  componentDidMount() {
  }

  componentWillReceiveProps( nextProps ) {
  }

  render() {
    const {
    } = this.state;
    return (
      <div className="app">
        home
      </div>
    )
  }
}
Home.contextTypes = {
  router: React.PropTypes.object,
}

export default connect(
  state => ({
    noticeInfo: state.welcomeReducer.noticeInfo,
  }), { 
  
})(Home)