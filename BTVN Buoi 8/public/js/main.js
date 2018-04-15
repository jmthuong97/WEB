var character = 200;

// $("#character")


$(document).ready(function () {
    console.log($("#character"));
    $("#questionInput").keyup(function(){
        let count = 200 - this.value.length;
        // console.log(count);
        $("#character").text(count);
    });
})