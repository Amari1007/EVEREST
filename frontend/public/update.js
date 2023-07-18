const save_btn = document.getElementById("btn-save");

async function save_click(){
    const form = document.forms.articleForm;
    const text_box = document.getElementById("textbox");
    const header = form.header.value.toString();
    const source = form.source.value.toString();
    
    const response = await send_form({
        header:header,
        source:source,
        text_box:text_box.innerHTML.toString(),
    });
    console.log("Server Message:", response.message);
}

async function send_form(x={}){
    const data = {
        header:x.header,
        source:x.source,
        text_box:x.text_box,
    };

    const response = await fetch("http://localhost:1313/backend/api/sendData", {
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