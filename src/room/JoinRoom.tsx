import { useNavigate } from "react-router-dom";
import { useErrorHandler } from "../common/utils/ErrorHandler"
import { useEffect, useState } from "react";
import FormButton from "../common/components/FormButton";
import { Game, join, refreshGames } from "./roomService";
import './joinRoom.css';
import DangerLabel from "../common/components/DangerLabel";
import { User } from "../user/userService";

const INITIAL_STATE = new Array();

export function JoinRoom() {

    const history = useNavigate();
    const errorHandler = useErrorHandler();

    const [games, setGames] = useState<Game[]>(INITIAL_STATE);

    const joinClick = async (i: number) => {
        let user: User
        user = JSON.parse(`${localStorage.getItem("user")}`);
        const game_id = games[i].id;
        try {
            await join({
                game_id,
                user_id: user.id
            })
            history("/blackjack")
        } catch (error) {
            errorHandler.processRestValidations(error)
        }
    }

    const checkrefresh = async () => {
        errorHandler.cleanRestValidations()
        try {
            let games = await refreshGames();
            setGames(games.games);
        } catch (error) {
            errorHandler.processRestValidations(error)
        }
    }

    useEffect(() => {

    }, [games]);

    /* const intervalID = setInterval(checkrefresh, 5000); */

    return (
        <div className="row">
            {games.map((game, i) => (
               <div className="col-sm-2 m-2 p-2">
                    <div key={i} className="card" onClick={() => joinClick(i)}>
                        <div className="card-body">
                            <h5 className="card-title">{game.name}</h5>
                        </div>
                    </div>
                </div>
            ))}
            <div className="mt-2">
                <DangerLabel message={errorHandler.errorMessage} />
                <FormButton label="Cancelar" onClick={() => history('/')} />
                <FormButton label="Refresh" onClick={checkrefresh} />
            </div>
        </div>
    );
}
