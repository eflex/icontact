"use strict";
var type = "customfields"

export default class CustomField {
  constructor(iContact) {
    this = iContact;
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

  value(data) {
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

  create() {
    if (!this.data) throw new Error("Call .value() to set values first")
    return this.process([type], "POST", [this.data])
      .then(function(data) {
        return Promise.resolve(data.customfields.pop())
      })
  }

  all() {
    return this.process([type])
      .then(function(data) {
        return Promise.resolve(data.customfields)
      })
  }

  update(id) {
    if (!this.data) throw new Error("Call .value() to set values first")
    let urlPath = [type, id.toString()]
    return this.send(type, "POST", this.data)
      .then(function(data) {
        return Promise.resolve(data.customfield)
      })
  }

  delete(id) {
    let urlPath = [type, id.toString()]
    return this.process(urlPath, "DELETE")
  }
}
