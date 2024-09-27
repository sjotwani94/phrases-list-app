'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './phrases-list.module.css';

const ListOfPhrasesPage = () => {
    const router = useRouter();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchFilter, setSearchFilter] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/phrases');
                if (!response.ok) {
                    throw new Error('Sorry, Something Went Wrong!');
                }
                const result = await response.json();
                setData(result);
            } finally {
                setLoading(false);
            }
        };

        fetchData(); // Call the async function
    }, []); // Runs once on mount

    const fetchDataWithSearchFilters = async () => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:3000/phrases/search?query=${searchFilter}`);
            if (!response.ok) {
                throw new Error('Sorry, Something Went Wrong!');
            }
            const result = await response.json();
            setData(result);
        } finally {
            setLoading(false);
        }
    };

    const handleClick = (phraseID: string) => {
        router.push(`/phrase/${phraseID}`);
    };

    const handleSearchFilterChange = (e: any) => {
        const value = e.target.value;
        setSearchFilter(value);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.searchFilterInputContainer}>
                <input
                    className={styles.searchFilterInput}
                    type="text"
                    placeholder="Enter Search Filter Here..."
                    name="Search Filter"
                    value={searchFilter}
                    onChange={handleSearchFilterChange}
                ></input>
                <button
                    onClick={() => {
                        fetchDataWithSearchFilters();
                    }}
                    className={styles.applyFilter}
                >
                    Apply Filter
                </button>
            </div>
            {data &&
                data.map((phrase: any) => (
                    <div className={styles.phrase} key={phrase.id}>
                        <h1 className={styles.phraseTitle}>Phrase Title: {phrase.phrase}</h1>
                        <div className={styles.phraseDetails}>
                            <span>Last Updated At: {new Date(phrase.updatedAt).toLocaleString()}</span>
                            <button
                                onClick={() => {
                                    handleClick(phrase.id);
                                }}
                                className={styles.viewMoreDetails}
                            >
                                View More Details
                            </button>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default ListOfPhrasesPage;
