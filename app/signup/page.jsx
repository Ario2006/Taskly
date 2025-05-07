import Link from "next/link";
import Image from "next/image";
import { LoginForm } from "@/components/login-form"

export default function SugnupPage() {
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
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
      <div className="lg:w-full h-full sm:h-full lg:h-full flex items-center justify-center bg-gradient-to-br from-blue-500 via-green-400 to-yellow-300">
      </div>
    </div></div>
  );
}
