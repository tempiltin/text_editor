import React, { useState, useEffect } from 'react';
function TextEditor() {
    const [inputText, setInputText] = useState('');
    const [select, setSelect] = useState(4);
    const handleSelect = (e)=>{
        setSelect(e.target.value);
    }
    
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
    
        // Qatorlar sonini tekshirish
        if (lines.length > select) {
            alert('Qatorlar soni oshib ketdi');
            return;
        } else if (lines.length < select) {
            alert('Qatorlar soni kam');
            return;
        }
    
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
    const isConvertButtonDisabled = () => {
        const lines = inputText.split('\n');
        return lines.length !== parseInt(select, 10); // parseInt ishlatishni unutmang
    };
    const isButtonDisabled = isConvertButtonDisabled();
    return (
        <div className="container mt-3">
    <div className="row">
        <div className="col">
            <textarea 
            className={"form-control"}
                value={inputText}
                onChange={handleInputChange}
                placeholder="Enter text here..."
                style={{
                    fontSize: "18px",
                    backgroundColor: "#F7F7F7",
                    minHeight: '200px',
                    color: "#000",
                    fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                    width: '100%',
                    resize: 'vertical'
                }}
            />
            <button 
                className="btn btn-primary mt-2" 
                onClick={convertText}
                disabled={isButtonDisabled} 
            >
                Convert
            </button>
        </div>
        <div className="col-1">
            <select name="" id="" value={select} onChange={handleSelect}>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
        </div>
        <div className="col">
            <textarea
            className={"form-control"}
                value={processedText}
                onChange={handleProcessedTextChange}
                style={{
                    fontSize: "18px",
                    backgroundColor: "#F7F7F7",
                    minHeight: '200px',
                    maxHeight: '200px', 
                    overflow: 'auto',
                    color: "#000",
                    fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                    width: '100%',
                    resize: 'vertical'
                }}
            />
            <button className="btn btn-secondary mt-2" onClick={copyToClipboard}>Copy</button>
        </div>
    </div>
</div>

    );
}

export default TextEditor;
