import alt from '../alt';
import AddQuestionActions from '../actions/AddQuestionActions';

class AddQuestionStore {
  constructor() {
    this.bindActions(AddQuestionActions);
    this.qid = 0;
    this.question = '';
    this.choice1 = '';
    this.choice2 = '';
    this.choice3 = '';
    this.choice4 = '';
    this.helpBlock = '';
    this.questionValidationState = '';
    this.choice1ValidationState = '';
    this.choice2ValidationState = '';
    this.choice3ValidationState = '';
    this.choice4ValidationState = '';
  }

  onAddQuestionSuccess(successMessage) {
    this.questionValidationState = 'has-success';
    this.helpBlock = successMessage;
  }

  onAddQuestionFail(errorMessage) {
    this.questionValidationState = 'has-error';
    this.helpBlock = errorMessage;
  }

  onUpdateQuestion(event) {
    this.question = event.target.value;
    this.questionValidationState = '';
    this.helpBlock = '';
  }

  onUpdateChoice1(event) {
    this.choice1 = event.target.value;
    this.choice1ValidationState = '';
    this.helpBlock = '';
  }

  onUpdateChoice2(event) {
    this.choice2 = event.target.value;
    this.choice2ValidationState = '';
    this.helpBlock = '';
  }

  onUpdateChoice3(event) {
    this.choice3 = event.target.value;
    this.choice3ValidationState = '';
    this.helpBlock = '';
  }
  onUpdateChoice4(event) {
    this.choice4 = event.target.value;
    this.choice4ValidationState = '';
    this.helpBlock = '';
  }

  onInvalidQuestion() {
    this.questionValidationState = 'has-error';
    this.helpBlock = 'Please enter a question';
  }

  onInvalidChoice1() {
    this.choice1ValidationState = 'has-error';
    this.helpBlock = 'Please enter choice1';
  }

  onInvalidChoice2() {
    this.choice2ValidationState = 'has-error';
    this.helpBlock = 'Please enter choice2';
  }

  onInvalidChoice3() {
    this.choice3ValidationState = 'has-error';
    this.helpBlock = 'Please enter choice3';
  }

  onInvalidChoice4() {
    this.choice4ValidationState = 'has-error';
    this.helpBlock = 'Please enter choice4';
  }
}

export default alt.createStore(AddQuestionStore);
