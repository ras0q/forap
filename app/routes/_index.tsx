import { useLoaderData } from "@remix-run/react";

export const loader = async () => {
  const formIds = ["1", "2", "3"];

  return { formIds };
};

export default function Index() {
  const { formIds } = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <h1 className="text-4xl font-bold">Welcome to Remix!</h1>
      <ul>
        {formIds.map((id) => (
          <li key={id}>
            <a href={`/forms/${id}`} className="text-blue-500 hover:underline">
              Form {id}
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
