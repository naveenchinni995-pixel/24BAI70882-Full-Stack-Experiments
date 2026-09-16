const API_URL = "http://localhost:8080/api/users";


// =====================================================
// DOM ELEMENTS
// =====================================================

const userForm = document.getElementById("userForm");

const uidInput = document.getElementById("uid");

const nameInput = document.getElementById("name");

const submitBtn = document.getElementById("submitBtn");

const cancelBtn = document.getElementById("cancelBtn");

const refreshBtn = document.getElementById("refreshBtn");

const searchInput = document.getElementById("searchInput");

const userTableBody = document.getElementById("userTableBody");

const emptyState = document.getElementById("emptyState");

const totalUsers = document.getElementById("totalUsers");

const formTitle = document.getElementById("formTitle");

const notification = document.getElementById("notification");

const notificationMessage =
    document.getElementById("notificationMessage");

const notificationIcon =
    document.getElementById("notificationIcon");


// =====================================================
// EDIT MODE
// =====================================================

let editingUid = null;

let allUsers = [];


// =====================================================
// NOTIFICATION
// =====================================================

function showNotification(message, type = "success") {

    notificationMessage.textContent = message;

    notification.className =
        "notification show " + type;

    if (type === "success") {

        notificationIcon.textContent = "✓";

    } else {

        notificationIcon.textContent = "!";
    }

    setTimeout(() => {

        notification.className =
            "notification";

    }, 3000);
}


// =====================================================
// LOAD USERS
// =====================================================

async function loadUsers() {

    try {

        refreshBtn.disabled = true;

        refreshBtn.textContent = "↻ Loading...";


        const response =
            await fetch(API_URL);


        if (!response.ok) {

            throw new Error(
                "Unable to retrieve users"
            );
        }


        const result =
            await response.json();


        allUsers = result.data || [];


        renderUsers(allUsers);


        totalUsers.textContent =
            allUsers.length;


    } catch (error) {

        console.error(error);

        showNotification(
            "Unable to connect to the REST API",
            "error"
        );

    } finally {

        refreshBtn.disabled = false;

        refreshBtn.textContent =
            "↻ Refresh";
    }
}


// =====================================================
// DISPLAY USERS
// =====================================================

function renderUsers(users) {

    userTableBody.innerHTML = "";


    if (!users || users.length === 0) {

        emptyState.style.display =
            "block";

        return;
    }


    emptyState.style.display =
        "none";


    users.forEach((user, index) => {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                <span class="user-number">
                    ${index + 1}
                </span>
            </td>

            <td>
                <span class="uid-text">
                    ${escapeHtml(user.uid)}
                </span>
            </td>

            <td>
                <span class="name-text">
                    ${escapeHtml(user.name)}
                </span>
            </td>

            <td>
                <span class="status-badge">
                    Active
                </span>
            </td>

            <td>

                <div class="action-buttons">

                    <button
                        class="action-btn edit-btn"
                        onclick="editUser('${escapeJs(user.uid)}')"
                    >
                        ✎ Edit
                    </button>

                    <button
                        class="action-btn delete-btn"
                        onclick="deleteUser('${escapeJs(user.uid)}')"
                    >
                        🗑 Delete
                    </button>

                </div>

            </td>
        `;


        userTableBody.appendChild(row);

    });
}


// =====================================================
// ADD / UPDATE USER
// =====================================================

userForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        const uid =
            uidInput.value.trim();

        const name =
            nameInput.value.trim();


        if (!uid || !name) {

            showNotification(
                "Please fill in all fields",
                "error"
            );

            return;
        }


        if (name.length < 2 ||
            name.length > 50) {

            showNotification(
                "Name must be between 2 and 50 characters",
                "error"
            );

            return;
        }


        try {

            submitBtn.disabled = true;


            // =================================================
            // UPDATE
            // =================================================

            if (editingUid) {

                const response =
                    await fetch(
                        `${API_URL}/${encodeURIComponent(editingUid)}`,
                        {
                            method: "PUT",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body: JSON.stringify({
                                uid: editingUid,
                                name: name
                            })
                        }
                    );


                const result =
                    await response.json();


                if (!response.ok) {

                    throw new Error(
                        result.message ||
                        "Unable to update user"
                    );
                }


                showNotification(
                    "User updated successfully"
                );


            }

            // =================================================
            // CREATE
            // =================================================

            else {

                const response =
                    await fetch(
                        API_URL,
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body: JSON.stringify({
                                uid: uid,
                                name: name
                            })
                        }
                    );


                const result =
                    await response.json();


                if (!response.ok) {

                    throw new Error(
                        result.message ||
                        "Unable to create user"
                    );
                }


                showNotification(
                    "User created successfully"
                );
            }


            resetForm();

            await loadUsers();


        } catch (error) {

            console.error(error);

            showNotification(
                error.message ||
                "Something went wrong",
                "error"
            );

        } finally {

            submitBtn.disabled = false;
        }

    }
);


// =====================================================
// EDIT USER
// =====================================================

async function editUser(uid) {

    try {

        const response =
            await fetch(
                `${API_URL}/${encodeURIComponent(uid)}`
            );


        const result =
            await response.json();


        if (!response.ok) {

            throw new Error(
                result.message ||
                "Unable to find user"
            );
        }


        const user =
            result.data;


        uidInput.value =
            user.uid;

        nameInput.value =
            user.name;


        editingUid =
            user.uid;


        uidInput.disabled =
            true;


        formTitle.textContent =
            "Edit User";


        submitBtn.innerHTML =
            "<span>✓</span> Update User";


        cancelBtn.classList.remove(
            "hidden"
        );


        document
            .querySelector(".card")
            .scrollIntoView({
                behavior: "smooth"
            });


        showNotification(
            "Editing user " + uid
        );


    } catch (error) {

        console.error(error);

        showNotification(
            error.message ||
            "Unable to edit user",
            "error"
        );
    }
}


// =====================================================
// DELETE USER
// =====================================================

async function deleteUser(uid) {

    const confirmed =
        confirm(
            `Are you sure you want to delete user "${uid}"?`
        );


    if (!confirmed) {

        return;
    }


    try {

        const response =
            await fetch(
                `${API_URL}/${encodeURIComponent(uid)}`,
                {
                    method: "DELETE"
                }
            );


        const result =
            await response.json();


        if (!response.ok) {

            throw new Error(
                result.message ||
                "Unable to delete user"
            );
        }


        showNotification(
            "User deleted successfully"
        );


        await loadUsers();


    } catch (error) {

        console.error(error);

        showNotification(
            error.message ||
            "Unable to delete user",
            "error"
        );
    }
}


// =====================================================
// CANCEL EDIT
// =====================================================

cancelBtn.addEventListener(
    "click",
    function () {

        resetForm();

        showNotification(
            "Edit cancelled"
        );

    }
);


// =====================================================
// RESET FORM
// =====================================================

function resetForm() {

    userForm.reset();

    editingUid = null;

    uidInput.disabled = false;

    formTitle.textContent =
        "Add New User";

    submitBtn.innerHTML =
        "<span>＋</span> Add User";

    cancelBtn.classList.add(
        "hidden"
    );

}


// =====================================================
// SEARCH
// =====================================================

searchInput.addEventListener(
    "input",
    function () {

        const searchTerm =
            searchInput.value
                .trim()
                .toLowerCase();


        if (!searchTerm) {

            renderUsers(allUsers);

            return;
        }


        const filteredUsers =
            allUsers.filter(user =>

                user.uid
                    .toLowerCase()
                    .includes(searchTerm)

                ||

                user.name
                    .toLowerCase()
                    .includes(searchTerm)
            );


        renderUsers(filteredUsers);
    }
);


// =====================================================
// REFRESH
// =====================================================

refreshBtn.addEventListener(
    "click",
    loadUsers
);


// =====================================================
// HTML SECURITY
// =====================================================

function escapeHtml(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


function escapeJs(value) {

    return String(value)
        .replace(/\\/g, "\\\\")
        .replace(/'/g, "\\'");
}


// =====================================================
// INITIAL LOAD
// =====================================================

loadUsers();