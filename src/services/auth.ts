const API_URL = import.meta.env.VITE_API_URL;

// Register
export const registerUser = async (formData: any) => {
    const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
    });

    const data = await response.json()
    if (!response.ok) throw new Error(data.message || 'Terjadi kesalahan saat melakukan pendaftaran');
    return data;
};

// Login
export const loginUser = async (formData: any) => {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Email atau password salah');

    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('user', JSON.stringify(data.user));

    return data;
}
