import { Link } from 'expo-router';
import { Text, View } from 'react-native';

import { Container } from '~/components/Container';

export default function Home() {
  return (
    <>
      <Container>
        <Text>Hello</Text>
        <Link href="/">
          <View>
            <Text />
          </View>
        </Link>
      </Container>
    </>
  );
}
