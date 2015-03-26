## iContact
  Simple iContact module for node

## Quick Start

  Installation:

```bash
$ npm install --save eflex/icontact
```


## Usage
var config = {
  appId: appid,
  username: username,
  password: password,
  accountId: accountid,
  clientFolderId: clientfolderid
}

```javascript
var icontact = new iContact(config)

var list = icontact.List()
list
  .all()
  // .delete(id)
  // .value("new List")
  // .create()
  // .update(id)
  .then(...)

var contact = iContact.Contact()
contact
  .all()
  // .delete(id)
  // .subscriptions()
  // .subscribe(contactId, listId)
  // .value("email")
  // .create()
  // .update(id)
  .then(...)



var segment = iContact.Segment()
segment
  .all()
  // .delete(id)
  // .value("email")
  // .create(listId)
  // .update(id)
  .then(...)

var criteria = iContact.Criteria(segmentId)
criteria
  .all()
  // .delete(id)
  // .value(fielname, value, operator)
  // .create()
  // .update(id)
  .then(...)

var customfield = iContact.CustomField()
customfield
  .all()
  // .delete(id)
  // .value(newFieldName)
  // .create()
  // .update(id)
  .then(...)

```