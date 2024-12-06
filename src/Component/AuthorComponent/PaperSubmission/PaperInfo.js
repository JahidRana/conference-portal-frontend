import React, { useEffect } from "react";
import axios from "axios";

function PaperInfo({ formData, setFormData, wordLimit, setWordLimit, setIsValid, isValid, researchAreas, setResearchAreas }) {

  // Fetch research areas from the backend
  useEffect(() => {
    const fetchResearchAreas = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/submit/get-research-areas`);
        setResearchAreas(response.data.researchAreas);
      } catch (error) {
        console.error("Error fetching research areas:", error);
      }
    };

    fetchResearchAreas();
  }, [setResearchAreas]);

  return (
    <div className="w-70 m-auto authorContainer my-4">
      <div>
        <label className="mt-3 text-dark"><strong>Title : </strong> </label>
        <input
          className='form-control'
          type="text"
          placeholder="Title ...."
          value={formData.title}
          required
          onChange={(event) =>
            setFormData({ ...formData, title: event.target.value })
          }
        />
      </div>

      <div>
        <label className="mt-3 text-dark"><strong>Abstract : </strong> </label>
        <textarea
          className='form-control height'
          id="word"
          type="text"
          placeholder="Abstract...."
          value={formData.abstract}
          onChange={(e) => {
            setFormData({ ...formData, abstract: e.target.value });

            let res = [];
            let str = e.target.value.replace(/[\t\n\r\.\?\!]/gm, " ").split(" ");
            str.map((s) => {
              let trimStr = s.trim();
              if (trimStr.length > 0) {
                res.push(trimStr);
              }
            });
            setWordLimit(res.length);
            if (res.length > 250) {
              setIsValid(false);
              document.querySelector('#textarea_message').innerText = 'max length ' + 250 + ' Words only!';
              document.getElementById('word').setAttribute('style', 'border: 3px solid red');
            } else {
              setIsValid(true);
              document.getElementById("word").removeAttribute('style');
              document.querySelector('#textarea_message').innerText = '';
            }
          }}
        />
        <div className={`d-flex justify-content-between ${isValid ? 'text-primary' : 'text-danger'} fw-bold`}>
          <p id="show" className="fw-bold">{wordLimit}/250</p>
          <p id="textarea_message"></p>
        </div>
      </div>

      <div>
  <label className="mt-3 text-dark"><strong>Keywords(Maximum 5 keywords, separated by comma): </strong></label>
  <input
    className='form-control'
    type="text"
    placeholder="Keywords...."
    value={formData.keywords}
    onChange={(event) => {
      const inputKeywords = event.target.value;
      const keywordArray = inputKeywords.split(',').map((keyword) => keyword.trim()).filter((keyword) => keyword !== '');

      if (keywordArray.length > 5) {
        setIsValid(false);
        document.getElementById('keywords_message').innerText = 'Maximum 5 keywords allowed';
        document.getElementById('keyword_input').setAttribute('style', 'border: 3px solid red');
      } else {
        setIsValid(true);
        document.getElementById('keywords_message').innerText = '';
        document.getElementById('keyword_input').removeAttribute('style');
        setFormData({ ...formData, keywords: inputKeywords });
      }
    }}
    id="keyword_input"
  />
  <p id="keywords_message" className="text-danger"></p>
</div>


      
    </div>
  );
}

export default PaperInfo;
