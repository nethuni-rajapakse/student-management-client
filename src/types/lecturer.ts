export interface LecturerName {
  firstName: string;
  lastName: string;
}

export interface CreateLecturerProps {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  phoneNumber: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  profilePhoto: string;
  address: string;
  createdAt: string;
  updatedAt: string;
  departmentId: number;
}

export interface Lecturer {
  lecturerId: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  phoneNumber: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  profilePhoto: string;
  address: string;
  createdAt: string;
  updatedAt: string;
  departmentId: number;
}
