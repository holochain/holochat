// Get list of posts in a Space
function listMessages(room) {
  var messages
  try{
    messages= getLinks(room, "message",{Load:true});
  }catch(e){
    return e;
  }
    var return_messages = new Array(messages.length);
    for( i=0; i<messages.length; i++) {
      return_messages[i] = messages[i].Entry
      return_messages[i].id = messages[i].Hash
// Code For the DPKI to check if its Registered
      // var author_hash = get(messages[i].Hash,{GetMask:HC.GetMask.Sources})[0]
      // var agent_profile_link = getLinks(author_hash, "profile", {Load: true})
      //  return_messages[i].author = agent_profile_link[0].Entry
      //  arr=call("identity","hasRegisteredKey",return_messages[i].author.agent_hash)
      //      if(arr=="true"){
      //        arr="[Registered]"
      //      }else{
      //        arr="[Not Registered]"
      //      }
           arr="[]"
           return_messages[i].registered=arr


    }
    return return_messages

}
// TODO Replace edited posts. Drop deleted/invalidated ones.


// Create a new post in a Space / Channel
// receives content, room, [inReplyTo]
function newMessage(x) {
    x.timestamp = new Date();
    var key;
    try{
      key = commit("message", x);
      commit("room_message_link",{Links:[{Base:x.room,Link:key,Tag:"message"}]})
    }catch(e){
      return e;
    }
    debug("Starting HASHtag search");
    call("hashtag","callingHashTag",x);
  return key
}


// Edit a post (create new one which "replaces" the old)
// receives message like in newMessage and old_message's hash
function modMessage(x, old_message) {
    var key = commit("message", x);
    commit("room_message_link",{Links:[{Base:old_post,Link:key,Tag:"replacedBy"}]})
    return key
}

function isAllowed(author) {
    debug("Checking if "+author+" is a registered user...")
    var registered_users = getLinks(App.DNA.Hash, "registered_users",{Load:true});
    debug("Registered users are: "+JSON.stringify(registered_users));
    if( registered_users instanceof Error ) return false;
    for(var i=0; i < registered_users.length; i++) {
        var profile = registered_users[i].Entry
        debug("Registered user "+i+" is " + profile.username)
        if( profile.agent_id == author) return true;
    }
    return false;
}

function isValidRoom(room) {
    debug("Checking if "+room+" is a valid...")
    var rooms = getLinks(App.DNA.Hash, "room",{Load:true});
    debug("Rooms: " + JSON.stringify(rooms))
  if( rooms instanceof Error ){
      return false
  } else {
    for( i=0; i<rooms.length; i++) {
      if( rooms[i].Hash == room) return true
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
//debug("entry_type::"+entry_type+"entry"+entry+"header"+header+"sources"+sources);
    if (entry_type == "hashTag_links"||entry_type == "hashTag"||entry_type=="tag_post_links"||entry_type == "tag_post") {
      return true;
    }
    if (entry_type == "room_message_link") {
    return isValidRoom(entry.Links[0].Base);
    }
    if( !isAllowed(sources[0]) ){
    return false;
     }
    if( !isValidRoom(entry.room) ) {
    //    debug("entry_type::"+entry_type+"entry"+entry+"header"+header+"sources"+sources);
        debug("message not valid because room "+entry.room+" does not exist");
        return false;
    }

    return true
}

function validateLink(linkingEntryType,baseHash,linkHash,tag,pkg,sources){
    // this can only be "room_message_link" type which is linking from room to message
//debug("LinkingEntry_type:"+linkingEntryType+" baseHash:"+baseHash+" linkHash:"+linkHash+" tag:"+tag+" pkg:"+pkg+" sources:"+sources);
if(linkingEntryType=="room_message_link")
return isValidRoom(baseHash);
if(linkingEntryType="hashTag_links")
return true;
if(linkingEntryType="tag_post_links")
return true;

return true;
}
function validateMod(entry_type,hash,newHash,pkg,sources) {return false;}
function validateDel(entry_type,hash,pkg,sources) {return false;}
function validatePutPkg(entry_type) {return null}
function validateModPkg(entry_type) { return null}
function validateDelPkg(entry_type) { return null}
function validateLinkPkg(entry_type) { return null}
