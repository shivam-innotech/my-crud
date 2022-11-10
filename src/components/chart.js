import React, { useState, useEffect } from 'react'
import { UpdateApiAction } from '../redux/action/action';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import getDetailsByHooks from '../hooks/getDetailsByHooks';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export const UpdateDetails = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');

    const [detailsById] = getDetailsByHooks(id);
    useEffect(() => {
        const data = () => {
            if (detailsById.data) {
                setTitle(detailsById.data.data['options'][0]['vote']);
                console.log('----', detailsById.data.data['options'][0]['vote']);
            }
        };
        data();
    }, [detailsById.data]);


    return (
        <div className='container'>
            <h1>{title}</h1>

            <Link to='/homes'>
                <button
                    className='btn btn-outline-info'>Back</button>
            </Link>
        </div>
    )
}

export default UpdateDetails;