import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormButton from "../common/components/FormButton";
import { useErrorHandler } from "../common/utils/ErrorHandler";
import { refreshGame, Player, newgame, dragcard, stop } from "../blackjack/blackjackService";
import './blackjack.css';
import { User } from "../user/userService";
import DangerLabel from "../common/components/DangerLabel";
import IMAGES from "../assets/card";

interface Card {
    name: string
}

const INITIAL_STATE = new Array();

export function Blackjack() {

    const history = useNavigate();
    const errorHandler = useErrorHandler();

    const divCartas = document.querySelector('#jugador-cartas');

    const game_id = localStorage.getItem("game_id");
    let user: User
    user = JSON.parse(`${localStorage.getItem("user")}`);

    const [players, setPlayers] = useState<Player[]>(INITIAL_STATE);
    const [cards, setCards] = useState<string[]>(INITIAL_STATE);

    /*  (async () => {
         while (status) {
             errorHandler.cleanRestValidations()
             try {
                 let players = await refreshGame({
                     game_id
                 })
                 setPlayers(players);
             } catch (error) {
                 errorHandler.processRestValidations(error)
             }
             setTimeout(() => {
                 console.log('checkgames')
             }, 2000);
         }
     })(); */

    const checkrefresh = async () => {
        errorHandler.cleanRestValidations()
        try {
            let players = await refreshGame({
                game_id
            })
            setPlayers(players.players);
        } catch (error) {
            errorHandler.processRestValidations(error)
        }
    }

    const resetgame = async () => {
        errorHandler.cleanRestValidations()
        try {
            await newgame({
                game_id
            })
            setCards(INITIAL_STATE);
        } catch (error) {
            errorHandler.processRestValidations(error)
        }
    }

    const solcard = async () => {
        errorHandler.cleanRestValidations()
        try {
            let card = await dragcard({
                game_id,
                user_id: user.id
            })
            cards.push(card)
            /* const imgCarta = document.createElement('img');
            imgCarta.src = `assets/cartas/${ card }.png`; //3H, JD
            imgCarta.classList.add('carta');
            if(divCartas != null){
                divCartas.append( imgCarta );
            } */
        } catch (error) {
            errorHandler.processRestValidations(error)
        }
    }

    const stopcard = async () => {
        errorHandler.cleanRestValidations()
        try {
            await stop({
                game_id,
                user_id: user.id
            })
        } catch (error) {
            errorHandler.processRestValidations(error)
        }
    }

    useEffect(() => {

    }, [players]);

    return (
        <>
            <div className="row">
                <div className="col">
                    <button id="btnNuevo" className="btn btn-danger" onClick={resetgame}>Nuevo Juego</button>
                    <button id="btnPedir" className="btn btn-primary" onClick={solcard}>Pedir carta</button>
                    <button id="btnDetener" className="btn btn-primary" onClick={stopcard}>Detener</button>
                </div>
            </div>
            <div className="row">
                {players.map((player, i) => (
                    <div className="col-sm-5 m-2 p-2">
                        <div key={i} className="card">
                            <div className="card-body">
                                <h5 className="card-title">{player.name} - {player.points}</h5>
                                {cards.map((card, i) => (
                                    <h1 key={i}>{card}</h1>
                                ))}
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
        </>
    );
}