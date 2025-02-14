import { useState } from "react";
import UpdateCourseForm from "../../components/course/UpdateCourseForm";
import { PenTool } from "lucide-react";

interface UpdateCourseButtonProps {
  courseId: number;
}

const UpdateCourseButton = ({ courseId }: UpdateCourseButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);

  const handleOpenModal = (courseId: number) => {
    setSelectedCourseId(courseId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCourseId(null);
  };

  return (
    <div>
      <PenTool
        size={18}
        className="text-gray-500 hover:text-blue-600 cursor-pointer transition-colors duration-200"
        onClick={() => handleOpenModal(courseId)}
      />

      {/* UpdateCourseForm Modal */}
      {isModalOpen && selectedCourseId !== null && (
        <UpdateCourseForm
          courseId={selectedCourseId}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default UpdateCourseButton;
