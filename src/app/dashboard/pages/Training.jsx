import React, { useState, useEffect } from 'react';
import TrainingListService from '../services/TrainingService';

const TrainingList = () => {
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTrainings();
  }, []);

  const fetchTrainings = async () => {
    try {
      const data = await TrainingListService.getTrainings();
      setTrainings(data);
      setLoading(false);
    } catch (error) {
      setError('Error fetching trainings: ' + error.message);
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Training List</h1>
      {trainings.length === 0 ? (
        <p>No trainings available.</p>
      ) : (
        <ul className="divide-y divide-gray-300">
          {trainings.map((training) => (
            <li key={training.id} className="py-4">
              <h2 className="text-lg font-bold">{training.title}</h2>
              <p className="text-sm text-gray-600">{training.description}</p>
              {training.type === 'video' ? (
                <div className="mt-2">
                  <video width="320" height="240" controls>
                    <source src={`data:${training.mimeType};base64,${training.base64File}`} type={training.mimeType} />
                    Your browser does not support the video tag.
                  </video>
                </div>
              ) : (
                <div className="mt-2">
                  <a
                    href={`data:${training.mimeType};base64,${training.base64File}`}
                    download={training.fileName}
                    className="text-blue-600 hover:underline"
                  >
                    Download {training.fileName}
                  </a>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TrainingList;
