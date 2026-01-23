// src/components/ui/ProjectModal.jsx (Updated – Smaller Size + Scrollable Details)
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const ProjectModal = ({ project, onClose }) => {
  const [currentImage, setCurrentImage] = useState(0);

  const prevImage = () => {
    setCurrentImage(prev => (prev > 0 ? prev - 1 : project.images.length - 1));
  };

  const nextImage = () => {
    setCurrentImage(prev => (prev < project.images.length - 1 ? prev + 1 : 0));
  };

  return (
    <div 
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4 py-8 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl max-w-3xl w-full mx-auto p-6 relative shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose} 
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-3xl"
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>

        {/* Image Carousel */}
        <div className="relative mb-6 m-2">
          <img 
            src={project.images[currentImage] || '/placeholder.jpg'} 
            alt={`${project.title} - Image ${currentImage + 1}`} 
            className="w-full h-64 md:h-80 object-contain rounded-xl"
          />
          {project.images.length > 1 && (
            <>
              <button 
                onClick={prevImage} 
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white/80 px-3 py-2 rounded-full hover:bg-white"
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
              <button 
                onClick={nextImage} 
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white/80 px-3 py-2 rounded-full hover:bg-white"
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </>
          )}
        </div>

        {/* Project Details */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold text-green-900 mb-4">{project.title}</h2>
          <p className="text-lg text-black-900 mb-4">{project.description}</p>
          <p className="text-gray-700 whitespace-pre-wrap">{project.details}</p>
          {/* <p className="text-md text-black-900 mt-6">
            Type: {project.type.replace('-', ' ').toUpperCase()} | Date: {new Date(project.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p> */}

          <p className="text-md text-black-900 mt-6">
            Type: {project.type.replace('-', ' ').toUpperCase()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;