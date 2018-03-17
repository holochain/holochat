function addAnchor(anchorType, anchorText){
  return call('anchors', 'addAnchor', {anchorType: anchorType, anchorText: anchorText})
}

function register(profile) {
    profile.agent_id = App.Key.Hash
    profile.agent_hash=App.Agent.Hash
    var key = commit('profile', profile);
    //commit('agent_profile_link', { Links:[{Base: addAnchor('user', profile.userName), Link: key, Tag: 'profile'}]})
    return key
}

function getProfile(x) {
    return get(x);
}

function myProfile(userName) {
    // var registered_users = getLinks(anchor('user', ''), 'registered_users', {Load:true});
    // if( registered_users instanceof Error ) return false
    // // debug('registration entry:'+JSON.stringify(registered_users))
    // var agent_id = App.Key.Hash
    // for(var i=0; i < registered_users.length; i++) {
    //     var profile = registered_users[i].Entry
    //     // debug('Registered user '+i+' is ' + profile.username)
    //     if( profile.agent_id == agent_id) return profile;
    // }
    var profile = getLinks(makeHash('user', {anchorType: 'user', anchorText: userName}), '')

    return false;
}

// Update profile information for an agent_id
function modProfile(x, old_profile) {
    var key = commit('profile', x);
    commit('registrations',{Links:[{Base:old_profile,Link:key,Tag:'replacedBy'}]})
    return key
}

function genesis() {


// {"DPKIPubKey": "QmbsfV4ZgK3E4XyHZaiar6FPUvqBaSgd93rVWPhPA5WKn3"} --> goes into agent.txt in start up

// where the hash key is the hash of the public key of the DPKI Id you wish to use in this app
// hcdev -agentID={"DPKIPubKey":"QmbsfV4ZgK3E4XyHZaiar6FPUvqBaSgd93rVWPhPA5WKn3"} web 4141

  return true;
}

function isSourcesOwnProfile(entry, sources) {
    return sources[0] == entry.agent_id;
}

function isRegistrationOnDNA(registration_entry) {
  // debug('registration entry:'+JSON.stringify(registration_entry));
  var links = registration_entry.Links;
  for(var i=0; i < links.length; i++) {
      var l = links[i]
      // debug('link: '+JSON.stringify(l))

      if (l.Base != App.DNA.Hash) {
          // debug('validation failed, expected reg base to be: '+App.DNA.Hash+' but was: '+l.Base)
          return false;
      }
  }
  return true;
}

function isLinkFromSource(entry, sources) {
  if(entry.Links.length != 1) {
    debug('validation failed, expected agent_profile_link to contain exactly one link')
    return false
  }

  if(entry.Links[0].Base != sources[0]) {
    debug('validation failed, expected agent_profile_link to link from the source')
    return false
  }

  return true
}

function validatePut(entry_type,entry,header,pkg,sources) {
    return validateCommit(entry_type,entry,header,pkg,sources)
}
function validateCommit(entry_type,entry,header,pkg,sources) {
  // registrations all must happen on the DNA
  if (entry_type == 'anchor') {
      return true
  }
    // registrations all must happen on the DNA
    if (entry_type == 'registrations') {
        return isRegistrationOnDNA(entry)
    }

    // can only link from my profile
    if (entry_type == 'agent_profile_link' ){
        return true //isLinkFromSource(entry, sources)
    }

    // nobody can add somebody elses profile
    return isSourcesOwnProfile(entry, sources);
}



function validateLink(linkingEntryType,baseHash,linkHash,pkg,sources){
    // can only link from my profile
    if (linkingEntryType == 'agent_profile_link' ){
        return baseHash == sources[0];
    }

    // registrations all must happen on the DNA
    if (linkingEntryType == 'registrations') {
        return baseHash == App.DNA.Hash
    }

    return true
}
function validateMod(entry_type,hash,newHash,pkg,sources) {return true;}
function validateDel(entry_type,hash,pkg,sources) {return true;}
function validatePutPkg(entry_type) {return null}
function validateModPkg(entry_type) { return null}
function validateDelPkg(entry_type) { return null}
function validateLinkPkg(entry_type) { return null}
