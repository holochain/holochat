//------------------------------
// Public Functions
//------------------------------

// Creates new rooms when users decides to start a conversation
//@param members : list of members Public.Hash
function createCoustomRoom(members: string[]): string {
  members.push(App.Key.Hash)
  let uuid: string = uuidGenerator();
  var coustom_room_details: any = {
    name: uuid
  }
  debug("Your Room UUID: " + uuid);
  let uuid_hash = commit("coustom_room_uuid", uuid);
  //debug("uuid_hash: " + uuid_hash);
  commit("coustom_room_link", { Links: [{ Base: App.DNA.Hash, Link: uuid_hash, Tag: "room_uuid" }] });

  let details_hash = commit("coustom_room_details", coustom_room_details);
  //debug("details_hash: " + details_hash);
  commit("coustom_room_link", { Links: [{ Base: uuid_hash, Link: details_hash, Tag: "room_details" }] });

  addMembers(uuid, members);

  return uuid;
}

//TODO : Test for non creator of the room adding a member in the room
//Adds Members to a room using the UUID of the room
function addMembers(uuid: string, members: string[]) {
  let uuid_hash: string = makeHash("coustom_room_uuid", uuid);
  members.forEach((member) => {
    try {
      commit("room_to_member_link", { Links: [{ Base: uuid_hash, Link: member, Tag: "room_members" }] });
    } catch (e) {
      debug(e)
      return e
    }
    commit("member_to_room_link", { Links: [{ Base: member, Link: uuid_hash, Tag: "my_rooms" }] });
  });
}

//Returns the rooms that you are part of 
function getMyRooms() {
  let my_rooms: any;
  try {
    my_rooms = getLinks(App.Key.Hash, "my_rooms", { Load: true });
  } catch (e) {
    return e;
  }
  debug("My Room Chats : " + JSON.stringify(my_rooms));
  let return_my_rooms: string[] = my_rooms.map((room) => {
    return room.Entry
  });
  debug("UUID's: " + JSON.stringify(return_my_rooms));
  return return_my_rooms;
}

// Call to get all the member for a perticual UUID
function getMembers(uuid: string): string[] {
  let members: any;
  try {
    members = getLinks(makeHash("coustom_room_uuid", uuid), "room_members", { Load: true });
  } catch (e) {
    return e;
  }
  debug("Members for " + uuid + ": " + JSON.stringify(members));
  return members;
}

// Call to get details for a perticual UUID
function getRoomDetails(uuid: string): string[] {
  let details: any;
  try {
    details = getLinks(makeHash("coustom_room_uuid", uuid), "room_details", { Load: true });
  } catch (e) {
    return e;
  }
  debug("Room Details for " + uuid + ": " + JSON.stringify(details));
  return details;
}

//------------------------------
// Helper Functions
//------------------------------

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
// -----------------------------------------------------------------
//  The Genesis Function https://developer.holochain.org/genesis
// -----------------------------------------------------------------

function genesis() {
  return true;
}

// -----------------------------------------------------------------
//  Validation functions for every change to the local chain or DHT
// -----------------------------------------------------------------

function validateCommit(entryName, entry, header, pkg, sources) {
  debug("entry_type:" + entryName + "entry" + JSON.stringify(entry) + "header" + JSON.stringify(header) + "PKG: " + JSON.stringify(pkg) + "sources" + sources);
  return validate(entryName, entry, header, pkg, sources);
}

function validate(entryName, entry, header, pkg, sources) {
  switch (entryName) {
    case "coustom_room_uuid":
      return true;
    case "coustom_room_details":
      return true;
    case "coustom_room_link":
      return true;
    case "room_to_member_link":
      return isValidAdmin(entry.Links[0].Base, sources);
    case "member_to_room_link":
      //isValidAdmin(entry);
      return true;
    default:
      return false;
  }
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
  //debug("UUID source" + source)
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
    member.Hash == entry_source
  });
  return access;
}

function validatePut(entryName, entry, header, pkg, sources) {
  return true;

}

function validateMod(entryName, entry, header, replaces, pkg, sources) {
  return false;
}

function validateDel(entryName, hash, pkg, sources) {
  return false;
}

function validateLink(entryName, baseHash, links, pkg, sources) {
  //debug("entryName: "+entryName+" baseHash: "+ baseHash+" links: "+ links+" sources: "+ sources);
  switch (entryName) {
    case "coustom_room_link":
      return true;
    case "room_to_member_link":
      return true;
    case "member_to_room_link":
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
