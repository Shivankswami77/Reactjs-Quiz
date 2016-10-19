import {assign, contains} from 'underscore';
import alt from '../alt';
import QuestionActions from '../actions/QuestionActions';

class QuestionStore {
  constructor() {
    this.bindActions(QuestionActions);
    this.question = 'TBD';
    this.option1 = 'TBD';
    this.option2 = 'TBD';
    this.option3 = 'TBD';
    this.option4 = 'TBD';
    this.option1id = 0;
    this.option2id = 0;
    this.option3id = 0;
    this.option4id = 0;
    this.option1cnt = 0;
    this.option2cnt = 0;
    this.option3cnt = 0;
    this.option4cnt = 0;
    this.option1per = 0;
    this.option2per = 0;
    this.option3per = 0;
    this.option4per = 0;
    this.winLossRatio = 0;
    this.isAnswered = false;
    this.userAnswer = 0;
  }

  onGetQuestionSuccess(data) {
    assign(this, data);
    this.bg = ['one', 'two', 'three','four'];
    $(document.body).attr('class', 'profile ' + this.bg[this._id%4]);
    let localData = localStorage.getItem('TSLA') ? JSON.parse(localStorage.getItem('TSLA')) : {};
    let reports = localData.reports || [];
    this.isAnswered = contains(reports, this._id);
    this.option1id = this.answers[0].aid;
    this.option2id = this.answers[1].aid;
    this.option3id = this.answers[2].aid;
    this.option4id = this.answers[3].aid;
    this.option1cnt = this.answers[0].count;
    this.option2cnt = this.answers[1].count;
    this.option3cnt = this.answers[2].count;
    this.option4cnt = this.answers[3].count;
    this.option1 = this.answers[0].answer;
    this.option2 = this.answers[1].answer;
    this.option3 = this.answers[2].answer;
    this.option4 = this.answers[3].answer;
    this.winLossRatio = ((this.wins / (this.wins + this.losses) * 100) || 0).toFixed(1);
    this.summaryText = this.isAnswered ? 'This question has been answered':'';
  }

  onChosenSuccess(userAnswer){
    this.userAnswer = userAnswer;
  }

  onGetQuestionFail(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }

  onAnswerSuccess() {
    this.isAnswered = true;
    let localData = localStorage.getItem('TSLA') ? JSON.parse(localStorage.getItem('TSLA')) : {};
    localData.reports = localData.reports || [];
    localData.reports.push(this._id);
    localStorage.setItem('TSLA', JSON.stringify(localData));
    toastr.warning('Your Answer has been reported.');
  }

  onAnswerFail(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }

  onSkipFail(jqXhr){
    toastr.error(jqXhr.responseJSON.message);
  }
}

export default alt.createStore(QuestionStore);
