import axios, { AxiosResponse } from "axios";
import { BASE_SERVER_URL } from "../http";


const header = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'
const body = 'eyJzdWIiOiJkOTRlNjg4NS1kM2U5LTQwY2EtYTVjYy01MDRkNjZlZDVlN2QiLCJwbGF0Zm9ybSI6InN1YnNjcmlwdGlvbnMiLCJpYXQiOjE2Nzg3MDQ3NjIsImV4cCI6MTY3OTYwNDc2Mn0'
const signature = 'Qw3LF39CDp27ZxoGzt5rikJM_OTx0eNaoyFFLxxrXUM'
const token = [header, body, signature].join('.');

interface TokenResponse {
	token: string;
}

const TOKEN_LOCAL_STORE_KEY: string = "token";
class TokenResolver {


	getToken(): string {
		if (localStorage.getItem(TOKEN_LOCAL_STORE_KEY) !== null) {
			console.log("Return token from localStore: ", localStorage.getItem(TOKEN_LOCAL_STORE_KEY));
			return localStorage.getItem(TOKEN_LOCAL_STORE_KEY)!;
		}
		// return this.loadTokenFromServer();
		return token;
	}

	loadTokenFromServer(): string {
		const httpClient = axios.create({
			baseURL: BASE_SERVER_URL,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Credentials': true,
				Accept: "application/json"
			}
		});

		httpClient.get<TokenResponse, AxiosResponse<TokenResponse>>("/auth/anonymous?platform=subscriptions")
			.then(response => {
				//get token from response
				const token = response.data.token;
				console.log("Received token from server response: ", token);
				//set JWT token to local
				localStorage.setItem(TOKEN_LOCAL_STORE_KEY, token);
				//set token to axios common header
				this.setAuthToken(token);
			});

		const token = localStorage.getItem(TOKEN_LOCAL_STORE_KEY)!;
		console.log("Server return token from localStore: ", token);
		return token;
	}

	setAuthToken(token: string) {
		if (token) {
			axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
		}
		else
			delete axios.defaults.headers.common["Authorization"];
	}
}

export const tokenResoler = new TokenResolver();