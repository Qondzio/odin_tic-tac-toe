const createBoard= (function(){
    const table=[null,null,null,null,null,null,null,null,null];

    
    const cells=document.querySelectorAll("main>div");
    
    
    return {table, cells};        
})();

const insertSign= (function(){

    function createSign(currentPlayer){
        if(currentPlayer==='x'){
            const sign=document.createElement("img");
            sign.src='/images/close.png';
            return sign;
        }
        else{
            const sign=document.createElement("img");
            sign.src='/images/o.png';
            return sign;
        }    
    }

    const insertToTable=function(index,currentPlayer){
        createBoard.table[index]=currentPlayer;
    }
    
    return {createSign,insertToTable};
    
})();


const game=(function(){
    let currentPlayer='x';
    let winner=0;

    const winningPatterns=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

    function changePlayer(){
        if(currentPlayer==='x'){
            currentPlayer='o';
        }
        else{
            currentPlayer='x'
        }
    }

    createBoard.cells.forEach((item,index)=>{
        item.addEventListener('click', ()=>{
            if(createBoard.cells[index].innerHTML==='' && winner===0){
                createBoard.cells[index].appendChild(insertSign.createSign(currentPlayer));
                insertSign.insertToTable(index,currentPlayer);
                console.log(createBoard.table); 
                checkWinner();
                changePlayer();
            }
        })
        
    })

    function checkWinner(){
        if(!createBoard.table.includes(null) && winner===0){
            const winnerBanner=document.querySelector(".winner");
            winnerBanner.textContent="No one wins the game";
            winnerBanner.style.display="flex";
        }

        winningPatterns.forEach((item)=>{
            if(createBoard.table[item[0]]===currentPlayer && createBoard.table[item[1]]===currentPlayer && createBoard.table[item[2]]===currentPlayer){
                console.log(currentPlayer);
                endGame();
            }
            
        })
    }

    function endGame(){
        winner=1;
        const winnerBanner=document.querySelector(".winner");
        winnerBanner.textContent=`Player "${currentPlayer}"`+" has won!!!";
        winnerBanner.style.display="flex";
    }

    function resetGame(){
        createBoard.table=[null,null,null,null,null,null,null,null,null];
        currentPlayer='x';
        createBoard.cells.forEach((item)=>{
            item.innerHTML='';
        })
        
    }

    return {resetGame};
})();
