import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { tokenResoler } from "./api/token-resolver";

export const BASE_SERVER_URL = "http://api.wisey.app/api/v1";
const COURSE_URL = "http://api.wisey.app/api/v1/core/preview-courses";

const header = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'
const body = 'eyJzdWIiOiJkOTRlNjg4NS1kM2U5LTQwY2EtYTVjYy01MDRkNjZlZDVlN2QiLCJwbGF0Zm9ybSI6InN1YnNjcmlwdGlvbnMiLCJpYXQiOjE2Nzg3MDQ3NjIsImV4cCI6MTY3OTYwNDc2Mn0'
const signature = 'Qw3LF39CDp27ZxoGzt5rikJM_OTx0eNaoyFFLxxrXUM'
const token = [header, body, signature].join('.');


enum StatusCode {
	Unauthorized = 401,
	Forbidden = 403,
	TooManyRequests = 429,
	InternalServerError = 500,
}

const headers: Readonly<Record<string, string | boolean>> = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Credentials': true,
	"Content-Type": "application/json"
};

class Http {
	public instance: AxiosInstance;

	constructor() {
		this.instance = axios.create({
			baseURL: BASE_SERVER_URL,
			headers
		});

		this.instance.interceptors.request.use(
			config => {
				const token = tokenResoler.getToken();
				console.log("Setup autorization token: ", token)
				config.headers['Authorization'] = `Bearer ${token}`;
				return config;
			});


		this.instance.interceptors.response.use(
			(response) => response
		);
	}

	request<T = any, R = AxiosResponse<T>>(config: AxiosRequestConfig): Promise<R> {
		return this.instance.request(config);
	}

	get<T = any, R = AxiosResponse<T>>(url: string): Promise<R> {
		return this.instance.get<T, R>(url);
	}

	post<T = any, R = AxiosResponse<T>>(
		url: string,
		data?: T,
		config?: AxiosRequestConfig
	): Promise<R> {
		return this.instance.post<T, R>(url, data, config);
	}

	put<T = any, R = AxiosResponse<T>>(
		url: string,
		data?: T,
		config?: AxiosRequestConfig
	): Promise<R> {
		return this.instance.put<T, R>(url, data, config);
	}

	delete<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
		return this.instance.delete<T, R>(url, config);
	}
}

export const http = new Http();