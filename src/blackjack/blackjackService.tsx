import axios from "axios"
import { environment } from "../app/environment/environment"

export interface Players {
  players: Player[]
}

export interface Player {
  name: string
  points: number
}

export async function refreshGame(params: {
  game_id: string | null
}): Promise<Players> {
  const res = (await axios.post(environment.backendUrl + "/refresh", params))
    .data as Players
  return res
}

export async function newgame(params: {
  game_id: string | null
}): Promise<string> {
  const res = (await axios.post(environment.backendUrl + "/newgame", params))
    .data as string
  return res
}

export async function dragcard(params: {
  game_id: string | null
  user_id: string | null
}): Promise<string> {
  const res = (await axios.post(environment.backendUrl + "/dragcard", params))
    .data as string
  return res
}

export async function stop(params: {
  game_id: string | null
  user_id: string | null
}): Promise<string> {
  const res = (await axios.post(environment.backendUrl + "/stop", params))
    .data as string
  return res
}





