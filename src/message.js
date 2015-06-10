"use strict";
var type = "messages"

/*
  info = {
    email: ...,
    firstName: ...,
    lastName: ...,
    ....
  }
*/

export default class Message {

  constructor(iContact) {
    this.i = iContact
  }
  all() {
    return this.i.process([type])
      .then(function(data) {
        return Promise.resolve(data.messages)
      });
  }

  clicks(messageId) {
    if (!messageId) throw new Error("messageId is required");
    return this.i.process([type, messageId.toString(), 'clicks'])
      .then(function(data) {
        return Promise.resolve(data.clicks)
      })
  }

}
