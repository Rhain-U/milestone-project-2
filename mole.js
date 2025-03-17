let currentMoleTile;

window.onload = function () {
    setGame();
}

function setGame() {
    //set up the board
    for (let i = 0; i < 9; i++) {
        let tile = document.createElement("div");
        tile.classList.add("tile");
        tile.id = i;
        tile.addEventListener("click", () => {
            if (tile.classList.contains("bad-mole")) {
                tile.classList.remove("bad-mole");
                currentMoleTile = null;
            }
        });
        document.getElementById("board").appendChild(tile);
    }   
}
