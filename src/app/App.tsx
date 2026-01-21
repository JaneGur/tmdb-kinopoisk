import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import { store } from './store'
import { Routing } from '@common/routing'
import { useAppSelector, useGlobalLoading } from '@common/hooks'
import { selectTheme } from '@features/theme'
import { LinearProgress } from '@common/components/ui/linear-progress'
import './styles/global.css'
import 'react-toastify/dist/ReactToastify.css'

function ThemeInitializer() {
  const theme = useAppSelector(selectTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return null
}

function AppContent() {
  const theme = useAppSelector(selectTheme)
  const isGlobalLoading = useGlobalLoading()

  return (
    <>
      <ThemeInitializer />
      {isGlobalLoading && <LinearProgress />}
      <BrowserRouter>
        <Routing />
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme === 'dark' ? 'dark' : 'light'}
      />
    </>
  )
}

export function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  )
}
