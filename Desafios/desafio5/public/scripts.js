const menuItems = document.querySelectorAll("header .links a");
const currentPage = window.location.pathname


for (item of menuItems) {
    if (currentPage.includes(item.getAttribute("href"))) {
        item.classList.add("active")
    }
}
