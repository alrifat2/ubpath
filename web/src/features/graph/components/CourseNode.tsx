import { memo } from "react";
import { Handle, Position, NodeProps } from "@xyflow/react";

interface CourseNodeData {
  code: string;
  name: string;
  credits: number;
  type: "prerequisite" | "corequisite" | "current" | "future";
}

function CourseNode({ data }: NodeProps<CourseNodeData>) {
  const getNodeStyle = () => {
    switch (data.type) {
      case "prerequisite":
        return "border-amber-500 bg-amber-50";
      case "corequisite":
        return "border-purple-500 bg-purple-50";
      case "current":
        return "border-blue-500 bg-blue-50";
      case "future":
        return "border-gray-300 bg-gray-50";
      default:
        return "border-gray-300 bg-white";
    }
  };

  return (
    <div
      className={`px-4 py-2 shadow-lg rounded-lg border-2 ${getNodeStyle()}`}
    >
      <Handle type="target" position={Position.Top} className="!bg-gray-400" />

      <div className="min-w-[180px]">
        <div className="font-mono text-sm font-bold text-gray-700">
          {data.code}
        </div>
        <div className="text-sm font-medium text-gray-900">{data.name}</div>
        <div className="text-xs text-gray-500">{data.credits} credits</div>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-gray-400"
      />
    </div>
  );
}

export default memo(CourseNode);
