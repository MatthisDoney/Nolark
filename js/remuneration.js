/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */


function remuneration() {
    let fixe = 0;
    const anciennete = parseInt(window.document.querySelector("#i_years").value);
    if (anciennete < 5) { //moins de 5ans d'ancienneté
        fixe = 1300;
    } else if (anciennete >= 5 && anciennete < 10) { //entre 5 et 10 ans
        fixe = 1300 + (1300 * 3 / 100);
    } else if (anciennete >= 10) { //plus de 10ans d'ancienneté
        fixe = 1300 + (1300 * 6 / 100);
    }
    let result = (fixe + comS20(parseInt(window.document.querySelector("#i_s20").value)) + ComMultitec(parseInt(window.document.querySelector("#i_multitec").value)) + comXspirit(parseInt(window.document.querySelector("#i_xspirit").value))) + "€";

    return document.getElementById("resultat").innerHTML = result;
    }
//calcul la com sur S20
function comS20(nb) {
    const prixS20 = 140;
    const AxcomS20 = 0.02;
    return nb * prixS20 * AxcomS20;

}
// calcul la com sur ComMultitec
function ComMultitec(nb) {
    const prixMult = 180;
    let AxcomMult = 0;
    if (nb <= 20) {
        AxcomMult = 4 / 100;
    } else if (nb >= 21 && nb <= 50) {
        AxcomMult = 6 / 100;
    } else if (nb >= 51) {
        AxcomMult = 10 / 100;
    }

    return nb * prixMult * AxcomMult;
}// calcul la com sur Xspririt
function comXspirit(nb)
{

    const prixspirit = 350;
    const Axspirit = 1;
    if (nb > 50) {
        const Axspirit = 6 / 100;
    }

    return nb * prixspirit * Axspirit;
}