import { Controller, useFormContext } from "react-hook-form";
import InputField from "@/components/InputField";

function PasswordInput() {
  const { control } = useFormContext();
  return (
    <Controller
      name="password"
      control={control}
      render={({ field: { onChange, value } }) => (
        <InputField
          label="비밀번호"
          placeholder="비밀번호을 입력해주세요."
          onChangeText={onChange}
          value={value}
        />
      )}
    />
  );
}

export default PasswordInput;
