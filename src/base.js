"use strict";

import request from "request";
import qs from "querystring";
import path from "path";

export default class Base {

  constructor(config, production) {
    // process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

    if (!production) production = process.env.NODE_ENV || false;

    if (!config) throw new Error("Configuration is required")

    this.appId = config.appId || process.env.iContactAppId;
    this.username = config.username || process.env.iContactUsername
    this.password = config.password || process.env.iContactPassword
    this.accountId = config.accountId || process.env.iContactAccountId
    this.clientFolderId = config.clientFolderId || process.env.iContactClientFolderId
    this.limit = 100;
    this.offset = 0;

    this.headers = {
      "Accept": "application/json",
      "Content-Type": "appliiocation/json",
      "Api-Version": "2.0",
      "Api-AppId": this.appId,
      "Api-Username": this.username,
      "API-Password": this.password,
    }
    this.domain = (production) ?
      "https://app.icontact.com/" : "https://app.sandbox.icontact.com/"
    this.baseUrl = path.join("icp", "a", this.accountId.toString(), "c", this
      .clientFolderId.toString())

  }

  create(newData, urlPath, recType) {
    if (!newData) throw new Erro("No date provided to create new record");
    return this.process(urlPath, "POST", [newData])
      .then(function(rec) {
        return Promise.resolve(rec[recType].pop())
      })
  }

  read(limit, offset, urlPath, recType) {
    return this.process(urlPath)
      .then(function(data) {
        return Promise.resolve(data[recType])
      })
  }

  update(updatedData, urlPath, type) {
    if (!updatedData) throw new Error("No updated record provided");
    return this.process(urlPath, "POST", updatedData)
      .then(function(data) {
        return Promise.resolve(data[type])
      })
  }

  count(thePath) {
    this.limit = 1;
    this.offset = 0;
    return this.process(thePath)
      .then(function(data) {
        return Promise.resolve(data.total)
      })
  }

  process(thePath, method, formData) {
    if (!(thePath instanceof Array)) throw new Error(
      "Array of path is not provided")
    if (!method) method = "GET"

    let headers = this.headers

    let target = path.join.apply(null, thePath)

    target = this.domain + path.join(this.baseUrl, target);
    let qString = qs.stringify({
      limit: this.limit || 100,
      offset: this.offset || 0
    })

    // generate the request to make
    let requestOption = {
      url: `${target}?${qString}`,
      headers: headers,
      method: method
    }

    // this should only work for post, put, delete?
    if (formData) {
      console.log(formData)
      requestOption.form = formData
    }


    // return the promise
    return new Promise(function(resolve, reject) {
      console.log("sending request to", `${target}?${qString}`)
      return request(requestOption, function(error, response, body) {
        if (error) return reject(error)
        body = JSON.parse(body)

        // if (response.statusCode !== 200) {
        // let errorMessage = "Server responded with status: " + response.statusCode
        // return reject(new Error(errorMessage))
        // }
        // console.log(body)
        if (body.errors) return reject(new Error(body.errors.pop()))
        if (body.warnings) return reject(new Error(body.warnings.pop()))


        return resolve(body)
      });
    })
  }
}
