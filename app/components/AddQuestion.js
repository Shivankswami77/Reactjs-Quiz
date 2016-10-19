import React from 'react';
import AddQuestionStore from '../stores/AddQuestionStore';
import AddQuestionActions from '../actions/AddQuestionActions';

class AddQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = AddQuestionStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    AddQuestionStore.listen(this.onChange);
  }

  componentWillUnmount() {
    AddQuestionStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  handleSubmit(event) {
    event.preventDefault();

    var question = this.state.question.trim();
    var choice1 = this.state.choice1.trim();
    var choice2 = this.state.choice2.trim();
    var choice3 = this.state.choice3.trim();
    var choice4 = this.state.choice4.trim();

    if (!question) {
      AddQuestionActions.invalidQuestion();
      this.refs.questionTextField.focus();
    }

    if (!choice1 || !choice2 || !choice3 || !choice4) {
      AddQuestionActions.invalidOptions();
    }

    if (question && choice1 && choice2 && choice3 && choice4) {
      AddQuestionActions.addQuestion(question, choice1, choice2, choice3, choice4);
    }
  }

  render() {
    return (
      <div className='container'>
        <div className='row flipInX animated'>
          <div className='col-sm-8'>
            <div className='panel panel-default'>
              <div className='panel-heading'>Add Question</div>
              <div className='panel-body'>
                <form onSubmit={this.handleSubmit.bind(this)}>
                  <div className={'form-group ' + this.state.questionValidationState}>
                    <label className='control-label'>Question</label>
                    <input type='text' className='form-control' ref='questionTextField' value={this.state.question}
                           onChange={AddQuestionActions.updateQuestion} autoFocus/>
                    <span className='help-block'>{this.state.helpBlock}</span>
                  </div>
                  <div className={'form-group ' + this.state.choice1ValidationState}>
                    <label className='control-label'>Choice #1</label>
                    <input type='text' className='form-control' ref='choice1TextField' value={this.state.choice1}
                           onChange={AddQuestionActions.updateChoice1} autoFocus/>
                    <span className='help-block'>{this.state.helpBlock}</span>
                  </div>
                  <div className={'form-group ' + this.state.choice2ValidationState}>
                    <label className='control-label'>Choice #2</label>
                    <input type='text' className='form-control' ref='choice2TextField' value={this.state.choice2}
                           onChange={AddQuestionActions.updateChoice2} autoFocus/>
                    <span className='help-block'>{this.state.helpBlock}</span>
                  </div>
                  <div className={'form-group ' + this.state.choice3ValidationState}>
                    <label className='control-label'>Choice #3</label>
                    <input type='text' className='form-control' ref='choice3TextField' value={this.state.choice3}
                           onChange={AddQuestionActions.updateChoice3} autoFocus/>
                    <span className='help-block'>{this.state.helpBlock}</span>
                  </div>
                  <div className={'form-group ' + this.state.choice4ValidationState}>
                    <label className='control-label'>Choice #4</label>
                    <input type='text' className='form-control' ref='choice4TextField' value={this.state.choice4}
                           onChange={AddQuestionActions.updateChoice4} autoFocus/>
                    <span className='help-block'>{this.state.helpBlock}</span>
                  </div>

                  <button type='submit' className='btn btn-primary'>Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddQuestion;
