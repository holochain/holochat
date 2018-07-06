function register(x) {
    x.agent_id = App.Key.Hash
    x.agent_hash=App.Agent.Hash
    var key = commit("profile", x);
    var reg=commit("registration_link", {Links:[{Base:anchor("Profiles",""),Link:key,Tag:"registered_users"}]});
    return key;
}



function isRegistered() {
    var registered_users = getLinks(anchor("Profiles",""), 'registered_users',{Load:true})
    debug("Registered users are: "+JSON.stringify(registered_users));
    if( registered_users instanceof Error) return false;
    for(var i=0; i < registered_users.length; i++) {
        var profile = registered_users[i].Entry
        debug("Registered user "+i+" is " + profile.username)
        if( profile.agent_id == App.Key.Hash) return true;
    }
    return false;
}


// Get profile information for a user
function getProfile() {
    var registered_users = getLinks(anchor("Profiles",""), "registered_users",{Load:true});
    debug("registration entry:"+JSON.stringify(registered_users));
    if( registered_users instanceof Error ) return false
    for(var i=0; i < registered_users.length; i++) {
        var profile = registered_users[i].Entry
        debug("Registered user "+i+" is " + profile.username)
        if( profile.agent_id == App.Key.Hash) return profile;
    }
    return false;
}

// Update profile information for an agent_id
function updateProfile(x) {
    x.agent_id = App.Key.Hash
    x.agent_hash=App.Agent.Hash
    var oldHash = makeHash("profile",getProfile());
    if(oldHash==false){
      return "NotRegistered";
    }
    var key = update("profile", x, oldHash);
    return key;
}

function genesis() {
    return true;
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


/*----------- Validation Functions---------------*/


function isSourcesOwnProfile(entry, sources) {
    return sources[0] == entry.agent_id;
}

function isRegistrationOnDNA(registration_entry) {
  debug("registration entry:"+JSON.stringify(registration_entry));
  var links = registration_entry.Links;
  for(var i=0; i < links.length; i++) {
      var l = links[i]
      debug("link: "+JSON.stringify(l))
      var ActualBase=anchor("Profiles","");
      if (l.Base != ActualBase) {
          debug("validation failed, expected reg base to be: "+ActualBase+" but was: "+l.Base)
          return false;
      }
  }
  return true;
}


function validatePut(entry_type,entry,header,pkg,sources) {
    return validateCommit(entry_type,entry,header,pkg,sources)
}
function validateCommit(entry_type,entry,header,pkg,sources) {
    // registration_link all must happen on the DNA
    if (entry_type == "registration_link") {
        return isRegistrationOnDNA(entry)
    }

    // nobody can add somebody elses profile
    return isSourcesOwnProfile(entry, sources);
}

function validateLink(linkingEntryType,baseHash,linkHash,pkg,sources){
    // registration_link all must happen on the DNA
    if (linkingEntryType == "registration_link") {
        return baseHash == anchor("Profiles","")
    }

    return true
}
function validateMod(entry_type,hash,newHash,pkg,sources) {return true;}
function validateDel(entry_type,hash,pkg,sources) {return true;}
function validatePutPkg(entry_type) {return null}
function validateModPkg(entry_type) { return null}
function validateDelPkg(entry_type) { return null}
function validateLinkPkg(entry_type) { return null}
