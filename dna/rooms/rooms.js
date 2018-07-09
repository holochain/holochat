/*
The anchors for the Rooms are using anchor("Room",room.name) with tag : "room"

the Messages can be stored to the same anchor with a diffrent tag
*/

// Create a new chat Space / Channel
function newRoom(room) {
    var key

    if(room.access=="public"){
      try{
        key=commit("room", room);
        commit("room_links",{Links:[{Base:anchor("Room",room.name),Link:key,Tag:"room"}]})
      }catch(e){
        return (e);
      }
      return key;
    }else if (room.access=="private") {
      key=commit("room", room);
      commit("room_links",{Links:[{Base:anchor("Private_Room",room.name),Link:key,Tag:"room"}]})
      //Setting Creator as Admin;
      call("membership","setRoomAdmin",{"room_name":room.name});
      return key;
    }else {
      return "INVALID ACCESS:"+room.access;
    }

}

// Get list of Public chat Spaces / Rooms / Channels
//Can be Optimized
function getPublicRooms() {
  if(anchorExists("Room","")){
    var rooms_anchor = getLinks(anchor("Room",""), "",{Load:true});
    //debug("rooms_anchor: " + JSON.stringify(rooms_anchor))
    if( rooms_anchor instanceof Error ){
        return []
    } else {
        var return_rooms = new Array(rooms_anchor.length);
        return_rooms=[];
          for( i=0; i<rooms_anchor.length; i++) {
            if(rooms_anchor[i].Entry.anchorText!=""){
              rooms=getLinks(rooms_anchor[i].Hash,"room",{Load:true})
              //debug("getPublicRooms: "+JSON.stringify(rooms))
              return_rooms[i] = rooms[0].Entry
              return_rooms[i].id = rooms[0].Hash
            }
          }
        return return_rooms
    }
  }
  return [];
}

// Get list of Private chat Spaces / Rooms / Channels
//Should Not Provide this Functionality
/*
function getPrivateRooms() {
  if(anchorExists("Private_Room","")){
    var rooms_anchor = getLinks(anchor("Private_Room",""), "",{Load:true});
    // debug("rooms_anchor: " + JSON.stringify(rooms_anchor))
    if( rooms_anchor instanceof Error ){
        return []
    } else {
        var return_rooms = new Array(rooms_anchor.length);
        return_rooms=[];
          for( i=0; i<rooms_anchor.length; i++) {
            if(rooms_anchor[i].Entry.anchorText!=""){
              rooms=getLinks(rooms_anchor[i].Hash,"room",{Load:true})
              // debug("getPublicRooms: "+JSON.stringify(rooms))
              return_rooms[i] = rooms[0].Entry
              return_rooms[i].id = rooms[0].Hash
            }
          }
        return return_rooms
    }
  }
  return [];
}
*/
function getRoomByName(x){
  rooms=getLinks(anchor("Room",x.room_name),"room",{Load:true});
  return rooms[0].Entry;
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

function isAllowed(author) {
    debug("Checking if "+author+" is a registered user...");
    debug(JSON.stringify(App));

    var registered_users = getLinks(anchor("Profiles",""), "registered_users",{Load:true});
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
