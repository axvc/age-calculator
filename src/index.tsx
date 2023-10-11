/* @refresh reload */
import { render } from 'solid-js/web'

import './styles/index.scss'
import App from './App.tsx'

const root = document.getElementById('root')

render(() => <App />, root!)
