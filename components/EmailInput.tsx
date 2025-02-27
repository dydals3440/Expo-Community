import { Controller, useFormContext } from "react-hook-form";
import InputField from "@/components/InputField";

function EmailInput() {
  // setFocus시, ref를 달아줘야함
  const { control, setFocus } = useFormContext();
  return (
    <Controller
      name="email"
      control={control}
      rules={{
        validate: (data: string) => {
          if (data.length === 0) {
            return "이메일을 입력해주세요.";
          }
          if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(data)) {
            return "올바른 이메일 형식이 아닙니다.";
          }
        },
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <InputField
          autoFocus
          label="이메일"
          placeholder="이메일을 입력해주세요."
          inputMode="email"
          returnKeyType="next"
          // 이메일 입력하고 Enter를 눌러도 키보드가 내려가지 않음.
          // 비밀번호 인풋으로 옮기는 법
          submitBehavior="submit"
          onSubmitEditing={() => setFocus("password")}
          onChangeText={onChange}
          value={value}
          error={error?.message}
        />
      )}
    />
  );
}

export default EmailInput;
