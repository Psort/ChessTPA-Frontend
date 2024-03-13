import {authorizedApi} from "../hooks/withAxiosIntercepted";
import {MovesRequest} from "../model/api/engine/MovesRequest";
import {GameStatusRequest} from "../model/api/engine/GameStatusRequest";
import {PossibleMoves} from "../model/api/engine/PossibleMoves";


export class EngineApi {
  static getPossibleMoves = async (request: MovesRequest) =>
      await authorizedApi.post<PossibleMoves[]>("/engine/move", request);
  static getGameStatus = async (request: GameStatusRequest) =>
      await authorizedApi.post("/engine/status", request);

}
