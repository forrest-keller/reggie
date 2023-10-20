import React, { FunctionComponent } from "react";
import { BaseEdge, EdgeLabelRenderer, EdgeProps } from "reactflow";

const SelfConnectingEdge: FunctionComponent<EdgeProps> = (props) => {
  const { sourceX, sourceY, targetX, targetY, markerEnd } = props;
  const radiusX = (sourceX - targetX) * 0.6;
  const radiusY = 90;
  const edgePath = `M ${sourceX - 5} ${sourceY} A ${radiusX} ${radiusY} 0 1 0 ${
    targetX + 2
  } ${targetY}`;

  console.log(edgePath);

  return <BaseEdge {...props} path={edgePath} markerEnd={markerEnd} />;
};

export default SelfConnectingEdge;
