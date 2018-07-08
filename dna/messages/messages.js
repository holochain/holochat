// Create a new post in a Space / Channel
//@param x={room_name:"",content:{text:"",mediaLink:""}}
function newMessage(x) {
    x.timestamp = new Date();
    x.author=App.Agent.Hash;
     var key;
     try{
       key = commit("message", x);
       commit("message_links",{Links:[{Base:anchor("Room",x.room_name),Link:key,Tag:"messages"}]});
     }catch(e){
       return e;
     }
  // TODO INDEXING -hashTag
  //  debug("Starting HASHtag search");
  //  call("hashtag","callingHashTag",x);
  return key
}

//Get Messages for a Rooms
//@param x={room_name:""}
function getMessages(x){
  if(anchorExists("Room","")){
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
  debug("Checking if "+room_base+" is a valid...")
  var rooms = getLinks(anchor("Room",""), "",{Load:true});
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
    if (entry_type == "hashTag_links"||entry_type == "hashTag"||entry_type=="tag_post_links"||entry_type == "tag_post") {
      return true;
    }
    if (entry_type == "message_links") {
    return isValidRoomBase(entry.Links[0].Base);
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
return isValidRoom(baseHash);
if(linkingEntryType="hashTag_links")
return true;
if(linkingEntryType="tag_post_links")
return true;

return true;
}
function validateMod(entry_type,hash,newHash,pkg,sources) {return true;}
function validateDel(entry_type,hash,pkg,sources) {return false;}
function validatePutPkg(entry_type) {return null}
function validateModPkg(entry_type) { return null}
function validateDelPkg(entry_type) { return null}
function validateLinkPkg(entry_type) { return null}
