import { Link } from 'expo-router';
import { useState } from 'react';
import { ScrollView, Text, View, Image } from 'react-native';

import CustomButton from '~/components/CustomButton';
import InputField from '~/components/InputField';
import OAuth from '~/components/OAuth';
import { icons, images } from '~/constants';

export default function SignUp() {
  const onSignUpPress = async () => {};
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative h-60 w-full">
          <Image source={images.signUpCar} className="z-0 h-60 w-full" />
          <Text className="font-JakartaSemiBold absolute bottom-5 left-5 text-2xl text-black">
            Create Your Account
          </Text>
        </View>
      </View>
      <View className="p-5">
        <InputField
          label="Name"
          placeholder="Enter your name"
          icon={icons.person}
          value={form.name}
          onChangeText={(value) => setForm({ ...form, name: value })}
        />
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
        <CustomButton title="Sign Up" onPress={onSignUpPress} className="mt-6" />

        <OAuth />

        <Link href="/sign-in" className="mt-10 text-center text-lg text-general-200">
          <Text className="">Already have an account? </Text>
          <Text className="text-primary-500">Sign In</Text>
        </Link>
        {/* TODO: Verification Modal */}
      </View>
    </ScrollView>
  );
}
