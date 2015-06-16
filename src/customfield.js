"use strict";
var type = "customfields"
import Base from "./base"
export default class CustomField extends Base {

  /*
  info = {
    privateName: ...,
    displayToUser: 1/0(default),
    fieldType: checkbox(default) / text / date / number
    publicName: ...
  }
  */
  create(newRec) {
    if (!newRec && !newRec.privateName) throw new Error(
      "privateName is required in creating custom fields")
    if (!newRec.displayToUser) newRec.displayToUser = 0;
    if (!newRec.fieldType) newRec.fieldType = "text"
    return super.create(newRec, [type], type)
  }

  read(limit, offset) {
    return super.read(limit, offset, [type], type)
  }

  update(id, upatedRec) {
    let urlPath = [type, id.toString()]
    return super.update(updatedRec, urlPath, "customfield")
  }

  delete(id) {
    let urlPath = [type, id.toString().toLowerCase()]
    return this.process(urlPath, "DELETE")
  }
}
