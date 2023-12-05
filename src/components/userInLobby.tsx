import React from 'react';

interface UserInLobbyProps {
    userName: string;
    options: string[];
}

const UserInLobby: React.FC<UserInLobbyProps> = (props) => {
    const { userName, options } = props;

    return (
        <div className="w-[544px] h-20 px-[35px] py-2.5 bg-neutral-700 rounded-[5px] border border-white justify-between items-center inline-flex">
            <div className="text-white text-xl font-medium font-['Inter']">{userName}</div>
            <div className="h-fit justify-between items-center flex">
                <select id="dropdown" className="grow shrink basis-0 h-fit px-2.5 py-2 bg-zinc-900 rounded-[15px] justify-between items-center flex">
                    {options.map((option, index) => (
                        <option key={index}>{option}</option>
                    ))}
                </select>
            </div>
            <div className="w-[30px] h-[30px] relative border border-white" />
        </div>
    );
}

export default UserInLobby;
