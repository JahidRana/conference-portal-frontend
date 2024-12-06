import React, { useState, useEffect } from 'react';

function FilesUpload({ formData, setFormData, researchAreas }) {
  const [mainDomain, setMainDomain] = useState('');
  const [subDomainOptions, setSubDomainOptions] = useState([]);
  
  useEffect(() => {
    // Update subdomain options based on the selected main domain
    if (mainDomain) {
      const selectedDomain = researchAreas.find(domain => domain.mainDomain === mainDomain);
      setSubDomainOptions(selectedDomain ? selectedDomain.subDomains : []);
    } else {
      setSubDomainOptions([]);
    }
  }, [mainDomain, researchAreas]);

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      fileURL: e.target.files[0],
    });
  };

  const handleDomainChange = (e, domainNumber) => {
    setFormData({
      ...formData,
      [domainNumber]: e.target.value,
    });
  };

  return (
    <div className="input-group m-5 d-flex align-items-center border border-secondary p-5 w-auto">
      <div className="d-flex">
    
      </div>
      <div className="d-flex">
        <div className="d-flex align-items-center uploadPaper">
          <label className="mt-3 text-dark me-2"><strong>Upload Paper: </strong></label>
          <input
            type="file"
            required
            name="file"
            className="form-control w-50"
            onChange={handleFileChange}
          />
        </div>
        <div>
          <div className="d-flex align-items-center">
            <label className="mt-3 text-dark me-2"><strong>Main Domain: </strong></label>
            <select
              id="paperDomain1"
              className="form-select w-50"
              aria-label="Default select example"
              value={formData.paperDomain1}
              onChange={(e) => {
                setMainDomain(e.target.value);
                handleDomainChange(e, 'paperDomain1');
              }}
            >
              <option value="" disabled>Select Paper Main Domain</option>
              {researchAreas.map((domain, index) => (
                <option key={index} value={domain.mainDomain}>{domain.mainDomain}</option>
              ))}
            </select>
          </div>

          <div className="d-flex align-items-center">
            <label className="mt-3 text-dark me-2"><strong>Sub Domain 1: </strong></label>
            <select
              id="paperDomain2"
              className="form-select w-50"
              aria-label="Default select example"
              value={formData.paperDomain2}
              onChange={(e) => handleDomainChange(e, 'paperDomain2')}
            >
              <option value="N/A">N/A</option>
              {subDomainOptions.map((subDomain, index) => (
                <option key={index} value={subDomain}>{subDomain}</option>
              ))}
            </select>
          </div>
          <div className="d-flex align-items-center">
            <label className="mt-3 text-dark me-2"><strong>Sub Domain 2: </strong></label>
            <select
              id="paperDomain3"
              className="form-select w-50"
              aria-label="Default select example"
              value={formData.paperDomain3}
              onChange={(e) => handleDomainChange(e, 'paperDomain3')}
            >
              <option value="N/A">N/A</option>
              {subDomainOptions.map((subDomain, index) => (
                <option key={index} value={subDomain}>{subDomain}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilesUpload;
