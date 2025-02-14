export interface Department {
  departmentId: number;
  departmentName: string;
  headOfDepartmentId: number | null;
}

export interface createDepartmentProps {
  departmentName: string;
}

export interface DepartmentCardProps {
  departmentId: number;
  departmentName: string;
  headOfDepartment?: string;
}
