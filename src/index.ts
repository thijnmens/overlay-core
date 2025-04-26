import GameState from './messages/gameState';
import Handshake from './messages/handshake';
import MapInfo from './messages/mapInfo';
import Pause from './messages/pause';
import Resume from './messages/resume';
import Score from './messages/score';
import OverlayCore from './overlay-core';

const overlay = new OverlayCore();

overlay.onGameState = (gameState: GameState) => {
	console.log(gameState.toString());
};

overlay.onHandshake = (handshake: Handshake) => {
	console.log(handshake.toString());
};

overlay.onMapInfo = (mapInfo: MapInfo) => {
	console.log(mapInfo.toString());
};

overlay.onPause = (pause: Pause) => {
	console.log(pause.toString());
};

overlay.onResume = (resume: Resume) => {
	console.log(resume.toString());
};

overlay.onScore = (score: Score) => {
	console.log(score.toString());
};

overlay.init();
