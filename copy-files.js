import { multiscan } from "utils.js";

const files = ["targeted-grow.js", "targeted-hack.js", "targeted-weaken.js"];

export async function main(ns) {
  const servers = multiscan(ns, "home");

  for (let i = 0; i < servers.length; i++) {
    const server = servers[i];
    
    // Delete existing files first
    for (const file of files) {
      if (ns.fileExists(file, server)) {
        ns.rm(file, server);
      }
    }
    
    try {
      await ns.scp(files, server);
    } catch (e) {
      ns.tprint(`SCP failed for ${server}: ${e}`);
    }
  }
}
