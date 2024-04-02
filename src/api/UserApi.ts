import {authorizedApi} from "../hooks/withAxiosIntercepted";
import {User} from "../model/User";
import {EloTradeRequest} from "../model/api/user/EloTradeRequest";

export class UserApi {
    static getUser = async (email:string | null) =>
        await authorizedApi.get<User>(`user?email=${email}`);
}