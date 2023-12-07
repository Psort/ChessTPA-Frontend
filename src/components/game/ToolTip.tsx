import React, {useContext} from "react";
import {GameContext} from "../../context/GameContext";
import {Tooltip} from "react-tooltip";
import {ColorType} from "../../model/game/ColorType";
import {ChangeFigureButton, TooltipImg} from "./Board.styles";
import {PieceType} from "../../model/pieces/PieceType";
import {PieceModel} from "../../model/pieces/PieceModel";

type ToolTipProps = {
    x:number,
    y:number,
    playerColor: ColorType,
    showTooltip:boolean,
    setShowTooltip:(showTooltip:boolean)=>void
    safeGame:(clonedBoard:PieceModel[][],x:number,y:number)=>void
}
export const ToolTip = (props: ToolTipProps) => {
    const gameContext = useContext(GameContext);

    const determineTooltipPlacement = () => {
        return props.playerColor === ColorType.BLACK ? "bottom" : "top";
    };

    const determineTooltipStyle = () => {
        const rotationStyle = props.playerColor === ColorType.BLACK ? "rotate(180deg) translate(0,300%)" : "";
        return { display: "flex", flexDirection: "row", padding: "0", margin: "0", gap: "10px" ,position:"absolute",transform:rotationStyle} as React.CSSProperties;
    };
    function changeToQueen(){
        changePieceType(PieceType.QUEEN)
        props.setShowTooltip(false)
        gameContext.blockActionModifier(false)
    }
    function changeToBishop(){
        changePieceType(PieceType.BISHOP)
        props.setShowTooltip(false)
        gameContext.blockActionModifier(false)
    }
    function changeToRook(){
        changePieceType(PieceType.ROOK)
        props.setShowTooltip(false)
        gameContext.blockActionModifier(false)
    }
    function changeToKnight(){
        changePieceType(PieceType.KNIGHT)
        props.setShowTooltip(false)
        gameContext.blockActionModifier(false)
    }
    const changePieceType = (type: PieceType) => {
        const clonedBoard = JSON.parse(JSON.stringify(gameContext.pieces));
        clonedBoard[props.x - 1][props.y - 1].type = type;
        gameContext.piecesModifier(clonedBoard);
        props.safeGame(clonedBoard,props.x,props.y)
    };
    return(
        <Tooltip id="my-tooltip" isOpen={props.showTooltip} place={determineTooltipPlacement()} style={determineTooltipStyle()}  clickable >
            <ChangeFigureButton onClick={changeToBishop}><TooltipImg src={require("../../resources/Img/Pieces/B"+gameContext.getCurrentUserColor().toLowerCase()+".png")} playerColor={props.playerColor}/></ChangeFigureButton>
            <ChangeFigureButton onClick={changeToKnight}><TooltipImg src={require("../../resources/Img/Pieces/N"+gameContext.getCurrentUserColor().toLowerCase()+".png")} playerColor={props.playerColor}/></ChangeFigureButton>
            <ChangeFigureButton onClick={changeToQueen}><TooltipImg src={require("../../resources/Img/Pieces/Q"+gameContext.getCurrentUserColor().toLowerCase()+".png")} playerColor={props.playerColor}/></ChangeFigureButton>
            <ChangeFigureButton onClick={changeToRook}><TooltipImg src={require("../../resources/Img/Pieces/R"+gameContext.getCurrentUserColor().toLowerCase()+".png")} playerColor={props.playerColor}/></ChangeFigureButton>
        </Tooltip>
    )
}
