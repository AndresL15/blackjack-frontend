import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useErrorHandler } from "../common/utils/ErrorHandler";
import { refreshGame, Player, newgame, dragcard, stop, Winner, winner } from "../blackjack/blackjackService";
import './blackjack.css';
import { User } from "../user/userService";

const INITIAL_STATE = new Array();

export function Blackjack() {

    const history = useNavigate();
    const errorHandler = useErrorHandler();

    const game_id = localStorage.getItem("game_id");
    let user: User
    user = JSON.parse(`${localStorage.getItem("user")}`);

    const [players, setPlayers] = useState<Player[]>(INITIAL_STATE);
    const [status, setStatus] = useState<string>("");

    const checkrefresh = async () => {
        errorHandler.cleanRestValidations()
        try {
            let players = await refreshGame(game_id)
            setPlayers(players.players);
        } catch (error) {
            errorHandler.processRestValidations(error)
        }
    }

    const checkwinner = async () => {
        errorHandler.cleanRestValidations()
        try {
            let status = await winner(game_id, {
                user_id: user.id
            })
            setStatus(status.winner);
        } catch (error) {
            errorHandler.processRestValidations(error)
        }
    }

    const resetgame = async () => {
        errorHandler.cleanRestValidations()
        try {
            await newgame(game_id, {
                user_id: user.id
            })
        } catch (error) {
            errorHandler.processRestValidations(error)
        }
    }

    const solcard = async () => {
        errorHandler.cleanRestValidations()
        try {
            await dragcard(game_id, {
                user_id: user.id
            })
        } catch (error) {
            errorHandler.processRestValidations(error)
        }
    }

    const stopcard = async () => {
        errorHandler.cleanRestValidations()
        try {
            await stop(user.id)
        } catch (error) {
            errorHandler.processRestValidations(error)
        }
    }

    useEffect(() => {
        const intervalr = setInterval(() => {
            checkrefresh();
        }, 5000);

        return () => clearInterval(intervalr);
    }, []);

    useEffect(() => {
        const intervalw = setInterval(() => {
            checkwinner();
        }, 10000);

        return () => clearInterval(intervalw);
    }, []);

    return (
        <div id="tablero">
            <div className="row mt-2">
                <div className="col-sm-3 mt-2">
                    <button className="btn btn-success mx-3" onClick={resetgame}>Nuevo Juego</button>
                </div>
                <div className="col-sm-3 mt-2">
                    <button className="btn btn-primary mx-3" onClick={solcard}>Pedir carta</button>
                </div>
                <div className="col-sm-3 mt-2">
                    <button className="btn btn-primary mx-3" onClick={stopcard}>Detener</button>
                </div>
                <div className="col-sm-3 mt-2">
                    <button className="btn btn-primary mx-3" onClick={() => history('/')}>Cancelar</button>
                </div>
            </div>
            <div id="player" className="mt-2">
                <div className="row">
                    {players.map((player, i) => (
                        <div className="col-sm-6 mt-2">
                            <div id="playername" className="mx-2 border border-dark">
                                <h1><u>{player.name} - {player.points}</u></h1>
                            </div>
                            <div className="row">
                                {player.cards.split(',').map((card, n) => (
                                    <div className="col-sm-2 mx-3">
                                        {card !== "" && (
                                            <div className="col-sm-2 mt-3">
                                                <img className="carta" key={n} src={require("../assets/cartas/" + card + ".png")} alt="" />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                {status !== "" && (<div className="row mt-2">
                    <h1>El ganador es - {status}</h1>
                </div>)}
            </div>
        </div>
    );
}
