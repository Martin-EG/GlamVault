"use client"

import LoginCard from '@/Features/auth/LoginCard'

const Login = () => (
  <main className="min-h-dvh bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100 flex items-center justify-center p-4">
    <div className="w-full max-w-sm">
      <LoginCard />
    </div>
  </main>
);

export default Login;
