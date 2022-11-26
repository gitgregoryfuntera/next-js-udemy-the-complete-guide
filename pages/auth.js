import { getSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import AuthForm from '../components/auth/auth-form';


function AuthPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getUserSession();
  },[]);

  const getUserSession = async () => {
    const session = await getSession();
    if (session) {
      router.replace('/');
    } else {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return <p>Loading...</p>
  }
  return <AuthForm />;
}

export default AuthPage;
