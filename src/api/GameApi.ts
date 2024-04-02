import {authorizedApi} from "../hooks/withAxiosIntercepted";
import {GameResponse} from "../model/api/game/GameResponse";
import {GameStateRequest} from "../model/api/game/GameStateRequest";
import {GameComputerRequest} from "../model/api/game/GameComputerRequest";


export class GameApi {
  static getGame = async (gameId:string|undefined) =>
      await authorizedApi.get<GameResponse>(`/game?gameId=${gameId}`);

  static safeGameState = async (request: GameStateRequest) =>
      await authorizedApi.patch("/game/update", request);


    static getAllActualGamesForUser = async (username:string|undefined) =>
        await authorizedApi.get<GameResponse[]>(`/game/user?username=${username}`);

  static startGameWithComputer = async (request:GameComputerRequest) =>
      await authorizedApi.post<GameResponse>(`/game/create`,request);

}
