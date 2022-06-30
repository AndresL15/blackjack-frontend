import axios from "axios"
import { environment } from "../app/environment/environment"

export interface Games {
    games: Game[]
}

export interface Game {
    id: string
    name: string
    desc: string
    winner: string
}

export async function create(params: {
    name: string
    desc: string
    user_id: string | null
}): Promise<string> {
    const res = (await axios.post(environment.backendUrl + "/games", params))
        .data as string
    return res
}

export async function join(game_id: string, params: {
    user_id: string | null
}): Promise<Game> {
    const res = (await axios.post(environment.backendUrl + "/games/" + game_id + "/join" , params))
        .data as Game
    setGame(res.id)
    return res
}

export async function refreshGames(): Promise<Games> {
    const res = (await axios.get(environment.backendUrl + "/games"))
        .data as Games
    return res
}

function setGame(id: string) {
    localStorage.setItem("game_id", id)
}


