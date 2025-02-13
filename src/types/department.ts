export interface Department {
  departmentId: number;
  departmentName: string;
  headOfDepartmentId: number | null;
}

export interface newDepartment {
  departmentName: string;
}

export interface DepartmentCardProps {
  departmentId: number;
  departmentName: string;
  headOfDepartment?: string;
}
