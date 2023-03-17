import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import MockAdapter from "axios-mock-adapter";
import { Course, CoursePreview, CoursesPreviewResponse, Page, PageRequest } from "../dto/Course";
import { http } from "../http";
import { STUB_COURSES_PREVIEW } from "./data-cources-overview";
import { STUB_COURSE_DETAILS } from "./data-course-details";

class CourseApi {

	async getCoursesPreview(request: PageRequest): Promise<Page<CoursePreview>> {
		var mock = new MockAdapter(http.instance);
		mock.onGet("/core/preview-courses").reply(200, STUB_COURSES_PREVIEW);
		return await http.get<CoursesPreviewResponse, AxiosResponse<CoursesPreviewResponse>>("/core/preview-courses")
			.then(response => response.data)
			.then(response => new Page<CoursePreview>(this.slice(response.courses, request), response.courses.length));
	}

	async getCourse(id: string): Promise<Course> {
		var mock = new MockAdapter(http.instance);
		mock.onGet(`/core/preview-courses/${id}`).reply(200, STUB_COURSE_DETAILS);
		return await http.get(`/core/preview-courses/${id}`)
			.then(response => response.data)
	}

	private slice(all: CoursePreview[], pageRequest: PageRequest): CoursePreview[] {
		const start = (pageRequest.page - 1) * pageRequest.size;
		let end = start + pageRequest.size;
		return all.slice(start, end);
	}
}

export const courseApi = new CourseApi();