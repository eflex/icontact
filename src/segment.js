"use strict";
var type = "segments"
import Base from "./base";

export default class Segment extends Base {

  count() {
    return super.count([type])
  }

  // data name of the list
  // listId is required on create
  create(newRec) {
    if (!newRec && (!newRec.listId || !newRec.name)) throw new Error(
      "listId and name are required in creating a segment")
    return super.create(newRec, [type], type)
  }

  read(limit, offset) {
    return super.read(limit, offset, [type], type)
  }

  update(id, updatedRec) {
    let urlPath = [type, id.toString()]
    return super.update(id, updatedRec, urlPath, "segment")
  }

  delete(id) {
    return this.process([type, id.toString()], "DELETE")
  }
}
