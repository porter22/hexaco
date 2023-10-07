import React, { useState } from 'react';

import CommonButton from '../../Buttons/CommonButton/CommonButton';

function FileUpload({ onFileUpload }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    if (file.size > 7 * 1024 * 1024) {
      setErrorMessage('File size exceeds 7MB limit.');
      return;
    }

    if (!file.type.startsWith('image/')) {
      setErrorMessage('Only image files are allowed.');
      return;
    }

    setSelectedFile(file);
    setErrorMessage('');
  };

  const handleUpload = () => {
    if (!selectedFile) {
      setErrorMessage('Please select a file.');
      return;
    }

    setIsLoading(true);

    // Simulate file upload delay (you can replace this with your actual file upload logic)
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccess(true);
      onFileUpload(selectedFile);
    }, 2000); // Simulate a 2-second delay
  };

  return (
    <div className="file-upload">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={isLoading || showSuccess}
      />
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {isLoading && <div className="loading-indicator">Uploading...</div>}
      {showSuccess && <div className="success-message">File uploaded successfully!</div>}
        <CommonButton classes="btn-prim mr-3 mt-3" type="submit" onClick={handleUpload} disabled={!selectedFile || isLoading || showSuccess}>
            Upload
        </CommonButton>
    </div>
  );
}

export default FileUpload;
