export interface CreateStudentProps {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  phoneNumber: string;
  gender: string;
  profilePhoto: string;
  address: string;
}

export interface StudentProps extends CreateStudentProps {
  studentId: number;
  createdAt: string;
  updatedAt: string;
}
