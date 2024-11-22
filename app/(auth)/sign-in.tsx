import { Link } from 'expo-router';
import { useState } from 'react';
import { ScrollView, Text, View, Image } from 'react-native';

import CustomButton from '~/components/CustomButton';
import InputField from '~/components/InputField';
import OAuth from '~/components/OAuth';
import { icons, images } from '~/constants';

export default function SignIn() {
  const onSignInPress = async () => {};
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative h-60 w-full">
          <Image source={images.signUpCar} className="z-0 h-60 w-full" />
          <Text className="font-JakartaSemiBold absolute bottom-5 left-5 text-2xl text-black">
            Welcome
          </Text>
        </View>
      </View>
      <View className="p-5">
        <InputField
          label="Email"
          placeholder="Enter your email"
          icon={icons.email}
          value={form.email}
          onChangeText={(value) => setForm({ ...form, email: value })}
        />
        <InputField
          label="Password"
          placeholder="Enter your password"
          icon={icons.lock}
          value={form.password}
          secureTextEntry
          onChangeText={(value) => setForm({ ...form, password: value })}
        />
        <CustomButton title="Sign In" onPress={onSignInPress} className="mt-6" />

        <OAuth />

        <Link href="/sign-up" className="mt-10 text-center text-lg text-general-200">
          <Text className="">Don't have an account? </Text>
          <Text className="text-primary-500">Sign Up</Text>
        </Link>
        {/* TODO: Verification Modal */}
      </View>
    </ScrollView>
  );
}
