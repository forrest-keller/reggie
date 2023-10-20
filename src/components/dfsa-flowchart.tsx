import DFSA from "@/classes/dfsa";
import { FunctionComponent, useCallback, useEffect, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  Edge,
  EdgeChange,
  MarkerType,
  Node,
  NodeChange,
  Position,
  applyEdgeChanges,
  applyNodeChanges,
} from "reactflow";
import CircleNode from "./circle-node";
import SmartBezierEdge, { SmartEdge } from "@tisoap/react-flow-smart-edge";

interface DFSAFlowchartProps {
  dfsa: DFSA;
}

const DFSAFlowchart: FunctionComponent<DFSAFlowchartProps> = ({ dfsa }) => {
  const [edges, setEdges] = useState<Edge[]>([]);
  const [nodes, setNodes] = useState<Node[]>([]);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  useEffect(() => {
    const newNodes: Node[] = [];
    const newEdges: Edge[] = [];
    let ni = 0;

    dfsa.getStates().forEach((state, v2) => {
      newNodes.push({
        id: state,
        data: { label: state },
        position: { x: 200 * ni, y: 0 },
        sourcePosition: Position.Bottom,
        targetPosition: Position.Right,
        type: "circle",
      });
      ni++;
    });

    dfsa.getTransitionFunction().forEach((to, [from, symbol]) => {
      newEdges.push({
        id: `${from}-${to}-${symbol}`,
        source: from,
        target: to,
        label: symbol,
        type: "smart",
        markerEnd: {
          type: MarkerType.Arrow,
        },
      });
    });

    setNodes(newNodes);
    setEdges(newEdges);
  }, [dfsa]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      draggable={true}
      edgeTypes={{ smart: SmartBezierEdge }}
      nodeTypes={{ circle: CircleNode }}
    >
      <Background />
      <Controls />
    </ReactFlow>
  );
};

export default DFSAFlowchart;
