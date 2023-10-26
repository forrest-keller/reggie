import DFSA from "@/classes/dfsa";
import { FunctionComponent, useEffect, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  Edge,
  EdgeTypes,
  MarkerType,
  Node,
  NodeTypes,
  OnEdgesChange,
  OnEdgesDelete,
  OnNodesChange,
  OnNodesDelete,
  Panel,
  Position,
  applyEdgeChanges,
  applyNodeChanges,
} from "reactflow";
import StateNode from "./state-node";
import { Center, Stack, Icon, Heading } from "@chakra-ui/react";
import { VscRegex } from "react-icons/vsc";
import TransitionEdge from "./transition-edge";

interface DFSAFlowchartProps {
  dfsa: DFSA;
}

type StateNode = Node<{ label: string }, "state" | string>;
type TransitionEdge = Edge<{ symbols: string[] }>;

const nodeTypes: NodeTypes = {
  state: StateNode,
};

const edgeTypes: EdgeTypes = {
  transition: TransitionEdge,
};

const DFSAFlowchart: FunctionComponent<DFSAFlowchartProps> = ({ dfsa }) => {
  const [edges, setEdges] = useState<Edge[]>([]);
  const [stateNodes, setStateNodes] = useState<StateNode[]>([]);

  const onNodesChange: OnNodesChange = (changes) => {
    setStateNodes((stateNodes) => applyNodeChanges(changes, stateNodes));
  };

  const onEdgesChange: OnEdgesChange = (changes) => {
    setEdges((eds) => applyEdgeChanges(changes, eds));
  };

  const onNodesDelete: OnNodesDelete = (deletedNodes) => {
    deletedNodes.forEach((deletedNode) => {
      dfsa.removeState(deletedNode.data.label);
    });
  };

  const onEdgesDelete: OnEdgesDelete = (deletedEdges: TransitionEdge[]) => {
    deletedEdges.forEach(({ source, data }) => {
      data?.symbols.forEach((symbol: string) =>
        dfsa.removeTransition(source, symbol)
      );
    });
  };

  console.log(dfsa);

  useEffect(() => {
    const newStateNodes: StateNode[] = [];
    const newEdges: Edge[] = [];
    let ni = 0;

    dfsa.getStates().forEach((state, v2) => {
      newStateNodes.push({
        id: state,
        data: { label: state },
        position: { x: 200 * ni, y: 0 },
        sourcePosition: Position.Bottom,
        targetPosition: Position.Right,
        type: "state",
      });
      ni++;
    });

    const edgeMap: Map<string, Map<string, string[]>> = new Map();

    dfsa.getTransitionFunction().forEach(({ from, symbol, to }) => {
      if (!edgeMap.has(from)) edgeMap.set(from, new Map());
      if (!edgeMap.get(from)?.has(to)) edgeMap.get(from)?.set(to, []);
      edgeMap.get(from)?.get(to)?.push(symbol);
    });

    edgeMap.forEach((toMap, from) => {
      toMap.forEach((symbols, to) => {
        newEdges.push({
          id: `${from}-${to}-${symbols.join("-")}`,
          source: from,
          target: to,
          label: symbols.join(", "),
          type: "transition",
          data: {
            symbols,
          },
          markerEnd: {
            type: MarkerType.Arrow,
          },
        });
      });
    });

    setStateNodes(newStateNodes);
    setEdges(newEdges);
  }, [dfsa]);

  return (
    <ReactFlow
      nodes={stateNodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onNodesDelete={onNodesDelete}
      onEdgesDelete={onEdgesDelete}
      edgeTypes={edgeTypes}
      nodeTypes={nodeTypes}
      draggable
      fitView
    >
      <Background />
      <Controls />
      <Panel position="top-center">
        <Center margin={5}>
          <Stack direction="row" spacing={2} align="center">
            <Icon boxSize={6} as={VscRegex} />
            <Heading fontSize="2xl">reggie</Heading>
          </Stack>
        </Center>
      </Panel>
    </ReactFlow>
  );
};

export default DFSAFlowchart;
