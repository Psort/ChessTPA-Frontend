import {authorizedApi} from "../hooks/withAxiosIntercepted";
import {MovesRequest} from "../model/api/engine/MovesRequest";
import {GameStatusRequest} from "../model/api/engine/GameStatusRequest";
import {Coordinate} from "../model/api/engine/Coordinate";


export class EngineApi {
  static getPossibleMoves = async (request: MovesRequest) =>
      await authorizedApi.post<Coordinate[]>("/engine/move", request);
  static getGameStatus = async (request: GameStatusRequest) =>
      await authorizedApi.post("/engine/status", request);

}
