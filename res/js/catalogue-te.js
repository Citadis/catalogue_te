window.onload = function(){
    debug = false
    debug?console.log("1. OK"):null;
    // fetch("https://thecitadis.fr/theTEcatalogue.json")
    // .then(function(response){
    //     return response.blob()
    // })
    loadTrains(catalogue)
    
    /*
    Notes de travail : 
    - A faire ? : Passage en V2 de la page via fetch sur serveur TCS pour aller chercher les trains plutôt qu'un objet JSON ici.
    - A faire ? : Mode sombre ? Thème TE2 ? Via interupteur à 3 positions
    */
    
}
/**
* Load les trains sur la page au chargement.
* @param {catalogue} data
*/
function loadTrains(data) {
    debug?console.log("2. OK"):null;
    newHTML = ""
    sommaire = document.createElement("div")
    sommaire.id = "sommaire"
    data.forEach(element => {
        debug?console.log("3. OK//"+element.categorie):null;
        categorie = element.categorie
        trains = element.trains
        newHTML += `
        <div class="categorie">
        <div class="titre" id="${categorie}">${categorie}</div>
        `
        if (categorie != "Sommaire") {
            sommaire.innerHTML += `
            <a href="#${categorie}"><button>${categorie}</button></a>
            `            
        }
        trains.forEach(train => {
            debug?console.log("4. OK//"+train.nom):null;
            newHTML += `<div class="train">` // OUVRIR train
            train.icones == undefined?console.error("Train "+train.nom+" erreur icone"):null
            newHTML += `<div class="template">` // OUVRIR template
            newHTML += `<div class="images">` // OUVRIR images
            if(typeof train.image == 'string'){
                newHTML += `<img src="./res/img/trains/${train.image}.png">`
            }else{
                train.image.forEach(img => {
                    newHTML += `<img src="./res/img/trains/${img}.png">`
                })
            }
            newHTML += `</div>` // FERMER IMAGES
            newHTML += `<div class="icones">` // OUVRIR icones
            train.icones.forEach(icone => {
                newHTML += `<img class="icone" src="./res/img/icones/${icone}.png">`
            })
            newHTML += `</div>` // FERMER icones
            newHTML += `</div>` // FERMER template
            if (train.idTE){
                newHTML += `<div class="nom">${train.nom}</div>`
                newHTML += `<div class="teHelperLink">IDs Train Empire :`// OUVRIR teHelperLink

                train.idTE.forEach(theID => {
                    typeof theID == 'number' ?newHTML += ` <a href="https://train-empire.com/helpers/matos.php?id=${theID}">${theID}</a>`:newHTML += ` ${theID}`
                })
                newHTML += `</div>` // FERMER teHelperLink
            }else if (train.legacyTEavailable){
                newHTML += `<div class="nom">${train.nom}</div>`
            }else{
                newHTML += `<div class="nom outOfTE">${train.nom}</div>`
            }
            /* ATTENTION lorsque tous les trains auront un ID TE assigné, 
            penser à modifier le script pour que tous les trains qui n'ont 
            pas d'ID TE soient gris*/
            newHTML += `</div>` // Fermer TRAIN
        })
        newHTML += `</div>`
    });
    document.querySelector("main").innerHTML += newHTML
    document.querySelector("main").prepend(sommaire)
    /*
    Nouvelle disposition : 
    div class=Train
    ∟ div class=template
        ∟ img du train
        ∟ div class=icones
            ∟ img icones
        ∟ div class=nom
            ∟ div nom du train
        ∟ div class=idTE
            ∟ a idTE
            ∟ a idTE
    
    
    
    */
}
const date_maj = "04/05/2025"
const catalogue = [
    {   // Sommaire
        "categorie" : "Sommaire",
        "trains" : [
            {
                "nom":'Index Pictogrames',
                "image":"empty",
                "icones":["TE","TH","750V_3eR","850V_3eR","750V_lac","1,5kV_lac","3kV_lac","15kV_lac","25kV_lac","rev","mir","um2","um3","um4","um5"]
                
            },
            {
                "nom":'Si ce bandeau est bleu, le train est présent et réutilisable dans Train-Empire',
                //"image":`https://img.shields.io/badge/Dernière_mise_à_jour-${date_maj}-blue?style=for-the-badge`,
                "image":["../messages/M","../messages/A","../messages/J","../messages/_deux-points",
                    "../messages/0","../messages/8","../messages/_slash",
                    "../messages/0","../messages/5","../messages/_slash",
                    "../messages/2","../messages/0","../messages/2","../messages/5"],
                "icones":["TE"],
                "legacyTEavailable":true
            },
            {
                "nom":"Nouveau ! Vous avez désormais une indication de quelle materiel est équivalent au template",
                "image":[],
                "icones":[],
                "idTE":["Les IDs sont présents ici.","Certains IDs ne sont pas encore présents, je les ajoute à la main au fur et à mesure"]
            }
        ]
    },
    {   // Loc Vapeur
        "categorie":"Locomotives à vapeur",
        "trains" : [
            {
                "nom":'LNER / BR A4',
                "image":"../messages/temp_indispo",
                "icones":[],
                "idTE":[2608,2607]
            },
            {
                "nom":'BR 52 / 1-5-0 / Type 26/27/56 - sans pare-fumée',
                "image":"BR52_S",
                "icones":[],
                "idTE":[3644,3645,3646,3647]
            },
            {
                "nom":'BR 52 / 1-5-0 / Type 26/27/56 - avec pare-fumée',
                "image":"BR52_A",
                "icones":[],
                "idTE":["Voir véhicule au dessus"]
            }
        ]
    },
    {   // Loc Diesel Poly
        "categorie" : "Locomotives diesel polyvalantes",
        "trains" : [
            {
                "nom":"262 BD 1 / 262 DB 1",
                "image":"LoDi/plm_262_bd_1",
                "icones":["TH"]
            },
            {
                "nom":"2CC2 61000 (f)",
                "image":"2CC2",
                "icones":["TH"],
                "legacyTEavailable":true
            },
            {
                "nom":"BR 218",
                "image":"br218",
                "icones":["TH"],
                "legacyTEavailable":true
            },
            {
                "nom":"BB 62400 / NS 2400",
                "image":"BB62400",
                "icones":["TH","um4"],
                "legacyTEavailable":true
            },
            {
                "nom":"BB 67400",
                "image":"template_BB67400",
                "icones":["TH","um2","rev"],
                "legacyTEavailable":true
            },
            {
                "nom":"BB 73000",
                "image":"BB73000",
                "icones":["TH"],
                "legacyTEavailable":true
            },
            {
                "nom":"BB 75000 / BB 75300 / Prima DE2400 (f)",
                "image":"BB75000",
                "icones":["TH"],
                "legacyTEavailable":true
            },
            {
                "nom":"CC 72000 - attelages Scharfenberg",
                "image":"CC72000_TGV_usine",
                "icones":["TH"],
                "legacyTEavailable":true
            },
            {
                "nom":"CC 73000",
                "image":"CC73000",
                "icones":["TH"],
                "legacyTEavailable":true
            },
            {
                "nom":"CC 73000 - bas de caisse gris",
                "image":"CC73000_bas gris",
                "icones":["TH"],
                "legacyTEavailable":true
            },
            {
                "nom":'Class 08',
                "image":["Class08","Class08_r"],
                "icones":["TH","mir"],
                "legacyTEavailable":true
            },
            {
                "nom":'Class 08 - neutre UK',
                "image":["Class08b","Class08b_r"],
                "icones":["TH","mir"],
                "legacyTEavailable":true
            },
            {
                "nom":'Class 08 - neutre UK, toit gris',
                "image":["Class08fb","Class08fb_r"],
                "icones":["TH","mir"],
                "legacyTEavailable":true
            },
            {
                "nom":"Class 26",
                "image":"LoDi/class26",
                "icones":["TH"]
            },
            {
                "nom":"Class 31",
                "image":"LoDi/class31",
                "icones":["TH"]
            },
            {
                "nom":"Class 33",
                "image":"LoDi/class33",
                "icones":["TH"],
                "idTE":[450,814]
            },
            {
                "nom":'Class 41 (II)',
                "image":"BR Class 41",
                "icones":["TH"],
                "legacyTEavailable":true
            },
            {
                "nom":'Class 45',
                "image":"Class45",
                "icones":["TH"],
                "legacyTEavailable":true
            },
            {
                "nom":"Class 56",
                "image":"LoDi/class56",
                "icones":["TH"]
            },
            {
                "nom":"Class 58",
                "image":"LoDi/class58",
                "icones":["TH"],
                "idTE":[2255,2256,2257,2258,2259]
            },
            {
                "nom":"Class 60",
                "image":"LoDi/class60",
                "icones":["TH"]
            },
            {
                "nom":"Class 68",
                "image":"LoDi/class68",
                "icones":["TH"]
            },
            {
                "nom":"D445",
                "image":"D445",
                "icones":["TH"],
                "legacyTEavailable":true
            },
            {
                "nom":"Série ME26",
                "image":"Template_ME26",
                "icones":["TH"],
                "legacyTEavailable":true
            },
            {
                "nom":'Siemens Eurorunner / ER20 - 2 versions',
                "image":["ER20","template_ER20"],
                "icones":["TH"],
                "legacyTEavailable":true
            }
        ],
    },
    {   // Loc Diesel fret
        "categorie" : "Locomotives diesel fret",
        "trains" : [
            {
                "nom":"BB 300",
                "image":"BB300",
                "icones":["TH","um2"],
                "legacyTEavailable":true
            },
            {
                "nom":"BB 60000",
                "image":"BB60000",
                "icones":["TH","um2"],
                "legacyTEavailable":true
            },
            {
                "nom":"BB 69200",
                "image":"template_BB_69200",
                "icones":["TH","um2"],
                "legacyTEavailable":true
            },
            {
                "nom":"Class 77",
                "image":"class77",
                "icones":["TH"],
                "legacyTEavailable":true
            },
            {
                "nom":"HLD77",
                "image":"HLD77",
                "icones":["TH"],
                "legacyTEavailable":true
            },
            {
                "nom":"Vossloh G2000",
                "image":"g2000",
                "icones":["TH"],
                "legacyTEavailable":true
            },
        ]
    },
    {   // Loc Elec poly
        "categorie" : "Locomotives électriques polyvalentes",
        "trains" : [
            {
                "nom":"BB 900",
                "image":"BB900",
                "icones":["1,5kV_lac"],
                "legacyTEavailable":true
            },
            {
                "nom":"BB 950",
                "image":"BB950",
                "icones":["750V_3eR"],
                "legacyTEavailable":true
            },
            {
                "nom":"BB 7200",
                "image":"LoEl/bb7200",
                "icones":["1,5kV_lac"],
                "idTE":[75]
            },
            {
                "nom":"BB 8100",
                "image":"BB 8100",
                "icones":["1,5kV_lac"],
                "legacyTEavailable":true
            },
            {
                "nom":"BB 9300",
                "image":"BB9300",
                "icones":["1,5kV_lac"],
                "legacyTEavailable":true
            },
            {
                "nom":"BB 15000",
                "image":"BB15000",
                "icones":["25kV_lac"],
                "legacyTEavailable":true
            },
            {
                "nom":"BB 22200",
                "image":"BB22200",
                "icones":["1,5kV_lac","25kV_lac"],
                "legacyTEavailable":true
            },
            {
                "nom":"BB 26000",
                "image":"BB26000",
                "icones":["1,5kV_lac","25kV_lac"],
                "legacyTEavailable":true
            },
            {
                "nom":"BB 27000",
                "image":"BB27000",
                "icones":["1,5kV_lac","25kV_lac"],
                "legacyTEavailable":true
            },
            {
                "nom":"BB 36000",
                "image":"BB36000_Blanc",
                "icones":["1,5kV_lac","3kV_lac","25kV_lac","um2"],
                "legacyTEavailable":true
            },
            {
                "nom":'BB 17000',
                "image":"BB17000",
                "icones":["25kV_lac"],
                "legacyTEavailable":true
            },
            {
                "nom":"BB 37000",
                "image":"BB37000",
                "icones":["1,5kV_lac","15kV_lac","25kV_lac","um2"],
                "legacyTEavailable":true
            },
            {
                "nom":"Bombardier Traxx E186",
                "image":"E186",
                "icones":["1,5kV_lac","3kV_lac","15kV_lac","25kV_lac"],
                "legacyTEavailable":true
            },
            {
                "nom":'BR 101',
                "image":"LoEl/br101",
                "icones":["15kV_lac","rev"],
                "idTE":[1530,3088,1813,1531,2967,3808]
                // Peut circuler sur LGV équippée LZB ou ERTMS
            },
            {
                "nom":'BR 102',
                "image":"br102",
                "icones":["15kV_lac"],
                "legacyTEavailable":true
            },
            {
                "nom":'BR 110',
                "image":"Template_BR_110",
                "icones":["15kV_lac"],
                "legacyTEavailable":true
            },
            {
                "nom":'BR 152',
                "image":"br152",
                "icones":["15kV_lac"],
                "legacyTEavailable":true
            },
            {
                "nom":'BR 155',
                "image":"BR155",
                "icones":["15kV_lac"],
                "legacyTEavailable":true
            },
            {
                "nom":'BR 180 / BR 320',
                "image":"br180",
                "icones":["3kV_lac","15kV_lac"],
                "legacyTEavailable":true
            },
            {
                "nom":"BR 189 / Siemens ES64F4",
                "image":"br189",
                "icones":["15kV_lac"],
                "legacyTEavailable":true
            },
            {
                "nom":"CC 6500 1s",
                "image":"LoEl/cc6500_1s",
                "icones":["1,5kV_lac"],
                "idTE":[71,1622,1623]
            },
            {
                "nom":"CC 6500 2s",
                "image":"LoEl/cc6500_2s",
                "icones":["1,5kV_lac"],
                "idTE":[72,1624]
            },
            {
                "nom":"CC 6500 3s",
                "image":"LoEl/cc6500_3s",
                "icones":["1,5kV_lac"],
                "idTE":[74,1625,1626]
            },
            {
                "nom":"CC 6500 4s",
                "image":"LoEl/cc6500_4s",
                "icones":["1,5kV_lac"],
                "idTE":[2736]
            },
            {
                "nom":"CC 6500 5s",
                "image":"LoEl/cc6500_5s",
                "icones":["1,5kV_lac"],
                "idTE":[2737]
            },
            {
                "nom":"CC 9300",
                "image":"cc9300",
                "icones":["1,5kV_lac"]
            },
            {
                "nom":"CC Jacquemin quadritension / NS 1400 (f)",
                "image":"cc-mte-quadri",
                "icones":["1,5kV_lac","3kV_lac","15kV_lac","25kV_lac"],
                "legacyTEavailable":true
            },
            {
                "nom":'Class 76',
                "image":"Class76",
                "icones":["1,5kV_lac"],
                "legacyTEavailable":true
            },
            {
                "nom":'Class 92',
                "image":"Class 92j",
                "icones":["25kV_lac"],
                "legacyTEavailable":true
            },
            {
                "nom":'Class 92 - neutre UK',
                "image":"Class 92b",
                "icones":["25kV_lac"],
                "legacyTEavailable":true
            },
            {
                "nom":'Class 419 - MLV : Motor Luggage Van',
                "image":"Class_419",
                "icones":["750V_3eR"],
                "legacyTEavailable":true
            },
            {
                "nom":'Ee 3/3 II (CFF) / C 20150',
                "image":"Ee33",
                "icones":["15kV_lac","25kV_lac"],
                "legacyTEavailable":true
            },
            {
                "nom":'FS E402B',
                "image":"E402B",
                "icones":["1,5kV_lac","3kV_lac","25kV_lac"],
                "legacyTEavailable":true
            },
            {
                "nom":"HLE13 / Série 3000",
                "image":"HLE13",
                "icones":["1,5kV_lac","3kV_lac","25kV_lac"],
                "legacyTEavailable":true
            },
            {
                "nom":"HLE18 (II) / HLE19",
                "image":"HLE18",
                "icones":["1,5kV_lac","3kV_lac","25kV_lac"],
                "legacyTEavailable":true
            },
            {
                "nom":"NS 1600 Benelux",
                "image":"NS 1600",
                "icones":["1,5kV_lac","3kV_lac","25kV_lac"],
                "legacyTEavailable":true
            },
            {
                "nom":'Re460',
                "image":"re460",
                "icones":["15kV_lac"],
                "legacyTEavailable":true
            },
            {
                "nom":"Re 4/4 II 1ère sous-série - Panto unijambiste et Climatisation",
                "image":"LoEl/Re44_II_1s_SX",
                "icones":["15kV_lac"],
                "idTE":["Equivalents :",1234,1235,1236,1238,2660]
            }
        ]
    },
    {   // Loc Elec fret
        "categorie" : "Locomotives électriques fret",
        "trains" : [
            {
                "nom":"Ae 8/14 11801",
                "image":"LoElFr/Ae_8_14_11801",
                "icones":["15kV_lac"],
                "legacyTEavailable":true
            },
            {
                "nom":'Class EB1 / EF1',
                "image":"LoElFr/EB1-EF1",
                "icones":["15kV_lac"]
            }
        ]
    },
    {   // Loc bimode
        "categorie" : "Locomotives Bimodes",
        "trains" : [
            {
                "nom":"BR 249 / Vectron Dual Mode DB Cargo",
                "image":"LoBi/br249",
                "icones":["TH","15kV_lac"]
            },
            {
                "nom": 'BB+BB 99000 (f)',
                "image":"BBBB99000",
                "icones": ['TH','1,5kV_lac', '25kV_lac'],
                "idTE":[2360]
            },
            {
                "nom":"Eem 923",
                "image":"LoBi/eem923",
                "icones":["TH","15kV_lac","25kV_lac"],
                "idTE":[3316]
            },
            {
                "nom":"Siemens Vectron Dual Mode / Dual Mode Light",
                "image":"LoBi/vectron_DM-DML",
                "icones":["TH","15kV_lac"]
            }
        ]
    },
    {   // Autorails
        "categorie" : "Autorails",
        "trains" : [
            {
                "nom":'BR 515',
                "image":"BR515",
                "icones":["TH"],
                "legacyTEavailable":true
            },
            {
                "nom":'BR 708 / ORT 135.7',
                "image":"BR708",
                "icones":["TH"],
                "legacyTEavailable":true
            },
            {
                "nom":"Class 153",
                "image":"AuRa/class153",
                "icones":["TH"]
            },
            {
                "nom":'BR 798 / VT 98',
                "image":"VT 98",
                "icones":["TH"],
                "legacyTEavailable":true
            },
            {
                "nom":'X 2200',
                "image":"x2200",
                "icones":["TH","um3"],
                "legacyTEavailable":true
            },
            {
                "nom":'X 4900',
                "image":"x4900",
                "icones":["TH","um3"],
                "legacyTEavailable":true
            },
            {
                "nom":'X 73500',
                "image":"x73500",
                "icones":["TH","um3"],
                "legacyTEavailable":true
            },
            {
                "nom": 'X 310000 "Berliet"',
                "image":"X 31000",
                "icones":["TH"],
                "legacyTEavailable":true
            }
        ]
    },
    {   // Automoteurs Diesels
        "categorie" : "Automoteurs diesels",
        "trains" : [
            {
                "nom":"Bombardier Itino",
                "image":"AmDi/Bombardier_Itino",
                "icones":["TH"]
            },
            {
                "nom":"Class 170 / Class 171 - 2 voitures (171/7) ",
                "image":"Class 170",
                "icones":["TH"],
                "legacyTEavailable":true
            },
            {
                "nom":"Class 170 / Class 171 - 2 voitures (171/7), neutre UK",
                "image":"Class 170 2c neutre",
                "icones":["TH"],
                "legacyTEavailable":true
            },
            {
                "nom":"Class 171 - 4 voitures (171/8)",
                "image":"Class 170 - 4c",
                "icones":["TH"],
                "legacyTEavailable":true
            },
            {
                "nom":"Class 171 - 4 voitures (171/8), neutre UK",
                "image":"Class 170 4c neutre",
                "icones":["TH"],
                "legacyTEavailable":true
            },
            {
                "nom":"RTG T3000 - bande noire",
                "image":"T3000_bn",
                "icones":["TH"],
                "legacyTEavailable":true
            },
            {
                "nom":"S-594",
                "image":"S594",
                "icones":["TH"],
                "legacyTEavailable":true
            },
            {
                "nom":"Siemens ICE TD",
                "image":"icetd",
                "icones":["TH"],
                "legacyTEavailable":true
            },
            {
                "nom":"VT11.5",
                "image":"VT11-5",
                "icones":["TH"],
                "legacyTEavailable":true
            }
        ]
    },
    {   // Automotrices Elec
        "categorie" : "Automotrices Électriques",
        "trains" : [
            {
                "nom":"4010",
                "image":"4010_Blanc",
                "icones":["15kV_lac"],
                "idTE":[2845,2971,2844]
            },
            {
                "nom":"Alstom AGV",
                "image":"Alstom_AGV575",
                "icones":["1,5kV_lac","25kV_lac"]
            },
            {
                "nom":"Alstom Coradia Stream ICNG - 5 caisses",
                "image":"ICNG5",
                "icones":["1,5kV_lac","3kV_lac","um2"],
                "legacyTEavailable":true
            },
            {
                "nom":"Alstom Coradia Stream ICNG - 8 caisses",
                "image":"ICNG8",
                "icones":["1,5kV_lac","3kV_lac","um2"]
            },
            {
                "nom":"Alstom ICE Duplex (f)",
                "image":"ICE Duplex",
                "icones":["1,5kV_lac","3kV_lac","15kV_lac","25kV_lac","um2"],
                "legacyTEavailable":true
            },
            {
                "nom":"Alstom TGV DR (f)",
                "image":"tgv dr",
                "icones":["750V_3eR","3kV_lac","15kV_lac","um2"],
                "idTE":[3706,3707]
            },
            {
                "nom":"Alstom TGV Duplex - toutes variantes",
                "image":"TGV_Duplex",
                "icones":["1,5kV_lac","3kV_lac","15kV_lac","25kV_lac","um2"],
                "legacyTEavailable":true
            },
            {
                "nom":"Alstom TGV Postal",
                "image":"tgv_postal",
                "icones":["1,5kV_lac","25kV_lac","um2"],
                "legacyTEavailable":true
            },
            {
                "nom":"Alstom TGV POS",
                "image":"tgv-pos-template",
                "icones":["1,5kV_lac","15kV_lac","25kV_lac","um2"],
                "legacyTEavailable":true
            },
            {
                "nom":"Alstom TGV PSE - trumeaux gris",
                "image":"TGV_PSE",
                "icones":["1,5kV_lac","25kV_lac","um2"],
                "legacyTEavailable":true
            },
            {
                "nom":"Alstom TGV PSE - trumeaux blancs",
                "image":"TGV_PSE_blanc",
                "icones":["1,5kV_lac","25kV_lac","um2"],
                "legacyTEavailable":true
            },
            {
                "nom":"AM POST",
                "image":"amposte",
                "icones":["3kV_lac","um2"],
                "legacyTEavailable":true
            },
            {
                "nom":"AM rénovées",
                "image":"AmEl/am_classique",
                "icones":["3kV_lac"],
                "idTE":[1041]
            },
            {
                "nom":"Avelia Horizon / TGV-M",
                "image":"Alstom_TGV_M_11c_Neutre",
                "icones":["1,5kV_lac","25kV_lac"],
                "legacyTEavailable":true
            },
            {
                "nom":"BR 1462",
                "image":"BR 1462",
                "icones":["15kV_lac","25kV_lac"],
                "legacyTEavailable":true
            },
            {
                "nom":"BR 403 (I) / ET 403",
                "image":"BR403I",
                "icones":["15kV_lac"],
                "legacyTEavailable":true
            },
            {
                "nom":"BR 425",
                "image":"Template_BR_425",
                "icones":["15kV_lac"],
                "legacyTEavailable":true
            },
            {
                "nom":"BR 481.5",
                "image":"BR481",
                "icones":["750V_3eR","um2"],
                "legacyTEavailable":true
            },
            {
                "nom":"Class 377/2",
                "image":"AmEl/class377-2",
                "icones":["750V_3eR","25kV_lac"],
                "idTE":[2582,2586]
            }, 
            {
                "nom":'Class 421 - neutre UK',
                "image":"BR Class 421",
                "icones":["750V_3eR"],
                "legacyTEavailable":true
            },
            {
                "nom":'Class 442 - neutre UK (1s)',
                "image":"Template_Class_442_1s",
                "icones":["750V_3eR"],
                "legacyTEavailable":true
            },
            {
                "nom":'Class 442 - neutre UK (2s)',
                "image":"Template_Class_442",
                "icones":["750V_3eR"],
                "legacyTEavailable":true
            },
            {
                "nom":'Class 442 - neutre UK (refurb)',
                "image":"NSE_Class_442_refurb",
                "icones":["750V_3eR"],
                "legacyTEavailable":true
            },
            {
                "nom":"Class 460 - neutre UK, première caisse",
                "image":"BR Class 460 - 1ere",
                "icones":["750V_3eR"],
                "legacyTEavailable":true
            },
            {
                "nom":"Coradia stream DC",
                "image":"Coradia_Stream_ETR_104_png",
                "icones":["1,5kV_lac","3kV_lac"],
                "legacyTEavailable":true
            },
            {
                "nom":"ETR 521",
                "image":"ETR 521",
                "icones":["3kV_lac"],
                "legacyTEavailable":true
            },
            {
                "nom":"S-102 / S-112",
                "image":"Talgo_S102_Blanche",
                "icones":["25kV_lac"]
            },
            {
                "nom":"Siemens ICE 1 / BR 401 ",
                "image":"ICE1",
                "icones":["15kV_lac"],
                "legacyTEavailable":true
            },
            {
                "nom":"Siemens ICE 2 / BR 402",
                "image":"ICE2",
                "icones":["15kV_lac","um2"],
                "legacyTEavailable":true
            },
            {
                "nom":"Siemens ICE 2 / BR 402 - version bi-motrices",
                "image":"ICE2 - 2 motrices",
                "icones":["15kV_lac","um2"]
            },
            {
                "nom":"Siemens ICE 3M / BR 406",
                "image":"BR 406",
                "icones":["1,5kV_lac","3kV_lac","15kV_lac","25kV_lac","um2"],
                "legacyTEavailable":true
            },
            {
                "nom":"Siemens TGV",
                "image":"Siemens TGV",
                "icones":["1,5kV_lac","25kV_lac","um2"]
            },
            {
                "nom":'Skoda CityElefant',
                "image":"cd471",
                "icones":["3kV_lac"]
            },
            {
                "nom":'Z 2000',
                "image":"Z2000",
                "icones":["1,5kV_lac"],
                "idTE":[1120]
            },
            {
                "nom":'Z 5100 Rénovation lourde (2c)',
                "image":"Z 5100 2c",
                "icones":["1,5kV_lac"]
            },
            {
                "nom":'Z 5100 Rénovation lourde (3c)',
                "image":"Z 5100 3c",
                "icones":["1,5kV_lac"]
            },
            {
                "nom":'Z 5100 Rénovation lourde (4c)',
                "image":"Z 5100 4c",
                "icones":["1,5kV_lac"]
            },
            {
                "nom":'Z 5100 Rénovation lourde (2c)',
                "image":"Z 5100 3r",
                "icones":["750V_3eR"]
            },
            {
                "nom":'Z 7100 Modernisée',
                "image":["Z7100_GRG_R","Z7100_GRG"],
                "icones":["1,5kV_lac","mir"],
                "legacyTEavailable":true
            },
            {
                "nom":'Z 7300',
                "image":"Z_7300",
                "icones":["1,5kV_lac","um3"],
                "legacyTEavailable":true
            },
            {
                "nom":'Z 8100 / MI 79 / MI 84',
                "image":"MI79",
                "icones":["1,5kV_lac","25kV_lac","um2"],
                "legacyTEavailable":true
            },
            {
                "nom":'Z 8800',
                "image":"Z8800",
                "icones":["1,5kV_lac","25kV_lac","um2"],
                "legacyTEavailable":true
            },
            {
                "nom":"Z 20500 - toit gris",
                "image":"Z20500__Blanc",
                "icones":["1,5kV_lac","25kV_lac","um2"],
                "legacyTEavailable":true
            },
            {
                "nom":"Z 20900 - toit blanc",
                "image":"Z20900_Blanc",
                "icones":["1,5kV_lac","25kV_lac","um2"],
                "legacyTEavailable":true
            },
            {
                "nom":"Z 21500",
                "image":"AmEl/z21500",
                "icones":["1,5kV_lac","25kV_lac","um2"],
                "idTE":[199,3237,2950,3239,3588,1707,3589,2628]
            },
            {
                "nom":"Z 22500 - MI2N",
                "image":"AmEl/z22500",
                "icones":["1,5kV_lac","25kV_lac","um2"],
                "idTE":[196,3246]
            },
            {
                "nom":"Z 23000",
                "image":"Z23000",
                "icones":["1,5kV_lac","um8"],
                "legacyTEavailable":true
            },
            {
                "nom":"Z 23500",
                "image":"Z23500",
                "icones":["1,5kV_lac","25kV_lac","um4"],
                "legacyTEavailable":true
            },
            {
                "nom":"Z 24500",
                "image":"Z24500_Blanc",
                "icones":["1,5kV_lac","25kV_lac","um3"],
                "legacyTEavailable":true
            },
            {
                "nom":"Z 26500",
                "image":"Z26500_Blanc",
                "icones":["1,5kV_lac","25kV_lac","um2"],
                "legacyTEavailable":true
            },
            {
                "nom":"Z 27500 - 3 caisses",
                "image":"AmEl/Z27500_3c",
                "icones":["1,5kV_lac","25kV_lac","um3"],
                "idTE":[3764,202,3730,1712]
            },
            {
                "nom":"Z 27500 - 4 caisses",
                "image":"AmEl/Z27500_4c",
                "icones":["1,5kV_lac","25kV_lac","um3"],
                "idTE":[203,796,3101,542,601]
            },
            {
                "nom":"Z 50000 - vitres noires",
                "image":"Z50000_Blanc",
                "icones":["1,5kV_lac","25kV_lac","um2"],
                "legacyTEavailable":true
            },
            {
                "nom":"Z 50000 - vitres blanches",
                "image":"Z50000_Blanc3",
                "icones":["1,5kV_lac","25kV_lac","um2"],
                "legacyTEavailable":true
            },
            {
                "nom":"Z 50000 - sans contour vitres",
                "image":"Z50000_Blanc2",
                "icones":["1,5kV_lac","25kV_lac","um2"],
                "legacyTEavailable":true
            },
            {
                "nom":'Z 51500',
                "image":"Z51500",
                "icones":["1,5kV_lac","25kV_lac","um3"],
                "legacyTEavailable":true
            },
            {
                "nom":"Z 54500",
                "image":"Template_Z54500",
                "icones":["1,5kV_lac","25kV_lac","15kV_lac","um3"],
                "legacyTEavailable":true
            },
            {
                "nom":"Z 56300",
                "image":"Z56300",
                "icones":["1,5kV_lac","25kV_lac","um3"],
                "legacyTEavailable":true
            },
            {
                "nom":"Z 57000",
                "image":"Z57000",
                "icones":["1,5kV_lac","25kV_lac","um2"],
                "legacyTEavailable":true
            },
            {
                "nom":"Z 58000 - RER NG (E)",
                "image":"AmEl/z58000",
                "icones":["1,5kV_lac","25kV_lac","um2"]
            },
            {
                "nom":"Z 58500 - RER NG (D)",
                // "image":"AmEl/z58500",
                "image":"../messages/temp_indispo",
                "icones":["1,5kV_lac","25kV_lac","um2"]
            }            
        ]
    },
    {   // Automotrices Bimodes
        "categorie" : "Automotrices Bimodes",
        "trains" : [
            {
                "nom":"B 82500",
                "image":"AmBi/B82500_4c",
                "icones":["TH","1,5kV_lac","25kV_lac","um3"],
                "idTE":[116,803,570,586,842,623,661,118,117]
            },
            {
                "nom":"Régiolis 6 caisses - vitres noires",
                "image":"AmBi/regiolis_6c",
                "icones":["TH","1,5kV_lac","15kV_lac","25kV_lac","um3"],
                "legacyTEavailable":true
                
            },
            {
                "nom":"Régiolis 6 caisses - vitres blanches",
                "image":"AmBi/regiolis_6c_vb",
                "icones":["TH","1,5kV_lac","15kV_lac","25kV_lac","um3"],
                "legacyTEavailable":true
                
            },
        ]
    },
    {   // Voitures Voyageurs
        "categorie" : "Voitures de voyageurs",
        "trains" : [
            {
                "nom":'Bbd 499 "Rekowagen" ex-DR',
                "image":"Bbd_499_Rekowagen",
                "icones":[]
            },
            {
                "nom":'BR 998.0 - Remorque VT78',
                "image":"BR998",
                "icones":[],
                "legacyTEavailable":true
            },
            {
                "nom":'BR 456.0 / Modus-Wagen B',
                "image":"modus wagen B",
                "icones":[],
                "legacyTEavailable":true
            },
            {
                "nom":'BR 484.0 / Modus-Wagen ABx',
                "image":["ABx","ABxr"],
                "icones":["mir"],
                "legacyTEavailable":true
            },
            {
                "nom":'Corail NG88 A10 / NG88 B11',
                "image":"NG88 B11&A10",
                "icones":[],
                "legacyTEavailable":true
            },
            {
                "nom":'Corail NG88 B5r',
                "image":"NG88 B5r",
                "icones":[],
                "legacyTEavailable":true
            },
            {
                "nom":'Corail NG88 B7Dx',
                "image":["NGG B7Dx","NGG B7Dxr"],
                "icones":["mir"],
                "legacyTEavailable":true
            },
            {
                "nom":'Corail VRrtu (f) - 2 versions',
                "image":["VRrtu_fic_l","VRrtu_fic_r"],
                "icones":["mir"],
                "legacyTEavailable":true
            },
            {
                "nom":'Corail VTU A5B5 / VTU82 A10 / VTU82 B11 / Nouvelle Première',
                "image":"VTU A5B5",
                "icones":[],
                "legacyTEavailable":true
            },
            {
                "nom":'Corail VTU A10 / VTU B11',
                "image":"VTU A10-B11",
                "icones":[],
                "legacyTEavailable":true
            },
            {
                "nom":'Corail VTU B5r',
                "image":"VTU B5r",
                "icones":[],
                "legacyTEavailable":true
            },
            {
                "nom":'Corail VTU B7 PMR',
                "image":"VTU B7 PMR",
                "icones":[],
                "legacyTEavailable":true
            },
            {
                "nom":'Corail VTU Nouvelle Première Bar',
                "image":"VTU 1ere Bar",
                "icones":[]
            },
            {
                "nom":'Corail VU A3B4r',
                "image":"VU A3B4r",
                "icones":[],
                "legacyTEavailable":true
            },
            {
                "nom":'Corail VU A4B6',
                "image":"VU A4B6",
                "icones":[],
                "legacyTEavailable":true
            },
            {
                "nom":'Corail VU A9',
                "image":"VU A9",
                "icones":[],
                "legacyTEavailable":true
            },
            {
                "nom":'Corail VU A9c',
                "image":"VU A9c",
                "icones":[],
                "legacyTEavailable":true
            },
            {
                "nom":'Corail VU A10',
                "image":"VU A10",
                "icones":[],
                "legacyTEavailable":true
            },
            {
                "nom":'Corail VU AcBc',
                "image":"VU AcBc",
                "icones":[],
                "legacyTEavailable":true
            },
            {
                "nom":'Corail VU B3Su',
                "image":"VU B3Su",
                "icones":[],
                "legacyTEavailable":true
            },
            {
                "nom":'Corail VU B5ux',
                "image":"VUB5ux",
                "icones":[],
                "legacyTEavailable":true
            },
            {
                "nom":'Corail VU B5uxh',
                "image":["VU B5uxh","VU B5uxhr"],
                "icones":["mir"],
                "legacyTEavailable":true
            },
            {
                "nom":'Corail VU B6Du',
                "image":"VU B6Du",
                "icones":[],
                "legacyTEavailable":true
            },
            {
                "nom":'Corail VU B6Dux',
                "image":["B6Dux","B6Duxr"],
                "icones":["mir"],
                "legacyTEavailable":true
            },
            {
                "nom":'Corail VU B7uh',
                "image":"VU B7uh",
                "icones":[],
                "legacyTEavailable":true
            },
            {
                "nom":'Corail VU B9ux',
                "image":"VU B9ux",
                "icones":[],
                "legacyTEavailable":true
            },
            {
                "nom":'Corail VU B10cx',
                "image":"VU B10cx",
                "icones":[],
                "legacyTEavailable":true
            },
            {
                "nom":'Corail VU B11',
                "image":"VU B11",
                "icones":[],
                "legacyTEavailable":true
            },
            {
                "nom":'Corail VU Cabine 8',
                "image":"VU Cabine 8",
                "icones":[],
                "legacyTEavailable":true
            },
            {
                "nom":'Corail VU Du',
                "image":"VU Du",
                "icones":[]
            },
            {
                "nom":'Corail VU Infra',
                "image":"vu-infra",
                "icones":[],
                "legacyTEavailable":true
            },
            {
                "nom":'Corail VU Lunea Services',
                "image":"VU Lunéa",
                "icones":[],
                "legacyTEavailable":true
            },
            {
                "nom":'DB Avmz 111',
                "image":"avmz111",
                "icones":[],
                "legacyTEavailable":true
            },
            {
                "nom":'DB Bm 235',
                "image":"bm235",
                "icones":[],
                "legacyTEavailable":true
            },
            {
                "nom":'DB Bpmz 291',
                "image":"bpmz291",
                "icones":[],
                "legacyTEavailable":true
            }, 
            {
                "nom":'Euraffaires A2t6u',
                "image":"eura_A2t6u",
                "icones":[],
                "legacyTEavailable":true
            },
            {
                "nom":'Euraffaires A3rtux',
                "image":"eura_A3rtux",
                "icones":[],
                "legacyTEavailable":true
            },
            {
                "nom":'Euraffaires A9½tu',
                "image":"eura_A912tu",
                "icones":[],
                "legacyTEavailable":true
            },
            {
                "nom":'Grand Confort A3rtu',
                "image":"vgc_A3rtu",
                "icones":[],
                "legacyTEavailable":true
            },
            {
                "nom":'Grand Confort A4Dtux',
                "image":"vgc_A4Dtux",
                "icones":[],
                "legacyTEavailable":true
            },
            {
                "nom":'Grand Confort Atu/Btu',
                "image":"vgc_Atu_Btu",
                "icones":[],
                "legacyTEavailable":true
            },
            {
                "nom":'Grand Confort Au/Bu',
                "image":"vgc_Au_Bu",
                "icones":[],
                "legacyTEavailable":true
            },
            {
                "nom":'Grand Confort B5Dtux (f)',
                "image":"vgc_B5Dtux_fic",
                "icones":[],
                "legacyTEavailable":true
            },
            {
                "nom":'Grand Confort B5Dux  (f)',
                "image":["vgc_B5Dux_fic_l","vgc_B5Dux_fic_r"],
                "icones":["mir"],
                "legacyTEavailable":true
            },
            {
                "nom":'Grand Confort B9 (f)',
                "image":"vgc_B9_fic",
                "icones":[],
                "legacyTEavailable":true
            },
            {
                "nom":'Grand Confort Vru',
                "image":"vgc_Vru",
                "icones":[],
                "legacyTEavailable":true
            },
            {
                "nom":'MK1 BCK',
                "image":"VoVo/mk1_bck",
                "icones":[],
                "idTE":[813,810,3379,2280,2284]
            },
            {
                "nom":'MK1 BFK',
                "image":"VoVo/mk1_bfk",
                "icones":[],
                //"idTE":[]
            },
            {
                "nom":'MK1 BG',
                "image":"VoVo/mk1_bg",
                "icones":[],
                "idTE":[479,3382,3381,480,3383]
            },
            {
                "nom":'MK1 BSK',
                "image":"VoVo/mk1_bsk",
                "icones":[],
                //"idTE":[]
            },
            {
                "nom":'MK1 FK',
                "image":"VoVo/mk1_fk",
                "icones":[],
                "idTE":[811,808,3377,2278,2282]
            },
            {
                "nom":'MK1 FO',
                "image":"VoVo/mk1_fo",
                "icones":[],
                //"idTE":[]
            },
            {
                "nom":'MK1 RBR',
                "image":"VoVo/mk1_rbr",
                "icones":[],
                //"idTE":[]
            },
            {
                "nom":'MK1 RMB',
                "image":"VoVo/mk1_rmb",
                "icones":[],
                "idTE":[896,895,3380,2281,2285]
            },
            {
                "nom":'MK1 SK',
                "image":"VoVo/mk1_sk",
                "icones":[],
                "idTE":[812,809,3378,2279,2283]
            },
            {
                "nom":'MK1 TSO',
                "image":"VoVo/mk1_TSO",
                "icones":[],
                //"idTE":[]
            },
            {
                "nom":'Plan WRD',
                "image":["NS Plan WRD","NS Plan WRDr"],
                "icones":["mir"],
                "legacyTEavailable":true
            },
            {
                "nom":'UIC B10 V200',
                "image":"UIC B10",
                "icones":[],
                "legacyTEavailable":true
            },
            {
                "nom":'UIC-F A8',
                "image":"uic-f-a8",
                "icones":[],
                "legacyTEavailable":true
            },
            {
                "nom":'UIC-F B5r',
                "image":"uic-f-b5r",
                "icones":[],
                "legacyTEavailable":true
            },
            {
                "nom":'UIC-F B8c',
                "image":"uic-f-b8c",
                "icones":[],
                "legacyTEavailable":true
            },
            {
                "nom":'UIC-F B9',
                "image":"uic-f-b9",
                "icones":[],
                "legacyTEavailable":true
            },
            {
                "nom":'UIC-F VL',
                "image":"uic-f-vl",
                "icones":[],
                "legacyTEavailable":true
            },
            {
                "nom":'USI grise',
                "image":"USI grise",
                "icones":[],
                "legacyTEavailable":true
            },
            {
                "nom":'USI II',
                "image":"USI II",
                "icones":[],
                "legacyTEavailable":true
            },
            {
                "nom":'USI II Bar',
                "image":"USI II Bar",
                "icones":[],
                "legacyTEavailable":true
            },
            {
                "nom":"Tronçon Duplex Cooper",
                "image":"troncon_duplex",
                "icones":[],
                "legacyTEavailable":true
            },
            {
                "nom":"VB2N - Rame type",
                "image":"VB2N_template",
                "icones":[],
                "legacyTEavailable":true
                
            },
            {
                "nom":"VE2N",
                "image":"ve2n",
                "icones":[],
                "legacyTEavailable":true
            },
            {
                "nom":'RailJet (type ÖBB) - Rame type',
                "image":"railjet",
                "icones":[],
                "legacyTEavailable":true
            },
            {
                "nom":'Voiture pilote ex-Z2',
                "image":["Z2r","Z2"],
                "icones":["mir"],
                "legacyTEavailable":true
            },
            {
                "nom":'ZRx 17100',
                "image":["ZRx 17100","ZRx 17100"],
                "icones":["mir"],
                "legacyTEavailable":true
            },
            {
                "nom":'ZR 27100/200',
                "image":["ZR 27100","ZR 27100r"],
                "icones":["mir"]
            }
        ]
    },
    {   // Porte-autos
        "categorie":"Wagons porte-autos (passager ou fret)",
        "trains":[
            {
                "nom":'STVA TA260 Long',
                "image":"ta260-l",
                "icones":[],
                "legacyTEavailable":true
            }
        ]
    },
    {   // Wagons FRET
        "categorie":"Wagons de fret",
        "trains":[
            {
                "nom":'ANF60',
                "image":"ANF60",
                "icones":[],
                "legacyTEavailable":true
            },
            {
                "nom":"Corail MC76",
                "image":"MC76",
                "icones":[],
                "legacyTEavailable":true
            },
            {
                "nom":"MK3 SLEP",
                "image":"MK3 SLEP",
                "icones":[],
                "legacyTEavailable":true
            },
            {
                "nom":"Falrrs 152",
                "image":"Falrrs 152",
                "icones":[],
                "legacyTEavailable":true
            }
        ]
    },
    {   // Transports Urbains
        "categorie":"Transports Urbains",
        "trains":[
            {
                "nom":"Alstom Dualis",
                "image":"TrUr/Alstom_Dualis",
                "icones":["noTE"]
            },
            {
                "nom":"Siemens Avanto / U 25500",
                "image":"U25500_blanc",
                "icones":["750V_lac","25kV_lac"],
                "legacyTEavailable":true
            },
            {
                "nom":"TTFS : Tram-Train Français Standard - compatible 1.5kV/25kV selon version",
                "image":"ttfs",
                "icones":["750V_lac","1,5kV_lac","25kV_lac"],
                "legacyTEavailable":true
            },
        ]
    }
]
