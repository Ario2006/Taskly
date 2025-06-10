"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [isAnimating, setIsAnimating] = useState(false);
  const [error, setError] = useState("");

  const handleNext = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setStep(step + 1);
      setIsAnimating(false);
    }, 300);
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    setError(""); // Clear error when user types
  };

  const handleSubmit = () => {
    // Check credentials from localStorage
    const users = JSON.parse(localStorage.getItem('taskly_users') || '[]');
    const user = users.find(u => 
      u.email.toLowerCase() === formData.email.toLowerCase() && 
      u.password === formData.password
    );

    if (user) {
      // Login successful
      localStorage.setItem('taskly_current_user', JSON.stringify({
        id: user.id,
        name: user.name,
        email: user.email
      }));
      
      // Redirect to dashboard
      setTimeout(() => {
        router.push('/dashboard');
      }, 1000);
    } else {
      // Login failed
      setError("Invalid email or password");
      setTimeout(() => {
        setStep(1);
        setFormData({ email: "", password: "" });
      }, 2000);
    }
  };

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center space-x-4 font-poppins text-xl font-bold text-black transform transition-transform duration-150 hover:scale-110">
            <Image src="/logo.svg" alt="Logo" width={28} height={28} />
            <span>Taskly</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md">
            {/* Error notification */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                {error}
              </div>
            )}

            <div className={`transition-all duration-300 ${isAnimating ? 'opacity-0 transform translate-x-4' : 'opacity-100 transform translate-x-0'}`}>
              {/* Step 1: Email/Username */}
              {step === 1 && (
                <div className="space-y-8">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-semibold text-gray-800">Welcome back</h2>
                    <p className="text-gray-600">Sign in to your Taskly account</p>
                  </div>
                  <div className="space-y-6">
                    <div className="relative">
                      <input
                        type="text"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full pb-2 text-lg border-b-2 border-gray-300 focus:border-blue-500 outline-none transition-colors bg-transparent"
                        placeholder="Email or username"
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

              {/* Step 2: Password */}
              {step === 2 && (
                <div className="space-y-8">
                  <div className="space-y-2">
                    <p className="text-gray-600">
                      Signing in as <span className="text-black font-medium">{formData.email}</span>
                    </p>
                  </div>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="relative">
                        <input
                          type="password"
                          value={formData.password}
                          onChange={(e) => handleInputChange('password', e.target.value)}
                          className="w-full pb-2 text-lg border-b-2 border-gray-300 focus:border-blue-500 outline-none transition-colors bg-transparent"
                          placeholder="Enter your password"
                          autoFocus
                        />
                      </div>
                      <div className="flex justify-end">
                        <Link href="/forgot-password" className="text-sm text-blue-500 hover:text-blue-600">
                          Forgot password?
                        </Link>
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

              {/* Step 3: Logging in */}
              {step === 3 && (
                <div className="space-y-8">
                  <div className="space-y-4">
                    <h2 className="text-2xl font-semibold text-gray-800">
                      {error ? "Login failed" : "Signing you in..."}
                    </h2>
                    <div className="flex justify-center">
                      {!error && (
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                      )}
                      {error && (
                        <div className="text-red-500">
                          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                  {/* Auto-submit after a short delay */}
                  {!error && setTimeout(() => handleSubmit(), 1500)}
                </div>
              )}
            </div>

            {/* Progress dots - only show for steps 1 and 2 */}
            {step < 3 && (
              <div className="flex gap-2 mt-12 justify-center">
                {[1, 2].map((dot) => (
                  <div
                    key={dot}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      dot <= step ? 'bg-gray-800 w-6' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Sign up link */}
            {step < 3 && (
              <div className="mt-8 text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <Link href="/signup" className="text-blue-500 hover:text-blue-600 font-medium">
                    Sign up
                  </Link>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <div className="lg:w-full h-full sm:h-full lg:h-full flex items-center justify-center bg-gradient-to-br from-blue-500 via-green-400 to-yellow-300">
        </div>
      </div>
    </div>
  );
}