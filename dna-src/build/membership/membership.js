// Authorize a new agent_id to participate in this holochain
// agent_id must match the string they use to "hc init" their holochain, and is currently their email by convention
//@param : {room_name:"",agent_hash:"",agent_key:""}
function addMember(x) {
    key = commit("membership_link", { Links: [{ Base: anchor("Private_Room", x.room_name), Link: x.agent_hash, Tag: "members" }] });
    send(x.agent_key, { "type": "add_private_rooms", "room_name": x.room_name });
    return key;
}
//@param : {room_name:""}
function getMembers(x) {
    if (anchorExists("Private_Room", x.room_name)) {
        members = getLinks(anchor("Private_Room", x.room_name), "members", { Load: true });
        var return_members;
        var i_Am_A_Member = false;
        members.forEach(function (element) {
            if (element.Hash == App.Agent.Hash)
                i_Am_A_Member = true;
            return_members = element.Hash;
        });
        if (i_Am_A_Member) {
            return return_members;
        }
        else {
            return "ERROR: You are not a Member of " + x.room_name;
        }
    }
    else {
        return "ERROR: invalid PRIVATE Room name " + x.room_name;
    }
}
function receive(from, msg) {
    var type = msg.type;
    if (type == "add_private_rooms") {
        return addRoomToMembersLocalChain({ "room_name": msg.room_name });
    }
    return "unknown type";
}
// TODO: Needs validation - Check if uses is a member of the room
//@param : room_name:"
function addRoomToMembersLocalChain(x) {
    debug("Addign Private Room to Local Chain: " + x.room_name);
    key = commit("local_private_room", x.room_name);
    commit("local_membership_link", { Links: [{ Base: App.Agent.Hash, Link: key, Tag: "my_private_rooms" }] });
    return key;
}
/*----------  Anchor API  ----------*/
function anchor(anchorType, anchorText) {
    return call('anchors', 'anchor', {
        anchorType: anchorType,
        anchorText: anchorText
    }).replace(/"/g, '');
}
function anchorExists(anchorType, anchorText) {
    return call('anchors', 'exists', {
        anchorType: anchorType,
        anchorText: anchorText
    });
}
/*----------Validation Functions-----------*/
function isRegisteredAdmin(entry_type, entry, header, sources) {
    admins = getLinks(entry.Links[0].Base, "admin", { Load: true });
    for (i = 0; i < admins.length; i++) {
        debug(sources + " == " + admins[i].Source);
        if (sources == admins[i].Source) {
            debug("Valid Registered User : " + admins[i].Source);
            return true;
        }
    }
    return false;
}
function isValidRoom(room) {
    debug("Checking if " + room + " is a valid...");
    var rooms = getLinks(anchor("Room", ""), "", { Load: true });
    ///debug("Rooms: " + JSON.stringify(rooms))
    if (rooms instanceof Error) {
        return false;
    }
    else {
        for (i = 0; i < rooms.length; i++) {
            if (rooms[i].Entry.anchorText === room.room_name)
                debug("Room " + room.room_name + "is Valid . . ");
            return true;
        }
        return false;
    }
    return true;
}
// Initialize by adding agent to holochain
function genesis() {
    //commit("membership",{Links:[{Base:App.DNA.Hash,Link:App.Agent.Hash,Tag:"member"}]})
    //commit("membership",{Links:[{Base:App.DNA.Hash,Link:App.Agent.Hash,Tag:"room"}]})
    return true;
}
function validatePut(entry_type, entry, header, pkg, sources) {
    return validate(entry_type, entry, header, sources);
}
function validateCommit(entry_type, entry, header, pkg, sources) {
    return validate(entry_type, entry, header, sources);
}
// Local validate an entry before committing ???
function validate(entry_type, entry, header, sources) {
    debug("entry_type:" + entry_type + "entry" + JSON.stringify(entry) + "header" + header + "sources" + sources);
    if (entry_type == "membership_link") {
        return isRegisteredAdmin(entry_type, entry, header, sources);
    }
    if (entry_type == "local_private_room") {
        return true;
    }
    return true;
}
function validateLink(linkingEntryType, baseHash, linkHash, tag, pkg, sources) {
    debug("LinkingEntry_type:" + linkingEntryType + " baseHash:" + baseHash + " linkHash:" + JSON.stringify(linkHash) + " tag:" + tag + " pkg:" + pkg + " sources:" + sources);
    if (linkingEntryType == "membership_link")
        return isValidRoom(baseHash);
    if (linkingEntryType == "local_membership_link")
        return true;
    return false;
}
function validateMod(entry_type, hash, newHash, pkg, sources) { return true; }
function validateDel(entry_type, hash, pkg, sources) { return true; }
function validatePutPkg(entry_type) { return null; }
function validateModPkg(entry_type) { return null; }
function validateDelPkg(entry_type) { return null; }
function validateLinkPkg(entry_type) { return null; }
//# sourceMappingURL=membership.js.map