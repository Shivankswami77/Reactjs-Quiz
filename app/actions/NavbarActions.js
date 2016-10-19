import alt from '../alt';
import {assign} from 'underscore';

class NavbarActions {
  constructor() {
    this.generateActions(
      'updateOnlineUsers',
      'updateAjaxAnimation',
      'updateSearchQuery',
      'getQuestionCountSuccess',
      'getQuestionCountFail',
      'findQuestionSuccess',
      'findQuestionFail'
    );
  }

  findCharacter(payload) {
    $.ajax({
      url: '/api/questions/search',
      data: { name: payload.searchQuery }
    })
      .done((data) => {
        assign(payload, data);
        this.actions.findQuestionSuccess(payload);
      })
      .fail(() => {
        this.actions.findQuestionFail(payload);
      });
  }

  getQuestionCount() {
    $.ajax({ url: '/api/questions/count' })
      .done((data) => {
        this.actions.getQuestionCountSuccess(data)
      })
      .fail((jqXhr) => {
        this.actions.getQuestionCountFail(jqXhr)
      });
  }
}

export default alt.createActions(NavbarActions);
