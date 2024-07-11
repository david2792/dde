import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SearchSede from './componentes/SearchSede'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
    <header className="App-header">
        <SearchSede />
    </header>
</div>
);
};

export default App
