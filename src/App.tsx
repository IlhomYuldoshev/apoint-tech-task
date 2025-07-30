import { AuthProvider } from "./context/auth/auth-provider";
import { Routes } from "./routes";

function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;
