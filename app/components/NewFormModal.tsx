import { useState } from "react";
import { FormComponent, FormComponentType } from "~/types/form";

type Props = {
  onSave: (component: FormComponent) => void;
  onClose: () => void;
};

export const Modal = (props: Props) => {
  const [type, setType] = useState<FormComponentType>("text");
  const [label, setLabel] = useState("");
  const [options, setOptions] = useState<string[]>([]);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={props.onClose}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          props.onClose();
        }
      }}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div
        role="button"
        tabIndex={0}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.stopPropagation();
          }
        }}
        className="flex flex-col gap-4 bg-white rounded-md p-8 w-1/2"
      >
        <h2 className="text-2xl font-semibold">コンポーネントを追加</h2>
        <select
          value={type}
          onChange={(e) => setType(e.target.value as FormComponentType)}
          className="p-2 border border-gray-300 rounded-md"
        >
          <option value="text">テキストフィールド</option>
          <option value="select">単一選択フィールド</option>
          <option value="checkbox">複数選択フィールド</option>
        </select>
        <div className="flex flex-col gap-4 w-full">
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="ラベルを入力"
            className="p-2 border border-gray-300 rounded-md"
          />
          {type !== "text" && (
            <textarea
              value={options.join("\n")}
              onChange={(e) => setOptions(e.target.value.split("\n"))}
              placeholder="オプションを入力（改行区切り）"
              className="p-2 border border-gray-300 rounded-md"
            />
          )}
        </div>
        <button
          type="button"
          onClick={() => {
            if (!label) {
              alert("ラベルを入力してください");
              return;
            }
            props.onClose();
            props.onSave({ type, label, options } as FormComponent);
          }}
          className="p-2 bg-blue-500 text-white rounded-md"
        >
          Save
        </button>
      </div>
    </div>
  );
};
