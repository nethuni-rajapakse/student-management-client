import React, { useEffect, useState } from "react";
import { StudentProps } from "../../types/student";
import { getStudents } from "../../services/StudentService";

const AllStudents = () => {
  const [students, setStudents] = useState<StudentProps[]>([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const studentsData = await getStudents();
        setStudents(studentsData);
      } catch (error) {
        console.error("Failed to fetch students:", error);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div>
      <h1>All Students</h1>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Student ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Date of Birth</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Gender</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map((student) => (
              <tr key={student.studentId}>
                <td>{student.studentId}</td>
                <td>{student.firstName}</td>
                <td>{student.lastName}</td>
                <td>{student.dateOfBirth}</td>
                <td>{student.email}</td>
                <td>{student.phoneNumber}</td>
                <td>{student.gender}</td>
                {/* <td>
                  <img
                    src={student.profilePhoto}
                    alt={`${student.firstName} ${student.lastName}`}
                    width="50"
                  />
                </td>
                <td>{student.address}</td>
                <td>{new Date(student.createdAt).toLocaleDateString()}</td>
                <td>{new Date(student.updatedAt).toLocaleDateString()}</td> */}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} style={{ textAlign: "center" }}>
                No students found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllStudents;
