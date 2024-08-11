import { z } from "zod";
import { Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { formSchema } from "./TransformationForm";

type customerFieldProps = {
  control: Control<z.infer<typeof formSchema>>;
  render: (props: any) => JSX.Element;
  name: keyof z.infer<typeof formSchema>;
  formLabel: string;
  className: string;
};

const CustomField = ({
  control,
  render,
  name,
  formLabel,
  className,
}: customerFieldProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem className={className}>
            {formLabel && <FormLabel>{formLabel}</FormLabel>}
            <FormControl>{render({ field })}</FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default CustomField;
