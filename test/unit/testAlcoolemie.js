/**
 * Tests unitaires du projet Alcoolémie
 *
 */
MesTestsUnitaires = TestCase('AlcoolemieTest');
MesTestsUnitaires.prototype.testsGetAlcoolPur = function () {
    assertEquals('0 verre', 0, getAlcoolPur(0));
    assertEquals('1 verre', 10, getAlcoolPur(1));
};

/**
 * Fonction qui retourne l'alcool pur ingéré en fonction du nombre
 * de verre
 *
 * @param {int} nbVerres
 * @returns {int}
 */
function getAlcoolPur(nbVerres) {
    const uniteAlcool = 10;
    return uniteAlcool * nbVerres;
}

MesTestsUnitaires.prototype.testsGetCoefDiffusion = function () {
    assertEquals('Homme', 0.7, getCoefDiffusion('homme'));
    assertEquals('Femme', 0.6, getCoefDiffusion('femme'));
};

function getCoefDiffusion(sexe) {
    if (sexe === 'homme') {
        return 0.7;
    } else {
        return 0.6;
    }
}

/**
 * Fonction qui retourne le coefficient de diffusion en fonction du sexe
 *
 * @param {string} sexe
 * @returns {float}
 */
function getCoefDiffusion(sexe) {
    const coefDiffuH = 0.7, coefDiffuF = 0.6;
    if (sexe === 'homme') {
        return coefDiffuH;
    } else {
        return coefDiffuF;
    }
}

MesTestsUnitaires.prototype.testsGetAlcoolemie = function () {
    assertEquals('Homme 100 kg 1 verre', 0.14, getAlcoolemie('homme', 100, 1));
    assertEquals('Femme 100 kg 1 verre', 0.17, getAlcoolemie('femme', 100, 1));
};

/**
 * Fonction qui retourne l'alcoolémie en fonction du sexe, du poids et du
 * nombre de verres ingérés
 *
 * @param {string} sexe
 * @param {int} poids
 * @param {int} nbVerres
 * @returns {float}
 */
function getAlcoolemie(sexe, poids, nbVerres) {
    // /!\ division par 0, on ne veut pas provoquer la destruction de l'univers ;o)
    if (poids > 0) {
        return (getAlcoolPur(nbVerres) / (poids * getCoefDiffusion(sexe))).toFixed(2);
    } else {
        return 0;
    }
}

MesTestsUnitaires.prototype.testsGetAmende = function () {
    assertEquals('Moins de 0,8 g/l de sang', 'Minorée : 90 € / Forfaitaire : 135 € / Majorée : 375 €', getAmende(0.4));
    assertEquals('A partir de 0,8 g/l', '4500 €', getAmende(0.8));
};

/**
 * Fonction qui retourne l'amende encourue en fonction de l'alcoolémie
 *
 * @param {float} alcoolemie
 * @returns {string}
 */
function getAmende(alcoolemie) {
    const seuil = 0.8;
    if (alcoolemie < seuil) {
        return 'Minorée : 90 € / Forfaitaire : 135 € / Majorée : 375 €';
    } else {
        return '4500 €';
    }
}

MesTestsUnitaires.prototype.testsGetSanction = function () {
    assertEquals('Moins de 0,8 g/l de sang', '6 points + suspension 3 ans',
            getSanction(0.4));
    assertEquals('A partir de 0,8 g/l de sang', '6 points + 2 ans de prison + suspension 3 ans + stage de sensibilisation', getSanction(0.8));
};

/**
 * Fonction qui retourne la sanction encourue en fonction de l'alcoolémie
 *
 * @param {float} alcoolemie
 * @returns {string}
 */
function getSanction(alcoolemie) {
    const seuil = 0.8;
    if (alcoolemie < seuil) {
        return '6 points + suspension 3 ans';
    } else {
        return '6 points + 2 ans de prison + suspension 3 ans + stage de sensibilisation';
    }
}

MesTestsUnitaires.prototype.testsGetInt = function () {
    /*:DOC +=
     <input type="number" id="num_verre" value="1">
     <input type="number" id="num_poids" value="100">
     */
    assertTrue('Test poids 100 Kg', 100 === getInt('#num_poids'));
    assertTrue('Test 1 verre', 1 === getInt('#num_verre'));
    window.document.querySelector('#num_verre').value = 'texte';
    assertTrue('Test erreur saisie verre', 0 === getInt('#num_verre'));
};


/**
 * Fonction qui retourne une valeur entière récupérée via
 * window.document.querySelector(id)
 *
 * @param {string} id
 * @returns {integer}
 */
function getInt(id) {
    if (isNaN(parseInt(window.document.querySelector(id).value))) {
        return 0;
    } else {
        return parseInt(window.document.querySelector(id).value);
    }
}

MesTestsUnitaires.prototype.testsGetString = function () {
    /*:DOC +=
     <fieldset id="sexe">
     <input type="radio" name="rd_sexe" id="rd_sexehomme" value="homme"
     checked="checked">
     <input type="radio" name="rd_sexe" id="rd_sexefemme" value="femme">
     </fieldset>
     */
    assertTrue('Test bouton radio Homme', 'homme' === getString('#sexe input[type="radio"]:checked'));
    // Changement de sexe
    window.document.querySelector('#rd_sexehomme').removeAttribute('checked');
    window.document.querySelector('#rd_sexefemme').setAttribute('checked', 'checked');
    assertTrue('Test bouton radio Femme',
            'femme' === getString('#sexe input[type="radio"]:checked'));
};

/**
 * Fonction qui retourne un string récupéré dans un champ via son id
 *
 * @param {string} id
 * @returns {string}
 */
function getString(id) {
    return window.document.querySelector(id).value;
}
