import React, { useEffect, useState } from 'react';
import { fetchMovies } from './api';

const Movies = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getMovies = async () => {
            try {
                const data = await fetchMovies();
                setMovies(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        getMovies();
    }, []);

    if (loading) return <p>Loading movies...</p>;
    if (error) return <p>Error loading movies: {error}</p>;

    return (
        <div>
            <h1>Movie Database</h1>
            <ul>
                {movies.map(movie => (
                    <li key={movie.id}>
                        <h2>{movie.title}</h2>
                        <p>{movie.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Movies;
