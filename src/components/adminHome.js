import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetApiAction, PostVoteApiAction } from '../redux/action/action';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../redux/reducer/authSlice';
import Edit from './Edit';
import Delete from './Delete';
import DeleteOption from './DeleteOption';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const AdminHome = () => {

    const [visible, setVisible] = useState({});
    const navigate = useNavigate();
    const user = useSelector(state => state.authSlice.user)
    const responseData = useSelector((state) => state.reducer.details);
    const dispatch = useDispatch();

    const handleOut = () => {
        dispatch(logout())
        navigate('/')
    }

    const handleChange = (pollId, optionId) => {
        setVisible(state => ({ ...state, [pollId]: optionId }))
    }

    const [title, setTitle] = useState('');
    const [errors, setErrors] = useState('');
    const [show, setShow] = useState('');
    const handleShow = () => setShow(true);

    const handleClose = () => {
        setShow(false);
    }

    const [options, setOptions] = useState([{
        id: 1,
        value: ""
    }, {
        id: 2,
        value: ""
    }]);
    const nextId = useRef(3);

    const clickHandler = (e) => {
        e.preventDefault();
        if (title?.length === 0 ||
            options.some(option => option.value.length === 0) || options.length === 0
        ) {
            setErrors(true)
        }
        // else {
        //     const finalData = {
        //         title: title,
        //         options: options.map(option => ({ option: option.value, vote: 0 }))
        //     };
        //     dispatch(PostApiAction(finalData));
        //     navigate('/homes')
        // }
        // console.log('****', finalData);
    };

    useEffect(() => {
        dispatch(GetApiAction());
    }, [dispatch]);


    const result = responseData ? responseData.map((data, index) => {
        return (
            <div key={index}>
                <div className="card">
                    <h5 className="card-header">
                        {data['title']}&nbsp;
                        <span>
                            {user?.role === 'admin' &&
                                <Edit id={data._id} />}
                        </span>

                        <span>
                            {user?.role === 'admin' &&
                                <Delete id={data._id} />}
                        </span>
                    </h5>
                    <div className="card-body">

                        {data.options.map((item, index) =>
                            <h6 key={index}>
                                <span >
                                    <input
                                        type="radio"
                                        onClick={() => handleChange(data._id, item.option)}
                                        name='radioval'
                                        className="btn btn-outline-primary" />
                                    {
                                        visible[data._id] === item.option &&
                                        <button
                                            type='button'
                                            onClick={() => dispatch(PostVoteApiAction({ id: data._id, option: item.option }))}
                                            className='btn btn-outline-success btn-sm'>Submit Vote</button>
                                    }
                                    <span
                                        name={data['_id']}
                                        value={item.option} />
                                    {item.option}
                                    {/* <Modal
                                        show={show} onHide={handleClose} backdrop="static" keyboard={false} >
                                        <Modal.Header closeButton>
                                            <Modal.Title>Result</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            {data.options.map((item, index) =>
                                                <h6 key={index}>
                                                    {item.option}
                                                </h6>)}
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={handleClose}>Close</Button>
                                            <Button
                                                onClick={(e) => { clickHandler(e) }}
                                                variant="primary">Save</Button>
                                        </Modal.Footer>
                                    </Modal> */}

                                    {user?.role === 'admin' &&
                                        <DeleteOption id={{ pollid: data._id, option: item.option }} ids={item.option} />}
                                </span> &nbsp;
                            </h6>
                        )}

                        <Link to={`/chart/${data._id}`}>
                            <button
                                type="button"
                                className="btn btn btn-outline-info">Result</button>
                        </Link>


                        {user?.role === 'admin' &&
                            <Link to={`/forms/${data._id}`}>
                                <button
                                    type="button"
                                    className="btn btn-outline-warning btn-sm">Add New Options</button>
                            </Link>}
                    </div>
                </div>
            </div >
        )
    }) : null;

    return (
        <div className='container'>
            <h1>Polling Page</h1>
            <button
                type="button"
                onClick={handleOut}
                className="btn btn-outline-primary">Logout</button>
            {user?.role === "admin" &&
                <Link to='/form'>
                    <button
                        type="button"
                        className="btn btn-outline-success">Add New Poll</button>
                </Link>}
            {user?.role === 'admin' &&
                <Link to='/user'>
                    <button
                        type="button"
                        className="btn btn-outline-info">List Users</button>
                </Link>}<br /><br />
            <hr />
            <h1>{result}</h1>
        </div>
    )

}

export default AdminHome