import { Dispatch } from 'redux'
import { decksAPI, UpdateDeckParams } from './decks-api.ts'
import { addDeckAC, deleteDeckAC, setDecksAC, updateDeckAC } from './decks-reducer.ts'
import { setErrorAC, setStatusAC } from '../../app/app-reducer.ts'
import { isAxiosError } from 'axios'

export const fetchDecksTC = () => async (dispatch: Dispatch) => {
  try {
    dispatch(setStatusAC('loading'))
    const res = await decksAPI.fetchDecks()
    dispatch(setDecksAC(res.data.items))
    dispatch(setStatusAC('succeeded'))
  } catch (error) {
    dispatch(setStatusAC('failed'))
  }
}

export const addDeckTC = (name: string) => async (dispatch: Dispatch) => {
  return decksAPI.addDeck(name).then((res) => {
    dispatch(addDeckAC(res.data))
  })
}

export const deleteDeckTC = (id: string) => async (dispatch: Dispatch) => {
  try {
    const res = await decksAPI.deleteDeck(id)
    dispatch(deleteDeckAC(res.data.id))
  } catch (error) {
    let errorMessage: string

    if (isAxiosError(error))
      errorMessage = error.response
        ? `Ошибка сервера ${error.response.data.errorMessages[0].message}`
        : `Ошибка клиента: ${error.message}`
    else errorMessage = `Другая ошибка: ${(error as Error).message}`
    console.log(errorMessage)
  }
}

export const updateDeckTC = (params: UpdateDeckParams) => async (dispatch: Dispatch) => {
  try {
    const res = await decksAPI.updateDeck(params)
    dispatch(updateDeckAC(res.data))
  } catch (error) {
    let errorMessage: string

    if (isAxiosError(error))
      errorMessage = error.response
      ? `Ошибка сервера ${error.response.data.errorMessages[0].message}`
      : `Ошибка клиента: ${error.message}`
    else errorMessage = `Другая ошибка: ${(error as Error).message}`
    console.log(errorMessage)
  }
}