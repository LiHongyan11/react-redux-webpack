import React from 'react'
import { connect } from 'react-redux'
import FastClick from 'fastclick'
import { setGlobalLoadingHandler, setGlobalLoadingHideHandler } from '../components/XHR'

// Style
import '../../style/_normalize.scss'
import '../style/app.scss'


class App extends React.Component {
  constructor(props) {
    super(props);
    setGlobalLoadingHandler(this.onGlobalLoading.bind(this));
    setGlobalLoadingHideHandler(this.onGlobalHideLoading.bind(this));
    this.state = {
      loading: true,
      loadingMsg: '',
    }
  }
  componentDidMount() {
  }

  onGlobalLoading(msg) {
    this.setState({ loadingMsg: msg })
    // this.refs.loading.show();
  }
  onGlobalHideLoading(msg) {
    this.setState({ loadingMsg: '' })
    // this.refs.loading.hide();
  }

  componentWillReceiveProps(nextProps) {
  }

  render() {
    const {
    } = this.state;

    return (
      <div className="wrap">
        {this.props.children}
      </div>
    )
  }
}

export default connect(
  state => ({
    // sign: state.config.sign,
  }), { 
  // getDDSign
})(App)
