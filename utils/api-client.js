async function getAuthToken(request) {
    const response = await request.post('https://restful-booker.herokuapp.com/auth', {
        data: {
            username: 'admin',
            password: 'password123',
        },
    });
    const body = await response.json();
    return body.token;
}

module.exports = { getAuthToken };