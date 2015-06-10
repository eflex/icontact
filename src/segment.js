"use strict";
var type = "segments"

export default class Segment {
  constructor(iContact) {
    this.i = iContact;
  }

  value(data) {
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
  create(listId) {
    if (!this.data) throw new Error("Call .value() first to set data")
    if (!listId) throw new Error("List id is requried on creation")

    // update this.data to include listId
    this.data.listId = listId;

    return this.i.process([type], "POST", [this.data])
      .then(function(data) {
        return Promise.resolve(data.segments.pop())
      })
  }

  all() {
    return this.i.process([type])
      .then(function(data) {
        return Promise.resolve(data.segments)
      })

  }

  update(id) {
    if (!this.data) throw new Error("Call .value(0 first to set data")

    return this.i.process([type, id.toString()], "POST", this.data)
      .then(function(data) {
        return Promise.resolve(data.segment)
      })
  }

  delete(id) {
    return this.i.process([type, id.toString()], "DELETE")
  }
}
