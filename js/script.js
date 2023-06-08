console.log("js ok");


const grid = document.getElementById("grid");
const selectField = document.getElementById("select");
const playButton = document.getElementById("play");
const scoreField = document.getElementById("scoreField");
const numBombs = 16;
const root = document.querySelector(":root");

playButton.addEventListener("click", function(){

    const setDifficulty = (level, root) => {
        let numCells = 0;
        if (level === "0"){
            numCells = 100;
            root.style.setProperty("--cellDimensions", "calc(100% / 10)");
        }
        else if (level === "1"){
            numCells = 81;
            root.style.setProperty("--cellDimensions", "calc(100% / 9)");
        }
        else if (level === "2"){
            numCells = 49;
            root.style.setProperty("--cellDimensions", "calc(100% / 7)");
        }
        return numCells
    }

    const createCell = (value) => {
        const node = document.createElement("div");
        node.classList.add("cell", "cellLength");
        node.innerText = value;
        return node
    }

    const generateBombs = (numBombs, maxValueBomb) => {
        const bombs = [];
        let bomb;
        while (bombs.length < numBombs){
            do{
                bomb = Math.floor(Math.random() * maxValueBomb) + 1;
            } while (bombs.includes(bomb))
            bombs.push(bomb);
        }
        console.log(bombs);
        return bombs
    }

    const gameOver = (bombList) => {
        const allCells = document.querySelectorAll(".cell");
        for (let i = 0; i < allCells.length; i++){
            allCells[i].classList.add("clicked");
            if (bombList.includes(parseInt(allCells[i].innerText))){
                allCells[i].classList.add("bomb");
            }
        }
    }

    const clickCell = (event, bombList) => {
        const cell = event.target;
        console.log(`score: `, score);

        if (cell.classList.contains("clicked")) return
        cell.classList.add("clicked");

        const cellValue = parseInt(cell.innerText);
        console.log(`Hai cliccato: ${cellValue}`);

        if (bombList.includes(cellValue)){
            cell.classList.add("bomb");
            youLose = true;
            alert(`Hai perso!\nScore: ${score}`);
        }
        else{
            score += 1;
            scoreField.innerText = score;
            if (score === maxScore){
                youWin = true;
                alert(`Hai vinto!\nScore: ${score}`);
            }
        }
        if (youWin || youLose) gameOver(bombList);
    }

    // init
    grid.innerHTML = "";
    let youLose = false;
    let youWin = false;
    let score = 0;
    scoreField.innerText = score;

    // difficulty mode
    const selectValue = selectField.value;
    const numCells = setDifficulty(selectValue, root);
    const maxScore = numCells - numBombs;

    // bombs
    const bombList = generateBombs(numBombs, numCells);

    // cells
    for (let i = 0; i < numCells; i++){
        const cell = createCell(i + 1);
        
        cell.addEventListener("click", (event) => {clickCell(event, bombList)});

        grid.appendChild(cell);
    }
});
