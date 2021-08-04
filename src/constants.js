const host = "https://mobiant-api.herokuapp.com";
const constants = {
    url: {
        host: `${host}`,
        users: `${host}/users`,
        login: `${host}/auth/local`,
        register: `${host}/auth/local/register`,
        carts:`${host}/carts`,
        cart_items:`${host}/cart-items`,
    },
}

export default constants
