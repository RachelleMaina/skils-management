export interface Skill {
  id: number;
  skill: string;
  proficiency: number;
  tags: string[];
}

export interface EmployeeProfile {
  employee: string;
  skills: Skill[];
  visible_to: string[];
}
