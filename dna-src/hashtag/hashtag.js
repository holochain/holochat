function callingHashTag(x)
{
  //hashTag_List=  call("hashtag","detectHashtag",x.content);
//  debug("x.content:  "+x.content);
    hashTag_List=detectHashtag(x.content);
    debug(hashTag_List);
     if (hashTag_List != null){
      debug("Hashtag found::"+hashTag_List);
      searchHashTag(hashTag_List,x);
    //  call ("hashtag","searchHashTag",{hashTag_List:hashTag_List,x:x});
      debug("HASHTAGE SAVED");
  }
  else {debug("Hashtag not found");}

}

/*************
CODE using the anchor Zomes
********/
function genesis(){
  //call("anchor","anchor_type_create","hashTag");
  return true;
}

//TODO check this METHORD
function createHashTag(hashTag,post)
{
  debug("ADDING NEW Hanstags:");
  addHashTag(hashTag);
   debug("CREATING HASHTAG COMPLETE")

   data=getHashTag(hashTag);
   debug("Data"+data);

   if (data != "") {
    debug("HASHTAG FOUND IN DHT");
   linkHashTags(hashTag,post); //follow)() changed
    }
    else {
      var a=hashTag;
      debug("HASHTAG Again not found");
     debug("CREATING Again HASHTAG ")
     createHashTag(a,post);

      }

}

//Linking a Post to a hashTag
function linkHashTags(hashtag,post)
{
  var hashTag={Anchor_Type:"hashTag",Anchor_Text:hashtag};
  var hashtagHash = makeHash(hashTag);
  var key = commit("tag_post",post);
  commit("tag_post_links",{Links:[{Base:hashtagHash,Link:key,Tag:"tag_post"}]});
  debug("tag_post_links done: "+JSON.stringify(getLinks(hashtagHash,"tag_post",{Load:true})));

}


//Creating a HASHTAGS
function addHashTag(hashTag)
{
//  debug(hashTag);
  var hashTag_anchor={Anchor_Type:"hashTag",Anchor_Text:hashTag};
  var pass=call("anchor","anchor_create",hashTag_anchor);

}




function searchHashTag(hashTag_List,post)
{
  for (var i = 0; i < hashTag_List.length; i++)
  {
   debug("SEARCHING :");
 data=getHashTag(hashTag_List[i]);
 debug("Data"+data);

   if (data != "") {
     debug("HASHTAG matched IN DHT");

     linkHashTags(hashTag_List[i],post);
     debug("linkHashTags done");
   }else {
     debug("HASHTAG no match found");
     createHashTag(hashTag_List[i],post);
   //  addHashTag(hashTag_List[i],post);
   }
   getPostsByTag(hashTag_List[i]);
 }
}
//Used to search if the hashTag exist in the DHT
//IF it doesnt it return empty
//Else it returns the source
function getHashTag(hashtag)     //Just return the source of the hashTag
{
  //  var directory = getDirectory();
  debug("ENtered getHashTag");
  //getAnchorTypeHash(hashTag);
//  var hashtagHash=call("anchor","getHashAnchorType",hashtag)
//debug("hashtagHash:: "+hashtagHash)
var hashTag_h={Anchor_Type:"hashTag",Anchor_Text:hashtag};
var hashtagHash=JSON.stringify(hashTag_h);
hashtagHash=makeHash(hashtagHash);

  //  var hashtagHash = makeHash(hashtag);
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

/*****
Return the post linked to the hashTag
*****/

//This Methord can be used to find the post linked to the Hashtags.
//Gets the post linked to the hashTag
function getPostsByTag(hashTag) {
    // From the DHT, gets all "post" metadata entries linked from this userAddress
    var posts = [];
    debug("Searching for the post linked to the HashTag");
    hashTag={Anchor_Type:"hashTag",Anchor_Text:hashTag};
    hashtag_hash=makeHash(hashTag);
    var authorPosts = doGetTagLinkLoad(hashtag_hash,"tag_post");
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
    var links = getLinks(base, tag,{Load:true});
    if (isErr(links)) {
      debug("isErr");
        links = [];
    }
    var links_filled = [];
    for (var i=0;i <links.length;i++) {
        var link = {Hash:links[i].Hash};
        link[tag] = links[i].E;
        links_filled.push(link);
    }
    debug("Links Filled:"+JSON.stringify(links_filled));
    return links_filled;
}
//Detects the HashTag in the messages that were posted;
function detectHashtag(message_content)
{
  var regexp = /\B\#\w\w+\b/g;
  hashTag_List = String(message_content).match(regexp);
  if (hashTag_List != null){return hashTag_List;}
  else{return null;}
  return hashTag_List;
}
function getMe() {return App.Agent.Hash;}
function getDirectory() {return App.DNA.Hash;}
function isErr(result) {return ((typeof result === 'object') && result.name == "HolochainError");}

/******
Validation
********/
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
      debug("Calling isAllowed");
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
