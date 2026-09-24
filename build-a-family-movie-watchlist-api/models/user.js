let users = [];
async function fetchData() {
    const res = await fetch("../data/users.json");
    const data = await res.json();
    return users.push(data);
};

export async function userData(req, res, next) {
    const userObjects = await fetchData();
}

