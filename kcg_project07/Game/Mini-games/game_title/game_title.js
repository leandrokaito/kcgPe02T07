
//初期化
$(function(){
    $(".mode_selecter").click(function(){
        let id = $(this).attr("id");

        switch(id){
            case "main_mode_button":

                alert("this is a Main");

                break;

            case "free_mode_button":

                alert("this is a Free")

                break;
        }
    });
});