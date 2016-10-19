import alt from '../alt';
import HomeActions from '../actions/HomeActions';

class HomeStore {
  constructor() {
    this.bindActions(HomeActions);
    this.questions = [];
  }

  onGetTwoQuestionsSuccess(data) {
    this.questions = data;
  }


}

export default alt.createStore(HomeStore);
