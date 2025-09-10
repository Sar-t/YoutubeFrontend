const API_BASE_URL = '/api/v1/users';

class UserService {
  async registerUser({ fullname, email, username, password, avatar, coverImage }) {
    const formData = new FormData();
    formData.append('fullname', fullname);
    formData.append('email', email);
    formData.append('username', username);
    formData.append('password', password);

    if (avatar) formData.append('avatar', avatar);
    if (coverImage) formData.append('coverImage', coverImage);

    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        body: formData
        // No need to set headers for FormData; browser sets it automatically
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }

      const data = await response.json();
      return data;  // Contains user data on success
    } catch (error) {
      console.error('UserService::registerUser error', error);
      throw error;
    }
  }
}

const userService = new UserService();
export default userService;
