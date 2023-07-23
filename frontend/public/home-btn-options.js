import {populate_table} from "./populate_table.js";

async function delete_btn(obj){
    //GET CURRENTLY SELECTED ROW
    const row_selected = await JSON.parse(localStorage.getItem("row_focused"));
    
    const confirm_del = confirm(`Delete article with the header: "${row_selected.header}" ?`);
    const fetchUrl = "http://localhost:1313/backend/api/deleteTableRow";
    const fetchOptions = {
        method:"DELETE",
        mode:"cors",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify({id:row_selected.id, header:row_selected.header}),
    };

    if(confirm_del){
        const delete_req = await fetch(fetchUrl, fetchOptions);
        const response = await delete_req.json();
        //console.log(response);

        if(response.success){ //ALERT USER IF RECORD DELETED
            alert(`${response.message}`);
            close_view(null); //CLOSE CURRENTLY OPENED VIEW
        }
        
    }
}

async function close_view(obj){
    const view_art_div = await document.getElementsByClassName("story-body")[0];
    const view_header = await document.getElementsByClassName("story-header")[0];

    view_art_div.innerHTML = null;
    view_header.innerHTML = null;
}

async function reload_table(){
    populate_table()
}