//comparison is the thief pf joy :D
const table_rows = document.getElementById("table-data-rows"); //THIS SHOULD LOAD AFTER DOM

//RUN FUNCTION TO GET DB ROWS
async function getDB_data(){
    const dbUrl = "http://localhost:1313/backend/api/getTableData";
    const options = {
        method:"GET",
        mode:"cors",
        header:{
            "Content-Type":"application/json",
        },
    };

    try {
        const response = await fetch(dbUrl, options);   
        return await response.json();
    } catch (error) {
        console.log("Frontend error: Failed to fetch data");
        return {db:null, success:false, db_message:"Frontend error: Failed to fetch data"};
    }
    
};

// ATTEMPT TO GET DATA FROM DB
window.addEventListener("load", async()=>{
    // SET SYSTEM USER IN LOCALSTORAGE
    const sysUser = await {name:"Chaupi Ghambi", dbName:"MongoDB"};
    localStorage.setItem("sysUser", JSON.stringify(sysUser));

    //SAVE DATABASE ROWS IN LOCALSTORAGE
    const data = await getDB_data();
    
    if(data.success){
        // data.db IS AN ARRAY
        localStorage.setItem("tableDb_obj", JSON.stringify(data.db));
    }else{
        localStorage.setItem("tableDb_obj", null);
    }

});

//POPULATE TABLE VIEW AFTER DOM LOAD
window.addEventListener("DOMContentLoaded", async ()=>{
    const data = await getDB_data();

    if(data.success){ //if success == true
        console.table(data.db_message);
        table_rows.innerHTML = `${data.db.map((value,index)=>`
            <tr class="tb-border-bottom" onclick="row_selected(this)" data-i="${value.id}">
                <td class="tb-border-right row-header">${value.header}</td>
                <td class="tb-border-right row-source">${value.source}</td>
                <td class="tb-border-right row-date">${new Date(value.date).toDateString()}</td>
            </tr>`)
        .join(" ")} ` //.join(" ") to remove unwanted commas
    }else{
        table_rows.innerHTML = `
            <tr> <td colspan="6">No Rows Fetched: ${data.db_message}</td> </tr>
        `
    }
});