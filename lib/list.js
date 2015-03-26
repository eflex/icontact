"use strict";
var Segment = require("./segment")
var type = "lists"

var List = module.exports = function(i) {
  this.i = i;
}

List.prototype.value = function(data) {

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
List.prototype.create = function() {
  if (!this.data) throw new Error("Call .value() to set values first")
  console.log("data", this.data)
  return this.i.process([type], "POST", [this.data])
    .then(function(data) {
      return Promise.resolve(data.lists.pop())
    })
}

List.prototype.all = function() {
  return this.i.process([type])
    .then(function(data) {
      return Promise.resolve(data.lists)
    })

}

List.prototype.update = function(id) {
  if (!this.data) throw new Error("Call .value() to set values first")
  let urlPath = [type, id.toString()]

  return this.i.process(urlPath, "POST", this.data)
    .then(function(data) {
      return Promise.resolve(data.list)
    })
}

List.prototype.delete = function(id) {
  let urlPath = [type, id.toString()]
  return this.i.process(urlPath, "DELETE")
}