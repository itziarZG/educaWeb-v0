import RegisterForm from './register-form';
import GoogleLoginButton from '@/components/GoogleLoginButton';

export default function RegisterPage() {
  return (
    <section className="min-h-screen flex flex-col md:max-w-md mx-auto justify-center gap-2">
      <RegisterForm />
      <GoogleLoginButton />
    </section>
  );
}
