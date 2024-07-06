import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@auth';
import { Toaster } from '@components/ui/sonner';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Auth V5 Tutorial',
    description: 'Learn - Auth V5 Tutorial',
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth();
    return (
        <SessionProvider session={session}>
            <html lang="en">
                <body className={inter.className}>
                    <Toaster />
                    {children}
                </body>
            </html>
        </SessionProvider>
    );
}
