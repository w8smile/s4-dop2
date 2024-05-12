import { Dispatch } from 'redux'
import { isAxiosError } from 'axios'
import { setErrorAC } from '../../app/app-reducer.ts'


export const handleError =(error: any, dispatch: Dispatch)=>{
  let errorMessage: string
  if (isAxiosError(error))
    errorMessage = error.response
      ? `Ошибка сервера ${error.response.data.errorMessages[0].message}`
      : `Ошибка клиента: ${error.message}`
  else errorMessage = `Другая ошибка: ${(error as Error).message}`
  dispatch(setErrorAC(errorMessage))
}