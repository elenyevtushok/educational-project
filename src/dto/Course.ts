export interface CoursesPreviewResponse{
	courses: Course[];
}

export interface Course {
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
	lessons: Lesson[];
	containsLockedLessons: boolean;
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
	skills: string[];
	courseVideoPreview: CourseVideoPreview;
}

export interface CourseVideoPreview {
	link: string;
	duration: number;
	previewImageLink: string;
}
