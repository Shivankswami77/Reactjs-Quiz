import React from 'react';
import {Link} from 'react-router';
import HomeStore from '../stores/HomeStore'
import HomeActions from '../actions/HomeActions';
import {first, without, findWhere} from 'underscore';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = HomeStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    HomeStore.listen(this.onChange);
  }

  componentWillUnmount() {
    HomeStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }


  render() {
    return (
      <div className='container'>
        <h3 className='text-center'>Welcome to the Quiz !</h3>
        <div className='row'>
            <div className='thumbnail fadeInUp animated'>
              <img src='https://lh5.googleusercontent.com/-nWTvtqAxHqc/UiEef3HELYI/AAAAAAAAACM/pw9uLwzpJIs/Tesla-S-interior_1680x1050.jpg'/>
              <div className='caption text-center'>
                <h4>
                  <button type="button" class="btn btn-default">
                      <Link to={'/questions/1'}><strong>Click to begin !</strong></Link>
                  </button>
                </h4>
              </div>
            </div>
        </div>
      </div>
    );
  }
}

export default Home;
