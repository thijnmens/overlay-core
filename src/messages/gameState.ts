export interface IGameState {
	_type: string;
	_event: string;
	gameStateChanged: string;
}

export default class GameState implements IGameState {
	_type: string;
	_event: string;
	gameStateChanged: string;

	constructor(gameState: IGameState) {
		this._type = gameState._type;
		this._event = gameState._event;
		this.gameStateChanged = gameState.gameStateChanged;
	}

	public toString(): string {
		return `Game State: {
			_type: "${this._type}",
			_event: "${this._event}",
			gameStateChanged: "${this.gameStateChanged}"
		}`;
	}
}
