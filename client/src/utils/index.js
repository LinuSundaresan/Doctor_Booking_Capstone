export const checkToken = () => {

    const token = localStorage.getItem('token');
    if(token ) return true;
    else return false;

};

export const getId = () => {
    const id = localStorage.getItem('id');
    return id;
};

export const getRole = () => {
    const role = localStorage.getItem('role');
    return role;
};