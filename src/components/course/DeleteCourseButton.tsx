import { Trash2 } from "lucide-react";
import { deleteCourse } from "../../services/CourseService";
import Swal from "sweetalert2";

interface DeleteCourseButtonProps {
  courseId: number;
}

const DeleteCourseButton = ({ courseId }: DeleteCourseButtonProps) => {
  const handleDeleteCourse = async (courseId: number) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      await deleteCourse(courseId);

      Swal.fire({
        title: "Course Deleted",
        icon: "success",
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      }).then(() => {
        window.location.reload();
      });
    }
  };

  return (
    <div>
      <Trash2
        onClick={() => handleDeleteCourse(courseId)}
        size={18}
        className="text-gray-500 hover:text-blue-600 cursor-pointer transition-colors duration-200"
      />
    </div>
  );
};

export default DeleteCourseButton;
