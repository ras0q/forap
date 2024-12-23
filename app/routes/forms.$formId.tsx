import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Form as RemixForm, useLoaderData } from "@remix-run/react";
import { FormComponentList } from "~/components/FormComponentList";
import { Form } from "../types/form";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const formId = params.formId;
  if (!formId) {
    throw new Response("Not Found", { status: 404 });
  }

  // TODO: Fetch data from the server
  const form: Form = {
    id: formId,
    title: "New Feedback Form",
    channelId: "123",
    components: [
      {
        type: "text",
        label: "Name",
        placeholder: "Enter your name",
      },
      {
        type: "select",
        label: "Favorite Color",
        options: ["Red", "Green", "Blue"],
      },
      {
        type: "checkbox",
        label: "Favorite Foods",
        options: ["Pizza", "Tacos", "Sushi", "Burgers"],
      },
    ],
  };

  return { form };
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  console.log("Form submitted", formData);
  return new Response(null, { status: 201 });
};

export default function Index() {
  const { form } = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-4xl font-bold">{form.title}</h1>
      <RemixForm key={form.id} method="post" className="w-96 space-y-4">
        <FormComponentList components={form.components} />
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded-md"
        >
          Submit
        </button>
      </RemixForm>
    </div>
  );
}
