// Get list of posts in a Space
function listMessages(room) {
  var messages = getLink(room, "message",{Load:true});
  if( messages instanceof Error ) {
    return []
  } else {
    messages = messages.Links
    var return_messages = new Array(messages.length);
    for( i=0; i<messages.length; i++) {
      return_messages[i] = JSON.parse(messages[i]["E"])
      return_messages[i].id = messages[i]["H"]
      var author_hash = get(messages[i]["H"],{GetMask:HC.GetMask.Sources})[0]
      var agent_profile_link = getLink(author_hash, "profile", {Load: true})
      return_messages[i].author = JSON.parse(agent_profile_link.Links[0].E)
    }
    return return_messages
  }
}
// TODO Replace edited posts. Drop deleted/invalidated ones.


// Create a new post in a Space / Channel
// receives content, room, [inReplyTo]
function newMessage(x) {
    x.timestamp = new Date();
    var key = commit("message", x);
    commit("room_message_link",{Links:[{Base:x.room,Link:key,Tag:"message"}]})
debug(x.content);
debug("Starting HASHtag search");
  //  var hashtag=[];
    hashTag_List=detectHashtag(x.content);
  //  var a=hashtag[0];

     if (hashTag_List != null){
      debug(hashTag_List);
      debug("Hashtag found::");
      searchHashTag(hashTag_List,x);
      debug("HASHTAGE SAVED");
  }
  else {debug("Hashtag not found");}
  return key
}
//TODO create hashtags;
function findingHashTags(){}

//TODO Search A Hashtag in the DHS

function searchHashTag(hashTag_List,post)
{
 for (var i = 0; i < hashTag_List.length; i++)
 {
//   debug("SEARCHING :");
data=getHashTag(hashTag_List[i]);
debug("Data"+data);

  if (data != "") {
    debug("HASHTAG matched IN DHT");

    linkHashTags(hashTag_List[i],post); //follow)() changed
    debug("linkHashTags done");
  }else {
    debug("HASHTAG no match found");
    createHashTag(hashTag_List[i],post);
  }
//TODO add this METHORD
}
}
//This Methord can be used to find the post linked to the Hashtags.
//Gets the post linked to the hashTag
function getPostsByTag(hashTag) {
    // From the DHT, gets all "post" metadata entries linked from this userAddress
    var posts = [];
debug("Searching the post entered");
    author=makeHash(hashTag);
      debug("Hashtags="+hashTag+" makeHash="+author);
      var authorPosts = doGetTagLinkLoad(author,"tag_post");
        // add in the author
        //  debug("authorPosts ::"+posts);
        for(var j=0;j<authorPosts.length;j++) {
            var post = authorPosts[j];
            post.hashTag = hashTag;
            posts.push(post);
        }
        debug("Retrning ::"+posts);
        debug("Retrning posts ::"+JSON.stringify(posts));
    return posts;
}

function doGetTagLinkLoad(base, tag) {
    // get the tag from the base in the DHT
    var links = getLink(base, tag,{Load:true});
    if (isErr(links)) {
      debug("isErr");
        links = [];
    } else {

       links = links.Links;
    }
    var links_filled = [];
    for (var i=0;i <links.length;i++) {
        var link = {H:links[i].H};
        link[tag] = links[i].E;
        links_filled.push(link);
    }
    debug("Links Filled:"+JSON.stringify(links_filled));
    return links_filled;
}
function linkHashTags(hashtag,post)
{
//  getLink(hashTag_Address,"tag_post",{Load:false};
var hashtagHash = makeHash(hashtag);
/*var Entrys = get(hashtagHash,{GetMask:HC.GetMask.Entry});
var Default=   get(hashtagHash,{GetMask:HC.GetMask.Default});
var EntryType=get(hashtagHash,{GetMask:HC.GetMask.EntryType});
var All= get(hashtagHash,{GetMask:HC.GetMask.All});
*/var key = commit("tag_post",post);
  commit("tag_post_links",{Links:[{Base:hashtagHash,Link:key,Tag:"tag_post"}]});
  debug("tag_post_links done: "+JSON.stringify(getLink(hashtagHash,"tag_post",{Load:true})));

}

//TODO check this METHORD
function createHashTag(hashTag,post)
{
//  debug("ADDING NEW Hanstags:");
  addHashTag(hashTag);
  // debug("CREATING HASHTAG COMPLETE")

   data=getHashTag(hashTag);
   debug("Data"+data);

   if (data != "") {
    debug("HASHTAG FOUND IN DHT");
    linkHashTags(hashTag,post); //follow)() changed
    }
    else {
      var a=hashTag;
      debug("HASHTAG Again not found");
  //    debug("CREATING Again HASHTAG COMPLETE")
      createHashTag(a,post);

      }

}
//Creating a HASHTAGS
function addHashTag(hashTag)
{
  debug(hashTag);
  debug(typeof hashTag);
  var hashtag_hash =commit("hashTag",hashTag);
//  var hashtag_hash=makeHash(hashTag);
  var me = getMe();
  var directory = getDirectory();

  debug(hashTag+" is "+hashtag_hash);

  commit("hashTag_links", {Links:[{Base:me,Link:hashtag_hash,Tag:"hashTag"}]});
  //commit("hashTag_links", {Links:[{Base:directory,Link:hashtag_hash,Tag:"hashTag"}]});

  debug("hashTag_links: "+JSON.stringify(getLink(me,"hashTag",{Load:true})));
  //debug("hashTag_links "+JSON.stringify(getLink(directory,"hashTag",{Load:true})));
}
function getMe() {return App.Agent.Hash;}
function getDirectory() {return App.DNA.Hash;}
function isErr(result) {return ((typeof result === 'object') && result.name == "HolochainError");}
//Detects the HashTag in the messages that were posted;
function detectHashtag(message_content)
{
  var regexp = /\B\#\w\w+\b/g;
  hashTag_List = String(message_content).match(regexp);
  if (hashTag_List != null){return hashTag_List;}
  else{return null;}
  return hashTag_List;
}
//Used to search for the hashTag
function getHashTag(hashtag)     //Just return the source of the hashTag
{
    var directory = getDirectory();
    var hashtagHash = makeHash(hashtag);
    var sources = get(hashtagHash,{GetMask:HC.GetMask.Sources});
debug("SOURCES:: "+ sources);
for(var i=0;i<sources.length;i++)
debug("SOURCES::"+i+"= "+sources[i]);
    if (isErr(sources)) {sources = [];}
    if (sources != undefined) {
        var n = sources.length -1;
        return (n >= 0) ? sources[n] : "";
    }
    return "";
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
    var registered_users = getLink(App.DNA.Hash, "registered_users",{Load:true});
    debug("Registered users are: "+JSON.stringify(registered_users));
    if( registered_users instanceof Error ) return false;
    registered_users = registered_users.Links
    for(var i=0; i < registered_users.length; i++) {
        var profile = JSON.parse(registered_users[i]["E"])
        debug("Registered user "+i+" is " + profile.username)
        if( profile.agent_id == author) return true;
    }
    return false;
}

function isValidRoom(room) {
    debug("Checking if "+room+" is a valid...")
    var rooms = getLink(App.DNA.Hash, "room",{Load:true});
    debug("Rooms: " + JSON.stringify(rooms))
  if( rooms instanceof Error ){
      return false
  } else {
    rooms = rooms.Links
    for( i=0; i<rooms.length; i++) {
      if( rooms[i]["H"] == room) return true
    }
    return false
  }
}

function genesis() {
    debug("HoloChat App Starting...")
  return true;
}


function validatePut(entry_type,entry,header,pkg,sources) {
debug("Validating Put:");
    return validate(entry_type,entry,header,sources);
}
function validateCommit(entry_type,entry,header,pkg,sources) {
debug("Validating commit:");
    return validate(entry_type,entry,header,sources);
}
// Local validate an entry before committing ???
function validate(entry_type,entry,header,sources) {
debug("Validate");
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
debug("Validating link:");
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
