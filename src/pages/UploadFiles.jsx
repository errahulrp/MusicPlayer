import React, { useState } from 'react';

const UploadFiles = () => {
  const [audioFiles, setAudioFiles] = useState([]);
  const [currentFileName, setCurrentFileName] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCurrentFileName(file.name);
    setAudioFiles((prevFiles) => [...prevFiles, file]);
  };

  const handleUpload = () => {
    if (audioFiles.length > 0) {
      const file = audioFiles[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const audioData = e.target.result;
        localStorage.setItem(`audioData_${currentFileName}`, audioData);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-black">
      <div className="flex flex-col justify-center items-center h-screen gap-5">
        <input type="file" accept="audio/*" className="w-56 text-white font-Grenze" onChange={handleFileChange} />
        <button className="p-1 px-4 py-0.5 rounded-2xl bg-gradient-to-br  to-[#cce3de] from-[#f8ad9d] font-EB text-lg" onClick={handleUpload} disabled={audioFiles.length === 0} > Upload </button>
      </div>
    </div>
  );
};

export default UploadFiles;
