import { FormComponent } from "~/types/form";

type Props = {
  components: FormComponent[];
};

export const FormComponentList = (props: Props) => {
  return (
    <div className="flex flex-col gap-4">
      {props.components.map((component, index) => (
        <div key={index}>
          <label className="block font-semibold">{component.label}</label>
          {createFormComponent(component)}
        </div>
      ))}
    </div>
  );
};

const createFormComponent = (component: FormComponent) => {
  switch (component.type) {
    case "text":
      return (
        <input
          key={component.label}
          type="text"
          name={component.label}
          placeholder={component.placeholder}
          className="w-full p-2 border rounded-md"
        />
      );
    case "select":
      return (
        <select
          key={component.label}
          name={component.label}
          className="w-full p-2 border rounded-md"
        >
          {component.options.map((option, i) => (
            <option key={`${i}_${option}`} value={option}>
              {option}
            </option>
          ))}
        </select>
      );
    case "checkbox":
      return (
        <div key={component.label} className="space-y-2">
          {component.options.map((option, i) => (
            <label key={`${i}_${option}`} className="flex items-center">
              <input type="checkbox" name={component.label} value={option} />
              <span className="ml-2">{option}</span>
            </label>
          ))}
        </div>
      );
  }
};
