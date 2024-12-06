import React from 'react';
import './committee.css';

const Committee = ({ committeeInfo }) => {
    return (
        <section className="committee-container mb-5">
            <div className="container program-schedule">
            <h4 className='text-center'> Committee Members </h4>
                {committeeInfo.map((item, index) => (
                    <div key={index} className="committee-section">
                        {/* Main Committee */}
                        <h2 className="committee-title">{item?.mainCommittee?.committeeName}</h2>
                        <div className="members-list">
                            {item.mainCommittee?.members.map((member, index) => (
                                <div key={index} className="member-info">
                                    <p className="member-name">
                                        <strong>{member?.name}</strong>, {member?.affiliation}
                                    </p>
                                    {/* {member?.email && <p className="member-email">Email: {member?.email}</p>} */}
                                </div>
                            ))}
                        </div>

                        {/* Sub Committee */}
                        <h2 className="committee-title">{item?.subCommittee?.subCommitteeName}</h2>
                        <div className="members-list">
                            {item.subCommittee?.subCommitteeMembers.map((member, index) => (
                                <div key={index} className="member-info">
                                    <p className="member-name">
                                        <strong>{member?.name}</strong>, {member?.affiliation}
                                    </p>
                                    {/* {member?.email && <p className="member-email">Email: {member?.email}</p>} */}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Committee;
