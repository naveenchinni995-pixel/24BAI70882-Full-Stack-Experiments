const API_URL = "http://localhost:8080/api/users";

let users = [];
let editingUid = null;


// =========================================================
// ELEMENTS
// =========================================================

const userForm = document.getElementById("userForm");

const uidInput = document.getElementById("uid");
const nameInput = document.getElementById("name");

const submitBtn = document.getElementById("submitBtn");
const clearBtn = document.getElementById("clearBtn");
const cancelBtn = document.getElementById("cancelBtn");

const refreshBtn = document.getElementById("refreshBtn");

const searchInput = document.getElementById("searchInput");

const userTableBody =
    document.getElementById("userTableBody");

const emptyState =
    document.getElementById("emptyState");

const totalUsers =
    document.getElementById("totalUsers");

const recordCount =
    document.getElementById("recordCount");

const formTitle =
    document.getElementById("formTitle");

const methodBadge =
    document.getElementById("methodBadge");

const notification =
    document.getElementById("notification");

const notificationIcon =
    document.getElementById("notificationIcon");

const notificationTitle =
    document.getElementById("notificationTitle");

const notificationMessage =
    document.getElementById("notificationMessage");


// =========================================================
// NOTIFICATION
// =========================================================

function showNotification(
    title,
    message,
    type = "success"
) {

    notificationTitle.textContent = title;

    notificationMessage.textContent = message;

    notificationIcon.textContent =
        type === "success" ? "✓" : "×";

    notification.className =
        `notification show ${type}`;

    setTimeout(() => {

        notification.className =
            "notification";

    }, 3500);
}


// =========================================================
// LOAD USERS
// =========================================================

async function loadUsers() {

    try {

        refreshBtn.disabled = true;

        refreshBtn.innerHTML =
            `<span>↻</span> Loading...`;


        const response =
            await fetch(API_URL);


        const result =
            await response.json();


        if (!response.ok) {

            throw new Error(
                result.message ||
                "Unable to retrieve users"
            );
        }


        users = result.data || [];


        updateCounts();

        displayUsers(users);


    } catch (error) {

        console.error(
            "Load users error:",
            error
        );

        showNotification(
            "Connection Error",
            error.message ||
            "Unable to connect to the REST API.",
            "error"
        );

    } finally {

        refreshBtn.disabled = false;

        refreshBtn.innerHTML =
            `<span>↻</span> Refresh`;
    }
}


// =========================================================
// UPDATE COUNTS
// =========================================================

function updateCounts() {

    totalUsers.textContent =
        users.length;

    recordCount.textContent =
        users.length;
}


// =========================================================
// DISPLAY USERS
// =========================================================

function displayUsers(userList) {

    userTableBody.innerHTML = "";


    if (userList.length === 0) {

        emptyState.style.display =
            "block";

        return;
    }


    emptyState.style.display =
        "none";


    userList.forEach((user, index) => {

        const row =
            document.createElement("tr");


        const numberCell =
            document.createElement("td");

        numberCell.innerHTML =
            `<span class="number">${index + 1}</span>`;


        const uidCell =
            document.createElement("td");

        uidCell.innerHTML =
            `<span class="uid-text">
                ${escapeHtml(user.uid)}
            </span>`;


        const nameCell =
            document.createElement("td");

        nameCell.innerHTML =
            `<span class="name-text">
                ${escapeHtml(user.name)}
            </span>`;


        const statusCell =
            document.createElement("td");

        statusCell.innerHTML =
            `<span class="status-badge">
                ACTIVE
            </span>`;


        const actionCell =
            document.createElement("td");


        const actions =
            document.createElement("div");

        actions.className =
            "actions";


        const editButton =
            document.createElement("button");

        editButton.className =
            "action-button edit-button";

        editButton.textContent =
            "Edit";

        editButton.addEventListener(
            "click",
            () => editUser(user.uid)
        );


        const deleteButton =
            document.createElement("button");

        deleteButton.className =
            "action-button delete-button";

        deleteButton.textContent =
            "Delete";

        deleteButton.addEventListener(
            "click",
            () => deleteUser(user.uid)
        );


        actions.appendChild(editButton);

        actions.appendChild(deleteButton);

        actionCell.appendChild(actions);


        row.appendChild(numberCell);

        row.appendChild(uidCell);

        row.appendChild(nameCell);

        row.appendChild(statusCell);

        row.appendChild(actionCell);


        userTableBody.appendChild(row);

    });
}


// =========================================================
// CREATE / UPDATE
// =========================================================

userForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        const uid =
            uidInput.value.trim();

        const name =
            nameInput.value.trim();


        // Frontend validation

        if (!uid || !name) {

            showNotification(
                "Validation Error",
                "Please enter both User ID and Full Name.",
                "error"
            );

            return;
        }


        if (
            name.length < 2 ||
            name.length > 50
        ) {

            showNotification(
                "Validation Error",
                "Name must be between 2 and 50 characters.",
                "error"
            );

            return;
        }


        try {

            submitBtn.disabled = true;


            let response;


            // =================================================
            // UPDATE
            // =================================================

            if (editingUid) {

                response =
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

            }


            // =================================================
            // CREATE
            // =================================================

            else {

                response =
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
            }


            const result =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    result.message ||
                    "The operation could not be completed."
                );
            }


            if (editingUid) {

                showNotification(
                    "User Updated",
                    "The user record was updated successfully."
                );

            } else {

                showNotification(
                    "User Created",
                    "The new user was added successfully."
                );
            }


            resetForm();

            await loadUsers();


        } catch (error) {

            console.error(
                "Save user error:",
                error
            );

            showNotification(
                "Operation Failed",
                error.message ||
                "Unable to save user.",
                "error"
            );

        } finally {

            submitBtn.disabled = false;
        }

    }
);


// =========================================================
// EDIT USER
// =========================================================

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
                "User could not be found."
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
            "Update User";

        methodBadge.textContent =
            "PUT";

        submitBtn.innerHTML =
            "<span>✓</span> Update User";


        cancelBtn.classList.remove(
            "hidden"
        );


        document
            .getElementById("operations")
            .scrollIntoView({
                behavior: "smooth",
                block: "start"
            });


    } catch (error) {

        console.error(
            "Edit user error:",
            error
        );

        showNotification(
            "User Not Found",
            error.message ||
            "Unable to retrieve the user.",
            "error"
        );
    }
}


// =========================================================
// DELETE USER
// =========================================================

async function deleteUser(uid) {

    const confirmed =
        window.confirm(
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
                "Unable to delete the user."
            );
        }


        showNotification(
            "User Deleted",
            `User ${uid} was removed successfully.`
        );


        await loadUsers();


    } catch (error) {

        console.error(
            "Delete user error:",
            error
        );

        showNotification(
            "Delete Failed",
            error.message ||
            "Unable to delete the user.",
            "error"
        );
    }
}


// =========================================================
// SEARCH
// =========================================================

searchInput.addEventListener(
    "input",
    function () {

        const searchTerm =
            searchInput.value
                .trim()
                .toLowerCase();


        if (!searchTerm) {

            displayUsers(users);

            return;
        }


        const filteredUsers =
            users.filter(user => {

                const uid =
                    String(user.uid)
                        .toLowerCase();

                const name =
                    String(user.name)
                        .toLowerCase();


                return (
                    uid.includes(searchTerm) ||
                    name.includes(searchTerm)
                );

            });


        displayUsers(filteredUsers);


        recordCount.textContent =
            filteredUsers.length;
    }
);


// =========================================================
// CLEAR FORM
// =========================================================

clearBtn.addEventListener(
    "click",
    function () {

        resetForm();

        showNotification(
            "Form Cleared",
            "The input fields have been cleared."
        );
    }
);


// =========================================================
// CANCEL EDIT
// =========================================================

cancelBtn.addEventListener(
    "click",
    function () {

        resetForm();

        showNotification(
            "Edit Cancelled",
            "The update operation has been cancelled."
        );
    }
);


// =========================================================
// RESET FORM
// =========================================================

function resetForm() {

    userForm.reset();


    editingUid = null;


    uidInput.disabled =
        false;


    formTitle.textContent =
        "Create User";


    methodBadge.textContent =
        "POST";


    submitBtn.innerHTML =
        "<span>＋</span> Create User";


    cancelBtn.classList.add(
        "hidden"
    );
}


// =========================================================
// REFRESH
// =========================================================

refreshBtn.addEventListener(
    "click",
    loadUsers
);


// =========================================================
// HTML ESCAPING
// =========================================================

function escapeHtml(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


// =========================================================
// INITIAL LOAD
// =========================================================

loadUsers();