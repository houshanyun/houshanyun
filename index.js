const inputTask = document.getElementById("input");
const addBtn = document.getElementById("btn");
const taskContent = document.querySelector(".tasksContent");


const iconArray = ["square", "check-square", "pen", "trash-alt"]

function makeIcon(iconName) {
    const icon = document.createElement("i");
    icon.classList.add("fas", `fa-${iconName}`);
    return icon;
}
function iconKey(iconName) {
    return `fas fa-${iconName}`;
}
function inputText() {
    const input = document.createElement("input");
    const att = document.createAttribute("readonly");
    input.setAttribute("type", "text");
    input.setAttributeNode(att);
    input.value = inputTask.value;
    return input;
}

function toTabs(txt) {
    const tabs = document.querySelector(".tabs");
    tabs.innerHTML = txt;
    tabs.classList.add("tabsActive");
    setTimeout(() => {
        tabs.classList.remove("tabsActive")
    }, 2000);
}

addBtn.addEventListener("click", () => {
    const newTask = document.createElement("div")
    if (inputTask.value === "") {
        toTabs("你沒有輸入任何內容喔!!!");
    } else {
        newTask.classList.add("task")
        newTask.appendChild(inputText())
        newTask.appendChild(makeIcon(iconArray[0]))
        newTask.appendChild(makeIcon(iconArray[2]))
        newTask.appendChild(makeIcon(iconArray[3]))
        taskContent.appendChild(newTask)
        inputTask.value = ""
    }
});

taskContent.addEventListener("click", (e) => {
    const taskText = e.target.parentNode.childNodes[0] // parentNode取得父元素
    switch (e.target.className) {
        case iconKey(iconArray[0]):
            e.target.classList.replace(`fa-${iconArray[0]}`, `fa-${iconArray[1]}`)
            taskText.classList.toggle("delText")
            break;
        case iconKey(iconArray[1]):
            e.target.classList.replace(`fa-${iconArray[1]}`, `fa-${iconArray[0]}`)
            taskText.classList.toggle("delText")
            break;
        case iconKey(iconArray[2]):
            if (taskText.getAttribute("class") === "delText") {
                toTabs("已完成的任務不能修改。");
            } else{
                taskText.removeAttribute("readonly")
                taskText.focus()
            }
            taskText.addEventListener("blur", () => {
                taskText.setAttribute("readonly", "")
            })
            break;
        case iconKey(iconArray[3]):
            const delText = e.target.parentNode
            delText.remove()
            break;
        default:
            console.log("love")
            break;
    }
});



