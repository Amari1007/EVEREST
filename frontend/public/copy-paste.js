async function copyTextBox(){
    const textBox = await document.getElementById("textbox");

    await navigator.clipboard.writeText(textBox.innerHTML.toString());
    alert(`Text copied`);
}

async function pasteToTextBox(){
    const textBox = await document.getElementById("textbox");

    textBox.innerHTML += (await navigator.clipboard.readText()).toString();
}