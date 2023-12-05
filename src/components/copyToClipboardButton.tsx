import React from 'react';


interface CopyToClipboardButtonProps {
    textToCopy: string;
}

const CopyToClipboardButton: React.FC<CopyToClipboardButtonProps> = ({ textToCopy }) => {
    const handleCopyClick = () => {
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                console.log('Text successfully copied to clipboard!');
            })
            .catch((err) => {
                console.error('Unable to copy text to clipboard.', err);
            });
    };
    return (
        <div onClick={ handleCopyClick } className="w-fit h-10 pl-5 pr-[7px] py-2 bg-neutral-700 rounded-[15px] justify-start items-center gap-4 inline-flex">
            <div className="text-white text-xl font-medium font-['Inter']">Clique e Compartilhe</div>
            <div className="w-[30px] h-[30px] relative">
                <img 
                src='../src/assets/react.svg'
                className='h-full w-full'/>
            </div> 
        </div>
    )
}

export default CopyToClipboardButton