"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [isAnimating, setIsAnimating] = useState(false);

  const handleNext = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setStep(step + 1);
      setIsAnimating(false);
    }, 300);
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = () => {
    // Store user data in localStorage (mock database)
    const users = JSON.parse(localStorage.getItem('taskly_users') || '[]');
    const newUser = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email.toLowerCase(),
      password: formData.password // In real app, never store plain passwords!
    };
    users.push(newUser);
    localStorage.setItem('taskly_users', JSON.stringify(users));
    
    // Set current user
    localStorage.setItem('taskly_current_user', JSON.stringify({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email
    }));
    
    // Redirect to dashboard
    router.push('/dashboard');
  };

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="bg-muted relative hidden lg:block">
        <div className="lg:w-full h-full sm:h-full lg:h-full flex items-center justify-center bg-gradient-to-br from-blue-500 via-green-400 to-yellow-300">
        </div>
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center space-x-4 font-poppins text-xl font-bold text-black transform transition-transform duration-150 hover:scale-110">
            <Image src="/logo.svg" alt="Logo" width={28} height={28} />
            <span>Taskly</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md">
            <div className={`transition-all duration-300 ${isAnimating ? 'opacity-0 transform translate-x-4' : 'opacity-100 transform translate-x-0'}`}>
              {/* Step 1: Name */}
              {step === 1 && (
                <div className="space-y-8">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-semibold text-gray-800">Welcome to Taskly</h2>
                    <p className="text-gray-600">Let's start with your name</p>
                  </div>
                  <div className="space-y-6">
                    <div className="relative">
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="w-full pb-2 text-lg border-b-2 border-gray-300 focus:border-blue-500 outline-none transition-colors bg-transparent"
                        placeholder="Your name"
                        autoFocus
                      />
                    </div>
                    <button
                      onClick={handleNext}
                      disabled={!formData.name}
                      className="flex items-center gap-2 text-blue-500 hover:text-blue-600 disabled:text-gray-300 transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Email */}
              {step === 2 && (
                <div className="space-y-8">
                  <div className="space-y-2">
                    <p className="text-gray-600">
                      Your name is <span className="text-black font-medium">{formData.name}</span>
                    </p>
                  </div>
                  <div className="space-y-6">
                    <div className="relative">
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full pb-2 text-lg border-b-2 border-gray-300 focus:border-blue-500 outline-none transition-colors bg-transparent"
                        placeholder="Email address"
                        autoFocus
                      />
                    </div>
                    <button
                      onClick={handleNext}
                      disabled={!formData.email}
                      className="flex items-center gap-2 text-blue-500 hover:text-blue-600 disabled:text-gray-300 transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Password */}
              {step === 3 && (
                <div className="space-y-8">
                  <div className="space-y-2">
                    <p className="text-gray-600">
                      Your name is <span className="text-black font-medium">{formData.name}</span> and
                      you would like to sign up with the
                      email address <span className="text-black font-medium underline">{formData.email}</span>
                    </p>
                  </div>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <p className="text-gray-600 text-sm">
                        Create a strong password with a mix of some letters, symbols and numbers
                      </p>
                      <div className="relative">
                        <input
                          type="password"
                          value={formData.password}
                          onChange={(e) => handleInputChange('password', e.target.value)}
                          className="w-full pb-2 text-lg border-b-2 border-gray-300 focus:border-blue-500 outline-none transition-colors bg-transparent"
                          placeholder="••••••••••"
                          autoFocus
                        />
                      </div>
                    </div>
                    <button
                      onClick={handleNext}
                      disabled={!formData.password}
                      className="flex items-center gap-2 text-blue-500 hover:text-blue-600 disabled:text-gray-300 transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4: Confirmation */}
              {step === 4 && (
                <div className="space-y-8">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-semibold text-gray-800">Great, you are all set.</h2>
                    <p className="text-gray-600">
                      Welcome to Taskly, {formData.name}!
                    </p>
                  </div>
                  <button
                    onClick={handleSubmit}
                    className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full font-medium transition-colors"
                  >
                    Create account
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>

            {/* Progress dots */}
            <div className="flex gap-2 mt-12 justify-center">
              {[1, 2, 3, 4].map((dot) => (
                <div
                  key={dot}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    dot <= step ? 'bg-gray-800 w-6' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            {/* Already have an account link */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link href="/login" className="text-blue-500 hover:text-blue-600 font-medium">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}