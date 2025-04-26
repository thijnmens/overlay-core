export interface IResume {
	_type: string;
	_event: string;
	resumeTime: number;
}

export default class Resume implements IResume {
	_type: string;
	_event: string;
	resumeTime: number;

	constructor(resume: IResume) {
		this._type = resume._type;
		this._event = resume._event;
		this.resumeTime = resume.resumeTime;
	}

	public toString(): string {
		return `Resume: {
			_type: "${this._type}",
			_event: "${this._event}",
			resumeTime: ${this.resumeTime}
		}`;
	}
}
