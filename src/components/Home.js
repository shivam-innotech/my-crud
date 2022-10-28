import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetApiAction } from '../redux/action/action';

const Home = () => {
    const dispatch = useDispatch();
    const responseData = useSelector(state => state.reducer.details);
    // console.log('responseData=>', responseData);
    useEffect(() => {
        dispatch(GetApiAction());
    }, [dispatch]);

    const result = responseData.map((data, index) => {
        return <div key={index}>
            <div className="card">
                <h5 className="card-header">{data['title']}</h5>
                <div className="card-body">
                    {/* <h5 className="card-title">{data['options']}</h5> */}
                    <button type="button" className="btn btn-success">Success</button>
                    <button type="button" className="btn btn-warning">Warning</button>
                    <button type="button" className="btn btn-danger">Danger</button>
                </div>
            </div>
        </div>
    })
    return (
        <h1 className='container'>{result}</h1>

    )
}

export default Home