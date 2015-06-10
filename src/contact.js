"use strict";
var type = "contacts"

/*
  info = {
    email: ...,
    firstName: ...,
    lastName: ...,
    ....
  }
*/

export default class Contact {

  constructor(iContact) {
    this.i = iContact
  }



  value(data) {
    switch (typeof(data)) {
      case "string":
        data = {
          email: data
        }
        break;
      default:
        if (!data.email) throw new Error("Email is required")
    }
    this.data = data;
    return this;
  }

  create() {
    if (!this.data) throw new Error("Call .value() to set values first")
    return this.i.process([type], "POST", [this.data])
      .then(function(data) {
        return Promise.resolve(data.contacts.pop())
      })
  }

  all() {
    return this.i.process([type])
      .then(function(data) {
        return Promise.resolve(data.contacts)
      })
  }

  update(id) {
    if (!this.data) throw new Error("Call .value() to set values first")
    let urlPath = [type, id]
    return this.i.process(urlPath, "POST", this.data)
      .then(function(data) {
        return Promise.resolve(data.contact)
      })
  }

  delete(id) {
    let urPath = [type, id]
    return this.i.process(urPath, "DELETE")
  }

  subscriptions() {
    let urlPath = ["subscriptions"]
    return this.i.process(urlPath)
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
    return this.i.process(urlPath, "POST", [data])
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

  //   return this.i.process(urlPath, "POST", data)
  //     .then(function(data) {
  //       return Promise.resolve(data.subscription)
  //     })
  // }
}
