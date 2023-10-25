import axios from "axios";
import {SignInRequest} from "../model/api/auth/SignInRequest";
import {LoginResponse} from "../model/api/auth/LoginResponse";
import {LoginRequest} from "../model/api/auth/LoginRequest";


export class AuthApi {
  static signIn = async (request: SignInRequest) =>
    await axios.post("auth/register", request);


  static login = async (request: LoginRequest) =>
      await axios.post<LoginResponse>("auth/login", request);
}
