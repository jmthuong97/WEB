$(document).ready(() => {
    listenToFormSubmitEvent()
})

const listenToFormSubmitEvent = () => {
    // const formElement = $(".article-search-form");
    // formElement.on("submit", async event => {
    //     event.preventDefault()
    // })

    const throttledSearch = _.throttle(search, 1000);
    
    const inputElement = $("#article-search-form__input");
    inputElement.on("input", ()=>{
        clearData();
        throttledSearch();
    });
    inputElement
}

function clearData(){
    $("div.article-list").empty();
}

async function search() {
    
    const searchQuery = getUserSearchQuery();
    const data = await searchWiki(searchQuery);

    if(searchQuery != getUserSearchQuery()){
        return // không chạy bên dưới nữa
    }
    processData(data);
}

async function searchWiki(query) {
    return await $.ajax({
        url: "https://en.wikipedia.org/w/api.php",
        data: {
            action: "query",
            list: "search",
            format: "json",
            srprop: "snippet",
            origin: "*",
            srsearch: encodeURI(query) // Thay dấu cách = "%20"
        },
    })
}

function getUserSearchQuery() {
    const inputElement = $("#article-search-form__input");
    const searchQuery = inputElement.val();
    return searchQuery;
}

function processData(data) {
    // hàm này được gọi sau khi dữ liệu được server trả về
    // map: chuyển từ array article thành array các thẻ <a>
    if(!(data.query && data.query.search)){// check xem data có dữ liệu k?
        return
    }

    const elementArray = data.query.search
        .map(article =>
            `<a href="https://en.wikipedia.org/?curid=${article.pageid}" target="_blank"
        class="article-view">
        <h3 className="article-view__title">${article.title}</h3>
        <p className="article-view__snippet">${article.snippet}</p>`
        )
        .join("");
    $(".article-list").empty(); // Xóa nội dung của .article-list
    $("div.article-list").append(elementArray);   // Ghép array string lại thành 1 string
}