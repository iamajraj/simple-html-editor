const inp = document.querySelector("input");
const editor = document.querySelector(".editor");
const iframe = document.querySelector("iframe");

inp.addEventListener("keypress", addLine);

let totalLine = 1;

function showCode() {
    const letAllInps = document.querySelectorAll(".editor-line");
    let code = "";
    letAllInps.forEach((e) => {
        code += e.value + "\n";
    });

    code = `data:text/html;charset=utf-8,${code}`;
    iframe.src = code;
}

function addLine(e) {
    if (e.key === "Enter") {
        totalLine++;
        let { div, newInp } = createInput();
        editor.append(div);
        newInp.focus();
    }
}

function goUpward(e) {
    if (e.key === "ArrowUp") {
        e.target.previousElementSibling.focus();
    }
}

function deleteLine(e) {
    if (e.key === "Backspace") {
        if (e.target.value === "") {
            let lines = document.querySelectorAll(".editor-line");
            lines[lines.length - 2].focus();
            editor.removeChild(e.target.parentElement);
        }
    }
}

function createInput() {
    const div = document.createElement("div");
    div.classList.add("line-container");
    const span = document.createElement("span");
    span.textContent = totalLine;
    const newInp = document.createElement("input");
    newInp.classList.add("editor-line");
    newInp.addEventListener("keypress", addLine);
    newInp.addEventListener("keydown", deleteLine);
    newInp.addEventListener("keydown", goUpward);
    newInp.focus();

    div.append(span);
    div.append(newInp);

    return {
        div,
        newInp,
    };
}
