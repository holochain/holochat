// Set the User as the Admin himself
//@param : {room_name:""}
function setRoomAdmin(x){
  commit("admin_link",{Links:[{Base:anchor("Private_Room",x.room_name),Link:App.Agent.Hash,Tag:"admin"}]})
}

//@param : {room_name:""}
function getRoomAdmin(x){
  admin = getLinks(anchor("Private_Room",x.room_name), "admin",{Load:true});
  var return_admin;
  if(admin.length>=1){
    admin.forEach(function (element){
      return_admin=element.Hash;
    });
  }else{
    return "ERROR: invalid PRIVATE Room name";
  }

  return return_admin;
}

// TODO: 
//Can be changed to add Admins for more features
//@param : {room_name:"",agent_hash:""}
function addAdmin(x){
  commit("admin",{Links:[{Base:anchor("Private_Room",x.room_name),Link:x.agent_hash,Tag:"admin"}]})
}

// Get list of chat Users / Members
function listMembers() {return getLinks(App.DNA.Hash, "member",{Load:true});}

// Get list of chat Admins
function listAdmins() {return getLinks(App.DNA.Hash, "admin",{Load:true});}

// Authorize a new agent_id to participate in this holochain
// agent_id must match the string they use to "hc init" their holochain, and is currently their email by convention
function addMember(x) {
    commit("membership",{Links:[{Base:App.DNA.Hash,Link:x,Tag:"member"}]})
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

function isValidAdmin(entry_type,entry,header,sources){
  if(sources==App.Key.Hash){
    debug("Admin is Valid:"+sources)
    return true;
  }
  else {
    debug("ERROR: Admin is not valid : "+sources)
    return false;
  }
}

function isValidRoom(room) {
  debug("Checking if "+room+" is a valid...")
  var rooms = getLinks(anchor("Room",""), "",{Load:true});
    ///debug("Rooms: " + JSON.stringify(rooms))
  if( rooms instanceof Error ){
      return false
  } else {
    for( i=0; i<rooms.length; i++) {
      if( rooms[i].Entry.anchorText === room.room_name)
      debug("Room "+room.room_name+"is Valid . . ")
      return true
    }
    return false
  }
  return true;
}

// Initialize by adding agent to holochain
function genesis() {
    //commit("membership",{Links:[{Base:App.DNA.Hash,Link:App.Agent.Hash,Tag:"member"}]})
    //commit("membership",{Links:[{Base:App.DNA.Hash,Link:App.Agent.Hash,Tag:"room"}]})
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
  //debug("entry_type:"+entry_type+"entry"+JSON.stringify(entry)+"header"+header+"sources"+sources);
  if (entry_type == "admin_link") {
    return isValidAdmin(entry_type,entry,header,sources);
  }
  return true;
}

function validateLink(linkingEntryType,baseHash,linkHash,tag,pkg,sources){
  //debug("LinkingEntry_type:"+linkingEntryType+" baseHash:"+baseHash+" linkHash:"+JSON.stringify(linkHash)+" tag:"+tag+" pkg:"+pkg+" sources:"+sources);
  if(linkingEntryType=="admin_link")
  return isValidRoom(baseHash);
  else{
    return false;
  }

}
function validateMod(entry_type,hash,newHash,pkg,sources) {return true;}
function validateDel(entry_type,hash,pkg,sources) {return true;}
function validatePutPkg(entry_type) {return null}
function validateModPkg(entry_type) { return null}
function validateDelPkg(entry_type) { return null}
function validateLinkPkg(entry_type) { return null}
