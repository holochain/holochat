function genesis(){return true}

function bridgeGenesis(side,dna,appData){
  appDNAHash=getDpkiDNA()
  data=bridge(appDNAHash, "dpkiLib", "registerDpkiTo", App.Agent.Hash)
  debug("data = "+data)
  return true
}

function registerDpkiKeyTo(){
  appDNAHash=getDpkiDNA();
  debug("registerDpkiKeyTo = "+appDNAHash)
  data = bridge(appDNAHash, "dpkiLib", "registerDpkiKeyTo", App.Agent.Hash)
  debug("data = "+JSON.stringify(data))
  return data
}

function hasRegisteredKey(app_agent_id){
  debug("AGENT : "+app_agent_id)
  appDNAHash=getDpkiDNA();
  debug("hasRegisteredKey = "+appDNAHash)
  data = bridge(appDNAHash, "dpkiLib", "hasRegisteredKey",app_agent_id)
  debug("data = "+JSON.stringify(data))
  return data
}

function getUserDetails(app_agent_id){
  appDNAHash=getDpkiDNA();
  debug("getUserDetails = "+appDNAHash)
  data = bridge(appDNAHash, "dpkiLib", "getUserDetails", app_agent_id)
  debug("data = "+JSON.stringify(data))
  return data
}


/////////////////
// DPKI DNA Hash
////////////////
function getDpkiDNA(){
    bridges = getBridges();
    if (bridges[0] != undefined) {
        return bridges[0].ToApp
    } else {
        debug("identityZome: No bridge found!")
    }
    return ""
}
