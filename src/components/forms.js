import React, { useState } from 'react'
import { PostApiAction } from '../redux/action/action';
import { useDispatch, useSelector } from 'react-redux';

export const Forms = () => {

    const [title, setTitle] = useState('');

    const dispatch = useDispatch();

    const titleHandler = (e) => {
        setTitle(e.targate.value)
    }

    const clickHandler = (e) => {
        e.preventDefault();
        const finalData = {
            title: title,
        };
        dispatch(PostApiAction(finalData));
    };
    return (
        <div>
            <input onChange={(e) => titleHandler(e)} type="text" placeholder='Add Title' />
            <button onClick={(e) => { clickHandler(e) }}>Add</button>
        </div>
    )
}

export default Forms;
