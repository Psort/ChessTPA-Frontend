import {authorizedApi} from "../hooks/withAxiosIntercepted";
import {QueueRequest} from "../model/api/game/QueueRequest";


export class QueueApi {
    static join = async (request:QueueRequest) =>
        await authorizedApi.post<string>(`queue/join`,request);
}
