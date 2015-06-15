"use strict";
/*
  info = {
    email: ...,
    firstName: ...,
    lastName: ...,
    ....
  }
*/

var type = "contacts"
import Base from "./base";

export default class Contact extends Base {

  count() {
    return super.count([type])
  }

  create(newData) {
    if (!newData || !newData.email) throw new Error(
      "Email is required in creating new contact.")
    return super.create(newData, [type], type);
  }


  read(limit, offset) {
    return super.read(limit, offset, [type], type)
  }

  update(id, updatedRec) {
    let urlPath = [type, id.toString()]
    return super.update(updatedRec, urlPath, 'contact')
  }

  delete(id) {
    return super.process([type, id.toString()], "DELETE");
  }


  subscriptions() {
    let urlPath = ["subscriptions"]
    return this.process(urlPath)
      .then(function(data) {
        return Promise.resolve(data.subscriptions)
      })
  }

  subscribe(contactId, listId) {
    let urlPath = ["subscriptions"]
    let data = {
      contactId: contactId,
      listId: listId,
      status: "normal"
    }
    return this.process(urlPath, "POST", [data])
      .then(function(data) {
        return Promise.resolve(data.subscriptions.pop())
      })
  }

  //  unsubscribe(contactId, listId) {
  //   let subscriptionId = listId + "_" + contactId;
  //   let urlPath = ["subscriptions", subscriptionId.toString()]
  //   let data = {
  //     status: "unsubscribed"
  //   }

  //   return this.process(urlPath, "POST", data)
  //     .then(function(data) {
  //       return Promise.resolve(data.subscription)
  //     })
  // }
}
