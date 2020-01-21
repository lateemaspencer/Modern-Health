import React from 'react';
import { render } from 'react-dom';
import 'semantic-ui-css/semantic.min.css'

import Messages from './components/Messages';
import './style.css';

const App: React.FC<{}> = () => <><Messages /></>;

render(<App />, document.getElementById('root'));