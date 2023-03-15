import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { CoursesPreviewResponse } from "../dto/Course";
import { http } from "../http";

class CourseApi {
	// private http: AxiosInstance;

	// constructor(){
	// 	this.http = axios.create({
	// 		baseURL: COURSE_URL
	// 	});
	// }	

	async getCoursesPreview(): Promise<AxiosResponse<CoursesPreviewResponse>> {

		return await http.get<CoursesPreviewResponse, AxiosResponse<CoursesPreviewResponse>>("/core/preview-courses");
	}

}

export const courseApi = new CourseApi();