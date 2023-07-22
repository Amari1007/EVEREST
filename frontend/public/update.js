const save_btn = document.getElementById("btn-save");

async function save_click(){
    const form = await document.forms.articleForm;
    const text_box = await document.getElementById("textbox");
    const header = await form.header.value.toString();
    const source = await form.source.value.toString();
    const date = await form.date.value.toString();
    
    const response = await send_form({
        header:header,
        text_box:text_box.innerHTML.toString(),
        source:source,
        date:new Date(date).getTime(),
    });
    console.log("Server Message:", response.message);
}

async function send_form(x={}){
    const data = {
        header:x.header,
        text_box:x.text_box,
        source:x.source,
        date:x.date,
    };

    const response = await fetch("http://localhost:1313/backend/api/saveData", {
        method:"POST",
        mode:"cors",
        body:JSON.stringify(data),
        headers:{
            "Content-Type":"application/json"
        }
    })

    return await response.json();
}

window.addEventListener("DOMContentLoaded", async()=>{
    save_btn.addEventListener("click", save_click);
})