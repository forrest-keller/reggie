import { CSSProperties, FunctionComponent } from "react";
import { EdgeProps } from "reactflow";
import SelfConnectingEdge from "./self-connecting-edge";
import SmartBezierEdge from "@tisoap/react-flow-smart-edge";

const TransitionEdge: FunctionComponent<EdgeProps> = (props) => {
  if (props.source === props.target) {
    return <SelfConnectingEdge {...props} />;
  }

  return <SmartBezierEdge {...props} />;
};

export default TransitionEdge;
