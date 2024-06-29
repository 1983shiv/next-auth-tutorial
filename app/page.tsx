import { Button } from '@components/ui/button';
import { Poppins } from 'next/font/google'
import {LoginButton} from '@components/auth/login-button'

import {cn} from '@lib/utils'
import MyChart from '@components/MyChart';
import TimeChart from '@components/TimeChart';
const font = Poppins({ subsets: ["latin"], weight: ["600"]})

export default function Home() {
  
  return (
    <main className='flex h-screen flex-col items-center justify-center bg-gradient-to-tr from-gray-100 to-slate-400'>
      {/* <TimeChart /> */}
      <div className='space-y-6'>
        
        <h1 className={cn('text-6xl font-semibold text-white drop-shadow-md', font.className)}>Hello! Auth</h1>
        <p className='text-white text-lg text-center'>A Simple Authentication Services</p>
        <div className='flex justify-center items-center'>
          <LoginButton>
            <Button variant="secondary" size="lg">Sign In</Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}
