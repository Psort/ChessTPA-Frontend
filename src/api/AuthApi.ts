import axios from "axios";
import {SignInRequest} from "../model/api/SignInRequest";
import {SignInResponse} from "../model/api/SignInResponse";

export class AuthApi {
  static signIn = async (request: SignInRequest) =>
    await axios.post<SignInResponse>("auth/register", request);


}
