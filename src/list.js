"use strict";
var Segment = require("./segment")
var type = "lists"

export default class List {
  constructor(iContact) {
    this.i = iContact;
  }

  value(data) {

    switch (typeof(data)) {
      case "string":
        data = {
          "name": data
        }
        break;
      default:
        if (!data.name) throw new Error("Name is required")
    }
    this.data = data;
    return this;
  }

  /* the CRUD */

  // data name of the list
  create() {
    if (!this.data) throw new Error("Call .value() to set values first")
    console.log("data", this.data)
    return this.i.process([type], "POST", [this.data])
      .then(function(data) {
        return Promise.resolve(data.lists.pop())
      })
  }

  all() {
    return this.i.process([type])
      .then(function(data) {
        return Promise.resolve(data.lists)
      })

  }

  update(id) {
    if (!this.data) throw new Error("Call .value() to set values first")
    let urlPath = [type, id.toString()]

    return this.i.process(urlPath, "POST", this.data)
      .then(function(data) {
        return Promise.resolve(data.list)
      })
  }

  delete(id) {
    let urlPath = [type, id.toString()]
    return this.i.process(urlPath, "DELETE")
  }
}
