import { Handle, Position, Node } from "@xyflow/react";
import { Course } from "../../../types/graph";

const CourseNode = ({ data }: Node<Course>) => {
  return (
    <div className="w-[100px] h-[100px] rounded-full flex items-center justify-center bg-white border-2 border-stone-400 shadow-md relative">
      <Handle
        type="target"
        position={Position.Top}
        className="!opacity-0"
        style={{ width: "1px", height: "1px" }}
      />

      <div className="text-center font-bold">{data.code}</div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="!opacity-0"
        style={{ width: "1px", height: "1px" }}
      />
    </div>
  );
};

export default CourseNode;
