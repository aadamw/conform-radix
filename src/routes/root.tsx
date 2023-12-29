import { conform, useForm } from "@conform-to/react";
import { parse } from "@conform-to/zod";
import { type Submission } from "@conform-to/dom";
import type { ActionFunctionArgs } from "react-router-dom";
import { Form, useActionData, json } from "react-router-dom";
import { z } from "zod";

import { Button } from "../components/ui/button";
import { CheckboxField, Field } from "@/components/form";

const schema = z.object({
  email: z.string().email(),
  terms: z.boolean(),
});

export async function rootAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const submission = parse(formData, { schema });

  if (!submission.value || submission.intent !== "submit") {
    return json(submission);
  }

  alert("Form submitted!");
  return json(submission);
}

export default function Component() {
  const lastSubmission = useActionData() as Submission<z.infer<typeof schema>>;
  const [form, fields] = useForm({
    lastSubmission,
    onValidate({ formData }) {
      return parse(formData, { schema });
    },
    shouldValidate: "onSubmit",
    shouldRevalidate: "onBlur",
  });

  return (
    <Form method="post" {...form.props} className="flex-col inline-flex gap-2">
      <Field
        labelProps={{
          htmlFor: fields.email.id,
          children: "Email",
        }}
        inputProps={{
          autoFocus: true,
          ...conform.input(fields.email),
        }}
        errors={fields.email.errors}
      />
      <CheckboxField
        labelProps={{
          children: "Agree to terms and conditions",
        }}
        buttonProps={conform.input(fields.terms, {
          type: "checkbox",
        })}
        errors={fields.terms.errors}
      />
      <hr />
      <Button type="submit">Save</Button>
    </Form>
  );
}
