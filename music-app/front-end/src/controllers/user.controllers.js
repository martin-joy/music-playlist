import instance from '../utils/api';

export const addUserLogin = async (email,password) => {
  try {
    const response = await instance.post(`/user/signIn?email=${email}&password=${password}`);
    return response;
  } catch (error) {
    throw error
  }
    
  };
  
  export const addUserSignup = async (name,email,password) => {
    try {
      const response = await instance.post(`/user/signUp?name=${name}&email=${email}&password=${password}`);
    return response;
    } catch (error) {
      throw error
    }
    
  };
  