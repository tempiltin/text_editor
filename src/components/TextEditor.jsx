import React, { useState, useEffect } from 'react';
import CodeEditor from '@uiw/react-textarea-code-editor';
function TextEditor() {
    const [inputText, setInputText] = useState('');
    const [processedText, setProcessedText] = useState(() => {
        // localStorage'dan ma'lumotni o'qish
        const savedText = localStorage.getItem('processedText');
        return savedText || '';
    });

    useEffect(() => {
        // `processedText` o'zgaruvchisidagi o'zgarishlarni kuzatib borish
        localStorage.setItem('processedText', processedText);
    }, [processedText]);

    const handleInputChange = (e) => {
        setInputText(e.target.value);
    };
    const handleProcessedTextChange = (e) => {
        setProcessedText(e.target.value);
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
    
        setProcessedText(prev => prev + '\n' + modifiedText);
        setInputText('');
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(processedText)
            .then(() => console.log("copy"))
            .catch(err => console.error('Error copying text: ', err));
    };

    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col">
                    <CodeEditor
                        language="text"
                        value={inputText}
                        onChange={(evn) => setInputText(evn.target.value)}
                        placeholder="Enter text here..."
                        style={{
                            backgroundColor: "#F7F7F7",
                            minHeight: '200px',
                            color:"#000",
                            fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                          }}
                    />
                    <button className="btn btn-primary mt-2" onClick={convertText}>Convert</button>
                </div>
                <div className="col">
                <CodeEditor
                        language="text"
                        value={processedText}
                        onChange={handleProcessedTextChange}
                        style={{
                            backgroundColor: "#F7F7F7",
                            minHeight: '200px',
                            maxHeight: '200px', 
                            overflow: 'auto',   
                            color:"#000",
                            fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                        }}
                    />
                    <button className="btn btn-secondary mt-2" onClick={copyToClipboard}>Copy</button>
                </div>
            </div>
        </div>
    );
}

export default TextEditor;
