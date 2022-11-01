import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetApiAction, DeleteApiAction } from '../redux/action/action';
import { Link } from 'react-router-dom';

const Home = () => {
    const dispatch = useDispatch();
    const responseData = useSelector((state) => state.reducer.details);
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
                            <Link to={`/edit/${data._id}`}>
                                <button type="button" className="btn btn-outline-dark">Edit Title</button>
                            </Link>
                        </span>
                    </h5>
                    <div className="card-body">
                        {data.options.map((item, index) =>
                            <h6 key={index}>
                                <span >
                                    <Link>X</Link> &nbsp;
                                    <Link>Edit</Link> &nbsp;
                                    <input className='form-check-input' type="radio" name={data['_id']} />
                                </span>
                                &nbsp;{item.option}
                            </h6>
                        )}
                        <Link>
                            <button type="button" className="btn btn-outline-warning">Add New Options</button>
                        </Link>
                        <button type="button" className="btn btn-outline-danger" onClick={() => dispatch(DeleteApiAction(data._id))}>Delete Poll</button>
                    </div>
                </div>
            </div>
        )
    }) : null;
    return (
        <div className='container'>
            <h1>Admin Poll Page</h1><br />
            <Link to='/form'>
                <button type="button" className="btn btn-outline-success">Add New Poll</button>
            </Link>
            <Link to='/user'>
                <button type="button" className="btn btn-outline-info">List Users</button>
            </Link><br /><br />
            <h1>{result}</h1>
        </div>
    )
}

export default Home