import './listdoctor.css';

import DoctorLayout from '../../../components/DoctorLayout';

import { Table , notification } from "antd";

import moment from "moment";

import axios from '../../../utils/axios';

import { useNavigate } from 'react-router-dom';

import { useEffect , useState } from 'react';

const Listslots = () => {

    const navigate= useNavigate();

    const [slots , setSlots] = useState([]);

    const columns = [
        {
            title: 'ID',
            dataIndex: '_id',
            key: '_id',
            render : (id) => { return <a>{id}</a>}
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            render : (date)=> { return moment(date).format('MM/DD/YYYY') }
        },
        {
            title: 'Start Time',
            dataIndex: 'startTime',
            key: 'startTime',
        },
        {
            title: 'End Time',
            dataIndex: 'endTime',
            key: 'endTime',
        },
        {
            title: 'Status',
            dataIndex: 'booked',
            key: 'booked',
        },
        
    ];

    const getSlots = async () => {
        const dbResponse = await axios.get('/doctor/get-slots');
        setSlots(dbResponse.data);
    };

    useEffect(()=> {
        getSlots()
    }, []);

    return (
        <>

            <DoctorLayout>

                <div className="add-btn-container">
                    <button className='add-button' onClick={ () => { 
                        navigate('/doctor/slots')
                    }}>Add Slots</button>
                </div>
                <Table dataSource={slots}  columns={columns} />

            </DoctorLayout>
        
        </>
    )
}

export default Listslots