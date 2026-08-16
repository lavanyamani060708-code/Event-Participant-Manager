// ========================================
// EVENT PARTICIPANT MANAGER
// SCRIPT.JS
// ========================================


// ========================================
// 1. REGISTRATION
// ========================================

const registrationForm =
    document.getElementById("registrationForm");


if (registrationForm) {

    registrationForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const participant = {

                name:
                    document.getElementById("name").value,

                email:
                    document.getElementById("email").value,

                phone:
                    document.getElementById("phone").value,

                college:
                    document.getElementById("college").value,

                department:
                    document.getElementById("department").value,

                year:
                    document.getElementById("year").value,

                event:
                    document.getElementById("event").value

            };


            let participants =
                JSON.parse(
                    localStorage.getItem("participants")
                ) || [];


            participants.push(participant);


            localStorage.setItem(
                "participants",
                JSON.stringify(participants)
            );


            alert(
                "Registration successful! 🎉"
            );


            registrationForm.reset();


            window.location.href =
                "dashboard.html";

        }
    );

}



// ========================================
// 2. EVENT AUTO SELECT
// ========================================

const eventSelect =
    document.getElementById("event");


if (eventSelect) {

    const urlParams =
        new URLSearchParams(
            window.location.search
        );


    const selectedEvent =
        urlParams.get("event");


    if (selectedEvent) {

        eventSelect.value =
            selectedEvent;

    }

}



// ========================================
// 3. DASHBOARD
// ========================================

const displayName =
    document.getElementById("displayName");

const displayEmail =
    document.getElementById("displayEmail");

const displayPhone =
    document.getElementById("displayPhone");

const displayCollege =
    document.getElementById("displayCollege");

const displayDepartment =
    document.getElementById("displayDepartment");

const displayEvent =
    document.getElementById("displayEvent");


if (displayName) {

    const participants =
        JSON.parse(
            localStorage.getItem("participants")
        ) || [];


    if (participants.length > 0) {

        const participant =
            participants[
                participants.length - 1
            ];


        displayName.textContent =
            participant.name;

        displayEmail.textContent =
            participant.email;

        displayPhone.textContent =
            participant.phone;

        displayCollege.textContent =
            participant.college;

        displayDepartment.textContent =
            participant.department;

        displayEvent.textContent =
            participant.event;

    }

}



// ========================================
// 4. DASHBOARD COUNT
// ========================================

const participantCount =
    document.getElementById(
        "participantCount"
    );


const registrationStatus =
    document.getElementById(
        "registrationStatus"
    );


if (participantCount) {

    const participants =
        JSON.parse(
            localStorage.getItem("participants")
        ) || [];


    participantCount.textContent =
        participants.length;

}


if (registrationStatus) {

    const participants =
        JSON.parse(
            localStorage.getItem("participants")
        ) || [];


    if (participants.length > 0) {

        registrationStatus.textContent =
            "Yes";

    } else {

        registrationStatus.textContent =
            "No";

    }

}



// ========================================
// 5. ADMIN LOGIN
// ========================================

const adminLoginForm =
    document.getElementById(
        "adminLoginForm"
    );


if (adminLoginForm) {

    adminLoginForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const username =
                document.getElementById(
                    "adminUsername"
                ).value;


            const password =
                document.getElementById(
                    "adminPassword"
                ).value;


            // Demo login

            if (
                username === "admin" &&
                password === "1234"
            ) {

                localStorage.setItem(
                    "adminLoggedIn",
                    "true"
                );


                alert(
                    "Login successful! 🔐"
                );


                window.location.href =
                    "admin.html";

            } else {

                alert(
                    "Invalid username or password!"
                );

            }

        }
    );

}



// ========================================
// 6. ADMIN DASHBOARD
// ========================================

const participantTable =
    document.getElementById(
        "participantTable"
    );


const totalParticipants =
    document.getElementById(
        "totalParticipants"
    );


const activeRegistrations =
    document.getElementById(
        "activeRegistrations"
    );


function displayParticipants() {

    if (!participantTable) {
        return;
    }


    let participants =
        JSON.parse(
            localStorage.getItem("participants")
        ) || [];


    participantTable.innerHTML = "";


    if (participants.length === 0) {

        participantTable.innerHTML = `

            <tr>

                <td
                    colspan="8"
                    style="text-align:center;"
                >

                    No participants registered yet.

                </td>

            </tr>

        `;

    }


    participants.forEach(
        function(participant, index) {

            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>
                    ${index + 1}
                </td>

                <td>
                    ${participant.name}
                </td>

                <td>
                    ${participant.email}
                </td>

                <td>
                    ${participant.phone}
                </td>

                <td>
                    ${participant.college}
                </td>

                <td>
                    ${participant.department}
                </td>

                <td>
                    ${participant.event}
                </td>

                <td>

                    <button
                        class="delete-btn"
                        onclick="
                            deleteParticipant(${index})
                        "
                    >

                        Delete

                    </button>

                </td>

            `;


            participantTable.appendChild(row);

        }
    );


    if (totalParticipants) {

        totalParticipants.textContent =
            participants.length;

    }


    if (activeRegistrations) {

        activeRegistrations.textContent =
            participants.length;

    }

}



// ========================================
// 7. DELETE PARTICIPANT
// ========================================

function deleteParticipant(index) {

    let participants =
        JSON.parse(
            localStorage.getItem("participants")
        ) || [];


    const confirmDelete =
        confirm(
            "Are you sure you want to delete this participant?"
        );


    if (confirmDelete) {

        participants.splice(
            index,
            1
        );


        localStorage.setItem(
            "participants",
            JSON.stringify(participants)
        );


        displayParticipants();


        alert(
            "Participant deleted successfully!"
        );

    }

}



// ========================================
// 8. SEARCH PARTICIPANT
// ========================================

const searchParticipant =
    document.getElementById(
        "searchParticipant"
    );


if (searchParticipant) {

    searchParticipant.addEventListener(
        "input",
        function() {

            const searchValue =
                this.value.toLowerCase();


            const rows =
                document.querySelectorAll(
                    "#participantTable tr"
                );


            rows.forEach(
                function(row) {

                    const rowText =
                        row.textContent.toLowerCase();


                    if (
                        rowText.includes(
                            searchValue
                        )
                    ) {

                        row.style.display =
                            "";

                    } else {

                        row.style.display =
                            "none";

                    }

                }
            );

        }
    );

}



// ========================================
// 9. ADMIN DASHBOARD LOAD
// ========================================

displayParticipants();