'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './../phrase.module.css';

const PhraseDetailsPage = () => {
    const params = useParams<{ id: string }>();
    const router = useRouter();
    const [phraseDetails, setPhraseDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/phrases/${params.id}`);
                if (!response.ok) {
                    throw new Error('Sorry, Something Went Wrong!');
                }
                const result = await response.json();
                setPhraseDetails(result);
            } finally {
                setLoading(false);
            }
        };

        fetchData(); // Call the async function
    }, []); // Runs once on mount

    const handleClick = () => {
        router.push(`/phrases-list`);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.phraseDetailsContainer}>
            <a onClick={handleClick}>Back To Phrases List Dashboard</a>
            <div className={styles.phrase} key={phraseDetails.id}>
                <h1 className={styles.phraseTitle}>Phrase Title: {phraseDetails.phrase}</h1>
                <div className={styles.phraseDetails}>
                    <span>Created At: {new Date(phraseDetails.createdAt).toLocaleString()}</span>
                    <span>Last Updated At: {new Date(phraseDetails.updatedAt).toLocaleString()}</span>
                    <span>Status: {phraseDetails.status}</span>
                </div>
            </div>
        </div>
    );
};

export default PhraseDetailsPage;
