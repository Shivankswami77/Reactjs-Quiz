import alt from '../alt';

class FooterActions {
  constructor() {
    this.generateActions(
      'getTopQuestionsSuccess',
      'getTopQuestionsFail'
    );
  }

  getTopQuestions() {
    $.ajax({ url: '/api/questions/top' })
      .done((data) => {
        this.actions.getTopQuestionsSuccess(data)
      })
      .fail((jqXhr) => {
        this.actions.getTopQuestionsFail(jqXhr)
      });
  }
}

export default alt.createActions(FooterActions);
