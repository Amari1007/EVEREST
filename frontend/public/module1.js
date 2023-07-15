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
    table_rows.innerHTML = `
        <tr>
            <td>xxx</td>
            <td>xxx</td>
            <td>xxx</td>
            <td>xxx</td>
            <td>xxx</td>
        </tr>
    `

});