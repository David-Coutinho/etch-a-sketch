// Create a grid w/ dimensions SIZExSIZE
let grid = document.querySelector('.grid');
// Create remove children method
grid.removeChildren = function () {
    while (this.hasChildNodes()) {
        this.removeChild(this.lastChild);
    }
}
let gridPosition = grid.getBoundingClientRect();
console.log(`Grid Position: {X=${gridPosition.x}, Y=${gridPosition.y}}`)

let inputRange = document.querySelector('input[type="range"]');
let size = inputRange.value;

let label = document.querySelector('label');
label.textContent = `Grid Size (between 2 and 64) - current size: ${size}`
console.log(label.textContent);

document.querySelector('button').addEventListener('click',()=>{
    grid.removeChildren();
    size = prompt('Qual o tamanho pretendido?');
    grid.style = `
        grid-template-columns: repeat(${size},1fr);
        grid-template-rows: repeat(${size},1fr);
    `;
    for(let i = 0; i < size**2; i++) {
        let cell = document.createElement('div')
        cell.className = 'cells';
        cell.style = `border: 0px solid;background-color: rgba(0,0,0,0)`;
        grid.appendChild(cell);
    }
    let cells = grid.children;
    for(let cell of cells) {
        cell.addEventListener('mouseover',event=>{
            let x = event.pageX, y = event.pageY;
            if (x > gridPosition.x && x < gridPosition.x+400  && 
                y > gridPosition.y && y < gridPosition.y+400) {
                let element = document.elementFromPoint(x,y);
                let alpha=+element.style.backgroundColor.replace(/^.*,(.+)\)/,'$1');
                if (alpha <= 0.9) {
                    alpha += 0.1;
                    if (alpha == 1) alpha = 0.99;
                    element.style.backgroundColor = `rgba(0,0,0,${alpha})`;
                    console.log(element.style.backgroundColor)
                }
            }
        })
    } 
});

inputRange.addEventListener('change',() => {
    size = inputRange.value;
    label.textContent = `Grid Size (between 2 and 64) - current size: ${size}`
    grid.style = `
        grid-template-columns: repeat(${size},1fr);
        grid-template-rows: repeat(${size},1fr);
    `;
    grid.removeChildren();
    for(let i = 0; i < size**2; i++) {
        let cell = document.createElement('div')
        cell.className = 'cells';
        cell.style = `border: 0px solid;background-color: rgba(0,0,0,0)`;
        grid.appendChild(cell);
    }
    let cells = grid.children;
    /*
     Editar de modo a considerar o evento apenas quando sair e voltar 
        novamente para dentro do elemento
    */
    for(let cell of cells) {
        cell.addEventListener('mouseover',event=>{
            let x = event.pageX, y = event.pageY;
            if (x > gridPosition.x && x < gridPosition.x+400  && 
                y > gridPosition.y && y < gridPosition.y+400) {
                    let element = document.elementFromPoint(x,y)
                    let alpha = +element.style.backgroundColor.replace(/^.*,(.+)\)/,'$1');
                    if (alpha <= 0.9) {
                        alpha += 0.1;
                        if (alpha == 1) alpha = 0.99;
                        element.style.backgroundColor = `rgba(0,0,0,${alpha})`;
                        console.log(element.style.backgroundColor)
                    }
                }
        })
    } 
})









