const retrieveEntries = () => {
  let entries = localStorage.getItem("user-entries");
  if (entries) {
    entries = JSON.parse(entries);
  } else {
    entries = [];
  }
  return entries;
};

let userForm = document.getElementById("user-form");
let userEntries = retrieveEntries();

const displayEntries = () => {
  const entries = retrieveEntries();
  const tableEntries = entries
    .map((entry) => {
      const nameCell = `<td class="px-4 py-2 text-center">${entry.name}</td>`;
      const emailCell = `<td class="px-4 py-2 text-center">${entry.email}</td>`;
      const passwordCell = `<td class="px-4 py-2 text-center">${entry.password}</td>`;
      const dobCell = `<td class="px-4 py-2 text-center">${entry.dob}</td>`;
      const acceptCell = `<td class="px-4 py-2 text-center">${entry.acceptTerms}</td>`;

      const row = `<tr>${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${acceptCell}</tr>`;

      return row;
    })
    .join("\n");

  const table = `<table class="mx-auto w-full mt-8 mb-4">
    <tr class="bg-gray-200">
    <th class="py-2 px-4">Name</th>
    <th class="py-2 px-4">Email</th>
    <th class="py-2 px-4">Password</th>
    <th class="py-2 px-4">Dob</th>
    <th class="py-2 px-4">Accepted terms?</th>
  </tr>${tableEntries}</table>`;

  let tableContent = document.getElementById("user-entries");
  tableContent.innerHTML = table;
};

const validateAge = (dob) => {
  const today = new Date();
  const minDate = new Date(today);
  const maxDate = new Date(today);
  minDate.setFullYear(minDate.getFullYear() - 55);
  maxDate.setFullYear(maxDate.getFullYear() - 18);
  const date = new Date(dob);

  const valid1 =
    date.getFullYear() <= maxDate.getFullYear() &&
    date.getMonth() <= maxDate.getMonth() &&
    date.getDate() <= maxDate.getDate();
  const valid2 =
    date.getFullYear() >= minDate.getFullYear() &&
    date.getMonth() >= minDate.getMonth() &&
    date.getDate() >= minDate.getDate();

  return valid1 && valid2;
};

const saveUserForm = (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
  const acceptTerms = document.getElementById("acceptTerms").checked;

  if (!validateAge(dob)) {
    alert("Age between 18 and 55 only accepted!");
    location.reload();
    return;
  }

  const entry = {
    name,
    email,
    password,
    dob,
    acceptTerms,
  };

  userEntries.push(entry);

  localStorage.setItem("user-entries", JSON.stringify(userEntries));
  displayEntries();
};
userForm.addEventListener("submit", saveUserForm);
displayEntries();
