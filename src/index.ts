import { countryCodeEmoji } from 'country-code-emoji';
import GameState from './messages/gameState';
import Handshake from './messages/handshake';
import MapInfo from './messages/mapInfo';
import Pause from './messages/pause';
import Resume from './messages/resume';
import Score from './messages/score';
import OverlayCore from './overlay-core';

const overlay = new OverlayCore();
let playerId = '';
let missCount = 0;

overlay.onGameState = (gameState: GameState) => {
	if (gameState.gameStateChanged == 'Menu') {
		updatePlayerCard(playerId);
		document.getElementById('map-card')!.style.transform =
			'translateX(-100%)';
		document.getElementById('map-card')!.style.transitionTimingFunction =
			'cubic-bezier(0.4, 0, 1, 1)';
		setTimeout(() => {
			document.getElementById('player-card')!.style.transform =
				'translateX(0px)';
			document.getElementById(
				'player-card'
			)!.style.transitionTimingFunction = 'cubic-bezier(0, 0, 0.2, 1)';
		}, 1000);
	} else {
		document.getElementById('player-card')!.style.transform =
			'translateX(-100%)';
		document.getElementById('player-card')!.style.transitionTimingFunction =
			'cubic-bezier(0.4, 0, 1, 1)';
		setTimeout(() => {
			document.getElementById('map-card')!.style.transform =
				'translateX(0px)';
			document.getElementById(
				'map-card'
			)!.style.transitionTimingFunction = 'cubic-bezier(0, 0, 0.2, 1)';
		}, 1000);
	}
};

const updatePlayerCard = (playerId: string, full: boolean = false) => {
	fetch(
		`https://api.beatleader.xyz/player/${playerId}?stats=true&keepOriginalId=false&leaderboardContext=none`,
		{
			method: 'GET',
			mode: 'cors'
		}
	)
		.then((r) => r.json())
		.then((data) => {
			if (full) {
				document.getElementById('player-name')!.innerHTML = data.name;
				if (data.clans.length > 0) {
					document.getElementById('player-clan')!.innerHTML =
						data.clans[0].tag;
					document.getElementById('player-clan')!.style.outlineColor =
						data.clans[0].color;
				}
				(document.getElementById(
					'player-pfp'
				) as HTMLImageElement | null)!.src = data.avatar;
			}

			document.getElementById('global-rank')!.innerHTML =
				`🌐 #${data.rank}`;
			document.getElementById('country-rank')!.innerHTML =
				`${countryCodeEmoji(data.country)} #${data.countryRank}`;
			document.getElementById('avg-rank')!.innerHTML =
				`avg #${Math.ceil(data.scoreStats.averageRank).toString()}`;
			document.getElementById('ssplus-count')!.innerHTML =
				`SS+ | ${data.scoreStats.sspPlays}`;
			document.getElementById('ss-count')!.innerHTML =
				`SS | ${data.scoreStats.ssPlays}`;
			document.getElementById('splus-count')!.innerHTML =
				`S+ | ${data.scoreStats.spPlays}`;
			document.getElementById('s-count')!.innerHTML =
				`S | ${data.scoreStats.sPlays}`;
			document.getElementById('a-count')!.innerHTML =
				`A | ${data.scoreStats.aPlays}`;
		});
};

overlay.onHandshake = (handshake: Handshake) => {
	playerId = handshake.playerPlatformId;
	updatePlayerCard(handshake.playerPlatformId, true);
};

overlay.onMapInfo = (mapInfo: MapInfo) => {
	let diff = 'expert+';
	let diffColor = '#8352d5';

	switch (mapInfo.mapInfoChanged.difficulty) {
		case 'Easy':
			diff = 'easy';
			diffColor = '#69af78';
			break;

		case 'Normal':
			diff = 'normal';
			diffColor = '#75aff0';
			break;

		case 'Hard':
			diff = 'hard';
			diffColor = '#e87050';
			break;

		case 'Expert':
			diff = 'expert';
			diffColor = '#ab3c44';
			break;
	}

	document.getElementById('title')!.innerHTML = mapInfo.mapInfoChanged.name;
	document.getElementById('artist')!.innerHTML =
		mapInfo.mapInfoChanged.artist;
	document.getElementById('mapper')!.innerHTML =
		`[${mapInfo.mapInfoChanged.mapper}]`;
	document.getElementById('diff')!.innerHTML = diff;
	document.getElementById('diff')!.style.backgroundColor = diffColor;
	document.getElementById('pp')!.innerHTML =
		`${mapInfo.mapInfoChanged.PP} pp`;
	(document.getElementById('cover') as HTMLImageElement | null)!.src =
		`data:image/png;base64,${mapInfo.mapInfoChanged.coverRaw}`;

	if (
		document.getElementById('title')!.offsetWidth >
		document.getElementById('title-container')!.offsetWidth
	) {
		document.getElementById('title')!.style.animation =
			'scroll-text 10s ease-in infinite';
	} else {
		document.getElementById('title')!.style.animation = '';
	}
};

overlay.onPause = (pause: Pause) => {
	document.getElementById('pause')!.style.visibility = 'visible';
};

overlay.onResume = (resume: Resume) => {
	document.getElementById('pause')!.style.visibility = 'hidden';
};

overlay.onScore = (score: Score) => {
	document.getElementById('acc')!.innerHTML =
		`${(score.scoreEvent.accuracy * 100).toFixed(2)}%`;
	document.getElementById('miss')!.innerHTML =
		`${score.scoreEvent.missCount} Miss`;

	if (score.scoreEvent.missCount > missCount) {
		document.getElementById('map-card')!.style.animation = 'none';
		document.getElementById('map-card')!.offsetHeight; // Read random property to reset animation
		document.getElementById('map-card')!.style.animation =
			'miss 500ms ease-in-out';
	}
	missCount = score.scoreEvent.missCount;
};

overlay.init();
