function genesis(){return true}

function bridgeGenesis(){
  appDNAHash=getDpkiDNA()
  bridge(appDNAHash, "dpkiLib", "registerDpkiTo", App.Agent.Hash)
  return true
}

function registerDpkiKeyTo(){
  appDNAHash=getDpkiDNA();
  data = bridge(appDNAHash, "dpkiLib", "registerDpkiKeyTo", App.Agent.Hash)
  return data
}

function hasRegisteredKey(app_agent_id){
  appDNAHash=getDpkiDNA();
  data = bridge(appDNAHash, "dpkiLib", "hasRegisteredKey",app_agent_id)
  return data
}

function getUserDetails(app_agent_id){
  appDNAHash=getDpkiDNA();
  data = bridge(appDNAHash, "dpkiLib", "getUserDetails", app_agent_id)
  return data
}


/////////////////
// DPKI DNA Hash
////////////////
function getDpkiDNA(){
  appDNAHash=QBAIDFYBVKDYB$RHFOISBD245243ASFC
  return appDNAHash
}
