/*
  var config = {
    appId: appid,
    username: username,
    password: password,
    accountId: accountid,
    clientFolderId: clientfolderid
  }

  var icontact = new iContact(config)

  var list = icontact.List()

  list.create(....).then()
*/

"use strict";


import List from "./list";
import Contact from "./contact";
import CustomField from "./customfield";
import Segment from "./segment";
import Criteria from "./criteria";
import Message from "./message";

import request from "request";
import path from "path";

export default class iContact {

  constructor(config) {
    // process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    if (!(this instanceof iContact)) return new iContact(config)
    if (!config) throw new Error("Configuration is undefined")

    this.appId = config.appId || process.env.iContactAppId;
    this.username = config.username || process.env.iContactUsername
    this.password = config.password || process.env.iContactPassword
    this.accountId = config.accountId || process.env.iContactAccountId
    this.clientFolderId = config.clientFolderId || process.env.iContactClientFolderId

    this.headers = {
      "Accept": "application/json",
      "Content-Type": "appliiocation/json",
      "Api-Version": "2.0",
      "Api-AppId": this.appId,
      "Api-Username": this.username,
      "API-Password": this.password,
    }
    this.domain = (process.env.NODE_ENV == "production") ?
      "https://app.icontact.com/" : "https://app.sandbox.icontact.com/"
    this.baseUrl = path.join("icp", "a", this.accountId.toString(), "c", this
      .clientFolderId.toString())

  }

  validateArray(arr, requiredField) {
    let err = null;
    for (let i in arr) {
      let data = arr[i]
      if (!data[requiredField]) {
        err = new Error(requiredField + " is required")
        break;
      }
    }
    if (err) throw err;
    return arr;
  }

  process(thePath, method, formData) {
    if (!(thePath instanceof Array)) throw new Error(
      "Array of path is not provided")
    if (!method) method = "GET"

    let headers = this.headers

    let target = path.join.apply(null, thePath)

    target = this.domain + path.join(this.baseUrl, target);
    // generate the request to make
    let requestOption = {
      url: target,
      headers: headers,
      method: method,
      timeout: 30000
    }

    // this should only work for post, put, delete?
    if (formData) {
      console.log(formData)
      requestOption.form = formData
    }


    // return the promise
    return new Promise(function(resolve, reject) {
      console.log("sending request to", target)
      return request(requestOption, function(error, response, body) {
        if (error) return reject(error)
        body = JSON.parse(body)

        // if (response.statusCode !== 200) {
        // let errorMessage = "Server responded with status: " + response.statusCode
        // return reject(new Error(errorMessage))
        // }

        if (body.errors) return reject(new Error(body.errors.pop()))
        if (body.warnings) return reject(new Error(body.warnings.pop()))


        return resolve(body)
      });
    })

  }

  /* CONTACT */
  List() {
    return new List(this)
  }

  Contact() {
    return new Contact(this)
  }

  Segment() {
    return new Segment(this)
  }

  Criteria(segmentId) {
    if (!segmentId) throw new Error("segmentId is required")
    return new Criteria(this, segmentId.toString())
  }

  CustomField() {
    return new CustomField(this)
  }

  Message() {
    return new Message(this)
  }
}
