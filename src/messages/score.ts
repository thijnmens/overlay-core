export interface IScore {
	_type: string;
	_event: string;
	scoreEvent: {
		time: number;
		score: number;
		accuracy: number;
		combo: number;
		missCount: number;
		currentHealth: number;
	};
}

export default class Score implements IScore {
	_type: string;
	_event: string;
	scoreEvent: {
		time: number;
		score: number;
		accuracy: number;
		combo: number;
		missCount: number;
		currentHealth: number;
	};

	constructor(score: IScore) {
		this._type = score._type;
		this._event = score._event;
		this.scoreEvent = score.scoreEvent;
	}

	public toString(): string {
		return `Score: {
			_type: "${this._type}",
			_event: "${this._event}",
			scoreEvent: {
				time: ${this.scoreEvent.time},
				score: ${this.scoreEvent.score},
				accuracy: ${this.scoreEvent.accuracy},
				combo: ${this.scoreEvent.combo},
				missCount: ${this.scoreEvent.missCount},
				currentHealth: ${this.scoreEvent.currentHealth}
		}`;
	}
}
