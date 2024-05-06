import { useContext, useState } from 'react';
import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import { createUser } from '../util/auth';
import { Alert } from 'react-native';
import { AuthContext } from '../store/auth-context';

function Signup() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext);

  async function signupHelper({email, password}) {
    setIsAuthenticating(true);
    try {
      const token = await createUser(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      setIsAuthenticating(false);
      if (error.response?.data?.error?.message == "EMAIL_EXISTS") {
        Alert.alert('El email ya existe en el sistema', 'Intente con uno nuevo.');
        return;
      }
      Alert.alert('No se pudo crear el usuario', 'Favor de revisar los datos e intente de nuevo.');
      
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Creando usuario..." />
  }

  return <AuthContent onAuthenticate={signupHelper}/>;
}

export default Signup;