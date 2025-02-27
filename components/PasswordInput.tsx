import { Controller, useFormContext } from "react-hook-form";
import InputField from "@/components/InputField";
import { TextInputProps } from "react-native";

interface Props {
  submitBehavior?: TextInputProps["submitBehavior"];
}

function PasswordInput({ submitBehavior = "blurAndSubmit" }: Props) {
  const { control, setFocus } = useFormContext();
  return (
    <Controller
      name="password"
      control={control}
      rules={{
        validate: (data: string) => {
          if (data.length === 0) {
            return "비밀번호를 입력해주세요.";
          }
          if (data.length < 8) {
            return "비밀번호는 8자리 이상이어야 합니다.";
          }
        },
      }}
      render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
        <InputField
          ref={ref}
          label="비밀번호"
          placeholder="비밀번호을 입력해주세요."
          submitBehavior={submitBehavior}
          // strong password 꺼줌.
          textContentType="oneTimeCode"
          onChangeText={onChange}
          secureTextEntry
          value={value}
          error={error?.message}
          onSubmitEditing={() => setFocus("passwordConfirm")}
        />
      )}
    />
  );
}

export default PasswordInput;
