/** @param {NS} ns **/
export function multiscan(ns, startServer) {
    const serverList = new Set();

    function scanning(server) {
        if (serverList.has(server)) return; // already visited
        serverList.add(server);

        const neighbors = ns.scan(server);
        for (const next of neighbors) {
            scanning(next);
        }
    }

    scanning(startServer);
    return Array.from(serverList);
}

export function gainRootAccess(ns, server) {
	const serverData = ns.getServer(server);

	if (ns.fileExists('brutessh.exe')) {
		ns.brutessh(server);
	}
	if (ns.fileExists('ftpcrack.exe')) {
		ns.ftpcrack(server);
	}
	if (ns.fileExists('relaysmtp.exe')) {
		ns.relaysmtp(server);
	}
	if (ns.fileExists('httpworm.exe')) {
		ns.httpworm(server);
	}
	if (ns.fileExists('sqlinject.exe')) {
		ns.sqlinject(server);
	}
	if (ns.getServerNumPortsRequired(server) <= serverData.openPortCount) {
		ns.nuke(server);
	}
	/* Requires Singularity 4-1
	if (!serverData.backdoorInstalled) {
		ns.installBackdoor(server);
	}
	*/
}