export interface IMapInfo {
	_type: string;
	_event: string;
	mapInfoChanged: {
		level_id: string;
		name: string;
		sub_name: string;
		artist: string;
		mapper: string;
		characteristic: string;
		difficulty: string;
		duration: number;
		BPM: number;
		PP: number;
		BSRKey: string;
		coverRaw: string;
		time: number;
		timeMultiplier: number;
	};
}

export default class MapInfo implements IMapInfo {
	_type: string;
	_event: string;
	mapInfoChanged: {
		level_id: string;
		name: string;
		sub_name: string;
		artist: string;
		mapper: string;
		characteristic: string;
		difficulty: string;
		duration: number;
		BPM: number;
		PP: number;
		BSRKey: string;
		coverRaw: string;
		time: number;
		timeMultiplier: number;
	};

	constructor(mapInfo: IMapInfo) {
		this._type = mapInfo._type;
		this._event = mapInfo._event;
		this.mapInfoChanged = mapInfo.mapInfoChanged;
	}

	public toString(): string {
		return `Map Info: {
			_type: "${this._type}",
			_event: ${this._event},
			mapInfoChanged: {
				level_id: "${this.mapInfoChanged.level_id}",
				name: "${this.mapInfoChanged.name}",
				sub_name: "${this.mapInfoChanged.sub_name}",
				artist: "${this.mapInfoChanged.artist}",
				mapper: "${this.mapInfoChanged.mapper}",
				characteristic: "${this.mapInfoChanged.characteristic}",
				difficulty: "${this.mapInfoChanged.difficulty}",
				duration: ${this.mapInfoChanged.duration},
				BPM: ${this.mapInfoChanged.BPM},
				PP: ${this.mapInfoChanged.PP},
				BSRKey: "${this.mapInfoChanged.BSRKey}",
				coverRaw: "${this.mapInfoChanged.coverRaw}",
				time: ${this.mapInfoChanged.time},
				timeMultiplier: ${this.mapInfoChanged.timeMultiplier}
		}`;
	}
}
