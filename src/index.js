import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import FontFaceObserver from 'fontfaceobserver'
import App from 'components/App'
import reducers from './reducers'
import './global.scss'
import 'sanitize.css/sanitize.css'


const openSansObserver = new FontFaceObserver('Open Sans', {})
let store = createStore(reducers)

console.log('getState', store.getState())
openSansObserver
  .load()
  .then(() => {
    document.body.classList.add('font-loaded')
  }, () => {
    document.body.classList.remove('font-loaded')
  })

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
document.getElementById('app'))

if (module.hot) {
  module.hot.accept()
}
