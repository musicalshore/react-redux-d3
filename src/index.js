import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { AppContainer } from 'react-hot-loader'
import App from 'components/App'
import reducer from './redux/reducers'
import './style/global.scss'

let store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const render = Component => {
  const root = document.getElementById('app')
  ReactDOM.render(
    <Provider store={store}>
      <AppContainer>
        <Component {...root.dataset}/>
      </AppContainer>
    </Provider>,
    root
  )
}

render(App)

if (module.hot) {
  module.hot.accept('./components/App', () => { render(App) })
}
