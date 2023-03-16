import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import MockAdapter from "axios-mock-adapter";
import { CoursePreview, CoursesPreviewResponse, Page, PageRequest } from "../dto/Course";
import { http } from "../http";
import { STUB_COURSES_PREVIEW } from "./data-cources-overview";

class CourseApi {

	async getCoursesPreview(request: PageRequest): Promise<Page<CoursePreview>> {
		var mock = new MockAdapter(http.instance);
		mock.onGet("/core/preview-courses").reply(200, STUB_COURSES_PREVIEW);
		return await http.get<CoursesPreviewResponse, AxiosResponse<CoursesPreviewResponse>>("/core/preview-courses")
			.then(response => response.data)
			.then(response => new Page<CoursePreview>(this.slice(response.courses, request), response.courses.length));
	}

	private slice(all: CoursePreview[], pageRequest: PageRequest): CoursePreview[] {
		const start = pageRequest.page * pageRequest.size;
		const end = start + pageRequest.size;
		return all.slice(start, end);
	}
}

export const courseApi = new CourseApi();