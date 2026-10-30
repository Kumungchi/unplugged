import React from 'react';
import { ConvexReactClient } from 'convex/react';
import { ConvexProviderWithClerk } from 'convex/react-clerk';
import { ClerkProvider, useAuth } from '@clerk/react';

// Loaded only on staff routes so public visitors never fetch Clerk or receive
// its cookies before giving consent.
const StaffProviders: React.FC<{
  client: ConvexReactClient;
  afterSignOutUrl: string;
  children: React.ReactNode;
}> = ({ client, afterSignOutUrl, children }) => (
  <ClerkProvider afterSignOutUrl={afterSignOutUrl}>
    <ConvexProviderWithClerk client={client} useAuth={useAuth}>
      {children}
    </ConvexProviderWithClerk>
  </ClerkProvider>
);

export default StaffProviders;
