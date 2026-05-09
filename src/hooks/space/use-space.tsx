import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { type SpaceSchema, spaceSchema } from "@/schemas/space-schema";

const DEFAULT_VALUES: SpaceSchema = {
  name: "",
  address: "",
  phones: [{ value: "" }],
};

export const useSpace = ({
  onSubmit,
  initialValues,
}: {
  onSubmit: (data: SpaceSchema) => void;
  initialValues?: Partial<SpaceSchema>;
}) => {
  const form = useForm<SpaceSchema>({
    resolver: zodResolver(spaceSchema),
    values: initialValues ? { ...DEFAULT_VALUES, ...initialValues } : DEFAULT_VALUES,
  });

  const phoneFields = useFieldArray<SpaceSchema>({
    control: form.control,
    name: "phones",
  });

  const handleSubmit = form.handleSubmit(onSubmit);

  return { form, phoneFields, handleSubmit };
};
