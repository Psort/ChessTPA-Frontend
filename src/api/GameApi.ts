import {authorizedApi} from "../hooks/withAxiosIntercepted";
import {GameResponse} from "../model/api/game/GameResponse";
import {MovesRequest} from "../model/api/engine/MovesRequest";


export class GameApi {
  static getGame = async (gameId:string|undefined) =>
      await authorizedApi.get<GameResponse>(`/game?gameId=${gameId}`);

}
