"use strict";
var type = "lists"
import Base from "./base"

export default class List extends Base {

  count() {
      return super.count([type])
    }
    // data name of the list
  create(newRec) {
    if (!newRec && !newRec.name) throw new Error(
      "name is required to create a new list")
    return super.create(newRec, [type], type)
  }

  read(limit, offset) {
    return super.read(limit, offset, [type], type)
  }

  update(id, updatedRec) {
    let urlPath = [type, id.toString()]
    return super.update(updatedRec, urlPath, "list")
  }

  delete(id) {
    let urlPath = [type, id.toString()]
    return this.process(urlPath, "DELETE")
  }
}
