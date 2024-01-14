import {createServerComponentClient} from '@supabase/auth-helpers-nextjs'  
import {cookies} from 'next/headers'
import AuthPage from '@/components/Auth'
import { redirect } from 'next/navigation';


const Auth = async () => {

  const supabase = createServerComponentClient({cookies})
  const {data:{session}} = await supabase.auth.getSession()
  
  if(session){
    redirect('/profiles')
  }

  return (
    <AuthPage/>    
  );
};

export default Auth;

// const register = useCallback(async () => {
//   try {
//     await axios.post("/api/register", {
//       email,
//       name,
//       password,
//     });

//     login();
//   } catch (error) {
//     console.log(error);
//   }
// }, [email, name, password, login]);

// const login = useCallback(async () => {
//   try {
//     await signIn("credentials", {
//       email,
//       password,
//       redirect: false,
//       callbackUrl: "/",
//     });

//     router.push("/profiles");
//   } catch (error) {
//     console.log(error);
//   }
// }, [email, password, router]);
