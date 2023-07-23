///When the bastards have you cornered, SMILE!!


//RUN THIS WHENEVER A ROW IS SELECTED -> GET (ID)
async function row_selected(_obj){
    const obj_id = await _obj.getAttribute("data-i");
    const get_story_view = await document.getElementsByClassName("story-view")[0];
    
    const table_row = {
        row_header: _obj.getElementsByClassName("row-header")[0].innerHTML,
        row_source: _obj.getElementsByClassName("row-source")[0].innerHTML,
        row_date: _obj.getElementsByClassName("row-date")[0].innerHTML,
    };
    
    const story_panel = {
        header_div: get_story_view.getElementsByClassName("story-header")[0],
        story_body: get_story_view.getElementsByClassName("story-body")[0],
    };
   
    //GET DB DATA FROM LOCALSTORAGE
    const row_obj = await JSON.parse(localStorage.getItem("tableDb_obj"));

    //SET CURRENTLY SELECTED ROW IN LOCALSTORAGE (FOR OTHER USES)
    const focus_row = row_obj.find((value)=>{
        return Number.parseInt(value.id) == Number.parseInt(obj_id)
    });
    localStorage.setItem("row_focused",JSON.stringify(focus_row));
    
    //DISPLAY SELECTED ROW IN DIV
    story_panel.header_div.innerHTML = `${
        row_obj.map((value)=>{
            if(Number.parseInt(obj_id)==Number.parseInt(value.id)){
                return `
                    <h3>${value.header}</h3>
                    <p>Published | ${new Date(value.date).toUTCString()}</p>
                    <p>Source | ${value.source}</p>
                `
            }
        }).join(" ")
    }
    `;

    story_panel.story_body.innerHTML = `${
        row_obj.map((value)=>{
            if(Number.parseInt(obj_id) == Number.parseInt(value.id)){
                return `<article>${value.body}</article>`
            }
        }).join(" ")
    }`;
};