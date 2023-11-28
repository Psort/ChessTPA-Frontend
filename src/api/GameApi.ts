import {authorizedApi} from "../hooks/withAxiosIntercepted";
import {GameResponse} from "../model/api/game/GameResponse";
import {GameStateRequest} from "../model/api/game/GameStateRequest";


export class GameApi {
  static getGame = async (gameId:string|undefined) =>
      await authorizedApi.get<GameResponse>(`/game?gameId=${gameId}`);

  static safeGameStatus = async (request: GameStateRequest) =>
      await authorizedApi.patch("/game", request);

  static getAllGamesForUser = async (username:string|undefined) =>
      await authorizedApi.get<GameResponse>(`/game/user?username=${username}`);
}
