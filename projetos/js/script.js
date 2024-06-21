//declarar as variaveis para armazenar a posição do botao no
let topMod = 0;
let leftMod = 0;

/*criar o evento ao body para que a funcao
do botao (webHandler) seja chamada  quando o
mouse se mover perto do botao*/

$("body").on("mousemove", webHandler);

/*criar a funcao webHandler(botao no desktop) */
function webHandler(event){
    //definindo a posicao inicial do botao
    let button = $('#no').position();
    let buttonCenter = {
        //colocando uma margem extra de 100px de largura e 30px de altura
        x: button.left + 30,
        y: button.top + 3  
    } 
    //calcular a distancia entre o cursor do mouse e o centro do botao
    //Math.sqrt raiz quadrada do x (button.left)
    //Math.pow
    let distance = Math.sqrt(Math.pow(event.pageX - buttonCenter.x, 2))
    // verificar se o mouse esta a menos de 80px do botao//
    if (distance < 90){
        var angle = calculateAngle (event, buttonCenter, distance)
    // se o mouse esta proximo ao botao, a funcao calculateAngle é chamada para calcular//
    // O seno e o cos baseado na posicao do mouse em relacao ao botao//
    // pra que ele saia de perto//
    leftMod += 3 * angle.cos * (event.pageX < buttonCenter.x ? 1 :-1) 
    // verificando a posicao horizontal do mouse, se esta a direita, ele vai se deslocar para a esquerda,
    // se esta a esquerda do botao, ele retorna 1 e se esta a direita, ele 
    // e se move no valor de angulo atual

    topMod += 3 * angle.sin * (event.pageY < buttonCenter.y ? 1 : -1)
    // colocar uma nova posicao no botao a partir do css//
    $('#no').css({top: topMod, left: leftMod, position: 'relative'})
    }
}

//criando funcao que vai calcular de fato o seno e o cosseno//
function calculateAngle (mouse, center, distance){
    //Math.abs retorna um valor absoluto, garantindo que nao tenha pontos negativos
    let sin = Math.abs(mouse.pageY - center.y)/distance;
    let cos = Math.abs(mouse.pageX - center.x)/distance;
    return {sin: sin, cos: cos}
}
