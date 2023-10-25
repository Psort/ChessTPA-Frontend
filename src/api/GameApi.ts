import {GameRequest} from "../model/api/game/GameRequest";
import {GameResponse} from "../model/api/game/GameResponse";
import {authorizedApi} from "../hooks/withAxiosIntercepted";


export class GameApi {
  static getPossibleMoves = async (request: GameRequest) =>
    await authorizedApi.post<GameResponse[]>("/engine", request);
  // static getPossibleMoves = async (request: GameRequest) =>
  //     await authorizedApi.post<string>("/engine");
}
