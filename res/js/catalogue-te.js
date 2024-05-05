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
            train.tensions == undefined?console.error("Train "+train.nom+" erreur tension"):null
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
            newHTML += `<div class="tensions">`
            train.tensions.forEach(tension => {
                newHTML += `<img class="tension" src="./res/img/${tension}.png">`
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
        ∟ div class=tensions
            ∟ img tensions
        ∟ div class=nom
            ∟ div nom du train
    
    
    
    
    */
}

const catalogue = [
    {   // Sommaire
        "categorie" : "Sommaire",
        "trains" : [
            {
                "nom":'Index Pictogrames',
                "image":"",
                "tensions":["TE","TH","750V_3eR","850V_3eR","750V_lac","1,5kV_lac","3kV_lac","15kV_lac","25kV_lac","rev","mir","um2","um3","um4","um5"],
                "outOfTE":true
                
            },
            {
                "nom":'Si ce bandeau est bleu, le train est présent et réutilisable dans Train-Empire',
                "image":"https://img.shields.io/badge/Dernière_mise_à_jour-05/05/2024-blue?style=for-the-badge",
                "tensions":["TE"]
            },
            // {
            //     "nom":'Test <img src="https://img.shields.io/badge/25kV-LAC-gray?labelColor=0288D1&">',
            //     "image":"",
            //     "tensions":[]
            // },
        ]
    },
    {   // Loc Vapeur
        "categorie":"Locomotives à vapeur",
        "trains" : [
            {
                "nom":'LNER / BR A4',
                "image":"./res/img/trains/lner_bra4.png",
                "tensions":[]
            },
            {
                "nom":'BR 52 / 1-5-0 / Type 26/27/56 - sans pare-fumée',
                "image":"./res/img/trains/BR52_S.png",
                "tensions":[]
            },
            {
                "nom":'BR 52 / 1-5-0 / Type 26/27/56 - avec pare-fumée',
                "image":"./res/img/trains/BR52_A.png",
                "tensions":[]
            }
        ]
    },
    {   // Loc Diesel Poly
        "categorie" : "Locomotives diesel polyvalantes",
        "trains" : [
            {
                "nom":"BR 218",
                "image":"./res/img/trains/br218.png",
                "tensions":["TH"]
            },
            {
                "nom":"BB 62400 / NS 2400",
                "image":"./res/img/trains/BB62400.png",
                "tensions":["TH","um4"]
            },
            {
                "nom":"BB 73000",
                "image":"./res/img/trains/BB73000.png",
                "tensions":["TH"]
            },
            {
                "nom":"CC 72000 - attelages Scharfenberg",
                "image":"./res/img/trains/CC72000_TGV_usine.png",
                "tensions":["TH"]
            },
            {
                "nom":"CC 73000",
                "image":"./res/img/trains/CC73000.png",
                "tensions":["TH"]
            },
            {
                "nom":"CC 73000 - bas de caisse gris",
                "image":"./res/img/trains/CC73000_bas gris.png",
                "tensions":["TH"]
            },
            {
                "nom":'Class 08',
                "image":["./res/img/trains/Class08.png","./res/img/trains/Class08_r.png"],
                "tensions":["TH"]
            },
            {
                "nom":'Class 08 - neutre UK',
                "image":["./res/img/trains/Class08b.png","./res/img/trains/Class08b_r.png"],
                "tensions":["TH"]
            },
            {
                "nom":'Class 08 - neutre UK, toit gris',
                "image":["./res/img/trains/Class08fb.png","./res/img/trains/Class08fb_r.png"],
                "tensions":["TH"]
            },
            {
                "nom":'Class 41 (II)',
                "image":"./res/img/trains/BR Class 41.png",
                "tensions":["TH"]
            },
            {
                "nom":"D445",
                "image":"./res/img/trains/D445.png",
                "tensions":["TH"]
            },
            {
                "nom":"Série ME26",
                "image":"./res/img/trains/Template_ME26.png",
                "tensions":["TH"]
            },
            {
                "nom":'Siemens Eurorunner / ER20 - 2 versions',
                "image":["./res/img/trains/ER20.png","./res/img/trains/template_ER20.png"],
                "tensions":["TH"]
            }
        ],
    },
    {   // Loc Diesel fret
        "categorie" : "Locomotives diesel fret",
        "trains" : [
            {
                "nom":"Class 77",
                "image":"./res/img/trains/class77.png",
                "tensions":["TH"]
            },
            {
                "nom":"HLD77",
                "image":"./res/img/trains/HLD77.png",
                "tensions":["TH"]
            },
            {
                "nom":"Vossloh G2000",
                "image":"./res/img/trains/g2000.png",
                "tensions":["TH"]
            },
        ]
    },
    {   // Loc Elec poly
        "categorie" : "Locomotives électriques polyvalentes",
        "trains" : [
            {
                "nom":"BB 900",
                "image":"./res/img/trains/BB900.png",
                "tensions":["1,5kV_lac"]
            },
            {
                "nom":"BB 950",
                "image":"./res/img/trains/BB950.png",
                "tensions":["750V_3eR"]
            },
            {
                "nom":"BB 8100",
                "image":"./res/img/trains/BB 8100.png",
                "tensions":["1,5kV_lac"]
            },
            {
                "nom":"BB 9300",
                "image":"./res/img/trains/BB9300.png",
                "tensions":["1,5kV_lac"]
            },
            {
                "nom":"BB 26000",
                "image":"./res/img/trains/BB26000.png",
                "tensions":["1,5kV_lac","25kV_lac"]
            },
            {
                "nom":"BB 36000",
                "image":"./res/img/trains/BB36000_Blanc.png",
                "tensions":["1,5kV_lac","3kV_lac","25kV_lac","um2"]
            },
            {
                "nom":'BB 17000',
                "image":"./res/img/trains/17000.png",
                "tensions":["25kV_lac"]
            },
            {
                "nom":"BB 37000",
                "image":"./res/img/trains/bb37000.png",
                "tensions":["1,5kV_lac","15kV_lac","25kV_lac","um2"]
            },
            {
                "nom":"Bombardier Traxx E186",
                "image":"./res/img/trains/e186.png",
                "tensions":["1,5kV_lac","3kV_lac","15kV_lac","25kV_lac"]
            },
            {
                "nom":'BR 102',
                "image":"./res/img/trains/br102.png",
                "tensions":["15kV_lac"]
            },
            {
                "nom":'BR 110',
                "image":"./res/img/trains/Template_BR_110.png",
                "tensions":["15kV_lac"]
            },
            {
                "nom":'BR 152',
                "image":"./res/img/trains/br152.png",
                "tensions":["15kV_lac"]
            },
            {
                "nom":'BR 180 / BR 320',
                "image":"./res/img/trains/br180.png",
                "tensions":["3kV_lac","15kV_lac"]
            },
            {
                "nom":"BR 189 / Siemens ES64F4",
                "image":"./res/img/trains/br189.png",
                "tensions":["15kV_lac"]
            },
            {
                "nom":"CC 9300",
                "image":"./res/img/trains/cc9300.png",
                "tensions":["1,5kV_lac"],
                "outOfTE":true
            },
            {
                "nom":"CC Jacquemin quadritension",
                "image":"./res/img/trains/cc-mte-quadri.png",
                "tensions":["1,5kV_lac","3kV_lac","15kV_lac","25kV_lac"],
                "outOfTE":false
            },
            {
                "nom":'Class 76',
                "image":"./res/img/trains/Class76.png",
                "tensions":["1,5kV_lac"]
            },
            {
                "nom":'Class 92',
                "image":"./res/img/trains/Class 92j.png",
                "tensions":["25kV_lac"]
            },
            {
                "nom":'Class 92 - neutre UK',
                "image":"./res/img/trains/Class 92b.png",
                "tensions":["25kV_lac"]
            },
            {
                "nom":'Class 419 - MLV : Motor Luggage Van',
                "image":"./res/img/trains/Class_419.png",
                "tensions":["750V_3eR"],
            },
            {
                "nom":'Ee 3/3 II (CFF) / C 20150',
                "image":"./res/img/trains/ee33.png",
                "tensions":["15kV_lac","25kV_lac"],
            },
            {
                "nom":'FS E402B',
                "image":"./res/img/trains/E402B.png",
                "tensions":["1,5kV_lac","3kV_lac","25kV_lac"],
            },
            {
                "nom":"HLE13 / Série 3000",
                "image":"./res/img/trains/HLE13.png",
                "tensions":["1,5kV_lac","3kV_lac","25kV_lac"],
            },
            {
                "nom":"HLE18 (II) / HLE19",
                "image":"./res/img/trains/HLE18.png",
                "tensions":["1,5kV_lac","3kV_lac","25kV_lac"],
            },
            {
                "nom":'Re460',
                "image":"./res/img/trains/re460.png",
                "tensions":["15kV_lac"]
            }
        ]
    },
    {   // Autorails
        "categorie" : "Autorails",
        "trains" : [
            {
                "nom":'BR 708 / ORT 135.7',
                "image":"./res/img/trains/BR708.png",
                "tensions":["TH"]
            },
            {
                "nom":'BR 798 / VT 98',
                "image":"./res/img/trains/VT 98.png",
                "tensions":["TH"]
            },
            {
                "nom":'X 2200',
                "image":"./res/img/trains/x2200.png",
                "tensions":["TH","um3"]
            },
            {
                "nom":'X 4900',
                "image":"./res/img/trains/x4900.png",
                "tensions":["TH","um3"]
            },
            {
                "nom":'X 73500',
                "image":"./res/img/trains/x73500.png",
                "tensions":["TH","um3"]
            },
            {
                "nom": 'X 310000 "Berliet"',
                "image":"./res/img/trains/X 31000.png",
                "tensions":["TH"]
            }
        ]
    },
    {   // Automoteurs Diesels
        "categorie" : "Automoteurs diesels",
        "trains" : [
            {
                "nom":"Class 170 / Class 171 - 2 voitures (171/7) ",
                "image":"./res/img/trains/Class 170.png",
                "tensions":["TH"]
            },
            {
                "nom":"Class 170 / Class 171 - 2 voitures (171/7), neutre UK",
                "image":"./res/img/trains/Class 170 2c neutre.png",
                "tensions":["TH"]
            },
            {
                "nom":"Class 171 - 4 voitures (171/8)",
                "image":"./res/img/trains/Class 170 - 4c.png",
                "tensions":["TH"]
            },
            {
                "nom":"Class 171 - 4 voitures (171/8), neutre UK",
                "image":"./res/img/trains/Class 170 4c neutre.png",
                "tensions":["TH"]
            },
            {
                "nom":"RTG T3000 - bande noire",
                "image":"./res/img/trains/T3000_bn.png",
                "tensions":["TH"]
            },
            {
                "nom":"S-594",
                "image":"./res/img/trains/S594.png",
                "tensions":["TH"]
            },
            {
                "nom":"Siemens ICE TD",
                "image":"./res/img/trains/icetd.png",
                "tensions":["TH"]
            },
            {
                "nom":"VT11.5",
                "image":"./res/img/trains/VT11-5.png",
                "tensions":["TH"]
            }
        ]
    },
    {   // Automotrices Elec
        "categorie" : "Automotrices Électriques",
        "trains" : [
            {
                "nom":"Alstom AGV",
                "image":"./res/img/trains/Alstom_AGV575.png",
                "tensions":["1,5kV_lac","25kV_lac"],
                "outOfTE":true
            },
            {
                "nom":"Alstom ICE Duplex (f)",
                "image":"./res/img/trains/ICE Duplex.png",
                "tensions":["1,5kV_lac","3kV_lac","15kV_lac","25kV_lac","um2"]
            },
            {
                "nom":"Alstom TGV DR (f)",
                "image":"./res/img/trains/tgv dr.png",
                "tensions":["3kV_lac","15kV_lac","um2"],
            },
            {
                "nom":"Alstom TGV Duplex - toutes variantes",
                "image":"./res/img/trains/TGV_Duplex.png",
                "tensions":["1,5kV_lac","3kV_lac","15kV_lac","25kV_lac","um2"]
            },
            {
                "nom":"Alstom TGV Postal",
                "image":"./res/img/trains/tgv_postal.png",
                "tensions":["1,5kV_lac","25kV_lac","um2"]
            },
            {
                "nom":"Alstom TGV PSE - trumeaux gris",
                "image":"./res/img/trains/TGV_PSE.png",
                "tensions":["1,5kV_lac","25kV_lac","um2"]
            },
            {
                "nom":"Alstom TGV PSE - trumeaux blancs",
                "image":"./res/img/trains/TGV_PSE_blanc.png",
                "tensions":["1,5kV_lac","25kV_lac","um2"]
            },
            {
                "nom":"AM POST",
                "image":"./res/img/trains/amposte.png",
                "tensions":["3kV_lac","um2"]
            },
            {
                "nom":"Avelia Horizon / TGV-M",
                "image":"./res/img/trains/Alstom_TGV_M_11c_Neutre.png",
                "tensions":["1,5kV_lac","25kV_lac"],
                "outOfTE":true
            },
            {
                "nom":"BR 1462",
                "image":"./res/img/trains/BR 1462.png",
                "tensions":["15kV_lac","25kV_lac"]
            },
            {
                "nom":"BR 403 (I) / ET 403",
                "image":"./res/img/trains/BR403I.png",
                "tensions":["15kV_lac"]
            },
            {
                "nom":"BR 425",
                "image":"./res/img/trains/Template_BR_425.png",
                "tensions":["15kV_lac"]
            },
            {
                "nom":"BR 481.5",
                "image":"./res/img/trains/BR481.png",
                "tensions":["750V_3eR","um2"]
            },    
            {
                "nom":'Class 421 - neutre UK',
                "image":"./res/img/trains/BR Class 421.png",
                "tensions":["750V_3eR"]
            },
            {
                "nom":'Class 442 - neutre UK (1s)',
                "image":"./res/img/trains/Template_Class_442_1s.png",
                "tensions":["750V_3eR"]
            },
            {
                "nom":'Class 442 - neutre UK (2s)',
                "image":"./res/img/trains/Template_Class_442.png",
                "tensions":["750V_3eR"]
            },
            {
                "nom":'Class 442 - neutre UK (refurb)',
                "image":"./res/img/trains/NSE_Class_442_refurb.png",
                "tensions":["750V_3eR"]
            },
            {
                "nom":"Class 460 - neutre UK, première caisse",
                "image":"./res/img/trains/BR Class 460 - 1ere.png",
                "tensions":["750V_3eR"]
            },
            {
                "nom":"Coradia stream DC",
                "image":"./res/img/trains/Coradia_Stream_ETR_104_png.png",
                "tensions":["1,5kV_lac","3kV_lac"]
            },
            {
                "nom":"S-102 / S-112",
                "image":"./res/img/trains/Talgo_S102_Blanche.png",
                "tensions":["25kV_lac"],
                "outOfTE":true
            },
            {
                "nom":"Siemens ICE 1 / BR 401 ",
                "image":"./res/img/trains/ICE1.png",
                "tensions":["15kV_lac"]
            },
            {
                "nom":"Siemens ICE 2 / BR 402",
                "image":"./res/img/trains/ICE2.png",
                "tensions":["15kV_lac","um2"]
            },
            {
                "nom":"Siemens ICE 2 / BR 402 - version bi-motrices",
                "image":"./res/img/trains/ICE2 - 2 motrices.png",
                "tensions":["15kV_lac","um2"],
                "outOfTE":true
            },
            {
                "nom":"Siemens ICE 3M / BR 406",
                "image":"./res/img/trains/BR 406.png",
                "tensions":["1,5kV_lac","3kV_lac","15kV_lac","25kV_lac","um2"]
            },
            {
                "nom":"Siemens TGV",
                "image":"./res/img/trains/Siemens TGV.png",
                "tensions":["1,5kV_lac","25kV_lac","um2"],
                "outOfTE":true
            },
            {
                "nom":'Skoda CityElefant',
                "image":"./res/img/trains/cd471.png",
                "tensions":["3kV_lac"],
                "outOfTE":true
            },
            {
                "nom":'Z 2000',
                "image":"./res/img/trains/Z2000.png",
                "tensions":["1,5kV_lac"]
            },
            {
                "nom":'Z 7100 Modernisée',
                "image":["./res/img/trains/Z7100_GRG_R.png","./res/img/trains/Z7100_GRG.png"],
                "tensions":["1,5kV_lac","mir"]
            },
            {
                "nom":'Z 7300',
                "image":"./res/img/trains/Z_7300.png",
                "tensions":["1,5kV_lac","um3"]
            },
            {
                "nom":'Z 8100 / MI 79 / MI 84',
                "image":"./res/img/trains/MI79.png",
                "tensions":["1,5kV_lac","25kV_lac","um2"]
            },
            {
                "nom":'Z 8800',
                "image":"./res/img/trains/Z8800.png",
                "tensions":["1,5kV_lac","25kV_lac","um2"]
            },
            {
                "nom":"Z 20500 - toit gris",
                "image":"./res/img/trains/Z20500__Blanc.png",
                "tensions":["1,5kV_lac","25kV_lac","um2"]
            },
            {
                "nom":"Z 20900 - toit blanc",
                "image":"./res/img/trains/Z20900_Blanc.png",
                "tensions":["1,5kV_lac","25kV_lac","um2"]
            },
            {
                "nom":"Z 23000",
                "image":"./res/img/trains/Z23000.png",
                "tensions":["1,5kV_lac","um8"]
            },
            {
                "nom":"Z 24500",
                "image":"./res/img/trains/Z24500_Blanc.png",
                "tensions":["1,5kV_lac","25kV_lac","um3"]
            },
            {
                "nom":"Z 26500",
                "image":"./res/img/trains/Z26500_Blanc.png",
                "tensions":["1,5kV_lac","25kV_lac","um2"]
            },
            {
                "nom":"Z 50000 - vitres noires",
                "image":"./res/img/trains/Z50000_Blanc.png",
                "tensions":["1,5kV_lac","25kV_lac","um2"]
            },
            {
                "nom":"Z 50000 - vitres blanches",
                "image":"./res/img/trains/Z50000_Blanc3.png",
                "tensions":["1,5kV_lac","25kV_lac","um2"]
            },
            {
                "nom":"Z 50000 - sans contour vitres",
                "image":"./res/img/trains/Z50000_Blanc2.png",
                "tensions":["1,5kV_lac","25kV_lac","um2"]
            },
            {
                "nom":'Z 51500',
                "image":"./res/img/trains/Z51500.png",
                "tensions":["1,5kV_lac","25kV_lac","um3"]
            },
            {
                "nom":"Z 56300",
                "image":"./res/img/trains/Z56300.png",
                "tensions":["1,5kV_lac","25kV_lac","um3"]
            },
            {
                "nom":"Z 57000",
                "image":"./res/img/trains/Z57000.png",
                "tensions":["1,5kV_lac","25kV_lac","um2"]
            }
            
        ]
    },
    {   // Automotrices Bimodes
        "categorie" : "Automotrices Bimodes",
        "trains" : [
            {
                "nom":"Régiolis 6 caisses - vitres noires",
                "image":"./res/img/trains/regiolis-6c-1.png",
                "tensions":["TH","1,5kV_lac","15kV_lac","25kV_lac","um3"]
                
            },
            {
                "nom":"Régiolis 6 caisses - vitres blanches",
                "image":"./res/img/trains/regiolis-6c.png",
                "tensions":["TH","1,5kV_lac","15kV_lac","25kV_lac","um3"]
                
            },
        ]
    },
    {   // Voitures Voyageurs
        "categorie" : "Voitures de voyageurs",
        "trains" : [
            {
                "nom":'BR 998.0 - Remorque VT78',
                "image":"./res/img/trains/BR998.png",
                "tensions":[]
            },
            {
                "nom":'BR 456.0 / Modus-Wagen B',
                "image":"./res/img/trains/modus wagen B.png",
                "tensions":[]
            },
            {
                "nom":'BR 484.0 / Modus-Wagen ABx',
                "image":["./res/img/trains/ABx.png","./res/img/trains/ABxr.png"],
                "tensions":["mir"]
            },
            {
                "nom":'Corail NG88 A10 / NG88 B11',
                "image":"./res/img/trains/NG88 B11&A10.png",
                "tensions":[]
            },
            {
                "nom":'Corail NG88 B5r',
                "image":"./res/img/trains/NG88 B5r.png",
                "tensions":[]
            },
            {
                "nom":'Corail NG88 B7Dx',
                "image":["./res/img/trains/NGG B7Dx.png","./res/img/trains/NGG B7Dxr.png"],
                "tensions":["mir"]
            },
            {
                "nom":'Corail VRrtu (f) - 2 versions',
                "image":["./res/img/trains/vrrtu.png","./res/img/trains/vrrtu2.png"],
                "tensions":[],
            },
            {
                "nom":'Corail VTU A5B5 / VTU82 A10 / VTU82 B11 / Nouvelle Première',
                "image":"./res/img/trains/VTU A5B5.png",
                "tensions":[]
            },
            {
                "nom":'Corail VTU A10 / VTU B11',
                "image":"./res/img/trains/VTU A10-B11.png",
                "tensions":[]
            },
            {
                "nom":'Corail VTU B5r',
                "image":"./res/img/trains/VTU B5r.png",
                "tensions":[]
            },
            {
                "nom":'Corail VTU B7 PMR',
                "image":"./res/img/trains/VTU B7 PMR.png",
                "tensions":[]
            },
            {
                "nom":'Corail VTU Nouvelle Première Bar',
                "image":"./res/img/trains/VTU 1ere Bar.png",
                "tensions":[],
                "outOfTe":true
            },
            {
                "nom":'Corail VU A3B4r',
                "image":"./res/img/trains/VU A3B4r.png",
                "tensions":[]
            },
            {
                "nom":'Corail VU A4B6',
                "image":"./res/img/trains/VU A4B6.png",
                "tensions":[]
            },
            {
                "nom":'Corail VU A9',
                "image":"./res/img/trains/VU A9.png",
                "tensions":[]
            },
            {
                "nom":'Corail VU A9c',
                "image":"./res/img/trains/VU A9c.png",
                "tensions":[]
            },
            {
                "nom":'Corail VU A10',
                "image":"./res/img/trains/VU A10.png",
                "tensions":[]
            },
            {
                "nom":'Corail VU AcBc',
                "image":"./res/img/trains/VU AcBc.png",
                "tensions":[]
            },
            {
                "nom":'Corail VU B3Su',
                "image":"./res/img/trains/VU B3Su.png",
                "tensions":[]
            },
            {
                "nom":'Corail VU B5ux',
                "image":"./res/img/trains/VUB5ux.png",
                "tensions":[]
            },
            {
                "nom":'Corail VU B5uxh',
                "image":["./res/img/trains/VU B5uxh.png","./res/img/trains/VU B5uxhr.png"],
                "tensions":["mir"]
            },
            {
                "nom":'Corail VU B6Du',
                "image":"./res/img/trains/VU B6Du.png",
                "tensions":[]
            },
            {
                "nom":'Corail VU B6Dux',
                "image":["./res/img/trains/B6Dux.png","./res/img/trains/B6Duxr.png"],
                "tensions":["mir"]
            },
            {
                "nom":'Corail VU B7uh',
                "image":"./res/img/trains/VU B7uh.png",
                "tensions":[]
            },
            {
                "nom":'Corail VU B9ux',
                "image":"./res/img/trains/VU B9ux.png",
                "tensions":[]
            },
            {
                "nom":'Corail VU B10cx',
                "image":"./res/img/trains/VU B10cx.png",
                "tensions":[]
            },
            {
                "nom":'Corail VU B11',
                "image":"./res/img/trains/VU B11.png",
                "tensions":[]
            },
            {
                "nom":'Corail VU Cabine 8',
                "image":"./res/img/trains/VU Cabine 8.png",
                "tensions":[]
            },
            {
                "nom":'Corail VU Du',
                "image":"./res/img/trains/VU Du.png",
                "tensions":[],
                "outOfTe": true
            },
            {
                "nom":'Corail VU Infra',
                "image":"./res/img/trains/vu-infra.png",
                "tensions":[]
            },
            {
                "nom":'Corail VU Lunea Services',
                "image":"./res/img/trains/VU Lunéa.png",
                "tensions":[]
            },
            {
                "nom":'DB Avmz 111',
                "image":"./res/img/trains/avmz111.png",
                "tensions":[]
            },
            {
                "nom":'DB Bm 235',
                "image":"./res/img/trains/bm235.png",
                "tensions":[]
            },
            {
                "nom":'DB Bpmz 291',
                "image":"./res/img/trains/bpmz291.png",
                "tensions":[]
            },
            {
                "nom":'Plan WRD',
                "image":["./res/img/trains/NS Plan WRD.png","./res/img/trains/NS Plan WRDr.png"],
                "tensions":["mir"]
            },
            {
                "nom":'UIC B10 V200',
                "image":"./res/img/trains/UIC B10.png",
                "tensions":[]
            },
            {
                "nom":'UIC-F A8',
                "image":"./res/img/trains/uic-f-a8.png",
                "tensions":[]
            },
            {
                "nom":'UIC-F B5r',
                "image":"./res/img/trains/uic-f-b5r.png",
                "tensions":[]
            },
            {
                "nom":'UIC-F B8c',
                "image":"./res/img/trains/uic-f-b8c.png",
                "tensions":[]
            },
            {
                "nom":'UIC-F B9',
                "image":"./res/img/trains/uic-f-b9.png",
                "tensions":[]
            },
            {
                "nom":'UIC-F VL',
                "image":"./res/img/trains/uic-f-vl.png",
                "tensions":[]
            },
            {
                "nom":'USI II',
                "image":"./res/img/trains/USI II.png",
                "tensions":[]
            },
            {
                "nom":'USI II Bar',
                "image":"./res/img/trains/USI II Bar.png",
                "tensions":[]
            },
            {
                "nom":"VB2N - Rame type",
                "image":"./res/img/trains/VB2N_template.png",
                "tensions":[]
                
            },
            {
                "nom":"VE2N",
                "image":"./res/img/trains/ve2n.png",
                "tensions":[]
                
            },
            {
                "nom":'RailJet (type ÖBB) - Rame type',
                "image":"./res/img/trains/railjet.png",
                "tensions":[]
            }
        ]
    },
    {   // Porte-autos
        "categorie":"Wagons porte-autos (passager ou fret)",
        "trains":[
            {
                "nom":'STVA TA260 Long',
                "image":"./res/img/trains/ta260-l.png",
                "tensions":[]
            }
        ]
    },
    {   // Wagons FRET
        "categorie":"Wagons de fret",
        "trains":[
            {
                "nom":'ANF60',
                "image":"./res/img/trains/ANF60.png",
                "tensions":[]
            },
            {
                "nom":"Corail MC76",
                "image":"./res/img/trains/MC76.png",
                "tensions":[]
            },
            {
                "nom":"MK3 SLEP",
                "image":"./res/img/trains/MK3 SLEP.png",
                "tensions":[]
            }
        ]
    },
    {   // Transports Urbains
        "categorie":"Transports Urbains",
        "trains":[
            {
                "nom":"Siemens Avanto / U 25500",
                "image":"./res/img/trains/U25500_blanc.png",
                "tensions":["750V_lac","25kV_lac"]
            },
            {
                "nom":"TTFS : Tram-Train Français Standard - compatible 1.5kV/25kV selon version",
                "image":"./res/img/trains/ttfs.png",
                "tensions":["750V_lac","1,5kV_lac","25kV_lac"]
            },
        ]
    }
]
