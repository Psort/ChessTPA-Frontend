import {authorizedApi} from "../hooks/withAxiosIntercepted";


export class QueueApi {
    static join = async (username:string) =>
        await authorizedApi.post<string>(`queue/join?username=${username}`);
}
