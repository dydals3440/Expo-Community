import { Controller, useFormContext } from "react-hook-form";
import InputField from "@/components/InputField";

function DescriptionInput() {
  // setFocus시, ref를 달아줘야함
  const { control } = useFormContext();
  return (
    <Controller
      name="description"
      control={control}
      rules={{
        validate: (data: string) => {
          if (data.length <= 5) {
            return "내용 입력해주세요.";
          }
        },
      }}
      render={({ field: { ref, onChange, value }, fieldState: { error } }) => (
        <InputField
          ref={ref}
          label="내용"
          placeholder="내용을 입력해주세요."
          returnKeyType="next"
          onChangeText={onChange}
          value={value}
          error={error?.message}
          multiline
        />
      )}
    />
  );
}

export default DescriptionInput;
