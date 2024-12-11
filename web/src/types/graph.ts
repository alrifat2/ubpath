import { Node, Edge } from "@xyflow/react";

export interface Course {
  // extending from the @xyflow/react Node type. this is NOT needed but it's a workaround to make the type checker happy
  [key: string]: unknown;

  code: string;
  name: string;
  credits: number;
  prerequisites?: string[];
  corequisites?: string[];
  semester?: string;
}

export type CourseNode = Node<Course>;
export type CourseEdge = Edge;
