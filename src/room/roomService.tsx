import axios from "axios"
import { environment } from "../app/environment/environment"

export interface Game {
    id: string
    name: string
}

export interface Games {
    games: Game[]
}

export async function create(params: {
    name: string
}): Promise<string> {
    const res = (await axios.post(environment.backendUrl + "/games", params))
        .data as string
    return res
}

export async function join(params: {
    game_id: string
    user_id: string | null
}): Promise<Game> {
    const res = (await axios.post(environment.backendUrl + "/join", params))
        .data as Game
    setGame(res.id)
    return res
}

export async function refreshGames(): Promise<Games> {
    const res = (await axios.get(environment.backendUrl + "/games"))
        .data as Games
    return res
}

export async function refreshGame(params: {
    id: string | null
}): Promise<Game> {
    const res = (await axios.post(environment.backendUrl + "/refresh", params))
        .data as Game
    return res
}

function setGame(id: string) {
    localStorage.setItem("game_id", id)
}


