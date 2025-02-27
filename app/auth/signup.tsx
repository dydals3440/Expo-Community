import FixedBottomCTA from "@/components/FixedBottomCTA";

import { StyleSheet, View } from "react-native";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import EmailInput from "@/components/EmailInput";
import PasswordInput from "@/components/PasswordInput";
import PasswordConfirmInput from "@/components/PasswordConfirmInput";

type FormValues = {
  email: string;
  password: string;
  passwordConfirm: string;
};

export default function SignupScreen() {
  const signupForm = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (formValues) => {
    console.log(formValues);
  };

  return (
    // Provider로 감싼 곳에서, react-hook-form을 사용할려면 Controller를 사용해야함
    <FormProvider {...signupForm}>
      <View style={styles.container}>
        <EmailInput />
        <PasswordInput submitBehavior={"submit"} />
        <PasswordConfirmInput />
      </View>
      {/* 안드로이드는 inset.bottom = 0 그래서 12로 나오게함. */}
      <FixedBottomCTA
        label="회원가입하기"
        onPress={signupForm.handleSubmit(onSubmit)}
      />
    </FormProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
    gap: 16,
  },
});
