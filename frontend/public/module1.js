//comparison is the thief pf joy :D
const table_rows = document.getElementById("table-data-rows");

async function get_data(){
    try {
        const response = await fetch("http://localhost:1313/backend/api/tableData", {
            method:"GET",
            mode:"cors",
            headers: {
                "Content-Type":"application/json",
            },
        });   
        return await response.json();     
    } catch (error) {
        console.log("Frontend error: Failed to fetch data");
        return {db:null, success:false, db_message:"Frontend error: Failed to fetch data"};
    }
    
};

window.addEventListener("DOMContentLoaded", async ()=>{
    const data = await get_data();

    if(data.success){ //if success == true
        const dataID = data.db[0]._id;
        console.table(data.db_message);
        table_rows.innerHTML = `${data.db.map((value,index)=>`
            <tr>
                <td>${value.header}</td>
                <td>${value.source}</td>
                <td>${date}</td>
            </tr>
        `).join(" ")} ` //.join(" ") to remove unwanted commas
    }else{
        table_rows.innerHTML = `
            <tr> <td colspan="6">No Rows Fetched: ${data.db_message}</td> </tr>
        `
    }
});