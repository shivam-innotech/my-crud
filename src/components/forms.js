import React, { useRef, useState } from 'react'
import { PostApiAction } from '../redux/action/action';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export const Forms = () => {

    const [title, setTitle] = useState('');
    const [errors, setErrors] = useState('');
    const [show, setShow] = useState('');


    const [options, setOptions] = useState([{
        id: 1,
        value: ""
    }, {
        id: 2,
        value: ""
    }]);
    const nextId = useRef(3);


    const addOption = () => {
        setOptions(prev => [...prev, { id: nextId.current++, value: "" }]);
    }

    const removeOption = (index) => {
        setOptions(prev => {
            prev.splice(index, 1);
            return [...prev];
        });
    }

    const onChange = (index, e) => {
        setOptions(prev => {
            prev[index].value = e.target.value;
            return [...prev];
        })
    }


    const navigate = useNavigate();
    const dispatch = useDispatch();
    const titleHandler = (e) => {
        setTitle(e.target.value)
    }

    // const handleClick=() => {
    //     setOption2([...option2],{});
    // }

    // const optionHandler1 = (e) => {
    //     setOption1(e.target.value)
    // }
    // const optionHandler2 = (e) => {
    //     setOption2(e.target.value)
    // }
    // const optionHandler3 = (e) => {
    //     setOption3(e.target.value)
    // }
    // const optionHandler4 = (e) => {
    //     setOption4(e.target.value)
    // }
    const handleShow = () => setShow(true);
    const handleClose = () => {
        setShow(false);
    }

    const clickHandler = (e) => {
        e.preventDefault();
        if (title?.length === 0 ||
            options.some(option => option.value.length === 0) || options.length === 0
        ) {
            setErrors(true)
        } else {
            const finalData = {
                title: title,
                options: options.map(option => ({ option: option.value, vote: 0 }))
            };
            dispatch(PostApiAction(finalData));
            navigate('/homes')
        }
        // console.log('****', finalData);
    };

    return (
        <div className='container add'>
            <h1>Add New Poll</h1>
            <input onChange={(e) => titleHandler(e)} type="text" placeholder='Add Title' className='form-control' />
            {errors && title.length <= 0 ?
                <label
                    className='error'>Can't be empty!</label> : ''}<br />

            {
                options.map((option, i) => <div key={option.id}>

                    <div class="input-group mb-3">
                        <input type="text" class="form-control" aria-label="Text input with checkbox" placeholder='Enter option value'
                            value={option.value} onChange={(e) => onChange(i, e)} />
                        <button className='btn btn-secondary' type='button' onClick={() => removeOption(i)}>&times;</button>
                    </div>

                </div>)
            }
            <button className='btn btn-secondary' type='button' onClick={addOption}>Add Option</button> <br /><br />
            <button onClick={handleShow} className='btn btn-info'>Submit</button>


            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Confirm to Add</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to add this poll?
                    Once you click on save, the poll will be added at the end of the Poll List!
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={handleClose}>
                        Close
                    </Button>
                    <Button
                        onClick={(e) => { clickHandler(e) }}
                        variant="primary">Save</Button>
                </Modal.Footer>
            </Modal>
            <Link to='/homes'>
                <button className='btn btn-outline-primary'>Back</button>
            </Link>
        </div>
    )
}

export default Forms;