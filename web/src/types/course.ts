export interface Course {
  id: string;
  code: string;
  name: string;
  credits: number;
  description?: string;
  prerequisites?: string[];
  corequisites?: string[];
  isPrerequisiteFor?: string[];
}
