import { useCallback } from "react";
import { Connection, useNodesState, useEdgesState } from "@xyflow/react";
import { CourseNode, CourseEdge } from "../../../types/graph";

// Example course data
const initialCourses: CourseNode[] = [
  {
    id: "CSE115",
    type: "course",
    draggable: false,
    position: { x: 0, y: 0 },
    data: {
      code: "CSE 115",
      name: "Introduction to Computer Science I",
      credits: 4,
    },
  },
  {
    id: "CSE116",
    type: "course",
    draggable: false,
    position: { x: 0, y: 150 },
    data: {
      code: "CSE 116",
      name: "Introduction to Computer Science II",
      credits: 4,
      prerequisites: ["CSE115"],
    },
  },
];

const initialEdges: CourseEdge[] = [
  {
    id: "e-cse115-cse116",
    source: "CSE115",
    target: "CSE116",
    style: { strokeWidth: 2 },
    animated: false,
  },
];

export const useGraphData = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialCourses);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((prevEdges) => [
        ...prevEdges,
        {
          ...connection,
          id: `e-${connection.source}-${connection.target}`,
          style: { strokeWidth: 2 },
          animated: false,
        },
      ]);
    },
    [setEdges]
  );

  return {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
  };
};
