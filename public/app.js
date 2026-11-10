
const searchForm = document.querySelector(".search-form");

if (searchForm) {
    searchForm.addEventListener("submit", () => {
        const searchButton = searchForm.querySelector(
            "button[type='submit']"
        );

        if (searchButton) {
            searchButton.textContent = "Searching...";
            searchButton.disabled = true;
        }
    });
}
