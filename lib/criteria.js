"use strict";
var type = "segments"

var Criteria = module.exports = function(iContact, segmentId) {
  this.i = iContact;
  this.segmentId = segmentId
}

// https: //app.sandbox.icontact.com/icp/a/{accountid}/c/{clientfolderid}/segments/{segmentid}/criteria
/*
  data = {
    fieldName: ...,
    operator: eq, lt, lte, gt, gte, bet, contains, notcontains
    values: [] / string
  }
*/

Criteria.prototype.value = function(fieldName, values, operator) {
  if (!fieldName) throw new Error("Criteria fieldname is required")
  if (!values) throw new Error("Criteria value is required")
  if (!(values instanceof Array)) values = [values]
  if (!operator) operator = "contains"

  this.data = {
    fieldName: fieldName,
    values: values,
    operator: operator
  }

  return this;
}

Criteria.prototype.create = function() {
  if (!this.data) throw new Error("Call .value() first to set data")
  let urlPath = [type, this.segmentId, "criteria"]
  return this.i.process(urlPath, "POST", [this.data])
    .then(function(data) {
      return Promise.resolve(data.criteria.pop())
    })
}

Criteria.prototype.all = function() {

  let arrPath = [type, this.segmentId, "criteria"]
  return this.i.process(arrPath)
    .then(function(data) {
      return Promise.resolve(data.criteria)
    })
}

Criteria.prototype.update = function(id) {
  if (!this.data) throw new Error("Call .value() first to set data")
  console.log(id.toString())
  let urlPath = [type, this.segmentId, "criteria", id.toString()]
  return this.i.process(urlPath, "POST", this.data)
    .then(function(data) {
      return Promise.resolve(data.criterion)
    })
}

Criteria.prototype.delete = function(id) {
  let urlPath = [type, this.segmentId, "criteria", id.toString()]
  return this.i.process(urlPath, "DELETE")
}