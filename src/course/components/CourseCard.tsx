import React, { useState } from "react";
import { Course } from "../../types/CourseType";

interface CourseCardProps {
  course: Course;
  onSelect: (courseId: number, isSelected: boolean) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onSelect }) => {
  const [isSelected, setIsSelected] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleSelectCourse = () => {
    const newSelectionState = !isSelected;
    setIsSelected(newSelectionState);
    onSelect(course.courseId, newSelectionState);
  };

  return (
    <div
      className={`max-w-sm mx-auto bg-white rounded-2xl p-6 transform transition-all duration-300 ease-in-out ${
        isHovered ? "scale-102 shadow-xl" : "shadow-lg"
      } ${isSelected ? "border-2 border-green-500" : "border border-gray-200"}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800 transition-colors duration-300 hover:text-blue-600">
          {course.courseName}
        </h2>

        <p className="text-gray-600 text-sm leading-relaxed">
          {course.description}
        </p>

        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
            Credits: {course.credits}
          </span>
          <span className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            ID: {course.courseId}
          </span>
          <span className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            {course.department}
          </span>
        </div>

        <button
          onClick={handleSelectCourse}
          className={`w-full py-2.5 px-4 rounded-lg font-medium transition-all duration-300 transform active:scale-95 ${
            isSelected
              ? "bg-green-500 hover:bg-green-600 text-white"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          <span className="flex items-center justify-center gap-2">
            {isSelected ? "Course Selected" : "Select Course"}
          </span>
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
