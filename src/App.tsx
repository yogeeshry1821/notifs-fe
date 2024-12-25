import useSocket from './hooks/useSocket';
import './App.css'

function App() {
  useSocket();

  return <div>React App with Socket.IO</div>;
  
}

export default App
