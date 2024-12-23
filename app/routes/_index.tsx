import { useLoaderData } from "@remix-run/react";
import { formCollection } from "~/repository/db";

export const loader = async () => {
  const forms = await formCollection.find().toArray();

  return { forms };
};

export default function Index() {
  const { forms } = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <h1 className="text-4xl font-bold">Welcome to Remix!</h1>
      <ul>
        {forms.map((form) => (
          // @ts-expect-error toString() is undefined
          <li key={form._id.toString()}>
            <a
              href={`/forms/${form._id}`}
              className="text-blue-500 hover:underline"
            >
              {form.title}
            </a>
          </li>
        ))}
        <li>
          <a href="/forms/new" className="text-blue-500 hover:underline">
            New
          </a>
        </li>
      </ul>
    </div>
  );
}
