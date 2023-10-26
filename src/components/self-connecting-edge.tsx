import React, { FunctionComponent } from "react";
import { BaseEdge, EdgeLabelRenderer, EdgeProps } from "reactflow";

const SelfConnectingEdge: FunctionComponent<EdgeProps> = (props) => {
  const { sourceX, sourceY, targetX, targetY, markerEnd } = props;
  const radiusX = (sourceX - targetX) * 0.6;
  const radiusY = 50;
  const offset = 50;
  const edgePath = `M ${
    sourceX - offset
  } ${sourceY} A ${radiusX} ${radiusY} 0 1 0 ${targetX + offset} ${targetY}`;

  return (
    <>
      <BaseEdge {...props} path={edgePath} markerEnd={markerEnd} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${sourceX / 2}px,${
              sourceY - radiusY * 2
            }px)`,
            background: "white",
            padding: 5,
            fontSize: 10,
          }}
        >
          5
        </div>
      </EdgeLabelRenderer>
    </>
  );
};

export default SelfConnectingEdge;
