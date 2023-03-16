export class Page<T>{
	constructor(results: T[], total: number) {
		this._results = results;
		this._total = total;
	}

	private _results: T[];
	private _total: number;

	public get total(): number {
		return this._total;
	}
	public get results(): T[] {
		return this._results;
	}
}

export interface PageRequest{
	page: number;
	size: number;
}

export interface CoursesPreviewResponse {
	courses: CoursePreview[];
}
export interface BaseCourse {
	id: string;
	title: string;
	tags: string[];
	launchDate: Date;
	status: string;
	description: string;
	duration: number;
	previewImageLink: string;
	rating: number;
	meta: CourseMetaData;
	containsLockedLessons: boolean;
}

export interface CoursePreview extends BaseCourse {
	lessonsCount: number;
}
export interface Course extends BaseCourse {
	lessons: Lesson[];
}

export interface Lesson {
	id: string;
	title: string;
	duration: number;
	order: number;
	type: string;
	status: string;
	link: string;
	previewImageLink: string;
	meta?: any;
}

export interface CourseMetaData {
	slug: string;
	skills?: string[];
	courseVideoPreview?: CourseVideoPreview;
	fullCourseProductId?: string;
	fullCourseProductFamily?: string;
}

export interface CourseVideoPreview {
	link: string;
	duration: number;
	previewImageLink: string;
}
