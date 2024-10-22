import { useState } from 'react';
import Specialty from './specialties';
import AllDoctorList from './allDoctorList';
import SpecialtyDoctorList from './specialtyDoctorList';

const DoctorListContainer = () => {
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [showSpecialty, setShowSpecialty] = useState(false);

  const handleSpecialtyChange = (specialty) => {
    setSelectedSpecialty(specialty);
  };

  const toggleSpecialtyHidden = () => {
    setShowSpecialty(!showSpecialty);
  };

  return (
    <div className="relative w-full flex flex-col max-lg:items-center lg:flex-row lg:justify-between gap-4">
      {/* Desktop specialty selector */}
      <div className="min-w-[30%] max-w-[40%] lg:block hidden">
        <Specialty 
          selectedSpecialty={selectedSpecialty} 
          onSpecialtyChange={handleSpecialtyChange}
          start={true}
        />
      </div>

      {/* Mobile trigger button */}
      <div className='w-full max-w-[400px] md:w-[85%] md:max-w-[800px] sm:max-w-[600px] lg:hidden bg-white/70 pt-3 pb-2 px-3 sticky top-[45px] z-30'>
        <button 
          onClick={toggleSpecialtyHidden}  
          id='specialty' 
          className='w-full bg-[#205CD4] py-2 flex items-center justify-center rounded-3xl'
        >
          <p className='text-white'>Choose a specialty</p>
        </button>
      </div>

      {/* Mobile specialty modal */}
      {showSpecialty && (
        <div className="lg:hidden fixed inset-0 z-50 flex items-start justify-center bg-black/50">
          <div className="w-full max-w-md mt-16 mx-4 bg-white rounded-lg shadow-lg">
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Select Specialty</h2>
                <button 
                  onClick={toggleSpecialtyHidden}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <Specialty 
                selectedSpecialty={selectedSpecialty} 
                onSpecialtyChange={handleSpecialtyChange}
                start={true}
              />
            </div>
          </div>
        </div>
      )}
      
      {/* Doctor list section */}
      <div className="w-full lg:w-3/4">
        {selectedSpecialty === 'all' ? (
          <div className='w-full flex flex-col items-center'>
            <AllDoctorList />
          </div> 
        ) : (
          <div className='w-full flex flex-col items-center'>
            <SpecialtyDoctorList specialty={selectedSpecialty} />
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorListContainer;