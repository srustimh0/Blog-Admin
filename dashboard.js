// ----- STORAGE HELPERS -----
function getData(key) {
  return JSON.parse(localStorage.getItem(key) || "[]");
}
function saveData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// ----- VIEW SWITCH -----
function showView(view) {
  document.getElementById("viewDashboard").style.display =
    view === "dashboard" ? "block" : "none";
  document.getElementById("viewMail").style.display =
    view === "mail" ? "block" : "none";
  document.getElementById("viewAdmission").style.display =
    view === "admission" ? "block" : "none";
}

// ----- LOGOUT -----
function logout() {
  localStorage.removeItem("loggedIn");
  window.location.href = "login.html";
}

// ----- BLOGS -----
const blogTable = document.getElementById("blogTableBody");
const blogForm = document.getElementById("modalForm");
const addBlogBtn = document.getElementById("addBlogBtn");
let blogs = getData("blogs");

function renderBlogs() {
  blogTable.innerHTML = "";
  blogs.forEach((b, i) => {
    blogTable.innerHTML += `
      <tr>
        <td>${i + 1}</td>
        <td><img src="${b.image}" width="50"></td>
        <td>${b.title}</td>
        <td>${b.short}</td>
        <td>${b.content.substring(0, 40)}...</td>
        <td>
          <button onclick="editBlog(${i})">Edit</button>
          <button onclick="deleteBlog(${i})">Delete</button>
        </td>
      </tr>`;
  });
}
renderBlogs();

addBlogBtn.onclick = () => {
  document.getElementById("modalTitle").innerText = "Add Blog";
  blogForm.reset();
  document.getElementById("editIndex").value = "";
  document.getElementById("modal").style.display = "block";
};

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

blogForm.onsubmit = function (e) {
  e.preventDefault();
  const idx = document.getElementById("editIndex").value;
  const title = document.getElementById("blogTitle").value;
  const short = document.getElementById("blogShort").value;
  const category = document.getElementById("blogCategory").value;
  const content = document.getElementById("blogContent").value;
  let image = "";

  const file = document.getElementById("blog-image").files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function () {
      image = reader.result;
      saveBlog(idx, { image, title, short, category, content });
    };
    reader.readAsDataURL(file);
  } else {
    image = "https://via.placeholder.com/100"; // default placeholder
    saveBlog(idx, { image, title, short, category, content });
  }
};

function saveBlog(idx, blogObj) {
  if (idx === "") {
    blogs.push(blogObj);
  } else {
    blogs[idx] = blogObj;
  }
  saveData("blogs", blogs);
  renderBlogs();
  closeModal();
}

function editBlog(i) {
  const b = blogs[i];
  document.getElementById("modalTitle").innerText = "Edit Blog";
  document.getElementById("editIndex").value = i;
  document.getElementById("blogTitle").value = b.title;
  document.getElementById("blogShort").value = b.short;
  document.getElementById("blogCategory").value = b.category;
  document.getElementById("blogContent").value = b.content;
  document.getElementById("modal").style.display = "block";
}

function deleteBlog(i) {
  if (confirm("Delete this blog?")) {
    blogs.splice(i, 1);
    saveData("blogs", blogs);
    renderBlogs();
  }
}

// ----- MAIL CONTACTS -----
const mailTable = document.getElementById("mailTableBody");
const mailForm = document.getElementById("mailForm");
let mails = getData("mails");

function renderMails() {
  mailTable.innerHTML = "";
  mails.forEach((m, i) => {
    mailTable.innerHTML += `
      <tr>
        <td>${i + 1}</td>
        <td>${m.name}</td>
        <td>${m.email}</td>
        <td>${m.msg}</td>
        <td>
          <button onclick="editMail(${i})">Edit</button>
          <button onclick="deleteMail(${i})">Delete</button>
        </td>
      </tr>`;
  });
}
renderMails();

document.getElementById("addMailBtn").onclick = () => {
  mailForm.reset();
  document.getElementById("mailEditIndex").value = "";
  document.getElementById("modalMail").style.display = "block";
};

function closeMailModal() {
  document.getElementById("modalMail").style.display = "none";
}

mailForm.onsubmit = function (e) {
  e.preventDefault();
  const idx = document.getElementById("mailEditIndex").value;
  const obj = {
    name: document.getElementById("mailName").value,
    email: document.getElementById("mailEmail").value,
    msg: document.getElementById("mailMsg").value,
  };
  if (idx === "") {
    mails.push(obj);
  } else {
    mails[idx] = obj;
  }
  saveData("mails", mails);
  renderMails();
  closeMailModal();
};

function editMail(i) {
  const m = mails[i];
  document.getElementById("mailEditIndex").value = i;
  document.getElementById("mailName").value = m.name;
  document.getElementById("mailEmail").value = m.email;
  document.getElementById("mailMsg").value = m.msg;
  document.getElementById("modalMail").style.display = "block";
}

function deleteMail(i) {
  if (confirm("Delete this mail?")) {
    mails.splice(i, 1);
    saveData("mails", mails);
    renderMails();
  }
}

// ----- ADMISSION CONTACTS -----
const admissionTable = document.getElementById("admissionTableBody");
const admissionForm = document.getElementById("admissionForm");
let admissions = getData("admissions");

function renderAdmissions() {
  admissionTable.innerHTML = "";
  admissions.forEach((a, i) => {
    admissionTable.innerHTML += `
      <tr>
        <td>${i + 1}</td>
        <td>${a.name}</td>
        <td>${a.phone}</td>
        <td>${a.class}</td>
        <td>
          <button onclick="editAdmission(${i})">Edit</button>
          <button onclick="deleteAdmission(${i})">Delete</button>
        </td>
      </tr>`;
  });
}
renderAdmissions();

document.getElementById("addAdmissionBtn").onclick = () => {
  admissionForm.reset();
  document.getElementById("admissionEditIndex").value = "";
  document.getElementById("modalAdmission").style.display = "block";
};

function closeAdmissionModal() {
  document.getElementById("modalAdmission").style.display = "none";
}

admissionForm.onsubmit = function (e) {
  e.preventDefault();
  const idx = document.getElementById("admissionEditIndex").value;
  const obj = {
    name: document.getElementById("adName").value,
    phone: document.getElementById("adPhone").value,
    class: document.getElementById("adClass").value,
  };
  if (idx === "") {
    admissions.push(obj);
  } else {
    admissions[idx] = obj;
  }
  saveData("admissions", admissions);
  renderAdmissions();
  closeAdmissionModal();
};

function editAdmission(i) {
  const a = admissions[i];
  document.getElementById("admissionEditIndex").value = i;
  document.getElementById("adName").value = a.name;
  document.getElementById("adPhone").value = a.phone;
  document.getElementById("adClass").value = a.class;
  document.getElementById("modalAdmission").style.display = "block";
}

function deleteAdmission(i) {
  if (confirm("Delete this admission?")) {
    admissions.splice(i, 1);
    saveData("admissions", admissions);
    renderAdmissions();
  }
}
