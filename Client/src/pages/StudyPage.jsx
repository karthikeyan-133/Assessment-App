// quiz-app-full-stack/Client/src/pages/StudyPage.jsx
import React from 'react';
import StudyMaterials from '../components/StudyMaterials';
import { useTheme } from '../contexts/ThemeContext';

const StudyPage = () => {
    const { isDarkMode } = useTheme();

    return (
        <div className={`study-page ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-[#f0f8ff] text-gray-800'}`} style={{ padding: '20px' }}>
            <h1 className="text-3xl font-bold text-center mb-4 text-teal-600">Study Materials</h1>
            
            <div className="card-container">
                {/* Video Card */}
                <div className="card">
                    <video width="100%" controls>
                        <source src="path/to/your/video.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <h2 className="card-title">Video Title</h2>
                </div>
                {/* Image Card */}
                <div className="card">
                    <img src="path/to/your/image.jpg" alt="Study Material" style={{ width: '100%' }} />
                    <h2 className="card-title">Image Title</h2>
                </div>
                {/* Dummy Card 1 */}
                <div className="card">
                    <h2 className="card-title">Dummy Card 1</h2>
                    <p className="card-description">This is a description for dummy card 1.</p>
                </div>
                {/* Dummy Card 2 */}
                <div className="card">
                    <h2 className="card-title">Dummy Card 2</h2>
                    <p className="card-description">This is a description for dummy card 2.</p>
                </div>
                {/* Dummy Card 3 */}
                <div className="card">
                    <h2 className="card-title">Dummy Card 3</h2>
                    <p className="card-description">This is a description for dummy card 3.</p>
                </div>
                {/* Dummy Card 4 */}
                <div className="card">
                    <h2 className="card-title">Dummy Card 4</h2>
                    <p className="card-description">This is a description for dummy card 4.</p>
                </div>
                {/* Dummy Card 5 */}
                <div className="card">
                    <h2 className="card-title">Dummy Card 5</h2>
                    <p className="card-description">This is a description for dummy card 5.</p>
                </div>
            </div>
            <StudyMaterials />
            <style jsx>{`
                .study-page {
                    font-family: 'Arial', sans-serif; /* Change to your preferred font */
                }

                .main-title {
                    color: #2c3e50;
                    text-align: center;
                    font-size: 2.5em; /* Larger font size for the main title */
                    margin-bottom: 20px;
                }

                .card-container {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-around;
                    margin: 20px 0;
                }

                .card {
                    background-color: ${isDarkMode ? '#2c2c2c' : 'white'};
                    border: 1px solid #ccc;
                    border-radius: 8px;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                    margin: 10px;
                    padding: 15px;
                    width: 300px; /* Adjust width as needed */
                    text-align: center;
                    transition: transform 0.2s; /* Animation on hover */
                }

                .card:hover {
                    transform: scale(1.05); /* Scale effect on hover */
                }

                .card-title {
                    color: #2980b9; /* Card title color */
                    font-size: 1.5em; /* Larger font size for card titles */
                    margin: 10px 0;
                }

                .card-description {
                    color: #7f8c8d; /* Card description color */
                    font-size: 1em; /* Font size for descriptions */
                }
            `}</style>
        </div>
    );
};

export default StudyPage;