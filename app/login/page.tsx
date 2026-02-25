import LoginForm from './login-form';
import GoogleLoginButton from '@/components/GoogleLoginButton';

export default function LoginPage() {
  return (
    <section className="min-h-screen flex flex-col md:max-w-md mx-auto justify-center gap-2">
      <LoginForm />
      <GoogleLoginButton />
    </section>
  );
}
