
const authProvider = {

    login: () => {
        return Promise.resolve();
    },

    logout: () => {
        localStorage.removeItem('admin_user');
        return Promise.resolve();
    },

    checkError: () => Promise.resolve(),

    checkAuth: () =>
        localStorage.getItem('admin_user') ? Promise.resolve() : Promise.reject(),

    getPermissions: () => Promise.reject('Unknown method'),

    getIdentity: () => {
        const user = JSON.parse(localStorage.getItem('admin_user'));
        return Promise.resolve({
            id: user.username,
            fullName: user.name,
            //avatar: 'https://marmelab.com/posters/avatar-187.jpeg?size=32x32',
        })
    }
        
}


export default authProvider