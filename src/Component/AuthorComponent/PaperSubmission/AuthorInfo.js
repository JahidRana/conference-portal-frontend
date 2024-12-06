import React from "react";

function AuthorInfo({ formData, setFormData, index }) {

  return (
    <div className="authorForm">

      <div className="authorContainer border border-secondary pb-5">
        <h4 className=" text-center my-3">Author {index + 1}</h4>
        <div className="d-flex justify-content-around">
          <div>
            <label className="mt-3 text-dark"><strong>First Name : </strong> </label>
            <input
              className='form-control'
              type="text"
              placeholder="First Name..."
              name="firstName"
              value={formData['author'][index]['firstName']}
              onChange={event => {
                let data = [...formData['author']];
                data[index][event.target.name] = event.target.value
                setFormData(
                  { ...formData, author: data }
                )
              }}
            />
          </div>
          <div>
            <label className="mt-3 text-dark"><strong>Last Name : </strong> </label>
            <input
              className='form-control'
              type="text"
              placeholder="Last Name..."
              name="lastName"
              value={formData['author'][index]['lastName']}
              onChange={event => {
                let data = [...formData['author']];
                data[index][event.target.name] = event.target.value
                setFormData(
                  { ...formData, author: data }
                )
              }}
            />
          </div>
        </div>


        <div className="d-flex justify-content-around">
          <div>
            <label className="mt-3 text-dark"><strong>Email : </strong> </label>
            <input
              className='form-control'
              type="email"
              placeholder="Enter Your Email...."
              name="email"
              value={formData['author'][index]['email']}
              onChange={event => {
                let data = [...formData['author']];
                data[index][event.target.name] = event.target.value
                setFormData(
                  { ...formData, author: data }
                )
              }}
            />
          </div>
          <div>
            <label className="mt-3 text-dark"><strong>Affiliation : </strong> </label>
            <input
              className='form-control'
              type="text"
              placeholder="Affiliation...."
              name="affiliation"
              value={formData['author'][index]['affiliation']}
              onChange={event => {
                let data = [...formData['author']];
                data[index][event.target.name] = event.target.value
                setFormData(
                  { ...formData, author: data }
                )
              }}
            />
          </div>
        </div>
        <div className="mt-4">
          <h5 className="text-center">Address</h5>
          <div className="d-flex flex-column border border-secondary pt-5" style ={{width: 'fit-content', margin : '0 auto', padding : "40px"}}>


            <div className="d-flex justify-content-center mb-3">
              <label className="mt-3 text-dark"><strong>Country : </strong> </label>
              <input
                className='form-control w-50'
                type="text"
                placeholder="Enter Your Country Name...."
                name="country"
                value={formData['author'][index]['country']}
                onChange={event => {
                  let data = [...formData['author']];
                  data[index][event.target.name] = event.target.value
                  setFormData(
                    { ...formData, author: data }
                  )
                }}
              />
            </div>
            <div className="d-flex justify-content-center mb-3">
              <label className="mt-3 text-dark"><strong>State : </strong> </label>
              <input
                className='form-control w-50'
                type="text"
                placeholder="Enter Your State Name...."
                name="state"
                value={formData['author'][index]['state']}
                onChange={event => {
                  let data = [...formData['author']];
                  data[index][event.target.name] = event.target.value
                  setFormData(
                    { ...formData, author: data }
                  )
                  console.log('stateeeeeeeeeeeeee', formData);
                }}
              />
            </div>
            <div className="d-flex justify-content-center mb-3">
              <label className="mt-3 text-dark"><strong>City : </strong> </label>
              <input
                className='form-control w-50'
                type="text"
                placeholder="Enter Your City Name...."
                name="city"
                value={formData['author'][index]['city']}
                onChange={event => {
                  let data = [...formData['author']];
                  data[index][event.target.name] = event.target.value
                  setFormData(
                    { ...formData, author: data }
                  )
                }}
              />
            </div>
            <div className="d-flex justify-content-center mb-3">
              <label className="mt-3 text-dark"><strong>Post-Code : </strong> </label>
              <input
                className='form-control w-50'
                type="text"
                placeholder="Enter Your Post-Code Name...."
                name="postCode"
                value={formData['author'][index]['postCode']}
                onChange={event => {
                  let data = [...formData['author']];
                  data[index][event.target.name] = event.target.value
                  setFormData(
                    { ...formData, author: data }
                  )
                }}
              />
            </div>
            <div className="d-flex justify-content-center mb-3">
              <label className="mt-3 text-dark"><strong>Street : </strong> </label>
              <input
                className='form-control w-50'
                type="text"
                placeholder="Enter Your Post-Code Name...."
                name="street"
                value={formData['author'][index]['street']}
                onChange={event => {
                  let data = [...formData['author']];
                  data[index][event.target.name] = event.target.value
                  setFormData(
                    { ...formData, author: data }
                  )
                }}
              />
            </div>
            <div className="d-flex justify-content-evenly mb-3 w-80">

              <div className="d-flex flex-column me-4">
                <label className="mt-3 text-dark"><strong>Line-1 : </strong> </label>
                <input
                  className='form-control w-60'
                  type="text"
                  placeholder="Enter Your street line"
                  name="line1"
                  value={formData['author'][index]['line1']}
                  onChange={event => {
                    let data = [...formData['author']];
                    data[index][event.target.name] = event.target.value
                    setFormData(
                      { ...formData, author: data }
                    )
                  }}
                />
              </div>
              <div className="d-flex flex-column">
                <label className="mt-3 text-dark"><strong>Line-2 : </strong> </label>
                <input
                  className='form-control w-60'
                  type="text"
                  placeholder="Enter Your street line number"
                  name="line2"
                  value={formData['author'][index]['line2']}
                  onChange={event => {
                    let data = [...formData['author']];
                    data[index][event.target.name] = event.target.value
                    setFormData(
                      { ...formData, author: data }
                    )
                  }}
                />
              </div>
            </div>


          </div>
        </div>
      </div>



    </div>
  );
}

export default AuthorInfo;
