import { SignedIn, SignedOut, useAuth, useUser } from '@clerk/clerk-expo';
import { Link } from 'expo-router';
import { Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Home() {
  const { user } = useUser();
  const { signOut } = useAuth();

  return (
    <SafeAreaView>
      <SignedIn>
        <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
        <TouchableOpacity
          onPress={async () => {
            await signOut();
          }}>
          <Text>Sign out</Text>
        </TouchableOpacity>
      </SignedIn>
      <SignedOut>
        <Link href="/sign-in">
          <Text>Sign In</Text>
        </Link>
        <Link href="/sign-up">
          <Text>Sign Up</Text>
        </Link>
      </SignedOut>
    </SafeAreaView>
  );
}
