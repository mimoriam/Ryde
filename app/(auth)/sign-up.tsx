import { useSignUp } from '@clerk/clerk-expo';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, Text, View, Image, Alert } from 'react-native';
import { ReactNativeModal } from 'react-native-modal';

import CustomButton from '~/components/CustomButton';
import InputField from '~/components/InputField';
import OAuth from '~/components/OAuth';
import { icons, images } from '~/constants';

export default function SignUp() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [verification, setVerification] = useState({
    state: 'default',
    error: '',
    code: '',
  });

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

      setVerification({ ...verification, state: 'pending' });
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      Alert.alert('Error', err.errors[0].longMessage);
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });

      if (completeSignUp.status === 'complete') {
        // TODO: Create a database
        await setActive({ session: completeSignUp.createdSessionId });
        setVerification({ ...verification, state: 'success' });
      } else {
        setVerification({ ...verification, state: 'failed', error: 'Verification failed' });
      }
    } catch (err: any) {
      setVerification({ ...verification, state: 'failed', error: err.errors[0].longMessage });
    }
  };
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

        <ReactNativeModal
          isVisible={verification.state === 'pending'}
          onModalHide={() => {
            if (verification.state === 'success') setShowSuccessModal(true);
          }}>
          <View className="min-h-[300px] rounded-2xl bg-white px-7 py-9">
            <Text className="font-JakartaExtraBold mb-2 text-3xl">Verification</Text>
            <Text className="font-Jakarta mb-5">
              We've sent a verification code to {form.email}
            </Text>
            <InputField
              label="Code"
              icon={icons.lock}
              placeholder="290702"
              value={verification.code}
              keyboardType="numeric"
              onChangeText={(code) => setVerification({ ...verification, code })}
            />
            {verification.error && (
              <Text className="mt-1 text-sm text-red-500">{verification.error}</Text>
            )}
            <CustomButton
              title="Verify Email"
              onPress={onPressVerify}
              className="mt-5 bg-success-500"
            />
          </View>
        </ReactNativeModal>

        <ReactNativeModal isVisible={showSuccessModal}>
          <View className="min-h-[300px] rounded-2xl bg-white px-7 py-9">
            <Image source={images.check} className="mx-auto my-5 h-20 w-20" />
            <Text className="font-JakartaBold text-center text-3xl">Verified</Text>
            <Text className="font-Jakarta mt-2 text-center text-base text-gray-400">
              You have successfully verified your account.
            </Text>
            <CustomButton
              title="Browse Home"
              onPress={() => {
                setShowSuccessModal(false);
                router.push('/(root)/(tabs)/home');
              }}
              className="mt-5"
            />
          </View>
        </ReactNativeModal>
      </View>
    </ScrollView>
  );
}
