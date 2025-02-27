import { Controller, useFormContext } from "react-hook-form";
import InputField from "@/components/InputField";

function EmailInput() {
  const { control } = useFormContext();
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
          label="이메일"
          placeholder="이메일을 입력해주세요."
          onChangeText={onChange}
          value={value}
          error={error?.message}
        />
      )}
    />
  );
}

export default EmailInput;
