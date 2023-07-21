import AuthProvider from "./provider/authProvider";
import Routes from "./routes";
import './App.scss';

function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App
