import { ActionFunctionArgs } from "@remix-run/node";
import { Form as RemixForm } from "@remix-run/react";
import { useState } from "react";
import { FormComponentList } from "~/components/FormComponentList";
import { Modal } from "~/components/NewFormModal";
import { FormComponent, FormComponentType } from "~/types/form";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const components = JSON.parse(formData.get("components") as string);
  console.log("Form submitted", components);
  return new Response(null, { status: 201 });
};

export default function CreateForm() {
  const [components, setComponents] = useState<FormComponent[]>([]);
  const [componentType, setComponentType] = useState<FormComponentType>();

  return (
    <RemixForm
      method="post"
      className="flex flex-col gap-8 max-w-2xl w-full px-8"
    >
      <h1 className="text-4xl font-bold">フォームを作成</h1>
      {components.length > 0 && <FormComponentList components={components} />}
      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          className="p-2 bg-blue-500 text-white rounded-md"
          onClick={() => setComponentType("text")}
        >
          追加
        </button>
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded-md"
        >
          作成
        </button>
      </div>
      {componentType && (
        <Modal
          onSave={(component) => setComponents([...components, component])}
          onClose={() => setComponentType(undefined)}
        />
      )}
      <input
        hidden
        name="components"
        defaultValue={JSON.stringify(components)}
      />
    </RemixForm>
  );
}