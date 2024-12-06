import React from 'react';
import Committee from '../../Component/Home/committee/committee';
import { useLoaderData } from 'react-router-dom';
import { useState } from 'react';

const DisplayCommittee = () => {
    const loadedInfo = useLoaderData();
    const [committeeInfo, setCommitteeInfo] = useState(loadedInfo.data);
    return (
        <div>
            <Committee committeeInfo={committeeInfo} />
        </div>
    );
};

export default DisplayCommittee;