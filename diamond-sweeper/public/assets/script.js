        class Maze {
            
            constructor(nCol, nRow, playerName = 'Guest') {
                this.playerName = playerName;
                this.nCol = nCol;
                this.nRow = nRow;
                this.treasure = [];
                this.totalScore = 0;
            }
            setHiddenTreasure() {
                this.treasure = [];
                this.totalScore = (this.nRow * this.nCol);
                for(let row=1; row <= this.nRow; row++) {
                    for(let col=1; col <= 1; col++) {
                        this.treasure.push(row + "," + Math.floor((Math.random() * this.nCol) + 1));
                    }
                }
                console.log(this.treasure);
            }
            subScore() {
                return this.totalScore--;
            }
            dispScore() {
                return this.totalScore - this.nRow;
            }
            drawMaze(id) {
                this.setHiddenTreasure();
                for(let row=1; row <= this.nRow; row++) {
                    for(let col=1; col <= this.nCol; col++) {
                        var me = this;
                        (function () {
                            var div = document.createElement("div");
                            div.setAttribute('class', 'box fas fa-question');
                            var treasure = me.treasure;
                            div.addEventListener("click", function(){
                                if(treasure.indexOf(row + "," + col) > -1) {
                                    treasure.splice(treasure.indexOf(row + "," + col), 1);
                                    div.removeAttribute("class");
                                    div.setAttribute('class', 'box fas fa-gem');
                                    if(treasure.length == 0) {
                                        document.getElementById(id).outerHTML += `Hey <b>${me.playerName}</b>, you have scored ${me.dispScore()}!`;
                                        document.getElementById(id).setAttribute("class", "frozen");
                                    }
                                } else {
                                    div.removeAttribute("class");
                                    div.setAttribute('class', 'box');
                                    me.subScore();
                                }
                            });
                            document.getElementById(id).setAttribute("class", "init");
                            document.getElementById(id).appendChild(div);
                        }());
                    }
                    var clearFixDiv = document.createElement("div");
                    clearFixDiv.setAttribute('class', 'clearFix');
                    document.getElementById(id).appendChild(clearFixDiv);
                }
            }
        }
        var mazeObj = new Maze(8, 8, "Test User");
        mazeObj.drawMaze("mazeGame");