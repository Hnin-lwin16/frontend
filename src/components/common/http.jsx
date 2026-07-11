export const token= () => {
    const data = JSON.parse(localStorage.getItem('adminInfo'));
    return data.token;
}