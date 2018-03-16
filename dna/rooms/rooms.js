// Get list of chat Spaces / Rooms / Channels
function listRooms() {
    var rooms = getLinks(App.DNA.Hash, "room",{Load:true});
    debug("Rooms: " + JSON.stringify(rooms))
    if( rooms instanceof Error ){
        return []
    } else {
        var return_rooms = new Array(rooms.length);
        for( i=0; i<rooms.length; i++) {
            return_rooms[i] = rooms[i].Entry
            return_rooms[i].id = rooms[i].Hash
        }
        return return_rooms
    }
}

// Create a new chat Space / Channel
function newRoom(x) {
    var key = commit("room", x);
    commit("room_links",{Links:[{Base:App.DNA.Hash,Link:key,Tag:"room"}]})
    return key
}

function isAllowed(author) {
    debug("Checking if "+author+" is a registered user...");
    debug(JSON.stringify(App));

    var registered_users = getLinks(App.DNA.Hash, "registered_users",{Load:true});
    debug("Registered users are: "+JSON.stringify(registered_users));
    if( registered_users instanceof Error ) return false;
    for(var i=0; i < registered_users.length; i++) {
        var profile = registered_users[i].Entry;
        debug("Registered user "+i+" is " + profile.username);
        if( profile.agent_id == author) return true;
    }
    return false;
}

function genesis() {
    return true;
}

function validatePut(entry_type,entry,header,pkg,sources) {
    return validate(entry_type,entry,header,sources);
}
function validateCommit(entry_type,entry,header,pkg,sources) {
    return validate(entry_type,entry,header,sources);
}
// Local validate an entry before committing ???
function validate(entry_type,entry,header,sources) {
    return isAllowed(sources[0]);
}

function validateLink(linkingEntryType,baseHash,linkHash,tag,pkg,sources){return true}
function validateMod(entry_type,hash,newHash,pkg,sources) {return true;}
function validateDel(entry_type,hash,pkg,sources) {return true;}
function validatePutPkg(entry_type) {return null}
function validateModPkg(entry_type) { return null}
function validateDelPkg(entry_type) { return null}
function validateLinkPkg(entry_type) { return null}
