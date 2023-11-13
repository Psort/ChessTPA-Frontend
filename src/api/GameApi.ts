import {authorizedApi} from "../hooks/withAxiosIntercepted";
import {GameRequest} from "../model/api/game/GameRequest";
import {GameResponse} from "../model/api/game/GameResponse";


export class GameApi {
  // static getPossibleMoves = async (request: GameRequest) =>
  //   await authorizedApi.get<GameResponse[]>("/engine",{params:request} );
  static getPossibleMoves = async (request:GameRequest) =>
      await authorizedApi.post("/game/move",request);
  static getGame = async (gameId:string|undefined) =>
      await authorizedApi.get<GameResponse>(`/game?gameId=${gameId}`);
}
