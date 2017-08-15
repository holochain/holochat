function genesis(){return true}

function bridgeGenesis(){
  debug("bridgeGenesis Called")
  appDNAHash=getDpkiDNA()
  data=bridge(appDNAHash, "dpkiLib", "registerDpkiTo", App.Agent.Hash)
  debug("data = "+data)
  return true
}

function registerDpkiKeyTo(){
  appDNAHash=getDpkiDNA();
  debug("registerDpkiKeyTo = "+appDNAHash)
  data = bridge(appDNAHash, "dpkiLib", "registerDpkiKeyTo", App.Agent.Hash)
  debug("data = "+data)
  return data
}

function hasRegisteredKey(app_agent_id){
  appDNAHash=getDpkiDNA();
  debug("hasRegisteredKey = "+appDNAHash)
  data = bridge(appDNAHash, "dpkiLib", "hasRegisteredKey",app_agent_id)
  debug("data = "+data)
  return data
}

function getUserDetails(app_agent_id){
  appDNAHash=getDpkiDNA();
  debug("getUserDetails = "+appDNAHash)
  data = bridge(appDNAHash, "dpkiLib", "getUserDetails", app_agent_id)
  debug("data = "+data)
  return data
}


/////////////////
// DPKI DNA Hash
////////////////
function getDpkiDNA(){
  appDNAHash="QmXAn9Mr4fgStoJysri7UnttfaMqtBT5CW7FR82cZcaYRx"
  return appDNAHash
}
