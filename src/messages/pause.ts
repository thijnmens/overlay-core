export interface IPause {
	_type: string;
	_event: string;
	pauseTime: number;
}

export default class Pause implements IPause {
	_type: string;
	_event: string;
	pauseTime: number;

	constructor(pause: IPause) {
		this._type = pause._type;
		this._event = pause._event;
		this.pauseTime = pause.pauseTime;
	}

	public toString(): string {
		return `Pause: {
			_type: "${this._type}",
			_event: "${this._event}",
			pauseTime: ${this.pauseTime}
		}`;
	}
}
