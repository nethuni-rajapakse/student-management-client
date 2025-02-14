import { getLecturers } from "../../services/LecturerService";
import React, { useState, useEffect } from "react";
import { Lecturer } from "../../types/lecturer";

const AllLecturers = () => {
  const [lecturers, setLecturers] = useState<Lecturer[]>([]);

  useEffect(() => {
    const fetchLecturers = async () => {
      try {
        const lecturersData = await getLecturers();
        setLecturers(lecturersData);
      } catch (error) {
        console.error("Failed to fetch lecturers:", error);
      }
    };

    fetchLecturers();
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Lecturer ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Date of Birth</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Gender</th>
            <th>Profile Photo</th>
            <th>Address</th>
            <th>Department ID</th>
          </tr>
        </thead>
        <tbody>
          {lecturers.map((lecturer) => (
            <tr key={lecturer.lecturerId}>
              <td>{lecturer.lecturerId}</td>
              <td>{lecturer.firstName}</td>
              <td>{lecturer.lastName}</td>
              <td>{lecturer.dateOfBirth}</td>
              <td>{lecturer.email}</td>
              <td>{lecturer.phoneNumber}</td>
              <td>{lecturer.gender}</td>
              <td>
                <img
                  src={lecturer.profilePhoto}
                  alt={`${lecturer.firstName} ${lecturer.lastName}`}
                  width="50"
                  height="50"
                />
              </td>
              <td>{lecturer.address}</td>
              <td>{lecturer.departmentId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllLecturers;
