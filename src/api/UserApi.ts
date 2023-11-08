import {authorizedApi} from "../hooks/withAxiosIntercepted";
import {User} from "../model/context/User";

export class UserApi {
    static getUsername = async (email:string) =>
        await authorizedApi.get<User>(`user`, {params: email});
}