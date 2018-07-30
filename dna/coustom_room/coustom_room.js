//------------------------------
// Public Functions
//------------------------------
// Creates new rooms when users decides to start a conversation
//@param members : list of members Public.Hash
function createCoustomRoom(members) {
    members.push(App.Key.Hash);
    var uuid = uuidGenerator();
    var coustom_room_details = {
        name: uuid
    };
    debug("Your Room UUID: " + uuid);
    var uuid_hash = commit("coustom_room_uuid", uuid);
    //debug("uuid_hash: " + uuid_hash);
    commit("coustom_room_link", { Links: [{ Base: App.DNA.Hash, Link: uuid_hash, Tag: "room_uuid" }] });
    var details_hash = commit("coustom_room_details", coustom_room_details);
    //debug("details_hash: " + details_hash);
    commit("coustom_room_link", { Links: [{ Base: uuid_hash, Link: details_hash, Tag: "room_details" }] });
    addMembers(uuid, members);
    return uuid;
}
//Adds Members to a room using the UUID of the room
function addMembers(uuid, members) {
    var uuid_hash = makeHash("coustom_room_uuid", uuid);
    members.forEach(function (member) {
        //commit("coustom_room_members",member);
        commit("coustom_room_link", { Links: [{ Base: uuid_hash, Link: member, Tag: "room_members" }] });
    });
    //debug(JSON.stringify(getLinks(uuid_hash,"room_members")))
}
// Call to get all the member for a perticual UUID
function getMembers(uuid) {
    var members;
    try {
        members = getLinks(makeHash("coustom_room_uuid", uuid), "room_members", { Load: true });
    }
    catch (e) {
        return e;
    }
    debug("Members for " + uuid + ": " + JSON.stringify(members));
    return members;
}
// Call to get details for a perticual UUID
function getRoomDetails(uuid) {
    var details;
    try {
        details = getLinks(makeHash("coustom_room_uuid", uuid), "room_details", { Load: true });
    }
    catch (e) {
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
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
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
    //debug("entry_type:" + entryName + "entry" + JSON.stringify(entry) + "header" + JSON.stringify(header) + "PKG: " + JSON.stringify(pkg) + "sources" + sources);
    return validate(entryName, entry, header, pkg, sources);
}
function validate(entryName, entry, header, pkg, sources) {
    switch (entryName) {
        case "coustom_room_uuid":
            return true;
        case "coustom_room_link":
            return true;
        case "coustom_room_details":
            return true;
        default:
            return false;
    }
}
function validatePut(entryName, entry, header, pkg, sources) {
    return validate(entryName, entry, header, pkg, sources);
}
function validateMod(entryName, entry, header, replaces, pkg, sources) {
    return false;
}
function validateDel(entryName, hash, pkg, sources) {
    return false;
}
function validateLink(entryName, baseHash, links, pkg, sources) {
    switch (entryName) {
        case "coustom_room_link":
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
