"use strict";
var type = "segments"
var type2 = "criteria"
import Base from "./base";

export default class Criteria extends Base {
  constructor(segmentId, options, production) {
    super(options, production);
    this.segmentId = segmentId.toString()
  }

  // https: //app.sandbox.icontact.com/icp/a/{accountid}/c/{clientfolderid}/segments/{segmentid}/criteria
  /*
    data = {
      fieldName: ...,
      operator: eq, lt, lte, gt, gte, bet, contains, notcontains
      values: [] / string
    }
  */

  create(newRec) {
    if (!newRec && (!newRec.fieldName || !newRec.values)) throw new Error(
      "fieldName and values are required in craete a new criteria")
    if (!(newRec.values instanceof Array)) newRec.values = [newRec.values]
    if (!newRec.operator) newRec.operator = "contains"

    let urlPath = [type, this.segmentId, type2]
    return super.create(newRec, urlPath, type2)
  }

  read(limit, offset) {
    let arrPath = [type, this.segmentId, type2]
    return super.read(limit, offset, arrPath, type2)
  }

  update(id, updatedRec) {
    let urlPath = [type, this.segmentId, type2, id.toString()]
    return super.update(updatedRec, urlPath, "criterion")
  }

  delete(id) {
    let urlPath = [type, this.segmentId, type2, id.toString()]
    return super.process(urlPath, "DELETE")
  }
}
