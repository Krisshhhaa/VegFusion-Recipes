import React from 'react';
import { useParams } from 'react-router-dom';
import FetchRecipeById from './FetchRecipeById';

const Detail = () => {
    const { id } = useParams();

    return (
        <div className="container d-flex justify-content-center align-items-center my-4">
            <div className="card shadow-lg p-4 rounded bg-light" style={{ maxWidth: "800px", width: "100%" }}>
                <FetchRecipeById id={id} />
            </div>
        </div>
    );
}

export default Detail;