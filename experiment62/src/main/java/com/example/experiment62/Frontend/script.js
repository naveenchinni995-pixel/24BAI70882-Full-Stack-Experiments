const API_URL =
    "http://localhost:8080/api/users";

const userForm =
    document.getElementById("userForm");

const userTableBody =
    document.getElementById("userTableBody");

const status =
    document.getElementById("status");


async function loadUsers(type = "cached") {

    const startTime =
        performance.now();

    let endpoint = "";

    if (type === "normal") {
        endpoint = "/normal";
    }

    else if (type === "optimized") {
        endpoint = "/optimized";
    }

    else if (type === "cached") {
        endpoint = "/cached";
    }

    else if (type === "native") {
        endpoint = "/native";
    }

    else if (type === "sort-id") {
        endpoint = "/sort/id";
    }

    else if (type === "sort-name") {
        endpoint = "/sort/name";
    }

    try {

        const response =
            await fetch(
                API_URL + endpoint
            );

        if (!response.ok) {
            throw new Error(
                "Request failed"
            );
        }

        const users =
            await response.json();

        const endTime =
            performance.now();

        const time =
            (
                endTime - startTime
            ).toFixed(2);

        displayUsers(
            users,
            type
        );

        status.innerHTML =
            `Response Time: ${time} ms`;

        status.className =
            "success";

    }

    catch (error) {

        console.error(error);

        status.innerHTML =
            "Unable to connect to backend.";

        status.className =
            "error";
    }
}


function displayUsers(
    users,
    type
) {

    userTableBody.innerHTML = "";

    users.forEach(user => {

        let id;
        let uid;
        let name;
        let city;
        let country;

        /*
         * Native SQL returns:
         *
         * [id, uid, name, city, country]
         */

        if (type === "native") {

            id = user[0];
            uid = user[1];
            name = user[2];
            city = user[3];
            country = user[4];

        }

        else {

            id = user.id;
            uid = user.uid;
            name = user.name;

            if (user.address) {

                city =
                    user.address.city;

                country =
                    user.address.country;

            }

            else {

                city = "-";
                country = "-";

            }
        }

        const row =
            document.createElement("tr");

        row.innerHTML = `
            <td>${id}</td>
            <td>${uid}</td>
            <td>${name}</td>
            <td>${city}</td>
            <td>${country}</td>
            <td>
                <button
                    class="delete-btn"
                    onclick="deleteUser(${id})"
                >
                    Delete
                </button>
            </td>
        `;

        userTableBody.appendChild(row);
    });
}


userForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();

        const user = {

            uid:
                document
                    .getElementById("uid")
                    .value
                    .trim(),

            name:
                document
                    .getElementById("name")
                    .value
                    .trim(),

            city:
                document
                    .getElementById("city")
                    .value
                    .trim(),

            country:
                document
                    .getElementById("country")
                    .value
                    .trim()
        };

        try {

            const response =
                await fetch(
                    API_URL,
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify(user)
                    }
                );

            if (!response.ok) {

                throw new Error(
                    "Unable to add user"
                );
            }

            userForm.reset();

            status.innerHTML =
                "User added successfully.";

            status.className =
                "success";

            /*
             * Creating a user clears
             * the cache in the backend.
             */

            loadUsers("cached");

        }

        catch (error) {

            console.error(error);

            status.innerHTML =
                error.message ||
                "Unable to add user.";

            status.className =
                "error";
        }
    }
);


async function deleteUser(id) {

    const confirmed =
        confirm(
            "Are you sure you want to delete this user?"
        );

    if (!confirmed) {
        return;
    }

    try {

        const response =
            await fetch(
                `${API_URL}/${id}`,
                {
                    method: "DELETE"
                }
            );

        if (!response.ok) {

            throw new Error(
                "Unable to delete user"
            );
        }

        status.innerHTML =
            "User deleted successfully.";

        status.className =
            "success";

        loadUsers("cached");

    }

    catch (error) {

        console.error(error);

        status.innerHTML =
            "Unable to delete user.";

        status.className =
            "error";
    }
}