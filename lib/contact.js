"use strict";
var type = "contacts"

var Contact = module.exports = function(iContact) {
  this.i = iContact;
}

/*
  info = {
    email: ...,
    firstName: ...,
    lastName: ...,
    ....
  }
*/
Contact.prototype.value = function(data) {
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

Contact.prototype.create = function() {
  if (!this.data) throw new Error("Call .value() to set values first")
  return this.i.process([type], "POST", [this.data])
    .then(function(data) {
      return Promise.resolve(data.contacts.pop())
    })
}

Contact.prototype.all = function() {
  return this.i.process([type])
    .then(function(data) {
      return Promise.resolve(data.contacts)
    })
}

Contact.prototype.update = function(id) {
  if (!this.data) throw new Error("Call .value() to set values first")
  let urlPath = [type, id]
  return this.i.process(urlPath, "POST", this.data)
    .then(function(data) {
      return Promise.resolve(data.contact)
    })
}

Contact.prototype.delete = function(id) {
  let urPath = [type, id]
  return this.i.process(urPath, "DELETE")
}

Contact.prototype.subscriptions = function() {
  let urlPath = ["subscriptions"]
  return this.i.process(urlPath)
    .then(function(data) {
      return Promise.resolve(data.subscriptions)
    })
}

Contact.prototype.subscribe = function(contactId, listId) {
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

// Contact.prototype.unsubscribe = function(contactId, listId) {
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