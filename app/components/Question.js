import React from 'react';
import QuestionStore from '../stores/QuestionStore';
import QuestionActions from '../actions/QuestionActions'
import {Link} from 'react-router';
import {RadioGroup, Radio} from 'react-radio-group'


class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = QuestionStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    QuestionStore.listen(this.onChange);
    QuestionActions.getQuestion(this.props.params.id);
  }

  componentWillUnmount() {
    QuestionStore.unlisten(this.onChange);
    $(document.body).removeClass();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.params.id !== this.props.params.id) {
      QuestionActions.getQuestion(this.props.params.id);
    }
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    return (
      <div className='container'>
        <div className='profile-img'>
          <a ref='magnificPopup' className='magnific-popup' href={'https://dummyimage.com/1024/444/fff.jpg&text=' + this.state._id }>
            <img src={'https://dummyimage.com/256/444/fff.jpg&text=' + this.state._id} />
          </a>
        </div>
        <div className='profile-info clearfix'>
          <h2><strong>{this.state.question}</strong></h2>
          <RadioGroup name="QuestionOptions"
            checked={this.state.userAnswer}>
                <h4 className='lead'><Radio value={this.state.option1id} disabled={this.state.isAnswered} onClick={QuestionActions.chosen.bind(this, this.state.option1id)} />{this.state.option1}</h4>
                <h4 className='lead'><Radio value={this.state.option2id} disabled={this.state.isAnswered} onClick={QuestionActions.chosen.bind(this, this.state.option2id)}/> {this.state.option2}</h4>
                <h4 className='lead'><Radio value={this.state.option3id} disabled={this.state.isAnswered} onClick={QuestionActions.chosen.bind(this, this.state.option3id)}/> {this.state.option3}</h4>
                <h4 className='lead'><Radio value={this.state.option4id} disabled={this.state.isAnswered} onClick={QuestionActions.chosen.bind(this, this.state.option4id)}/> {this.state.option4}</h4>
          </RadioGroup>
          <button className='btn btn-transparent'
                  onClick={QuestionActions.answer.bind(this, this.state._id, this.state.userAnswer)}
                  disabled={this.state.isAnswered}>
                  {this.state.isAnswered ? 'Submitted' : 'Submit'}
          </button>
          <button className='btn btn-transparent'
                  onClick={QuestionActions.skip.bind(this, this.state._id)}>
                  {this.state.isAnswered ? 'Next' : 'Skip'}
          </button>
        </div>

        <h4 className='lead'><strong>{this.state.isAnswered? 'Thanks for your response!':' '}</strong></h4>
        <div className='profile-stats clearfix'>
          <ul>
            <li><span className='stats-number'>{this.state.isAnswered? this.state.option1cnt: ''}</span>{this.state.isAnswered? this.state.option1: ''}</li>
            <li><span className='stats-number'>{this.state.isAnswered? this.state.option2cnt: ''}</span>{this.state.isAnswered? this.state.option2: ''}</li>
            <li><span className='stats-number'>{this.state.isAnswered? this.state.option3cnt: ''}</span>{this.state.isAnswered? this.state.option3: ''}</li>
            <li><span className='stats-number'>{this.state.isAnswered? this.state.option4cnt: ''}</span>{this.state.isAnswered? this.state.option4: ''}</li>
          </ul>
        </div>
      </div>
    );
   }
}

export default Question;
