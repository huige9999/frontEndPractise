import useDocumentTitle from "../hooks/useDocumentTitle";


function ProfilePage({user}) {
    useDocumentTitle(`欢迎,${user.name}`);

    return <div>hello, {user.name}</div>

}

export default ProfilePage;