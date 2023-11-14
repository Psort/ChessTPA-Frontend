import {authorizedApi} from "../hooks/withAxiosIntercepted";
import {GameResponse} from "../model/api/game/GameResponse";
import {MovesRequest} from "../model/api/game/MovesRequest";


export class GameApi {
  static getPossibleMoves = async (request: MovesRequest) =>
      await authorizedApi.post("/engine/move", request);
  static getGame = async (gameId:string|undefined) =>
      await authorizedApi.get<GameResponse>(`/game?gameId=${gameId}`);
}
