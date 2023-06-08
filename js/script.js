console.log("js ok");


const grid = document.getElementById("grid");
const selectField = document.getElementById("select");
const playButton = document.getElementById("play");
const scoreField = document.getElementById("scoreField");
const numBombs = 16;


playButton.addEventListener("click", function(){

    const createCell = (value, cellClass) => {
        const node = document.createElement("div");
        node.classList.add("cell", cellClass);
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

    // init grid
    grid.innerHTML = "";
    let youLose = false;
    let youWin = false;
    
    const selectValue = selectField.value;
    let numCells = 100;
    let widthClass = "easy";
    let score = 0;
    
    if (selectValue === "1"){
        numCells = 81;
        widthClass = "medium";
    }
    else if (selectValue === "2"){
        numCells = 49;
        widthClass = "hard";
    }

    const maxScore = numCells - numBombs;
    const bombList = generateBombs(numBombs, numCells);

    // create cell
    for (let i = 0; i < numCells; i++){
        const cell = createCell(i + 1, widthClass);
        cell.addEventListener("click", function(){
            
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
        });
        grid.appendChild(cell);
    }
});
