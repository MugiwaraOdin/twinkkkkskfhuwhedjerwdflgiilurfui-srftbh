import { PrivyProvider } from '@privy-io/react-auth';
import { useRouter } from 'next/navigation';
import React from 'react';

// Privy configuration
const PRIVY_APP_ID = 'cmayaiqk700zqjy0mzhvv92n0';

export default function PrivyAuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <PrivyProvider
      appId={PRIVY_APP_ID}
      onSuccess={() => router.push('/dashboard')}
      config={{
        loginMethods: ['wallet', 'email', 'google'],
        appearance: {
          theme: 'dark',
          accentColor: '#ffd230', // Primary color from your theme
          logo: '/phoenix-logo.svg',
        },
        // Simplified login modal settings
        loginModal: {
          isClosable: true,
          widgetMode: "default"
        },
        // Simplified flow for better user experience
        oauth: {
          redirectUrl: typeof window !== 'undefined' ? `${window.location.origin}/dashboard` : undefined,
        }
      }}
    >
      {children}
    </PrivyProvider>
  );
}