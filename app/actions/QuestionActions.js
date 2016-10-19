import alt from '../alt';

class QuestionActions {
  constructor() {
    this.generateActions(
      'answerSuccess',
      'answerFail',
      'skipSuccess',
      'skipFail',
      'getQuestionSuccess',
      'getQuestionFail',
      'chosenSuccess'
    );
  }

  getQuestion(id) {
    $.ajax({ url: '/api/questions/'+id })
      .done((data) => {
        this.actions.getQuestionSuccess(data);
      })
      .fail((jqXhr) => {
        this.actions.getQuestionFail(jqXhr);
      });
  }

  getRandomQuestion() {
    $.ajax({ url: '/api/question/random' })
      .done((data) => {
        this.actions.getQuestionSuccess(data);
      })
      .fail((jqXhr) => {
        this.actions.getQuestionFail(jqXhr);
      });
  }

  skip(questionId){
    $.ajax({url: '/api/question/random'})
    .done((data) =>{
      this.actions.getQuestion(data[0]._id);
    })
    .fail((jqXhr) => {
      this.actions.skipFail(jqXhr);
    });
  }

  chosen(userAnswer){
    this.actions.chosenSuccess(userAnswer);
  }


  answer(qid, userAnswer) {

    $.ajax({
      type: 'PUT',
      url: '/api/report/',
      data:{
	           "id": qid,
	           "userAnswer": userAnswer
           }
      })
      .done(() => {
        this.actions.answerSuccess();
      })
      .fail((jqXhr) => {
        this.actions.answerFail(jqXhr);
      });
  }
}

export default alt.createActions(QuestionActions);
