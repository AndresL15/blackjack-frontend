import axios from "axios"
import { environment } from "../app/environment/environment"

export interface Players {
  players: Player[]
}

export interface Player {
  name: string
  points: number
  cards: string
}

export interface Winner {
  winner: string
}

export async function refreshGame(game_id: string | null ): Promise<Players> {
  const res = (await axios.get(environment.backendUrl + "/games/" + game_id + "/refresh"))
    .data as Players
  return res
}

export async function newgame( game_id: string | null, params: {
  user_id: string | null
}): Promise<string> {
  const res = (await axios.post(environment.backendUrl + "/games/" + game_id + "/newgame", params))
    .data as string
  return res
}

export async function dragcard(game_id: string | null, params: {
  user_id: string | null
}): Promise<string> {
  const res = (await axios.post(environment.backendUrl + "/games/" + game_id + "/dragcard", params))
    .data as string
  return res
}

export async function stop(user_id: string | null): Promise<string> {
  const res = (await axios.get(environment.backendUrl + "/users/" + user_id + "/stop"))
    .data as string
  return res
}

export async function winner(game_id: string | null, params: {
  user_id: string | null
}): Promise<Winner> {
  const res = (await axios.post(environment.backendUrl + "/games/" + game_id + "/winner", params))
    .data as Winner
  return res
}





