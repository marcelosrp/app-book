import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes/';

import './scss/style.scss';

const App = () => {
	return (
		<BrowserRouter>
			<Routes />
		</BrowserRouter>
	);
}

export default App;
