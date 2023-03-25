const inp = document.querySelector("input");
const editor = document.querySelector(".editor");
const iframe = document.querySelector("iframe");

inp.addEventListener("keydown", (e) => {
    addLine(e);
    goDownward(e);
});

let totalLine = 1;

window.onload = () => {
    inp.value = "<h1>Hello, world!</h1>";
    renderCode();
};

function createInput() {
    const div = document.createElement("div");
    const span = document.createElement("span");
    const newInp = document.createElement("input");

    div.classList.add("line-container");
    span.textContent = totalLine;

    newInp.classList.add("editor-line");
    newInp.addEventListener("keydown", (e) => {
        addLine(e);
        deleteLine(e);
        goUpward(e);
        goDownward(e);
    });
    newInp.focus();

    div.append(span);
    div.append(newInp);

    return {
        div,
        newInp,
    };
}
function renderCode() {
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
        e.target.parentElement.previousElementSibling.lastElementChild.focus();
    }
}
function goDownward(e) {
    if (e.key === "ArrowDown") {
        let el = e.target.parentElement.nextElementSibling;
        if (el) {
            el.lastElementChild.focus();
        }
    }
}

function deleteLine(e) {
    if (e.key === "Backspace") {
        if (e.target.value === "") {
            totalLine--;
            e.target.parentElement.previousElementSibling.lastElementChild.focus();
            editor.removeChild(e.target.parentElement);
        }
    }
}
