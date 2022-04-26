import './App.css';

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { CssBaseline } from '@mui/material';

import Demo from './pages/demo';
import Sudoku from './pages/sudoku';
import Home from './pages/home';
import Error from './pages/sudoku';

function App() {
	return <>
		<CssBaseline />
		<BrowserRouter>
			<Routes>
				<Route path='/' element={
					<Navigate to='demo' replace />
				} />
				<Route path='demo' element={<Demo />} />
				<Route path='sudoku' element={<Sudoku />} />
				<Route path='wiki' element={<Home />} />
				<Route path='*' element={<Error />} />
			</Routes>
		</BrowserRouter>
	</>
}

export default App;
