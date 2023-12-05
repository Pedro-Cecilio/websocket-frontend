import UserInLobby from './userInLobby';

const UserInLobbyContainer = () => {
    const users = [
        { userName: 'User 1', options: ['Option 1', 'Option 2'] },
        { userName: 'User 2', options: ['Option A', 'Option B'] },
    ];

    return (
        <div className="w-fit h-fit p-[25px] ml-5 bg-neutral-700 rounded-[15px] flex-col justify-center items-center gap-5 inline-flex">
            {users.map((user, index) => (
                <UserInLobby key={index} userName={user.userName} options={user.options} />
            ))}
        </div>
    );
};

export default UserInLobbyContainer;
