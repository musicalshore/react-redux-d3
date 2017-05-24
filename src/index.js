import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { AppContainer } from 'react-hot-loader'
import App from 'components/App'

import reducers from './redux/reducers'
import './themes/global.scss'

// const openSansObserver = new FontFaceObserver('Open Sans', {})
let store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

console.log('getState', store.getState())
// openSansObserver
//   .load()
//   .then(() => {
//     document.body.classList.add('font-loaded')
//   }, () => {
//     document.body.classList.remove('font-loaded')
//   })




// const mountingPoint = document.createElement('div')
// mountingPoint.className = 'app-container'
// document.body.appendChild(mountingPoint)

const render = Component => {
  ReactDOM.render(
    <Provider store={store}>
      <AppContainer>
        <Component />
      </AppContainer>
    </Provider>,
    document.getElementById('app')
  )
}

render(App)

if (module.hot) {
  module.hot.accept('./components/App', () => { render(App) })
}
