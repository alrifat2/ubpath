import {
  ReactFlowProvider,
  ReactFlow,
  Controls,
  Background,
  NodeTypes,
  Panel,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { LogIn, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import CourseNode from "./features/graph/components/CourseNode";
import { useGraphData } from "./features/graph/hooks/useGraphData";
import InfoModal from "./features/modal/components/InfoModal";
import { useInfoModal } from "./features/modal/hooks/useInfoModal";

const nodeTypes: NodeTypes = {
  course: CourseNode,
};

function App() {
  const navigate = useNavigate();
  const { isOpen, openModal, closeModal } = useInfoModal();
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } =
    useGraphData();

  return (
    <div className="w-screen h-screen">
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
          fitView
        >
          <Panel position="top-left" className="pointer-events-auto">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={openModal}
              className="p-2 text-gray-800 hover:text-blue-600 transition-colors"
            >
              <Info className="w-6 h-6" />
            </motion.button>
          </Panel>
          <Panel position="top-right" className="pointer-events-auto">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/auth/signin")}
              className="px-3 py-2 rounded-md bg-white/25 backdrop-blur-md border shadow-lg 
              hover:bg-white/30 transition-all duration-300 flex items-center gap-2
              hover:shadow-xl"
            >
              <LogIn className="w-5 h-5 text-gray-800" />
              <span className="text-gray-800 font-medium">Sign In</span>
            </motion.button>
          </Panel>
          <Background />
          <Controls position="bottom-left" />
        </ReactFlow>
      </ReactFlowProvider>

      <InfoModal isOpen={isOpen} onClose={closeModal} />
    </div>
  );
}

export default App;
