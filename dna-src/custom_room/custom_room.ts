//------------------------------
// Public Functions
//------------------------------

export = 0;
let module = {}


type message = any;
type updateMessageType = any;
type UUID = string;

/*=============================================
=            Public Zome Functions            =
=============================================*/


function createCustomRoom(members: holochain.Hash[]): UUID {
  members.push(App.Key.Hash)
  let uuid: string = uuidGenerator();
  var custom_room_details: any = {
    name: uuid
  }
  debug("Your Room UUID: " + uuid);
  let uuid_hash = commit("custom_room_uuid", uuid);
  //debug("uuid_hash: " + uuid_hash);
  commit("custom_room_link", { Links: [{ Base: App.DNA.Hash, Link: uuid_hash, Tag: "room_uuid" }] });

  let details_hash = commit("custom_room_details", custom_room_details);
  //debug("details_hash: " + details_hash);
  commit("custom_room_link", { Links: [{ Base: uuid_hash, Link: details_hash, Tag: "room_details" }] });

  addMembers(uuid, members);

  return uuid;
}



//TODO : Test for non creator of the room adding a member in the room
//Adds Members to a room using the UUID of the room
function addMembers(uuid: UUID, members: holochain.Hash[]): boolean | holochain.HolochainError {
  let uuid_hash: string = makeHash("custom_room_uuid", uuid);
  members.forEach((member) => {
    try {
      commit("room_to_member_link", { Links: [{ Base: uuid_hash, Link: member, Tag: "room_members" }] });
    } catch (e) {
      debug(e)
      return e
    }
    commit("member_to_room_link", { Links: [{ Base: member, Link: uuid_hash, Tag: "my_rooms" }] });
  });
  return true;
}




function getMyRooms(): Array<any> | holochain.HolochainError {
  let my_rooms: any;
  try {
    my_rooms = getLinks(App.Key.Hash, "my_rooms", { Load: true });
  } catch (e) {
    return e;
  }
  debug("My Room Chats : " + JSON.stringify(my_rooms));
  return my_rooms.map((room) => { return room.Entry });
}



// Call to get all the member for a perticual UUID
function getMembers(uuid: UUID): string[] {
  let members: any;
  try {
    members = getLinks(makeHash("custom_room_uuid", uuid), "room_members", { Load: true });
  } catch (e) {
    return e;
  }
  debug("Members for " + uuid + ": " + JSON.stringify(members));
  return members;
}

// Call to get details for a perticual UUID
function getRoomDetails(uuid: UUID): string[] {
  let details: any;
  try {
    details = getLinks(makeHash("custom_room_uuid", uuid), "room_details", { Load: true });
  } catch (e) {
    return e;
  }
  debug("Room Details for " + uuid + ": " + JSON.stringify(details));
  return details;
}

//@param payload:{uuid:string,message:any}
function postMessage(payload: message): holochain.Hash | holochain.HolochainError {
  debug(payload)
  payload.message.timestamp = new Date();
  payload.message.author = App.Key.Hash;
  debug(payload.message)

  let hash: holochain.Hash;
  try {
    hash = commit("cr_message", payload.message);
    commit("cr_message_link", { Links: [{ Base: makeHash("custom_room_uuid", payload.uuid), Link: hash, Tag: "messages" }] });
  } catch (e) {
    return e;
  }
  return hash;
}

function getMessages(uuid: UUID): Array<holochain.GetLinksResponse> | holochain.HolochainError {
  let messages;
  try {
    let messages = getLinks(makeHash("custom_room_uuid", uuid), "messages", { Load: true });
    debug("Messages : " + JSON.stringify(messages))
    return messages;
  } catch (e) {
    debug("ERROR: " + e);
    return e;
  }

}

//@param payload:{new_message:"",old_hash:""}
function updateMessage(payload: updateMessageType): holochain.Hash {
  debug(payload);
  payload.new_message.timestamp = new Date();
  payload.new_message.author = App.Key.Hash;
  let hash: holochain.Hash = update("cr_message", payload.new_message, payload.old_hash);
  return hash;
}

/*=====  End of Public Zome Functions  ======*/




/*=========================================
=            Private Functions            =
=========================================*/

//Generates new UUID ()
function uuidGenerator() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
//For Testing
function getKey() {
  return App.Key.Hash;
}

/*=====  End of Private Functions  ======*/




/*==================================
=            Validation            =
==================================*/

function genesis() {
  return true;
}

// Check if the pub_hash is a member of the
function isValidAdmin(base_hash: string, entry_source: string): boolean {
  debug("Checking if Agent is an Admin..");
  //Checking if the Creator is trying to add people to the room
  let source: any;
  try {
    source = get(base_hash, { GetMask: HC.GetMask.Sources });
  } catch (e) {
    return false;
  }
  //Added the creater of the room as a member of the room
  if (JSON.stringify(source) === JSON.stringify(entry_source)) {
    //debug("Adding Room Creator as a member of the room")
    return true;
  }
  //Checking to see if members are trying to add new members to the room
  let members: any;
  try {
    members = getLinks(base_hash, "room_members", { Load: true });
  } catch (e) {
    debug("Rooms Dosnt Exist " + e);
    return false;
  }
  let access: boolean = members.some((member) => {
    return member.Hash == entry_source
  });
  return access;
}
// Check to validate if the same user that created the message is modifying the message
function isValidModifier(replaces: string, sources: any): boolean {
  let old_message: any;
  try {
    old_message = get(replaces)
  } catch (e) {
    debug("ERROR: isValidModifier() " + e)
  }
  if (old_message.author == sources[0])
    return true;
  else
    return false;
}
function validateCommit(entryName: any, entry: any, header: any, pkg: any, sources: any): boolean {
  debug("entry_type:" + entryName + "entry" + JSON.stringify(entry) + "header" + JSON.stringify(header) + "PKG: " + JSON.stringify(pkg) + "sources" + sources);
  return validate(entryName, entry, header, pkg, sources);
}

function validate(entryName: any, entry: any, header: any, pkg: any, sources: any): boolean {
  switch (entryName) {
    case "custom_room_uuid":
      return true;
    case "custom_room_details":
      return true;
    case "custom_room_link":
      return true;
    case "room_to_member_link":
      return isValidAdmin(entry.Links[0].Base, sources);
    case "member_to_room_link":
      //isValidAdmin(entry);
      return true;
    case "cr_message":
      return true;
    case "cr_message_link":
      return true;
    default:
      return false;
  }
}

function validatePut(entryName: any, entry: any, header: any, pkg: any, sources: any): boolean {
  return true;
}

function validateMod(entryName: any, entry: any, header: any, replaces: any, pkg: any, sources: any): boolean {
  debug("entry_type:" + entryName + "entry" + JSON.stringify(entry) + "header" + JSON.stringify(header) + "replaces: " + replaces + "PKG: " + JSON.stringify(pkg) + "sources" + sources);
  switch (entryName) {
    case "cr_message":
      return isValidModifier(replaces, sources);
    default:
      return false;
  }
}

function validateDel(entryName: any, hash: any, pkg: any, sources: any): boolean {
  return false;
}

function validateLink(entryName: any, baseHash: any, links: any, pkg: any, sources: any): boolean {
  //debug("entryName: "+entryName+" baseHash: "+ baseHash+" links: "+ links+" sources: "+ sources);
  switch (entryName) {
    case "custom_room_link":
      return true;
    case "room_to_member_link":
      return true;
    case "member_to_room_link":
      return true;
    case "cr_message_link":
      return true;
    default:
      return false;
  }
}

function validatePutPkg(entryName) {
  return null;
}

function validateModPkg(entryName) {
  return null;
}

function validateDelPkg(entryName) {
  return null;
}

function validateLinkPkg(entryName) {
  return null;
}


/*=====  End of Validation  ======*/
