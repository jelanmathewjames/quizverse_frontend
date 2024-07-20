import avatar from '../assets/images/person.svg'
function ProfileCard(props) {
    return (
        <div className="relative mt-5">
            <img
                src={avatar}
                alt={props.username}
                className="absolute -top-5 border-gray-300 border-[1px]  shadow-2xl mb-2 left-1/2 transform -translate-x-1/2 w-28  rounded-lg p-4 z-10"
            />
            <div className="bg-base-100 min-w-full h-auto rounded-lg shadow-lg relative z-0">
                <header className="bg-center bg-no-repeat bg-contain text-center rounded-t-lg">
                    <div className="h-24 bg-base-100 rounded-t-lg"></div>
                </header>
                <h1 className="font-bold text-lg text-center px-5">
                    {props.username}
                    {/* <span className="font-normal text-base text-gray-500">{props.role}</span> */}
                </h1>
                <div className="flex border-t border-gray-300 text-center">
                    <div className="flex-1">
                        <h1 className="font-bold text-lg">{props.email}</h1>
                    </div>
                    <div className="flex-1">
                        <h1 className="font-bold text-lg">{props.verified}</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileCard
