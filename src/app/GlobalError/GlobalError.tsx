import { useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { useSelector } from 'react-redux'
import { AppRootState } from '../store.ts'

export const GlobalError = () => {
  const errorMessage = useSelector<AppRootState, string | null>(state => state.app.error)

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage)
    }
  }, [errorMessage])

  return <ToastContainer theme="dark" autoClose={1000} />
}
