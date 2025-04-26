import GameState, { IGameState } from './messages/gameState';
import Handshake, { IHandshake } from './messages/handshake';
import MapInfo, { IMapInfo } from './messages/mapInfo';
import Pause, { IPause } from './messages/pause';
import Resume, { IResume } from './messages/resume';
import Score, { IScore } from './messages/score';

export default class OverlayCore {
	private ws: WebSocket | null = null;
	onGameState: (gameState: GameState) => void;
	onHandshake: (handshake: Handshake) => void;
	onMapInfo: (mapInfo: MapInfo) => void;
	onPause: (pause: Pause) => void;
	onResume: (resume: Resume) => void;
	onScore: (score: Score) => void;

	constructor() {
		this.onGameState = (_) => {};
		this.onHandshake = (_) => {};
		this.onMapInfo = (_) => {};
		this.onPause = (_) => {};
		this.onResume = (_) => {};
		this.onScore = (_) => {};

		this.onOpen = this.onOpen.bind(this);
		this.onClose = this.onClose.bind(this);
		this.onMessage = this.onMessage.bind(this);
	}

	init() {
		this.ws = new WebSocket('ws://localhost:2947/socket');

		this.ws.onopen = this.onOpen;
		this.ws.onclose = this.onClose;
		this.ws.onmessage = this.onMessage;
	}

	private onOpen() {
		console.log('Connection opened');
	}

	private onClose() {
		console.log('Connection closed');
	}

	private onMessage(message: MessageEvent) {
		const data = JSON.parse(message.data as string);

		switch (data._type) {
			case 'handshake':
				this.onHandshake(new Handshake(data as IHandshake));
				break;

			case 'event':
				switch (data._event) {
					case 'gameState':
						this.onGameState(new GameState(data as IGameState));
						break;

					case 'resume':
						this.onResume(new Resume(data as IResume));
						break;

					case 'pause':
						this.onPause(new Pause(data as IPause));
						break;

					case 'mapInfo':
						this.onMapInfo(new MapInfo(data as IMapInfo));
						break;

					case 'score':
						this.onScore(new Score(data as IScore));
						break;

					default:
						console.warn(`Received unknown event: ${data}`);
						break;
				}
				break;

			default:
				console.warn(`Received unknown type: ${data}`);
				break;
		}
	}
}
