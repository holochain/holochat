export = 0;
let module = {};


interface Anchor {
  anchorType: string,
  anchorText: string
}

/*=============================================
=            Public Zome Functions            =
=============================================*/

function anchor(anchor: Anchor): Hash {

  // create the root and type anchors if needed
  createRootAnchor();
  const typeAnchorHash = createTypeAnchor(anchor.anchorType);

  // finally create the new anchor if it doesn't already exist and link it to the type anchor
  let anchorHash: Hash = makeHash('anchor', anchor);
  if(get(anchorHash) === null) {
    commit('anchor', anchor);
    commit('anchor_link',  { Links:[{Base: typeAnchorHash, Link: anchorHash, Tag: anchor.anchorText}]});
  }
  return anchorHash;
}


function exists(anchor: Anchor): boolean{
  return get(makeHash('anchor', anchor)) !== null;
}


function anchors(type: string): Array<GetLinksResponse> {
  return getLinks(makeHash('anchor', {anchorType: type, anchorText: ''}), '');
}

/*=====  End of Public Zome Functions  ======*/


/*=========================================
=            Private Functions            =
=========================================*/

function createRootAnchor(): Hash {
  // define the root anchor. Check if it exists and if not create it
  const rootAnchor: Anchor = {anchorType: 'anchorTypes', anchorText: ''};
  const rootAnchorHash: Hash = makeHash('anchor', rootAnchor);
  if (get(rootAnchorHash) === null){
    commit('anchor', rootAnchor);
  }
  return rootAnchorHash;
}

function createTypeAnchor(anchorType: string): Hash {
  const typeAnchor: Anchor = {anchorType: anchorType, anchorText: ''};
  const typeAnchorHash: Hash = makeHash('anchor', anchorType);
  if (get(typeAnchorHash) === null){
    commit('anchor', typeAnchor);
    commit('anchor_link', { Links:[{Base: typeAnchorHash, Link: typeAnchorHash, Tag: typeAnchor.anchorType}]});
  }
  return typeAnchorHash;
}

/*=====  End of Private Functions  ======*/



/*=============================================
=            Section comment block            =
=============================================*/

function genesis() {
  return true;
}
function validatePut(entry_type,entry,header,pkg,sources) {
  return true;
}
function validateCommit(entry_type,entry,header,pkg,sources) {
    return true;
}
function validateLink(linkingEntryType,baseHash,linkHash,pkg,sources){
  return true;
}
function validateMod(entry_type,hash,newHash,pkg,sources){
  return true;
}
function validateDel(entry_type,hash,pkg,sources) {
  return true;
}
function validatePutPkg(entry_type) {
  return null;
}
function validateModPkg(entry_type) {
  return null;
}
function validateDelPkg(entry_type) {
  return null;
}
function validateLinkPkg(entry_type) {
  return null;
}


/*=====  End of Section comment block  ======*/

