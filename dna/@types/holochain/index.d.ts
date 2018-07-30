
type Hash = string;
type HolochainError = object;
type PackageRequest = object;

/*========================================
=            Native Functions            =
========================================*/

declare function property(name: string): string;
declare function makeHash (entryType: string, entryData: any): Hash;
declare function debug(value: string): void;
declare function call(zomeName: string, functionName: string, arguments: string | object): any;
declare function bridge(appDNAHash: Hash, zomeName: string, functionName: string, arguments: string | object): any;
declare function getBridges(): object[];
declare function sign(doc: string): string;
declare function verifySignature(signature: string, data: string, pubKey: string): boolean;
declare function commit(entryType: string, entryData: string | object): Hash;
declare function get(hash: Hash, options?: object): string | object;
declare function getLinks(base: Hash, tag: string, options?: object): object[];
declare function update(entryType: string, entryData: string | object, replaces: Hash) : Hash;
declare function updateAgent(options: object): Hash;
declare function remove(entryHash: Hash, message: string): Hash;
declare function query(options?: object): object[];
declare function send(to: Hash, message: object, options?: object): any;
declare function bundleStart(timeout: number, userParam: any): void;
declare function bundleClose(commit: boolean): void;

/*=====  End of Native Functions  ======*/



/*====================================================
=            Globals and System Constants            =
====================================================*/

interface HolochainSystemGlobals {
  Version: string;
  HashNotFound: any;
  Status: any;
  GetMask: any;
  LinkAction: any;
  PkgReq: any;
  Bridge: any;
  SysEntryType: any;
  BundleCancel: any;
}

interface HolochainAppGlobals {
  Name: string;
  DNA: {
    Hash: Hash;
  };
  Key: {
    Hash: Hash;
  }
  Agent: {
    Hash: Hash;
    TopHash: Hash;
    String: string;
  }
}

declare var HC: HolochainSystemGlobals;
declare var App: HolochainAppGlobals;

/*=====  End of Globals and System Constants  ======*/

// interface PackageReq {
//   Chain: object;
//   ChainOpt: ChainOpt;
//   EntryTypes: string[];
// }
// enum ChainOpt {
//   None
//   Headers
//   Entries
//   Full
// }
// enum SysEntryType {
//   DNA
//   Agent
//   Key
//   Headers
//   Del
// }
// enum Bridge {
//   From
//   To
// }
