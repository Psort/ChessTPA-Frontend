import {MovesRequest} from "../model/api/game/MovesRequest";
import {MovesResponse} from "../model/api/game/MovesResponse";
import {authorizedApi} from "../hooks/withAxiosIntercepted";
import {Coordinate} from "../model/api/game/Coordinate";


export class GameApi {
  // static getPossibleMoves = async (request: GameRequest) =>
  //   await authorizedApi.get<GameResponse[]>("/engine",{params:request} );
  static getPossibleMoves = async (request: MovesRequest) =>
      await authorizedApi.post<Coordinate[]>("/engine/move",request);
}
