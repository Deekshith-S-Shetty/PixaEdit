"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

import CustomField from "./CustomField";
import { TransformationFormProps, Transformations } from "@/types";
import { aspectRatioOptions, transformationTypes } from "@/constants";
import { AspectRatioKey } from "@/lib/utils";
import { useEffect, useState, useTransition } from "react";
import { Button } from "../ui/button";
import { FileDiff } from "lucide-react";
import MediaUploader from "./MediaUploader";

export const formSchema = z.object({
  title: z.string(),
  aspectRatio: z.string().optional(),
  color: z.string().optional(),
  prompt: z.string().optional(),
  publicId: z.string(),
});

const TransformationForm = ({
  action,
  data = null,
  userId,
  type,
  creditBalance,
  config = null,
}: TransformationFormProps) => {
  const transformationType = transformationTypes[type];
  const [image, setImage] = useState(data);
  const [newTransformation, setNewTransformation] =
    useState<Transformations | null>(null);
  const [transformationConfig, setTransformationConfig] = useState(config);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTransforming, setIsTransforming] = useState(false);
  //startTransition lets you update the state without blocking the UI.
  const [isPending, setTransition] = useTransition();

  const initialValues = {
    title: data?.title || "",
    aspectRatio: data?.aspectRatio || "",
    color: data?.color || "",
    prompt: data?.prompt || "",
    publicId: data?.publicId || "",
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("values", values);
  };

  const onSelectFieldChangeHandler = (
    value: string,
    onChange: (value: string) => void
  ) => {
    const imageSize = aspectRatioOptions[value as AspectRatioKey];

    setImage((prevState: any) => ({
      ...prevState,
      aspectRatio: value,
      width: imageSize.width,
      height: imageSize.height,
    }));

    setNewTransformation(transformationType.config);
    return onChange(value);
  };

  const onInputChangeHandler = (
    fieldName: string,
    value: string,
    type: string,
    onChange: (value: string) => void
  ) => {
    setNewTransformation((prevState: any) => ({
      ...prevState,
      [type]: {
        ...prevState?.[type],
        [fieldName == "prompt" ? "prompt" : "to"]: value,
      },
    }));

    return onChange(value);
  };

  const onTransformHandler = () => {
    setIsTransforming(true);

    setTransformationConfig(newTransformation);

    setNewTransformation(null);

    setTransition(() => {
      // Update User Credits
    });
  };

  useEffect(() => {
    if (image && (type === "restore" || type === "removeBackground")) {
      setNewTransformation(transformationType.config);
    }
  }, [image, transformationType.config, type]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <CustomField
          control={form.control}
          name="title"
          formLabel="Image Title"
          className="w-full"
          render={({ field }) => {
            return <Input {...field} className="input-field -ml-1" />;
          }}
        />
        {type === "fill" && (
          <CustomField
            control={form.control}
            name="aspectRatio"
            formLabel="Aspect Ratio"
            className="w-full"
            render={({ field }) => {
              return (
                <Select
                  value={field.value}
                  onValueChange={(value) =>
                    onSelectFieldChangeHandler(value, field.onChange)
                  }
                >
                  <SelectTrigger className="select-field">
                    <SelectValue placeholder="Select size">
                      {field.value}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(aspectRatioOptions).map((key) => {
                      return (
                        <SelectItem
                          key={key}
                          value={key}
                          className="select-item"
                        >
                          {aspectRatioOptions[key as AspectRatioKey].label}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              );
            }}
          />
        )}

        {(type === "remove" || type === "recolor") && (
          <div className="prompt-field">
            <CustomField
              control={form.control}
              name="prompt"
              className="w-full"
              formLabel={
                type === "remove" ? "Object to Remove" : "Object to Recolor"
              }
              render={({ field }) => (
                <Input
                  value={field.value}
                  className="input-field"
                  onChange={(e) =>
                    onInputChangeHandler(
                      "prompt",
                      e.target.value,
                      type,
                      field.onChange
                    )
                  }
                />
              )}
            />
            {type === "recolor" && (
              <CustomField
                control={form.control}
                name="color"
                formLabel="Replacement Color"
                className="w-full"
                render={({ field }) => (
                  <Input
                    value={field.value}
                    className="input-field"
                    onChange={(e) =>
                      onInputChangeHandler(
                        "color",
                        e.target.value,
                        type,
                        field.onChange
                      )
                    }
                  />
                )}
              />
            )}
          </div>
        )}

        <div className="media-uploader-field">
          <CustomField
            control={form.control}
            name="publicId"
            className="flex size-full flex-col"
            render={({ field }) => (
              <MediaUploader
                onValueChange={field.onChange}
                setImage={setImage}
                publicId={field.value}
                image={image}
                type={type}
              />
            )}
          />
        </div>

        <div className="flex flex-col gap-4">
          <Button
            type="button"
            className="submit-button capitalize"
            disabled={isTransforming || newTransformation === null}
            onClick={onTransformHandler}
          >
            {isTransforming ? "Transforming..." : "Apply Transformation"}
          </Button>

          <Button
            type="submit"
            className="submit-button capitalize"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Save Image"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default TransformationForm;
