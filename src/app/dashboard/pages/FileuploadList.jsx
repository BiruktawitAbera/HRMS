import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { fetchUploadedFiles } from '../services/FileuploadListService';

const FileUploadList = ({ employeeId }) => {
    const [fileList, setFileList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getFiles = async () => {
            try {
                const files = await fetchUploadedFiles(employeeId);
                console.log('Fetched files:', files);
                setFileList(files);
                setLoading(false);
            } catch (error) {
                setError(`Failed to fetch files: ${error.message}`);
                setLoading(false);
            }
        };

        if (employeeId) {
            getFiles();
        }
    }, [employeeId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h3 className="text-xl font-semibold mb-2">Uploaded Files for Employee {employeeId}:</h3>
            {fileList.length > 0 ? (
                <ul className="list-disc list-inside">
                    {fileList.map((file, index) => (
                        <li key={index} className="mb-4">
                            {file.type === 'resume' && (
                                <div>
                                    <strong>Resume:</strong>
                                    <a href={file.url} download={`resume-${index}.pdf`} target="_blank" rel="noopener noreferrer">
                                        Download Resume
                                    </a>
                                </div>
                            )}
                            {file.type === 'certeficate' && (
                                <div>
                                    <strong>Certeficate:</strong>
                                    <a href={file.url} download={`certeficate-${index}.pdf`} target="_blank" rel="noopener noreferrer">
                                        Download Certeficate
                                    </a>
                                </div>
                            )}
                            {file.type === 'educationalCredential' && (
                                <div>
                                    <strong>Educational Credential:</strong>
                                    <a href={file.url} download={`educationalCredential-${index}.pdf`} target="_blank" rel="noopener noreferrer">
                                        Download Educational Credential
                                    </a>
                                </div>
                            )}
                            {file.type === 'employeeImage' && (
                                <div>
                                    <strong>Employee Image:</strong>
                                    <img src={file.url} alt={`Employee Image ${index}`} className="w-24 h-24 object-cover" />
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <div>No files uploaded yet</div>
            )}
        </div>
    );
};

FileUploadList.propTypes = {
    employeeId: PropTypes.number.isRequired
};

export default FileUploadList;
