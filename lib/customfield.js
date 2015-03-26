"use strict";
var type = "customfields"

var CustomField = module.exports = function(iContact) {
  this.i = iContact;
  this.data = null;
}


/*
info = {
  privateName: ...,
  displayToUser: 1/0(default),
  fieldType: checkbox(default) / text / date / number
  publicName: ...
}
*/

CustomField.prototype.value = function(data) {
  switch (typeof(data)) {
    case "string":
      data = {
        privateName: data,
        displayToUser: 0,
        fieldType: "text"
      }
      break;
    default:
      if (!data.privateName) throw new Error("privateName is required")
        // set default value
      if (!data.displayToUser) data.displayToUser = 0
      if (!data.fieldType) data.fieldType = "text"
  }
  this.data = data;
  return this;
}

CustomField.prototype.create = function() {
  if (!this.data) throw new Error("Call .value() to set values first")
  return this.i.process([type], "POST", [this.data])
    .then(function(data) {
      return Promise.resolve(data.customfields.pop())
    })
}

CustomField.prototype.read = function() {
  return this.i.process([type])
    .then(function(data) {
      return Promise.resolve(data.customfields)
    })
}

CustomField.prototype.update = function(id) {
  if (!this.data) throw new Error("Call .value() to set values first")
  let urlPath = [type, id.toString()]
  return this.i.send(type, "POST", this.data)
    .then(function(data) {
      return Promise.resolve(data.customfield)
    })
}

CustomField.prototype.delete = function(id) {
  let urlPath = [type, id.toString()]
  return this.i.process(urlPath, "DELETE")
}