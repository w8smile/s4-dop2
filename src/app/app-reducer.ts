export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
  status: 'idle' as RequestStatusType,
  error: null as string | null,
}

type AppStateType = typeof initialState

export const appReducer = (state: AppStateType = initialState, action: ActionsType): AppStateType => {
  switch (action.type) {
    default:
      return state
  }
}

export const setStatusAC = (status: RequestStatusType)=>{
  return {
    type: 'SET-STATUS', status
  }as const
}

type ActionsType = ReturnType<typeof setStatusAC>