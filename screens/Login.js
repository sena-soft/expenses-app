import { useContext, useState } from 'react';
import AuthContent from '../components/Auth/AuthContent';
import { login } from '../util/auth';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import { Alert } from 'react-native';
import { AuthContext } from '../store/auth-context';

function Login() {

  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authCtx = useContext(AuthContext);

  async function loginHelper({email, password}) {
    setIsAuthenticating(true);
    try {
        const token =  await login(email, password);
        authCtx.authenticate(token);
    } catch (error) {
        Alert.alert('Error de autenticación', 'No se pudo verificar su identidad, favor de revisar sus credenciales o intente más tarde.');
        setIsAuthenticating(false);
    }
    
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Iniciando Sesión..." />
  }
  return <AuthContent isLogin onAuthenticate={loginHelper} />;
}

export default Login;