export interface IHandshake {
	readonly _type: string;
	readonly protocolVersion: number;
	readonly gameVersion: string;
	readonly playerName: string;
	readonly playerPlatformId: string;
}

export default class Handshake implements IHandshake {
	readonly '_type': string;
	readonly 'protocolVersion': number;
	readonly 'gameVersion': string;
	readonly 'playerName': string;
	readonly 'playerPlatformId': string;

	constructor(handshake: IHandshake) {
		this._type = handshake._type;
		this.protocolVersion = handshake.protocolVersion;
		this.gameVersion = handshake.gameVersion;
		this.playerName = handshake.playerName;
		this.playerPlatformId = handshake.playerPlatformId;
	}

	public toString(): string {
		return `Handshake: {
			_type: "${this._type}",
			protocolVersion: ${this.protocolVersion},
			gameVersion: "${this.gameVersion}",
			playerName: "${this.playerName}",
			playerPlatformId: "${this.playerPlatformId}"
		}`;
	}
}
