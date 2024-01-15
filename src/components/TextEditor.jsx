import React, { useState } from 'react';

function TextEditor() {
    const [inputText, setInputText] = useState('');
    const [processedText, setProcessedText] = useState('');

    const handleInputChange = (e) => {
        setInputText(e.target.value);
    };

    const convertText = () => {
        const lines = inputText.split('\n');
    
        if (lines.length > 1) {
            lines[1] = '#' + lines[1];
        }
        if (lines.length > 0) {
            lines[lines.length - 1] += '\n++++';
        }
        const modifiedText = lines.join('\n====\n');
        setProcessedText(modifiedText);
    };
    
    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col">
                    <textarea 
                        className="form-control" 
                        rows="10" 
                        value={inputText} 
                        onChange={handleInputChange} 
                        placeholder="Enter text here..."></textarea>
                </div>
                <div className="col">
                    <textarea 
                        className="form-control" 
                        rows="10" 
                        value={processedText} 
                        readOnly></textarea>
                </div>
                <div className="col-12">
                    <button onClick={convertText}>Convert</button>
                </div>
            </div>
        </div>
    );
}

export default TextEditor;
