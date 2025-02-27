import { Controller, useFormContext } from "react-hook-form";
import InputField from "@/components/InputField";

function EmailInput() {
  const { control } = useFormContext();
  return (
    <Controller
      name="email"
      control={control}
      render={({ field: { onChange, value } }) => (
        <InputField
          label="이메일"
          placeholder="이메일을 입력해주세요."
          onChangeText={onChange}
          value={value}
        />
      )}
    />
  );
}

export default EmailInput;
