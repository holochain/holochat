// Create a new post in a Space / Channel
//@param x={acccess:"public|private","message":{room_name:"",content:{text:"",mediaLink:""}}}
function newMessage(x) {
  if(x.access=="public"){
    return postPublicMessage(x);
  }else if(x.access=="private"){
    return postPrivateMessage(x);
  }else {
    return ("ERROR Invalid Access: "+x.access);
  }
}

function postPrivateMessage(x){
  x.message.timestamp = new Date();
  x.message.author=App.Agent.Hash;
   var key;
   try{
     if(anchorExists("Private_Room",x.message.room_name)=="true"){
         key = commit("message", x.message);
         commit("private_message_links",{Links:[{Base:anchor("Private_Room",x.message.room_name),Link:key,Tag:"messages"}]});
       }else{
         return "ERROR: Room "+x.message.room_name+" doesn't exist";
       }
     }catch(e){
     return e;
   }
// TODO - INDEXING #HASHTAG
debug("--------------------->"+key)
  return key;
}

function postPublicMessage(x){
  x.message.timestamp = new Date();
  x.message.author=App.Agent.Hash;
   var key;
   try{
        if(anchorExists("Room",x.message.room_name)=="true"){
         key = commit("message", x.message);
         commit("message_links",{Links:[{Base:anchor("Room",x.message.room_name),Link:key,Tag:"messages"}]});
       }else{
         return "ERROR: Room "+x.message.room_name+" doesn't exist";
       }
      }catch(e){
     return e;
   }
// TODO INDEXING -#HASHTAGE
//  debug("Starting HASHtag search");
//  call("hashtag","callingHashTag",x);
return key;
}

//Get Messages for a Rooms
//@param x={room_name:"","access":"public | private"}
function getMessages(x){
  if(x.access=="public"){
    return getPublicMessages(x);
  }
  else if (x.access=="private"){
    return getPrivateMessages(x);
  }
  else {
    return "ERROR: Invalid Access for room "+x.access;
  }

}

function getPrivateMessages(x){
  if(isValidPrivateProfile(anchor("Private_Room",x.room_name)))
  {
    if(anchorExists("Private_Room",x.room_name)=="true"){
    try{
      messages=getLinks(anchor("Private_Room",x.room_name),"messages",{Load:true});
    }catch(e){
      return e;
    }
    //debug("Messages::"+JSON.stringify(messages))
    var return_messages=[];
    messages.forEach(function (element){
      var tempMessage={Hash:"",Entry:""};
      tempMessage.Hash=element.Hash;
      tempMessage.Entry=element.Entry
      return_messages.push(tempMessage);
    });
    //debug("Return_messages::"+JSON.stringify(return_messages))
    return return_messages;
    }
    return [];
  }
  else{
    return "ERROR: Not A Member of the Room : "+x.room_name;
  }
}

function getPublicMessages(x){
  if(anchorExists("Room","")=="true"){
  try{
    messages=getLinks(anchor("Room",x.room_name),"messages",{Load:true});
  }catch(e){
    return e;
  }
  //debug("Messages::"+JSON.stringify(messages))
  var return_messages=[];
  messages.forEach(function (element){
    var tempMessage={Hash:"",Entry:""};
    tempMessage.Hash=element.Hash;
    tempMessage.Entry=element.Entry
    return_messages.push(tempMessage);
  });
  debug("Return_messages::"+JSON.stringify(return_messages))
  return return_messages;
  }
  return [];
}

// Edit a post (create new one which "replaces" the old)
// receives message like in newMessage and old_message's hash
//@param: x:{new_message:{},old_Hash:""}
function updateMessage(x) {
    debug(x);
    x.new_message.timestamp=new Date();
    x.author=App.Agent.Hash;
    key=update("message",x.new_message,x.old_Hash);
    return key
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


/********** Validation Functions *************/

function isValidPrivateProfile(room_base){
  try{
    members = getLinks(room_base, "members",{Load:true});
    var i_Am_A_Member=false;
    members.forEach(function (element){
      if(element.Hash==App.Agent.Hash){
        i_Am_A_Member=true;
      }
    });
  }catch(e){
    return false;
  }
  if(i_Am_A_Member)
      return true;
  else
    return false;
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

function isValidPrivateRoom(room) {
  debug("Checking if "+room+" is a valid...")
  var rooms = getLinks(anchor("Private_Room",""), "",{Load:true});
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

function isAllowed(author) {
    debug("Checking if "+author+" is a registered user...")
    var registered_users = getLinks(anchor("Profiles",""), "registered_users",{Load:true});
    //debug("Registered users are: "+JSON.stringify(registered_users));
    if( registered_users instanceof Error ) return false;
    for(var i=0; i < registered_users.length; i++) {
        var profile = registered_users[i].Entry
        debug("Registered user "+i+" is " + profile.username)
        if( profile.agent_id == author) return true;
    }
    return false;
}

function isValidRoomBase(room_base){
  debug("Checking if "+room_base+" is a valid Room Base...")
  var rooms = getLinks(anchor("Room",""), "",{Load:true});
  //debug("Rooms: " + JSON.stringify(rooms))
  if( rooms instanceof Error ){
    return false
  } else {
    for( i=0; i<rooms.length; i++) {
      if( rooms[i].Hash === room_base){
        //ebug("isValidRoomBase: "+rooms[i].Hash +" "+ room_base)
        return true
      }
    }
  return false
  }
}
function isValidPrivateRoomBase(room_base){
  debug("Checking if "+room_base+" is a valid Private Room Base...")
  var rooms = getLinks(anchor("Private_Room",""), "",{Load:true});
  //debug("Rooms: " + JSON.stringify(rooms))
  if( rooms instanceof Error ){
    return false
  } else {
    for( i=0; i<rooms.length; i++) {
      if( rooms[i].Hash === room_base){
        //debug("isValidRoomBase: "+rooms[i].Hash +" "+ room_base)
        return true
      }
    }
  return false
  }
}
function genesis() {
    debug("HoloChat App Starting...")
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
debug("entry_type:"+entry_type+"entry"+JSON.stringify(entry)+"header"+header+"sources"+sources);
    if (entry_type == "message_links") {
    return isValidRoomBase(entry.Links[0].Base);
    }
    if (entry_type == "private_message_links") {
    return isValidPrivateRoomBase(entry.Links[0].Base);
    }
    if( !isAllowed(sources[0]) ){
    return false;
     }
    if( !isValidRoom(entry) ) {
    //    debug("entry_type::"+entry_type+"entry"+entry+"header"+header+"sources"+sources);
        debug("message not valid because room "+entry.room_name+" does not exist");
        return false;
    }
    return true
}

function validateLink(linkingEntryType,baseHash,linkHash,tag,pkg,sources){
    // this can only be "message_links" type which is linking from room to message
    debug("LinkingEntry_type:"+linkingEntryType+" baseHash:"+baseHash+" linkHash:"+linkHash+" tag:"+tag+" pkg:"+pkg+" sources:"+sources);
    if(linkingEntryType=="message_links")
    return isValidRoomBase(baseHash);
    if(linkingEntryType=="private_message_links"){
      if(isValidPrivateRoomBase(baseHash) && isValidPrivateProfile(baseHash))
        return true;
    return false;
    }

    if(linkingEntryType="hashTag_links")
    return true;
    if(linkingEntryType="tag_post_links")
    return true;

    return true;
}
function validateMod(entry_type,hash,newHash,pkg,sources) {
  debug("MODIFIED: entry_type: "+entry_type+" hash: "+JSON.stringify(hash)+" newHash: "+JSON.stringify(newHash)+" pkg: "+pkg+" sources: "+JSON.stringify(sources));
  // var valid = false
  // if (entry_type === "message") {
  //   var orig_sources = get(newHash, { GetMask: HC.GetMask.Sources })
  //   // Note: error checking on this is removed for simplicity
  //   valid = (orig_sources.length === 1 && orig_sources[0] == sources[0])
  // }
  // return valid

  return true;
}
function validateDel(entry_type,hash,pkg,sources) {return false;}
function validatePutPkg(entry_type) {return null}
function validateModPkg(entry_type) { return null}
function validateDelPkg(entry_type) { return null}
function validateLinkPkg(entry_type) { return null}
