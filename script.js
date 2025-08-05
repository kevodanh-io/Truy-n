
let views = 0;
let likes = 0;
let history = [];
let postedStories = [];
let comments = [];
let users = [{username: "admin", password: "123", role: "admin"}];
let currentUser = null;

function showPage(page) {
    document.querySelectorAll("main section").forEach(sec => sec.style.display = "none");
    document.getElementById(page).style.display = "block";
}

function readStory() {
    views++;
    document.getElementById("views").innerText = views;
    if (currentUser) {
        history.push("Bạn đã đọc một truyện mới");
        updateHistory();
    }
}

function likeStory() {
    likes++;
    document.getElementById("likes").innerText = likes;
}

function commentStory() {
    let cmt = prompt("Nhập bình luận của bạn:");
    if (cmt) {
        comments.push(cmt);
        document.getElementById("comments").innerHTML += `<p>💬 ${cmt}</p>`;
    }
}

function unlockChapter() {
    alert("Bạn cần thanh toán để mở khóa chương này!");
}

function updateHistory() {
    document.getElementById("readingHistory").innerHTML = history.map(h => `<li>${h}</li>`).join("");
}

function postStory() {
    let story = document.getElementById("newStory").value;
    if (story) {
        postedStories.push(story);
        document.getElementById("postedStories").innerHTML += `<p>📚 ${story}</p>`;
    }
}

function approveStory() {
    if (currentUser && currentUser.role === "admin") {
        alert("Admin đã duyệt truyện!");
    } else {
        alert("Chỉ admin mới có quyền duyệt.");
    }
}

function approvePayment() {
    if (currentUser && currentUser.role === "admin") {
        alert("Admin đã duyệt thanh toán!");
    } else {
        alert("Chỉ admin mới có quyền duyệt.");
    }
}

function searchStory() {
    let input = document.getElementById("searchInput").value.toLowerCase();
    let stories = document.getElementById("storyList").getElementsByTagName("li");

    for (let i = 0; i < stories.length; i++) {
        let story = stories[i].innerText.toLowerCase();
        stories[i].style.display = story.includes(input) ? "" : "none";
    }
}

function login() {
    let user = document.getElementById("loginUser").value;
    let pass = document.getElementById("loginPass").value;
    let found = users.find(u => u.username === user && u.password === pass);
    if (found) {
        currentUser = found;
        alert("Đăng nhập thành công!");
        if (found.role === "admin") showPage("admin");
        else showPage("home");
    } else {
        alert("Sai tài khoản hoặc mật khẩu!");
    }
}

function register() {
    let user = document.getElementById("regUser").value;
    let pass = document.getElementById("regPass").value;
    if (user && pass) {
        users.push({username: user, password: pass, role: "user"});
        alert("Đăng ký thành công! Vui lòng đăng nhập.");
        showPage("login");
    } else {
        alert("Vui lòng nhập đủ thông tin!");
    }
}
