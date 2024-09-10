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
    - A faire : Passage en V2 de la page via fetch sur serveur TCS pour aller chercher les trains plutôt qu'un objet JSON ici.
    - A faire : Mode sombre ? Thème TE2 ? Via interupteur à 3 positions
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
            newHTML += `<div class="train">`
            train.icones == undefined?console.error("Train "+train.nom+" erreur icone"):null
            newHTML += `<div class="template">`
            newHTML += `<div class="images">`
            if(typeof train.image == 'string'){
                newHTML += `<img src="${train.image}">`
            }else{
                train.image.forEach(img => {
                    newHTML += `<img src="${img}">`
                })
            }
            newHTML += `</div>`
            newHTML += `<div class="icones">`
            train.icones.forEach(icone => {
                newHTML += `<img class="icone" src="./res/img/icones/${icone}.png">`
            })
            newHTML += `</div>`
            newHTML += `</div>`
            train.outOfTE == true?outClass = " outOfTE":outClass =""
            newHTML += `<div class="nom${outClass}">${train.nom}</div>`
            newHTML += `</div>`
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
    
    
    
    
    */
}
const date_maj = "09/09/2024"
const catalogue = [
    {   // Sommaire
        "categorie" : "Sommaire",
        "trains" : [
            {
                "nom":'Index Pictogrames',
                "image":"",
                "icones":["TE","TH","750V_3eR","850V_3eR","750V_lac","1,5kV_lac","3kV_lac","15kV_lac","25kV_lac","rev","mir","um2","um3","um4","um5"],
                "outOfTE":true
                
            },
            {
                "nom":'Si ce bandeau est bleu, le train est présent et réutilisable dans Train-Empire',
                "image":`https://img.shields.io/badge/Dernière_mise_à_jour-${date_maj}-blue?style=for-the-badge`,
                "icones":["TE"]
            },
            // {
            //     "nom":'Test <img src="https://img.shields.io/badge/25kV-LAC-gray?labelColor=0288D1&">',
            //     "image":"",
            //     "icones":[]
            // },
        ]
    },
    {   // Loc Vapeur
        "categorie":"Locomotives à vapeur",
        "trains" : [
            {
                "nom":'LNER / BR A4',
                "image":"./res/img/messages/temp_indispo.png",
                "icones":[]
            },
            {
                "nom":'BR 52 / 1-5-0 / Type 26/27/56 - sans pare-fumée',
                "image":"./res/img/trains/BR52_S.png",
                "icones":[]
            },
            {
                "nom":'BR 52 / 1-5-0 / Type 26/27/56 - avec pare-fumée',
                "image":"./res/img/trains/BR52_A.png",
                "icones":[]
            }
        ]
    },
    {   // Loc Diesel Poly
        "categorie" : "Locomotives diesel polyvalantes",
        "trains" : [
            {
                "nom":"2CC2 61000 (f)",
                "image":"./res/img/trains/2CC2.png",
                "icones":["TH"]
            },
            {
                "nom":"BR 218",
                "image":"./res/img/trains/br218.png",
                "icones":["TH"]
            },
            {
                "nom":"BB 62400 / NS 2400",
                "image":"./res/img/trains/BB62400.png",
                "icones":["TH","um4"]
            },
            {
                "nom":"BB 67400",
                "image":"./res/img/trains/template_BB67400.png",
                "icones":["TH","um2","rev"]
            },
            {
                "nom":"BB 73000",
                "image":"./res/img/trains/BB73000.png",
                "icones":["TH"]
            },
            {
                "nom":"BB 75000 / BB 75300 / Prima DE2400 (f)",
                "image":"./res/img/trains/BB75000.png",
                "icones":["TH"]
            },
            {
                "nom":"CC 72000 - attelages Scharfenberg",
                "image":"./res/img/trains/CC72000_TGV_usine.png",
                "icones":["TH"]
            },
            {
                "nom":"CC 73000",
                "image":"./res/img/trains/CC73000.png",
                "icones":["TH"]
            },
            {
                "nom":"CC 73000 - bas de caisse gris",
                "image":"./res/img/trains/CC73000_bas gris.png",
                "icones":["TH"]
            },
            {
                "nom":'Class 08',
                "image":["./res/img/trains/Class08.png","./res/img/trains/Class08_r.png"],
                "icones":["TH","mir"]
            },
            {
                "nom":'Class 08 - neutre UK',
                "image":["./res/img/trains/Class08b.png","./res/img/trains/Class08b_r.png"],
                "icones":["TH","mir"]
            },
            {
                "nom":'Class 08 - neutre UK, toit gris',
                "image":["./res/img/trains/Class08fb.png","./res/img/trains/Class08fb_r.png"],
                "icones":["TH","mir"]
            },
            {
                "nom":'Class 41 (II)',
                "image":"./res/img/trains/BR Class 41.png",
                "icones":["TH"]
            },
            {
                "nom":'Class 45',
                "image":"./res/img/trains/Class45.png",
                "icones":["TH"]
            },
            {
                "nom":"D445",
                "image":"./res/img/trains/D445.png",
                "icones":["TH"]
            },
            {
                "nom":"Série ME26",
                "image":"./res/img/trains/Template_ME26.png",
                "icones":["TH"]
            },
            {
                "nom":'Siemens Eurorunner / ER20 - 2 versions',
                "image":["./res/img/trains/ER20.png","./res/img/trains/template_ER20.png"],
                "icones":["TH"]
            }
        ],
    },
    {   // Loc Diesel fret
        "categorie" : "Locomotives diesel fret",
        "trains" : [
            {
                "nom":"BB 300",
                "image":"./res/img/trains/BB300.png",
                "icones":["TH","um2"]
            },
            {
                "nom":"BB 60000",
                "image":"./res/img/trains/BB60000.png",
                "icones":["TH","um2"]
            },
            {
                "nom":"BB 69200",
                "image":"./res/img/trains/template_BB_69200.png",
                "icones":["TH","um2"]
            },
            {
                "nom":"Class 77",
                "image":"./res/img/trains/class77.png",
                "icones":["TH"]
            },
            {
                "nom":"HLD77",
                "image":"./res/img/trains/HLD77.png",
                "icones":["TH"]
            },
            {
                "nom":"Vossloh G2000",
                "image":"./res/img/trains/g2000.png",
                "icones":["TH"]
            },
        ]
    },
    {   // Loc Elec poly
        "categorie" : "Locomotives électriques polyvalentes",
        "trains" : [
            {
                "nom":"BB 900",
                "image":"./res/img/trains/BB900.png",
                "icones":["1,5kV_lac"]
            },
            {
                "nom":"BB 950",
                "image":"./res/img/trains/BB950.png",
                "icones":["750V_3eR"]
            },
            {
                "nom":"BB 8100",
                "image":"./res/img/trains/BB 8100.png",
                "icones":["1,5kV_lac"]
            },
            {
                "nom":"BB 9300",
                "image":"./res/img/trains/BB9300.png",
                "icones":["1,5kV_lac"]
            },
            {
                "nom":"BB 15000",
                "image":"./res/img/trains/BB15000.png",
                "icones":["1,5kV_lac"]
            },
            {
                "nom":"BB 22200",
                "image":"./res/img/trains/BB22200.png",
                "icones":["1,5kV_lac","25kV_lac"]
            },
            {
                "nom":"BB 26000",
                "image":"./res/img/trains/BB26000.png",
                "icones":["1,5kV_lac","25kV_lac"]
            },
            {
                "nom":"BB 27000",
                "image":"./res/img/trains/BB27000.png",
                "icones":["1,5kV_lac","25kV_lac"]
            },
            {
                "nom":"BB 36000",
                "image":"./res/img/trains/BB36000_Blanc.png",
                "icones":["1,5kV_lac","3kV_lac","25kV_lac","um2"]
            },
            {
                "nom":'BB 17000',
                "image":"./res/img/trains/17000.png",
                "icones":["25kV_lac"]
            },
            {
                "nom":"BB 37000",
                "image":"./res/img/trains/bb37000.png",
                "icones":["1,5kV_lac","15kV_lac","25kV_lac","um2"]
            },
            {
                "nom":"Bombardier Traxx E186",
                "image":"./res/img/trains/e186.png",
                "icones":["1,5kV_lac","3kV_lac","15kV_lac","25kV_lac"]
            },
            {
                "nom":'BR 102',
                "image":"./res/img/trains/br102.png",
                "icones":["15kV_lac"]
            },
            {
                "nom":'BR 110',
                "image":"./res/img/trains/Template_BR_110.png",
                "icones":["15kV_lac"]
            },
            {
                "nom":'BR 152',
                "image":"./res/img/trains/br152.png",
                "icones":["15kV_lac"]
            },
            {
                "nom":'BR 155',
                "image":"./res/img/trains/BR155.png",
                "icones":["15kV_lac"]
            },
            {
                "nom":'BR 180 / BR 320',
                "image":"./res/img/trains/br180.png",
                "icones":["3kV_lac","15kV_lac"]
            },
            {
                "nom":"BR 189 / Siemens ES64F4",
                "image":"./res/img/trains/br189.png",
                "icones":["15kV_lac"]
            },
            {
                "nom":"CC 9300",
                "image":"./res/img/trains/cc9300.png",
                "icones":["1,5kV_lac"],
                "outOfTE":true
            },
            {
                "nom":"CC Jacquemin quadritension",
                "image":"./res/img/trains/cc-mte-quadri.png",
                "icones":["1,5kV_lac","3kV_lac","15kV_lac","25kV_lac"],
                "outOfTE":false
            },
            {
                "nom":'Class 76',
                "image":"./res/img/trains/Class76.png",
                "icones":["1,5kV_lac"]
            },
            {
                "nom":'Class 92',
                "image":"./res/img/trains/Class 92j.png",
                "icones":["25kV_lac"]
            },
            {
                "nom":'Class 92 - neutre UK',
                "image":"./res/img/trains/Class 92b.png",
                "icones":["25kV_lac"]
            },
            {
                "nom":'Class 419 - MLV : Motor Luggage Van',
                "image":"./res/img/trains/Class_419.png",
                "icones":["750V_3eR"],
            },
            {
                "nom":'Ee 3/3 II (CFF) / C 20150',
                "image":"./res/img/trains/Ee33.png",
                "icones":["15kV_lac","25kV_lac"],
            },
            {
                "nom":'FS E402B',
                "image":"./res/img/trains/E402B.png",
                "icones":["1,5kV_lac","3kV_lac","25kV_lac"],
            },
            {
                "nom":"HLE13 / Série 3000",
                "image":"./res/img/trains/HLE13.png",
                "icones":["1,5kV_lac","3kV_lac","25kV_lac"],
            },
            {
                "nom":"HLE18 (II) / HLE19",
                "image":"./res/img/trains/HLE18.png",
                "icones":["1,5kV_lac","3kV_lac","25kV_lac"],
            },
            {
                "nom":"NS 1600 Benelux",
                "image":"./res/img/trains/NS 1600.png",
                "icones":["1,5kV_lac","3kV_lac","25kV_lac"],
            },
            {
                "nom":'Re460',
                "image":"./res/img/trains/re460.png",
                "icones":["15kV_lac"]
            }
        ]
    },
    {   // Loc Elec fret
        "categorie" : "Locomotives électriques fret",
        "trains" : [
            {
                "nom":"Ae 8/14 11801",
                "image":"./res/img/trains/Ae_8_14_11801.png",
                "icones":["15kV_lac"]
            }
        ]
    },
    {   // Loc bimode
        "categorie" : "Locomotives Bimodes",
        "trains" : [
            {
                "nom": 'BB+BB99000 (f)',
                "image":"./res/img/trains/BBBB99000.png",
                "icones": ['1,5kV_lac', '25kV_lac', 'TH']
            }
                ]
    },
    {   // Autorails
        "categorie" : "Autorails",
        "trains" : [
            {
                "nom":'BR 515',
                "image":"./res/img/trains/BR515.png",
                "icones":["TH"]
            },
            {
                "nom":'BR 708 / ORT 135.7',
                "image":"./res/img/trains/BR708.png",
                "icones":["TH"]
            },
            {
                "nom":'BR 798 / VT 98',
                "image":"./res/img/trains/VT 98.png",
                "icones":["TH"]
            },
            {
                "nom":'X 2200',
                "image":"./res/img/trains/x2200.png",
                "icones":["TH","um3"]
            },
            {
                "nom":'X 4900',
                "image":"./res/img/trains/x4900.png",
                "icones":["TH","um3"]
            },
            {
                "nom":'X 73500',
                "image":"./res/img/trains/x73500.png",
                "icones":["TH","um3"]
            },
            {
                "nom": 'X 310000 "Berliet"',
                "image":"./res/img/trains/X 31000.png",
                "icones":["TH"]
            }
        ]
    },
    {   // Automoteurs Diesels
        "categorie" : "Automoteurs diesels",
        "trains" : [
            {
                "nom":"Class 170 / Class 171 - 2 voitures (171/7) ",
                "image":"./res/img/trains/Class 170.png",
                "icones":["TH"]
            },
            {
                "nom":"Class 170 / Class 171 - 2 voitures (171/7), neutre UK",
                "image":"./res/img/trains/Class 170 2c neutre.png",
                "icones":["TH"]
            },
            {
                "nom":"Class 171 - 4 voitures (171/8)",
                "image":"./res/img/trains/Class 170 - 4c.png",
                "icones":["TH"]
            },
            {
                "nom":"Class 171 - 4 voitures (171/8), neutre UK",
                "image":"./res/img/trains/Class 170 4c neutre.png",
                "icones":["TH"]
            },
            {
                "nom":"RTG T3000 - bande noire",
                "image":"./res/img/trains/T3000_bn.png",
                "icones":["TH"]
            },
            {
                "nom":"S-594",
                "image":"./res/img/trains/S594.png",
                "icones":["TH"]
            },
            {
                "nom":"Siemens ICE TD",
                "image":"./res/img/trains/icetd.png",
                "icones":["TH"]
            },
            {
                "nom":"VT11.5",
                "image":"./res/img/trains/VT11-5.png",
                "icones":["TH"]
            }
        ]
    },
    {   // Automotrices Elec
        "categorie" : "Automotrices Électriques",
        "trains" : [
            {
                "nom":"4010",
                "image":"./res/img/trains/4010_Blanc.png",
                "icones":["15kV_lac"]
            },
            {
                "nom":"Alstom AGV",
                "image":"./res/img/trains/Alstom_AGV575.png",
                "icones":["1,5kV_lac","25kV_lac"],
                "outOfTE":true
            },
            {
                "nom":"Alstom Coradia Stream ICNG - 5 caisses",
                "image":"./res/img/trains/ICNG5.png",
                "icones":["1,5kV_lac","3kV_lac","um2"]
            },
            {
                "nom":"Alstom Coradia Stream ICNG - 8 caisses",
                "image":"./res/img/trains/ICNG8.png",
                "icones":["1,5kV_lac","3kV_lac","um2"],
                "outOfTE":true
            },
            {
                "nom":"Alstom ICE Duplex (f)",
                "image":"./res/img/trains/ICE Duplex.png",
                "icones":["1,5kV_lac","3kV_lac","15kV_lac","25kV_lac","um2"]
            },
            {
                "nom":"Alstom TGV DR (f)",
                "image":"./res/img/trains/tgv dr.png",
                "icones":["3kV_lac","15kV_lac","um2"],
            },
            {
                "nom":"Alstom TGV Duplex - toutes variantes",
                "image":"./res/img/trains/TGV_Duplex.png",
                "icones":["1,5kV_lac","3kV_lac","15kV_lac","25kV_lac","um2"]
            },
            {
                "nom":"Alstom TGV Postal",
                "image":"./res/img/trains/tgv_postal.png",
                "icones":["1,5kV_lac","25kV_lac","um2"]
            },
            {
                "nom":"Alstom TGV POS",
                "image":"./res/img/trains/tgv-pos-template.png",
                "icones":["1,5kV_lac","15kV_lac","25kV_lac","um2"]
            },
            {
                "nom":"Alstom TGV PSE - trumeaux gris",
                "image":"./res/img/trains/TGV_PSE.png",
                "icones":["1,5kV_lac","25kV_lac","um2"]
            },
            {
                "nom":"Alstom TGV PSE - trumeaux blancs",
                "image":"./res/img/trains/TGV_PSE_blanc.png",
                "icones":["1,5kV_lac","25kV_lac","um2"]
            },
            {
                "nom":"AM POST",
                "image":"./res/img/trains/amposte.png",
                "icones":["3kV_lac","um2"]
            },
            {
                "nom":"Avelia Horizon / TGV-M",
                "image":"./res/img/trains/Alstom_TGV_M_11c_Neutre.png",
                "icones":["1,5kV_lac","25kV_lac"],
                "outOfTE":true
            },
            {
                "nom":"BR 1462",
                "image":"./res/img/trains/BR 1462.png",
                "icones":["15kV_lac","25kV_lac"]
            },
            {
                "nom":"BR 403 (I) / ET 403",
                "image":"./res/img/trains/BR403I.png",
                "icones":["15kV_lac"]
            },
            {
                "nom":"BR 425",
                "image":"./res/img/trains/Template_BR_425.png",
                "icones":["15kV_lac"]
            },
            {
                "nom":"BR 481.5",
                "image":"./res/img/trains/BR481.png",
                "icones":["750V_3eR","um2"]
            },    
            {
                "nom":'Class 421 - neutre UK',
                "image":"./res/img/trains/BR Class 421.png",
                "icones":["750V_3eR"]
            },
            {
                "nom":'Class 442 - neutre UK (1s)',
                "image":"./res/img/trains/Template_Class_442_1s.png",
                "icones":["750V_3eR"]
            },
            {
                "nom":'Class 442 - neutre UK (2s)',
                "image":"./res/img/trains/Template_Class_442.png",
                "icones":["750V_3eR"]
            },
            {
                "nom":'Class 442 - neutre UK (refurb)',
                "image":"./res/img/trains/NSE_Class_442_refurb.png",
                "icones":["750V_3eR"]
            },
            {
                "nom":"Class 460 - neutre UK, première caisse",
                "image":"./res/img/trains/BR Class 460 - 1ere.png",
                "icones":["750V_3eR"]
            },
            {
                "nom":"Coradia stream DC",
                "image":"./res/img/trains/Coradia_Stream_ETR_104_png.png",
                "icones":["1,5kV_lac","3kV_lac"]
            },
            {
                "nom":"ETR 521",
                "image":"./res/img/trains/ETR 521.png",
                "icones":["3kV_lac"]
            },
            {
                "nom":"S-102 / S-112",
                "image":"./res/img/trains/Talgo_S102_Blanche.png",
                "icones":["25kV_lac"],
                "outOfTE":true
            },
            {
                "nom":"Siemens ICE 1 / BR 401 ",
                "image":"./res/img/trains/ICE1.png",
                "icones":["15kV_lac"]
            },
            {
                "nom":"Siemens ICE 2 / BR 402",
                "image":"./res/img/trains/ICE2.png",
                "icones":["15kV_lac","um2"]
            },
            {
                "nom":"Siemens ICE 2 / BR 402 - version bi-motrices",
                "image":"./res/img/trains/ICE2 - 2 motrices.png",
                "icones":["15kV_lac","um2"],
                "outOfTE":true
            },
            {
                "nom":"Siemens ICE 3M / BR 406",
                "image":"./res/img/trains/BR 406.png",
                "icones":["1,5kV_lac","3kV_lac","15kV_lac","25kV_lac","um2"]
            },
            {
                "nom":"Siemens TGV",
                "image":"./res/img/trains/Siemens TGV.png",
                "icones":["1,5kV_lac","25kV_lac","um2"],
                "outOfTE":true
            },
            {
                "nom":'Skoda CityElefant',
                "image":"./res/img/trains/cd471.png",
                "icones":["3kV_lac"],
                "outOfTE":true
            },
            {
                "nom":'Z 2000',
                "image":"./res/img/trains/Z2000.png",
                "icones":["1,5kV_lac"]
            },
            {
                "nom":'Z 5100 Rénovation lourde (2c)',
                "image":"./res/img/trains/Z 5100 2c.png",
                "icones":["1,5kV_lac"],
                "outOfTE":true
            },
            {
                "nom":'Z 5100 Rénovation lourde (3c)',
                "image":"./res/img/trains/Z 5100 3c.png",
                "icones":["1,5kV_lac"],
                "outOfTE":true
            },
            {
                "nom":'Z 5100 Rénovation lourde (4c)',
                "image":"./res/img/trains/Z 5100 4c.png",
                "icones":["1,5kV_lac"],
                "outOfTE":true
            },
            {
                "nom":'Z 5100 Rénovation lourde (2c)',
                "image":"./res/img/trains/Z 5100 3r.png",
                "icones":["750V_3eR"],
                "outOfTE":true
            },
            {
                "nom":'Z 7100 Modernisée',
                "image":["./res/img/trains/Z7100_GRG_R.png","./res/img/trains/Z7100_GRG.png"],
                "icones":["1,5kV_lac","mir"]
            },
            {
                "nom":'Z 7300',
                "image":"./res/img/trains/Z_7300.png",
                "icones":["1,5kV_lac","um3"]
            },
            {
                "nom":'Z 8100 / MI 79 / MI 84',
                "image":"./res/img/trains/MI79.png",
                "icones":["1,5kV_lac","25kV_lac","um2"]
            },
            {
                "nom":'Z 8800',
                "image":"./res/img/trains/Z8800.png",
                "icones":["1,5kV_lac","25kV_lac","um2"]
            },
            {
                "nom":"Z 20500 - toit gris",
                "image":"./res/img/trains/Z20500__Blanc.png",
                "icones":["1,5kV_lac","25kV_lac","um2"]
            },
            {
                "nom":"Z 20900 - toit blanc",
                "image":"./res/img/trains/Z20900_Blanc.png",
                "icones":["1,5kV_lac","25kV_lac","um2"]
            },
            {
                "nom":"Z 23000",
                "image":"./res/img/trains/Z23000.png",
                "icones":["1,5kV_lac","um8"]
            },
            {
                "nom":"Z 23500",
                "image":"./res/img/trains/Z23500.png",
                "icones":["1,5kV_lac","25kV_lac","um4"]
            },
            {
                "nom":"Z 24500",
                "image":"./res/img/trains/Z24500_Blanc.png",
                "icones":["1,5kV_lac","25kV_lac","um3"]
            },
            {
                "nom":"Z 26500",
                "image":"./res/img/trains/Z26500_Blanc.png",
                "icones":["1,5kV_lac","25kV_lac","um2"]
            },
            {
                "nom":"Z 50000 - vitres noires",
                "image":"./res/img/trains/Z50000_Blanc.png",
                "icones":["1,5kV_lac","25kV_lac","um2"]
            },
            {
                "nom":"Z 50000 - vitres blanches",
                "image":"./res/img/trains/Z50000_Blanc3.png",
                "icones":["1,5kV_lac","25kV_lac","um2"]
            },
            {
                "nom":"Z 50000 - sans contour vitres",
                "image":"./res/img/trains/Z50000_Blanc2.png",
                "icones":["1,5kV_lac","25kV_lac","um2"]
            },
            {
                "nom":'Z 51500',
                "image":"./res/img/trains/Z51500.png",
                "icones":["1,5kV_lac","25kV_lac","um3"]
            },
            {
                "nom":"Z 54500",
                "image":"./res/img/trains/Template_Z54500.png",
                "icones":["1,5kV_lac","25kV_lac","15kV_lac","um3"]
            },
            {
                "nom":"Z 56300",
                "image":"./res/img/trains/Z56300.png",
                "icones":["1,5kV_lac","25kV_lac","um3"]
            },
            {
                "nom":"Z 57000",
                "image":"./res/img/trains/Z57000.png",
                "icones":["1,5kV_lac","25kV_lac","um2"]
            }
            
        ]
    },
    {   // Automotrices Bimodes
        "categorie" : "Automotrices Bimodes",
        "trains" : [
            {
                "nom":"Régiolis 6 caisses - vitres noires",
                "image":"./res/img/trains/regiolis-6c-1.png",
                "icones":["TH","1,5kV_lac","15kV_lac","25kV_lac","um3"]
                
            },
            {
                "nom":"Régiolis 6 caisses - vitres blanches",
                "image":"./res/img/trains/regiolis-6c.png",
                "icones":["TH","1,5kV_lac","15kV_lac","25kV_lac","um3"]
                
            },
        ]
    },
    {   // Voitures Voyageurs
        "categorie" : "Voitures de voyageurs",
        "trains" : [
            {
                "nom":'Bbd 499 "Rekowagen" ex-DR',
                "image":"./res/img/trains/Bbd_499_Rekowagen.png",
                "icones":[],
                "outOfTE":true
            },
            {
                "nom":'BR 998.0 - Remorque VT78',
                "image":"./res/img/trains/BR998.png",
                "icones":[]
            },
            {
                "nom":'BR 456.0 / Modus-Wagen B',
                "image":"./res/img/trains/modus wagen B.png",
                "icones":[]
            },
            {
                "nom":'BR 484.0 / Modus-Wagen ABx',
                "image":["./res/img/trains/ABx.png","./res/img/trains/ABxr.png"],
                "icones":["mir"]
            },
            {
                "nom":'Corail NG88 A10 / NG88 B11',
                "image":"./res/img/trains/NG88 B11&A10.png",
                "icones":[]
            },
            {
                "nom":'Corail NG88 B5r',
                "image":"./res/img/trains/NG88 B5r.png",
                "icones":[]
            },
            {
                "nom":'Corail NG88 B7Dx',
                "image":["./res/img/trains/NGG B7Dx.png","./res/img/trains/NGG B7Dxr.png"],
                "icones":["mir"]
            },
            {
                "nom":'Corail VRrtu (f) - 2 versions',
                "image":["./res/img/trains/VRrtu_fic_l.png","./res/img/trains/VRrtu_fic_r.png"],
                "icones":["mir"],
            },
            {
                "nom":'Corail VTU A5B5 / VTU82 A10 / VTU82 B11 / Nouvelle Première',
                "image":"./res/img/trains/VTU A5B5.png",
                "icones":[]
            },
            {
                "nom":'Corail VTU A10 / VTU B11',
                "image":"./res/img/trains/VTU A10-B11.png",
                "icones":[]
            },
            {
                "nom":'Corail VTU B5r',
                "image":"./res/img/trains/VTU B5r.png",
                "icones":[]
            },
            {
                "nom":'Corail VTU B7 PMR',
                "image":"./res/img/trains/VTU B7 PMR.png",
                "icones":[]
            },
            {
                "nom":'Corail VTU Nouvelle Première Bar',
                "image":"./res/img/trains/VTU 1ere Bar.png",
                "icones":[],
                "outOfTe":true
            },
            {
                "nom":'Corail VU A3B4r',
                "image":"./res/img/trains/VU A3B4r.png",
                "icones":[]
            },
            {
                "nom":'Corail VU A4B6',
                "image":"./res/img/trains/VU A4B6.png",
                "icones":[]
            },
            {
                "nom":'Corail VU A9',
                "image":"./res/img/trains/VU A9.png",
                "icones":[]
            },
            {
                "nom":'Corail VU A9c',
                "image":"./res/img/trains/VU A9c.png",
                "icones":[]
            },
            {
                "nom":'Corail VU A10',
                "image":"./res/img/trains/VU A10.png",
                "icones":[]
            },
            {
                "nom":'Corail VU AcBc',
                "image":"./res/img/trains/VU AcBc.png",
                "icones":[]
            },
            {
                "nom":'Corail VU B3Su',
                "image":"./res/img/trains/VU B3Su.png",
                "icones":[]
            },
            {
                "nom":'Corail VU B5ux',
                "image":"./res/img/trains/VUB5ux.png",
                "icones":[]
            },
            {
                "nom":'Corail VU B5uxh',
                "image":["./res/img/trains/VU B5uxh.png","./res/img/trains/VU B5uxhr.png"],
                "icones":["mir"]
            },
            {
                "nom":'Corail VU B6Du',
                "image":"./res/img/trains/VU B6Du.png",
                "icones":[]
            },
            {
                "nom":'Corail VU B6Dux',
                "image":["./res/img/trains/B6Dux.png","./res/img/trains/B6Duxr.png"],
                "icones":["mir"]
            },
            {
                "nom":'Corail VU B7uh',
                "image":"./res/img/trains/VU B7uh.png",
                "icones":[]
            },
            {
                "nom":'Corail VU B9ux',
                "image":"./res/img/trains/VU B9ux.png",
                "icones":[]
            },
            {
                "nom":'Corail VU B10cx',
                "image":"./res/img/trains/VU B10cx.png",
                "icones":[]
            },
            {
                "nom":'Corail VU B11',
                "image":"./res/img/trains/VU B11.png",
                "icones":[]
            },
            {
                "nom":'Corail VU Cabine 8',
                "image":"./res/img/trains/VU Cabine 8.png",
                "icones":[]
            },
            {
                "nom":'Corail VU Du',
                "image":"./res/img/trains/VU Du.png",
                "icones":[],
                "outOfTe": true
            },
            {
                "nom":'Corail VU Infra',
                "image":"./res/img/trains/vu-infra.png",
                "icones":[]
            },
            {
                "nom":'Corail VU Lunea Services',
                "image":"./res/img/trains/VU Lunéa.png",
                "icones":[]
            },
            {
                "nom":'DB Avmz 111',
                "image":"./res/img/trains/avmz111.png",
                "icones":[]
            },
            {
                "nom":'DB Bm 235',
                "image":"./res/img/trains/bm235.png",
                "icones":[]
            },
            {
                "nom":'DB Bpmz 291',
                "image":"./res/img/trains/bpmz291.png",
                "icones":[]
            }, 
            {
                "nom":'Euraffaires A2t6u',
                "image":"./res/img/trains/eura_A2t6u.png",
                "icones":[]
            },
            {
                "nom":'Euraffaires A3rtux',
                "image":"./res/img/trains/eura_A3rtux.png",
                "icones":[]
            },
            {
                "nom":'Euraffaires A9½tu',
                "image":"./res/img/trains/eura_A912tu.png",
                "icones":[]
            },
            {
                "nom":'Grand Confort A3rtu',
                "image":"./res/img/trains/vgc_A3rtu.png",
                "icones":[]
            },
            {
                "nom":'Grand Confort A4Dtux',
                "image":"./res/img/trains/vgc_A4Dtux.png",
                "icones":[]
            },
            {
                "nom":'Grand Confort Atu/Btu',
                "image":"./res/img/trains/vgc_Atu_Btu.png",
                "icones":[]
            },
            {
                "nom":'Grand Confort Au/Bu',
                "image":"./res/img/trains/vgc_Au_Bu.png",
                "icones":[]
            },
            {
                "nom":'Grand Confort B5Dtux (f)',
                "image":"./res/img/trains/vgc_B5Dtux_fic.png",
                "icones":[]
            },
            {
                "nom":'Grand Confort B5Dux  (f)',
                "image":["./res/img/trains/vgc_B5Dux_fic_l.png","./res/img/trains/vgc_B5Dux_fic_r.png"],
                "icones":["mir"]
            },
            {
                "nom":'Grand Confort B9 (f)',
                "image":"./res/img/trains/vgc_B9_fic.png",
                "icones":[]
            },
            {
                "nom":'Grand Confort Vru',
                "image":"./res/img/trains/vgc_Vru.png",
                "icones":[]
            },
            {
                "nom":'Plan WRD',
                "image":["./res/img/trains/NS Plan WRD.png","./res/img/trains/NS Plan WRDr.png"],
                "icones":["mir"]
            },
            {
                "nom":'UIC B10 V200',
                "image":"./res/img/trains/UIC B10.png",
                "icones":[]
            },
            {
                "nom":'UIC-F A8',
                "image":"./res/img/trains/uic-f-a8.png",
                "icones":[]
            },
            {
                "nom":'UIC-F B5r',
                "image":"./res/img/trains/uic-f-b5r.png",
                "icones":[]
            },
            {
                "nom":'UIC-F B8c',
                "image":"./res/img/trains/uic-f-b8c.png",
                "icones":[]
            },
            {
                "nom":'UIC-F B9',
                "image":"./res/img/trains/uic-f-b9.png",
                "icones":[]
            },
            {
                "nom":'UIC-F VL',
                "image":"./res/img/trains/uic-f-vl.png",
                "icones":[]
            },
            {
                "nom":'USI grise',
                "image":"./res/img/trains/USI grise.png",
                "icones":[]
            },
            {
                "nom":'USI II',
                "image":"./res/img/trains/USI II.png",
                "icones":[]
            },
            {
                "nom":'USI II Bar',
                "image":"./res/img/trains/USI II Bar.png",
                "icones":[]
            },
            {
                "nom":"Tronçon Duplex Cooper",
                "image":"./res/img/trains/troncon_duplex.png",
                "icones":[]
            },
            {
                "nom":"VB2N - Rame type",
                "image":"./res/img/trains/VB2N_template.png",
                "icones":[]
                
            },
            {
                "nom":"VE2N",
                "image":"./res/img/trains/ve2n.png",
                "icones":[]
            },
            {
                "nom":'RailJet (type ÖBB) - Rame type',
                "image":"./res/img/trains/railjet.png",
                "icones":[]
            },
            {
                "nom":'Voiture pilote ex-Z2',
                "image":["./res/img/trains/Z2r.png","./res/img/trains/Z2.png"],
                "icones":["mir"]
            },
            {
                "nom":'ZRx 17100',
                "image":["./res/img/trains/ZRx 17100.png","./res/img/trains/ZRx 17100.png"],
                "icones":["mir"]
            },
            {
                "nom":'ZR 27100/200',
                "image":["./res/img/trains/ZR 27100.png","./res/img/trains/ZR 27100r.png"],
                "icones":["mir"],
                "outOfTE":true
            }
        ]
    },
    {   // Porte-autos
        "categorie":"Wagons porte-autos (passager ou fret)",
        "trains":[
            {
                "nom":'STVA TA260 Long',
                "image":"./res/img/trains/ta260-l.png",
                "icones":[]
            }
        ]
    },
    {   // Wagons FRET
        "categorie":"Wagons de fret",
        "trains":[
            {
                "nom":'ANF60',
                "image":"./res/img/trains/ANF60.png",
                "icones":[]
            },
            {
                "nom":"Corail MC76",
                "image":"./res/img/trains/MC76.png",
                "icones":[]
            },
            {
                "nom":"MK3 SLEP",
                "image":"./res/img/trains/MK3 SLEP.png",
                "icones":[]
            },
            {
                "nom":"Falrrs 152",
                "image":"./res/img/trains/Falrrs 152.png",
                "icones":[]
            }
        ]
    },
    {   // Transports Urbains
        "categorie":"Transports Urbains",
        "trains":[
            {
                "nom":"Siemens Avanto / U 25500",
                "image":"./res/img/trains/U25500_blanc.png",
                "icones":["750V_lac","25kV_lac"]
            },
            {
                "nom":"TTFS : Tram-Train Français Standard - compatible 1.5kV/25kV selon version",
                "image":"./res/img/trains/ttfs.png",
                "icones":["750V_lac","1,5kV_lac","25kV_lac"]
            },
        ]
    }
]
