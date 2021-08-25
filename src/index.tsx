import ReactDOM from 'react-dom'
import reportWebVitals from './reportWebVitals'
import { AppProvider } from './contexts/app/AppContext'
import { ThemeProvider } from 'theme-ui'
import theme from './theme'
import { EditorProvider } from './uibox'
import Cotainer from './Container'
import Routes from './Routes'
import 'focus-visible/dist/focus-visible'
import './styles/styles.scss'
import './i18n/index'

ReactDOM.render(
  <AppProvider>
    <ThemeProvider theme={theme}>
      <EditorProvider>
        <Cotainer>
          <Routes />
        </Cotainer>
      </EditorProvider>
    </ThemeProvider>
  </AppProvider>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
