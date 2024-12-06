import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import AdminServices from '../../../Services/makeAdmin';
import { useLoaderData } from 'react-router-dom';
import './CommitteeComponent.css';

const CommitteeComponent = () => {
  const committeeList = useLoaderData();
  const [committees, setCommittees] = useState(committeeList.data);
  const [selectedCommitteeId, setSelectedCommitteeId] = useState(committees[0]?._id);

  useEffect(() => {
    const options = document.querySelectorAll('#committee-select option');
    options.forEach((option, index) => {
      if (index % 2 === 0) {
        option.classList.add('even-option');
      } else {
        option.classList.add('odd-option');
      }
      option.style.padding = '10px'; // Add padding dynamically
    });
  }, [committees]);

  const handleRemoveMember = async (committeeId, memberId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#008000',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Remove the member from the committee in the backend
          const res = await AdminServices.RemoveMemberFromCommittee(committeeId, memberId);

          if (res) {
            Swal.fire(
              'Deleted!',
              'Member removed successfully!',
              'success'
            );

            // Update state to reflect the removal
            const updatedCommittees = committees.map(committee => {
              if (committee._id === committeeId) {
                // Filter out the removed member
                const updatedMembers = committee.mainCommittee.members.filter(member => member._id !== memberId);
                return {
                  ...committee,
                  mainCommittee: {
                    ...committee.mainCommittee,
                    members: updatedMembers
                  }
                };
              } else {
                return committee;
              }
            });

            setCommittees(updatedCommittees);
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Remove member failed',
              showConfirmButton: false,
              timer: 1500
            });
          }
        } catch (error) {
          // Show error message if removal fails
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Failed to remove member',
            showConfirmButton: false,
            timer: 1500
          });
        }
      }
    });
  };

  const addMemberToCommittee = async (committeeId, memberData) => {
    const formData = new URLSearchParams();
    for (const key in memberData) {
      formData.append(key, memberData[key]);
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/admin/committee/${committeeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      return await response.json();
    } catch (error) {
      console.error('There was a problem with your fetch operation:', error);
      throw error;
    }
  };

  const handleAddMember = async (committeeId) => {
    const { value: formValues } = await Swal.fire({
      title: 'Add New Member',
      html:
        '<input id="swal-input1" class="swal2-input" placeholder="Name">' +
        '<input id="swal-input2" class="swal2-input" placeholder="Affiliation">' +
        '<input id="swal-input3" class="swal2-input" placeholder="Email">' +
         '<input id="swal-input4" class="swal2-input" placeholder="Designation">' ,
        // '<input id="swal-input5" class="swal2-input" placeholder="Designation">',
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Add Member',
      cancelButtonText: 'Cancel',
      preConfirm: () => {
        return {
          name: document.getElementById('swal-input1').value,
          affiliation: document.getElementById('swal-input2').value,
          email: document.getElementById('swal-input3').value,
          designation: document.getElementById('swal-input4').value,
          // convenor: document.getElementById('swal-input5').value,
        }
      }
    });
    if (formValues) {
      try {
        const res = await addMemberToCommittee(committeeId, formValues);
        console.log("Full API response:", res); // To understand the structure

        if (res && res.mainCommittee && res.mainCommittee.members) {
          const newMember = res.mainCommittee.members[res.mainCommittee.members.length - 1]; // Assuming the new member is the last one in the array
          console.log("New Member data:", newMember);
          Swal.fire('Added!', 'Member added successfully!', 'success');

          // Update the local state with the new member...
          setCommittees(committees.map(committee => {
            if (committee._id === committeeId) {
              return {
                ...committee,
                mainCommittee: {
                  ...committee.mainCommittee,
                  members: [...committee.mainCommittee.members, newMember],
                },
              };
            }
            return committee;
          }));
        } else {
          Swal.fire('Error', 'Failed to add member', 'error');
        }

      } catch (error) {
        Swal.fire('Error', 'Failed to add member', 'error');
      }
    }
  };

  return (
    <div className="committee-container">
      <h2>Committee List</h2>
      <label htmlFor="committee-select" className='committe-select'>Select Committee:</label>
      <select
        id="committee-select" className='committe-select-box'
        onChange={(e) => setSelectedCommitteeId(e.target.value)}
        value={selectedCommitteeId}
      >
        {committees.map((committee, index) => (
          <option key={committee._id} value={committee._id} className={index % 2 === 0 ? 'even-option' : 'odd-option'}>
            {committee.mainCommittee.committeeName}
          </option>
        ))}
      </select>

      {committees
        .filter((committee) => committee._id === selectedCommitteeId)
        .map((committee) => (
          <div className="committee-card" key={committee._id}>
            <h3 className="committee-name">
              Committee Name: {committee.mainCommittee.committeeName}
              <button className="add-member-button" onClick={() => handleAddMember(committee._id)}>Update Member</button>
            </h3>
            <ul className="member-list">
              {committee.mainCommittee.members.map((member) => (
                <li className="member-item" key={member._id}>
                  <div className="member-details">
                    <span>Name:</span> {member.name}, <span>Affiliation:</span> {member.affiliation}, <span>Email:</span> {member.email}, <span>Designation:</span> {member.designation}
                  </div>
                  <div className="member-actions">
                    <button className="remove-button" onClick={() => handleRemoveMember(committee._id, member._id)}>Remove</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
    </div>
  );
};

export default CommitteeComponent;
