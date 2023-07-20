///When the bastars have you cornered, SMILE

window.addEventListener("DOMContentLoaded", async()=>{

});

window.addEventListener("load", async()=>{
    const sysUser = {name:"Chaupi Ghambi", dbName:"MongoDB"};
    localStorage.setItem("sysUser", JSON.stringify(sysUser));

    const row_obj = {
        "123463":{
                header: "Malawi Pres. Meets Biden",
                body: `fadsdgdsfdgsadsfdg
                        adsfdgfdfsssssssds
                        adsfdgfsdsaaaaaaaaada
                        adfsdgfnhjbhbjbbhbjbhj
                        asdfsdgjnkjnjknjnkjnjk`,
                source: "BBC News | Africa",
                date: new Date("October 17, 2023 00:13:56"),
                last_edited:null,
            },
        "700071":{
            header:"Africa-US Summit Held In Botswana",
            body:`adsfguifuwtrhiuhuihiuh
            adsfdghfgdasdfsg
            sdfgfbnbhubfdgvh
            adfsgnubufrgtj
            `,
            source: "Bloomberg",
            date: new Date("October 7, 2023 17:30:09"),
            last_edited:null,
            },
        "111096":{
            header:"China Opens Oil Refinery In Kenya",
            body:`ggyadhifjojoijfir
            adshuihuhiuhihu
            bbduhsfuhihiuahsd
            iuahduisfhi`,
            source:"Insider Africa",
            date: new Date("October 3, 2022 12:42:12"),
            last_edited:null,
        }
    };

    localStorage.setItem("row_obj", JSON.stringify(row_obj));

});

async function row_selected(_obj){
    const obj_id = await _obj.getAttribute("data-i");
    const row_obj = await JSON.parse(localStorage.getItem("row_obj"));
    const get_story_view = await document.getElementsByClassName("story-view")[0];
    
    /*const table_row = await {
        row_header:_obj.getElementsByClassName("row-header")[0].innerHTML,
        row_source:_obj.getElementsByClassName("row-source")[0].innerHTML,
        row_date:_obj.getElementsByClassName("row-date")[0].innerHTML,
    };*/
    
    const story_panel = await {
        header_div: get_story_view.getElementsByClassName("story-header")[0],
        story_body: get_story_view.getElementsByClassName("story-body")[0],
    };
    
    story_panel.header_div.innerHTML = `
        <h2>${row_obj[obj_id].header}</h2>
        <p>${row_obj[obj_id].date}</p>
        <p>${row_obj[obj_id].source}</p>
    `;

    story_panel.story_body.innerHTML = `${row_obj[obj_id].body}`;
};