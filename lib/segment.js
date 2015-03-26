"use strict";
var type = "segments"

var Segment = module.exports = function(iContact) {
  this.i = iContact;

}

Segment.prototype.value = function(data) {
  switch (typeof(data)) {
    case "string":
      data = {
        name: data
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
// listId is required on create
Segment.prototype.create = function(listId) {
  if (!this.data) throw new Error("Call .value() first to set data")
  if (!listId) throw new Error("List id is requried on creation")

  // update this.data to include listId
  this.data.listId = listId;

  return this.i.process([type], "POST", [this.data])
    .then(function(data) {
      return Promise.resolve(data.segments.pop())
    })
}

Segment.prototype.all = function() {
  return this.i.process([type])
    .then(function(data) {
      return Promise.resolve(data.segments)
    })

}

Segment.prototype.update = function(id) {
  if (!this.data) throw new Error("Call .value(0 first to set data")

  return this.i.process([type, id.toString()], "POST", this.data)
    .then(function(data) {
      return Promise.resolve(data.segment)
    })
}

Segment.prototype.delete = function(id) {
  return this.i.process([type, id.toString()], "DELETE")
}