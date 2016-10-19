import alt from '../alt';

class AddQuestionActions {
  constructor() {
    this.generateActions(
      'addQuestionSuccess',
      'addQuestionFail',
      'updateQuestion',
      'updateChoice1',
      'updateChoice2',
      'updateChoice3',
      'updateChoice4',
      'invalidQuestion',
      'invalidChoice1',
      'invalidChoice2',
      'invalidChoice3',
      'invalidChoice4'
    );
  }

  addQuestion(question, choice1, choice2, choice3, choice4) {

    $.ajax({ url: '/api/questions/count' })
      .done((data) => {
          data = JSON.parse(data);
          $.ajax({
            type: 'POST',
            url: '/api/questions',
            data: { question: question, choice1: choice1, choice2:choice2, choice3: choice3, choice4:choice4 , qid: data.count+1 }
          })
      })
      .done((data) => {
        this.actions.addQuestionSuccess(data.message);
      })
      .fail((jqXhr) => {
        this.actions.addQuestionFail(jqXhr.responseJSON.message);
      });
  }
}

export default alt.createActions(AddQuestionActions);
