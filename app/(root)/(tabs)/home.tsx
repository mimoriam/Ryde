import { SignedIn, SignedOut, useAuth, useUser } from '@clerk/clerk-expo';
import { Link } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

export default function Home() {
  const { user } = useUser();
  const { signOut } = useAuth();

  return (
    <View>
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
    </View>
  );
}
