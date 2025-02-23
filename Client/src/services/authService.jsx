import api from './api';

const AuthService = {
   // async login(email, password) {
     //   const response = await api.post(`${import.meta.env.VITE_API_URL}/users/login`, { email, password });
       // if (response.data.token) {
         //   localStorage.setItem('token', response.data.token);
           // localStorage.setItem('userId', response.data._id);
            // console.log('Token set in localStorage:', response.data.token); // Add this log
        //}
        //return response.data;
    //},
    async login(email, password) {
        const response = await api.post('/users/login', { email, password });
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userId', response.data._id);
            // console.log('Token set in localStorage:', response.data.token); // Add this log
        }
        return response.data;
    },

    async register(registerId, name, email, password, department) {
        const response = await api.post('/users/register', {
            registerId,
            name,
            email,
            password,
            department
        });
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userId', response.data._id);
        }
        return response.data;
    },

    //async register(name, email, password) {
        //if (!name || !email || !password) {
          //  throw new Error('Name, email, and password are required');
        //}
        //try {
            //const response = await api.post(`${import.meta.env.VITE_API_URL}/users/register`, {
                //name,
                //email,
              //  password
            //});
            
            //if (response.data.token) {
              //  this.setUserData(response.data);
            //}
          //  return response.data;
        //} catch (error) {
        //    throw this.handleError(error, 'Registration failed');
      //  }
    //},

    logout() {
        try {
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            localStorage.removeItem('user');
        } catch (error) {
            console.error('Error during logout:', error);
        }
    },

    getCurrentUser() {
        try {
            const userStr = localStorage.getItem('user');
            if (!userStr) return null;
            
            const user = JSON.parse(userStr);
            return user && typeof user === 'object' ? user : null;
        } catch (error) {
            console.error('Error getting current user:', error);
            return null;
        }
    },

    isAuthenticated() {
        return !!localStorage.getItem('token');
    },

    setUserData(data) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data._id || data.user._id);
        localStorage.setItem('user', JSON.stringify(data.user));
    },

    handleError(error, defaultMessage) {
        console.error('API Error:', {
            message: error.message,
            status: error.response?.status,
            data: error.response?.data
        });
        return error.response?.data?.message || 
               error.response?.data || 
               defaultMessage;
    }
};

export default AuthService;