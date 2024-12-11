import { useCallback, useMemo } from "react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Node,
  Edge,
  Connection,
  ConnectionMode,
  Panel,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import CourseNode from "./components/nodes/CourseNode";

const nodeTypes = {
  courseNode: CourseNode,
};

const edgeTypes = {
  prerequisite: { animated: true, style: { stroke: "#f59e0b" } },
  corequisite: { animated: true, style: { stroke: "#8b5cf6" } },
  prerequisiteFor: { animated: true, style: { stroke: "#3b82f6" } },
};

const initialNodes: Node[] = [
  {
    id: "cse115",
    type: "courseNode",
    position: { x: 0, y: 0 },
    data: {
      code: "CSE 115",
      name: "Introduction to Computer Science I",
      credits: 4,
      type: "current",
    },
  },
  {
    id: "cse116",
    type: "courseNode",
    position: { x: 200, y: 100 },
    data: {
      code: "CSE 116",
      name: "Introduction to Computer Science II",
      credits: 4,
      type: "future",
    },
  },
];

const initialEdges: Edge[] = [
  {
    id: "e1-2",
    source: "cse115",
    target: "cse116",
    type: "prerequisite",
    label: "Prerequisite",
  },
];

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const memorizedNodeTypes = useMemo(() => nodeTypes, []);

  return (
    <div className="w-screen h-screen bg-[#fdfbf8]">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={memorizedNodeTypes}
        edgeTypes={edgeTypes}
        connectionMode={ConnectionMode.Loose}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        deleteKeyCode={["Backspace", "Delete"]}
        multiSelectionKeyCode={["Meta", "Ctrl"]}
        selectionKeyCode={["Shift"]}
        defaultEdgeOptions={{
          type: "prerequisite",
          animated: true,
        }}
      >
        <Background color="#99999920" variant="dots" gap={12} size={1} />

        <Controls
          position="bottom-right"
          showInteractive={false}
          className="bg-white/50 backdrop-blur-sm"
        />

        <MiniMap
          nodeColor={(node) => {
            switch (node.data?.type) {
              case "prerequisite":
                return "#f59e0b";
              case "corequisite":
                return "#8b5cf6";
              case "current":
                return "#3b82f6";
              default:
                return "#e5e7eb";
            }
          }}
          maskColor="#fdfbf820"
          className="bg-white/50 backdrop-blur-sm rounded-lg"
        />

        <Panel
          position="top-left"
          className="bg-white/50 backdrop-blur-sm p-4 rounded-xl"
        >
          <h1 className="text-2xl font-bold text-gray-900">Course Map</h1>
          <p className="text-sm text-gray-600">
            Visualize your course prerequisites and plan your academic journey
          </p>
        </Panel>
      </ReactFlow>
    </div>
  );
}
