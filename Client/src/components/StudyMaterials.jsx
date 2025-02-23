// quiz-app-full-stack/Client/src/components/StudyMaterials.jsx
import React from 'react';

const StudyMaterials = () => {
    const materials = [
        { id: 1, title: 'React Documentation', type: 'Note', link: 'https://reactjs.org/docs/getting-started.html' },
        { id: 2, title: 'JavaScript Basics', type: 'Video', link: 'https://www.youtube.com/watch?v=W6NZfCO5SIk' },
        { id: 3, title: 'CSS Flexbox Guide', type: 'Note', link: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/' },
        // Add more materials as needed
    ];

    return (
        <div className="study-materials-container max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-lg">
           
            <ul className="list-disc pl-5">
                {materials.map(material => (
                    <li key={material.id} className="mb-2">
                        <a href={material.link} target="_blank" rel="noopener noreferrer" className="text-teal-500 hover:underline">
                            {material.title} ({material.type})
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default StudyMaterials;