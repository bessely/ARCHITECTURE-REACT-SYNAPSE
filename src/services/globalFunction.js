import { MemoryRouter } from "react-router";
import { BASEURL } from "./serveur";

export const packageJSON = require("../../package.json");

/** CONSERVE UNE VARIABLE EN MEMOIRE LOCAL POUR QUELLE SOIT DISPONIBLE DANS TTE L'aPPLI
    @param {any} laVariable la variable ou constante  a mettre en memoire
    @param {string} NomDeLaVariable le nom de recuperation de la variable ou de la constante
    @author @bessely
 */
export function writeThisInLocalstore(laVariable, NomDeLaVariable) {
    localStorage.setItem(NomDeLaVariable, JSON.stringify(laVariable));
}

/** RECUPERER UNE VARIABLE DANS LE LOCAL STORAGE 
    @param {string} NomDeLaVariable le nom de recuperation de la variable ou de la constante
    @author @bessely
*/

/**
 * CUSTUM LOCAL STORAGE SERVICES 
 * @param {string} NomDeLaVariable à récupéré dans le localstorage
 * @author @bessely
 */
export function getThisInLocalstore(NomDeLaVariable) {
    return (JSON.parse(localStorage.getItem(NomDeLaVariable)));
}
/** VIDER UNE MEMORE OU LE LOCAL STORAGE EN ENTIER 
    @param {string} NomDeLaVariable le nom de recuperation de la variable ou de la constante
    @author @bessely
*/
export function purgeStrorage(NomDeLaVariable) {
    if (NomDeLaVariable===undefined) {
        localStorage.clear();
    } else {
        localStorage.removeItem(NomDeLaVariable);
    }
    return true;
}

/** RECUPERER UN PARAMETRE SPECIFIQUE DANS l'URL 
    @param {string} sParam le nom de du parametre a recupérer dans l'url
    @author @bessely
*/
export function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
    sURLVariables = sPageURL.split('&'), sParameterName, i;
    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
    return false;
}

/**RETOURNE LE DERNIER ELMENT DE LA BARRE D'ADRESSE [le nom du fichier en cours d'execusion]
 * 
 * @returns {string}
 * @author @bessely
 */
export function getCurrentPath(){
    let pathname = window.location.pathname;
    return pathname.split("/").pop();
}

/**RETOURNE LA RACINE DE L'URL
 * 
 * @returns Origine url
 * @author @bessely
 */
export function getUrlOrigin() {
    return (window.location.protocol+"//"+window.location.hostname);
}

/**FORMATTEUR DE LIBELLE : dimininue la taille d'un text puis ajoute 3 points de suspension a la fin du caractère si et seulement si le text est superieur au nombre de caratere a retienir
 *@param {integer} maxCaract 
 *@param {string} label 
 *@returns {string}
 *@author @bessely
 */
export function formatLargeLabel(maxCaract,label){
        if (label.length > maxCaract) {
            return label.toString().substring(0, maxCaract) + "..."
        }
        return label;
}

/**
 * FORMATE UNE DATE AU FORMAT xx-xx-XXXX vers une date  xx/xx/XXXX
 * @param {date} dateAformater 
 * @returns
 * @author @bessely
 */
export const formatDate = (dateAformater)=>{
    if (dateAformater!=="" && dateAformater!==undefined && dateAformater!=="") {
            let xxxx = dateAformater.split("-");
            return xxxx[2]+"/"+xxxx[1]+"/"+xxxx[0]
    }
    return ""
};

/**
 * LECTEUR DE SON
 * @param {string} data le lien  vers le fichier audio
 * @returns Noice
 * @author @bessely
 */
export const playSond = (data=BASEURL+"assets/audio/pop-39222.mp3") =>{
    if (packageJSON.useAlerte) {
        console.log(data);
        const audio = new Audio(data);
        audio.play();
    }
    return;
}


/**
 *  LECTEUR DE A VOIX [SYNTHETISEUR]
 * @param {string} textToSpell le text à lire
 * @returns texte voice spelling in french
 * @author @bessely
 */
export const spellNotification=(textToSpell="Une erreur inconnue est survenue.")=>{
    if (packageJSON.useVoiceAlerte) {
        if ('speechSynthesis' in window) { //Je vérifie dabord que cette fonctionalité est supportée par le navigateur
            for (let index = 0; index < speechSynthesis.getVoices().length; index++) { // je parcours les langues supportée
                if (speechSynthesis.getVoices()[index].lang==="fr-FR") { // si francais supporté alors on joue la voix en français
                    okToSpeak(textToSpell);
                    break;
                }
            }
            function okToSpeak(textToSpell){
                let msg    = new SpeechSynthesisUtterance(textToSpell);
                msg.lang   = "fr-FR";
                msg.pitch  = 1.1;
                msg.addEventListener("end",()=>{
                        return true;
                });
                speechSynthesis.speak(msg);
            }
        }
    }
    return false;
}

export const fileName = ()=>{
    console.log(__filename);
    console.log(__dirname);
    console.log(MemoryRouter);
}