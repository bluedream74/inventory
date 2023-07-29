import AuthProvider from "./provider/authProvider";
import Routes from "./routes";
import './assets/css/App.scss';

function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App
