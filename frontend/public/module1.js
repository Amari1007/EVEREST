const table_rows = document.getElementById("table-data-rows");

async function get_data(){
    const response = await fetch("http://localhost:8888/backend/api", {
        method:"GET",
        mode:"cors",
        headers: {
            "Content-Type":"application/json",
        },
    });
    return await response.json();
};

window.addEventListener("DOMContentLoaded", async ()=>{
    const data = await get_data();
    const _date = new Date(data.date);
    table_rows.innerHTML = `
        <tr>
            <td>${_date.toLocaleTimeString()}, ${_date.toDateString()}</td>   
            <td>${data.header}</td>
            <td>${data.body}</td>
            <td>${data.source}</td>
            <td>xxx</td>
            <td></td>
        </tr>
    `

});