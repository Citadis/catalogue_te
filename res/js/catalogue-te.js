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
            newHTML += `<img src="${train.image}">`
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
                "tensions":["TE","TH","750V_3eR","850V_3eR","750V_lac","1,5kV_lac","3kV_lac","15kV_lac","25kV_lac","rev"],
                "outOfTE":true

            },
            {
                "nom":'Si ce bandeau est bleu, le train est présent et réutilisable dans Train-Empire',
                "image":"",
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
                "image":"https://cdn.discordapp.com/attachments/468051157135392789/1072821299665174528/lner-a4.png",
                "tensions":[]
            },
            {
                "nom":'BR 52 / 1-5-0 / Type 26/27/56 - Sans pare-fumée',
                "image":"https://media.discordapp.net/attachments/1066014807888756756/1098259712539107418/image.png",
                "tensions":[]
            },
            {
                "nom":'BR 52 / 1-5-0 / Type 26/27/56 - Avec pare-fumée',
                "image":"https://media.discordapp.net/attachments/1066014807888756756/1098259806759948368/image.png",
                "tensions":[]
            }
        ]
    },
    {   // Loc Diesel Poly
        "categorie" : "Locomotives diesel polyvalantes",
        "trains" : [
            {
                "nom":"BR 218",
                "image":"https://media.discordapp.net/attachments/1066014807888756756/1072902626053722172/br218.png",
                "tensions":["TH"]
            },
            {
                "nom":'Class 41 (II)',
                "image":"https://media.discordapp.net/attachments/1066014807888756756/1090599109607571476/41.png",
                "tensions":["TH"]

            },
            {
                "nom":"D445",
                "image":"https://cdn.discordapp.com/attachments/1066014807888756756/1072902660644155462/D445.png",
                "tensions":["TH"]
            },
            {
                "nom":"Série ME26",
                "image":"https://media.discordapp.net/attachments/1066014807888756756/1113754943376068659/Template_ME26.png",
                "tensions":["TH"]
            },
            {
                "nom":'Siemens Eurorunner',
                "image":"https://cdn.discordapp.com/attachments/1066014807888756756/1073573478717988984/template_ER20.png",
                "tensions":["TH"]
            }
        ],
    },
    {   // Loc Diesel fret
        "categorie" : "Locomotives diesel fret",
        "trains" : [
            {
                "nom":"Class 77",
                "image":"https://media.discordapp.net/attachments/1066014807888756756/1072923844479811634/class77.png",
                "tensions":["TH"]
            },
            {
                "nom":"HLD77",
                "image":"https://media.discordapp.net/attachments/1066014807888756756/1120139675198296124/1036_neutre.png",
                "tensions":["TH"]
            },
            {
                "nom":"Vossloh G2000",
                "image":"https://cdn.discordapp.com/attachments/1066014807888756756/1072923997928431626/g2000.png",
                "tensions":["TH"]
            },
        ]
    },
    {   // Loc Elec poly
        "categorie" : "Locomotives électriques polyvalentes",
        "trains" : [
            {
                "nom":"BB 9300",
                "image":"https://cdn.discordapp.com/attachments/1066014807888756756/1073196723977080852/bb9300.png",
                "tensions":["1,5kV_lac"]
            },
            {
                "nom":"BB 36000",
                "image":"https://media.discordapp.net/attachments/1066014807888756756/1066071089010180206/BB36000_Blanc.png",
                "tensions":["1,5kV_lac","3kV_lac","25kV_lac"]
            },
            {
                "nom":'BB 17000',
                "image":"https://media.discordapp.net/attachments/1066014807888756756/1088100528967393350/17000.png",
                "tensions":["25kV_lac"]
            },
            {
                "nom":"BB 37000",
                "image":"https://media.discordapp.net/attachments/1066014807888756756/1102172636550803557/Sans_titre.png",
                "tensions":["1,5kV_lac","15kV_lac","25kV_lac"]
            },
            {
                "nom":"Bombardier Traxx E186",
                "image":"https://cdn.discordapp.com/attachments/1066014807888756756/1072923930177847388/e186.png",
                "tensions":["1,5kV_lac","3kV_lac","15kV_lac","25kV_lac"]
            },
            {
                "nom":'BR 102',
                "image":"https://media.discordapp.net/attachments/1066014807888756756/1072902560471597118/br102.png",
                "tensions":["15kV_lac"]
            },
            {
                "nom":'BR 110',
                "image":"https://cdn.discordapp.com/attachments/1066014807888756756/1116699947769794630/Template_BR_110.png",
                "tensions":["15kV_lac"]
            },
            {
                "nom":'BR 152',
                "image":"https://media.discordapp.net/attachments/1066014807888756756/1113559538382151710/Template_BR_152.png",
                "tensions":["15kV_lac"]
            },
            {
                "nom":'BR 180 / BR 320',
                "image":"https://media.discordapp.net/attachments/1066014807888756756/1072902573473935451/br180.png",
                "tensions":["3kV_lac","15kV_lac"]
            },
            {
                "nom":"BR 189 / Siemens ES64F4",
                "image":"https://media.discordapp.net/attachments/1066014807888756756/1100025976437624904/image.png",
                "tensions":["15kV_lac"]
            },
            {
                "nom":"CC 9300",
                "image":"https://cdn.discordapp.com/attachments/1066014807888756756/1073196940159893514/cc9300.png",
                "tensions":["1,5kV_lac"],
                "outOfTE":true
            },
            {
                "nom":"CC Jacquemin quadritension",
                "image":"https://cdn.discordapp.com/attachments/1066014807888756756/1073513937007542282/cc-mte-quadri.png",
                "tensions":["1,5kV_lac","3kV_lac","15kV_lac","25kV_lac"],
                "outOfTE":false
            },
            {
                "nom":'Class 419 - MLV : Motor Luggage Van',
                "image":"https://media.discordapp.net/attachments/1066014807888756756/1081297864476590200/Class_419_template.png",
                "tensions":["750V_3eR"],
            },
            {
                "nom":'FS E402B',
                "image":"https://cdn.discordapp.com/attachments/1066014807888756756/1073573432295440404/template_E40B.png",
                "tensions":["1,5kV_lac","3kV_lac","25kV_lac"],
            },
            {
                "nom":"HLE13 / Série 3000",
                "image":"https://media.discordapp.net/attachments/1066014807888756756/1106965017468862705/image.png",
                "tensions":["1,5kV_lac","3kV_lac","25kV_lac"],
            },
            {
                "nom":"HLE18 (II) / HLE19",
                "image":"https://media.discordapp.net/attachments/1066014807888756756/1120139621213409290/377_neutre.png",
                "tensions":["1,5kV_lac","3kV_lac","25kV_lac"],
            },
            {
                "nom":'Re460',
                "image":"https://media.discordapp.net/attachments/1066014807888756756/1084471317744582676/re.png",
                "tensions":["15kV_lac"]
            }
        ]
    },
    {   // Autorails
        "categorie" : "Autorails",
        "trains" : [
            {
                "nom":'X 2200',
                "image":"https://media.discordapp.net/attachments/1066014807888756756/1088103672124280943/x2200.png",
                "tensions":["TH"]
            },
            {
                "nom":'X 73500',
                "image":"https://media.discordapp.net/attachments/1066014807888756756/1072902588443402300/x73500.png",
                "tensions":["TH"]
            },
            {
                "nom": 'X 310000 "Berliet"',
                "image":"https://media.discordapp.net/attachments/792860120622301197/1003758481968467998/unknown.png",
                "tensions":["TH"]
            },
        ]
    },
    {   // Automoteurs Diesels
        "categorie" : "Automoteurs diesels",
        "trains" : [
            {
                "nom":"Class 170 / Class 171 - 2 voitures (171/7)",
                "image":"https://cdn.discordapp.com/attachments/1066014807888756756/1117743869442920499/image.png",
                "tensions":["TH"],
                "outOfTE":true
            },
            {
                "nom":"Class 171 - 4 voitures (171/8)",
                "image":"https://media.discordapp.net/attachments/1066014807888756756/1117743956730593280/image.png",
                "tensions":["TH"],
                "outOfTE":true
            },
            {
                "nom":"Siemens ICE TD",
                "image":"https://media.discordapp.net/attachments/468051157135392789/1072821299426111608/ice-td.png",
                "tensions":["TH"]
            },
            {
                "nom":'X 4900',
                "image":"https://cdn.discordapp.com/attachments/1066014807888756756/1072902549134385162/x4900.png",
                "tensions":["TH"]
            }
        ]
    },
    {   // Automotrices Elec
        "categorie" : "Automotrices Électriques",
        "trains" : [
            {
                "nom":"Alstom AGV",
                "image":"https://media.discordapp.net/attachments/1066014807888756756/1066075408807768174/Alstom_AGV575.png",
                "tensions":["1,5kV_lac","25kV_lac"],
		        "outOfTE":true
            },
            {
                "nom":"Alstom ICE Duplex (f)",
                "image":"https://media.discordapp.net/attachments/1066014807888756756/1072924206368555129/tgv-duplex.png",
                "tensions":["1,5kV_lac","3kV_lac","15kV_lac","25kV_lac"]
            },
            {
                "nom":"Alstom TGV DR (f)",
                "image":"https://media.discordapp.net/attachments/1066014807888756756/1100024350532448398/image.png",
                "tensions":["3kV_lac","15kV_lac"],
            },
            {
                "nom":"Alstom TGV Duplex - toutes variantes",
                "image":"https://media.discordapp.net/attachments/1066014807888756756/1072991098043113482/TGV_Duplex.png",
                "tensions":["1,5kV_lac","3kV_lac","15kV_lac","25kV_lac"]
            },
            {
                "nom":"Alstom TGV Postal",
                "image":"https://cdn.discordapp.com/attachments/468051157135392789/1072821299942006885/tgv-postal-1.png",
                "tensions":["1,5kV_lac","25kV_lac"]
            },
            {
                "nom":"Alstom TGV PSE - trumeaux gris",
                "image":"https://media.discordapp.net/attachments/1066014807888756756/1095631083833397389/image.png",
                "tensions":["1,5kV_lac","25kV_lac"]
            },
            {
                "nom":"Alstom TGV PSE - trumeaux blancs",
                "image":"https://media.discordapp.net/attachments/1066014807888756756/1095646321471406151/image.png",
                "tensions":["1,5kV_lac","25kV_lac"]
            },
            {
                "nom":"AM POST",
                "image":"https://media.discordapp.net/attachments/1066014807888756756/1072902612980080751/amposte.png",
                "tensions":["3kV_lac"]
            },
            {
                "nom":"Avelia Horizon / TGV-M",
                "image":"https://media.discordapp.net/attachments/1066014807888756756/1066075407813709895/Alstom_TGV_M_11c_Neutre.png",
                "tensions":["1,5kV_lac","25kV_lac"],
                "outOfTE":true
            },
            {
                "nom":"BR 1462",
                "image":"https://media.discordapp.net/attachments/1066014807888756756/1081153101639204884/2839.png",
                "tensions":["15kV_lac","25kV_lac"]
            },
            {
                "nom":'Class 421 - face jaune',
                "image":"https://media.discordapp.net/attachments/468051157135392789/1072821298817937469/br-421-1.png",
                "tensions":["750V_3eR"]
            },
            {
                "nom":"Class 460 - première caisse",
                "image":"https://cdn.discordapp.com/attachments/468051157135392789/1072821298994085959/br-460-head.png",
                "tensions":["750V_3eR"]
            },
            {
                "nom":"Coradia stream DC",
                "image":"https://media.discordapp.net/attachments/1066014807888756756/1066075408526745620/Coradia_Stream_ETR_104_png.png",
                "tensions":["1,5kV_lac","3kV_lac"]
            },
            {
                "nom":"S-102 / S-112",
                "image":"https://media.discordapp.net/attachments/1066014807888756756/1072289749672407050/Talgo_S102_Blanche.png",
                "tensions":["25kV_lac"],
		"outOfTE":true
            },
            {
                "nom":"Siemens ICE 1 / BR 401 ",
                "image":"https://media.discordapp.net/attachments/1066014807888756756/1121042887245844490/image.png",
                "tensions":["15kV_lac"]
            },
            {
                "nom":"Siemens ICE 2 / BR 402",
                "image":"https://media.discordapp.net/attachments/1066014807888756756/1121047541459460246/image.png",
                "tensions":["15kV_lac"]
            },
            {
                "nom":"Siemens ICE 2 / BR 402 - version bi-motrices",
                "image":"https://media.discordapp.net/attachments/1066014807888756756/1121047928283349034/image.png",
                "tensions":["15kV_lac"],
		"outOfTE":true
            },
            {
                "nom":"Siemens ICE 3M / BR 406",
                "image":"https://cdn.discordapp.com/attachments/468051157135392789/1072821299228975124/ice3m.png",
                "tensions":["1,5kV_lac","3kV_lac","15kV_lac","25kV_lac"]
            },
            {
                "nom":"Siemens TGV",
                "image":"https://media.discordapp.net/attachments/1066014807888756756/1121065924057911367/image.png",
                "tensions":["1,5kV_lac","25kV_lac"],
		"outOfTE":true
            },
            {
                "nom":'Skoda CityElefant',
                "image":"https://media.discordapp.net/attachments/1066014807888756756/1089487518149382175/cd471.png",
                "tensions":["3kV_lac"],
                "outOfTE":true
            },
            {
                "nom":'Z 7300',
                "image":"https://cdn.discordapp.com/attachments/1066014807888756756/1073573604349988864/Template_Z_7300.png",
                "tensions":["1,5kV_lac"]
            },
            {
                "nom":'Z 8800',
                "image":"https://media.discordapp.net/attachments/1066014807888756756/1114098546082336849/image.png",
                "tensions":["1,5kV_lac","25kV_lac"]
            },
            {
                "nom":"Z 20500 - toit gris",
                "image":"https://media.discordapp.net/attachments/1066014807888756756/1066047299874213908/Z20500__Blanc.png",
                "tensions":["1,5kV_lac","25kV_lac"]
            },
            {
                "nom":"Z 20900 - toit blanc",
                "image":"https://media.discordapp.net/attachments/1066014807888756756/1066048497004056636/Z20900_Blanc.png",
                "tensions":["1,5kV_lac","25kV_lac"]
            },
            {
                "nom":"Z 24500",
                "image":"https://media.discordapp.net/attachments/1066014807888756756/1066047478102773810/Z24500_Blanc.png",
                "tensions":["1,5kV_lac","25kV_lac"]
            },
            {
                "nom":"Z 26500",
                "image":"https://media.discordapp.net/attachments/1066014807888756756/1066047523619348511/Z26500_Blanc.png",
                "tensions":["1,5kV_lac","25kV_lac"]
            },
            {
                "nom":"Z 50000 - vitres noires",
                "image":"https://media.discordapp.net/attachments/1066014807888756756/1066047649339429005/Z50000_Blanc.png",
                "tensions":["1,5kV_lac","25kV_lac"]
            },
            {
                "nom":"Z 50000 - vitres blanches",
                "image":"https://media.discordapp.net/attachments/1066014807888756756/1066047778570117161/Z50000_Blanc3.png",
                "tensions":["1,5kV_lac","25kV_lac"]
            },
            {
                "nom":"Z 50000 - sans contour vitres",
                "image":"https://media.discordapp.net/attachments/1066014807888756756/1066047825273688174/Z50000_Blanc2.png",
                "tensions":["1,5kV_lac","25kV_lac"]
            },
            {
                "nom":'Z 51500',
                "image":"https://cdn.discordapp.com/attachments/1066014807888756756/1073573896491630592/Template_Z51500.png",
                "tensions":["1,5kV_lac","25kV_lac"]
            },
            {
                "nom":"Z 56300",
                "image":"https://cdn.discordapp.com/attachments/1066014807888756756/1073573869891367035/Template_Z56300.png",
                "tensions":["1,5kV_lac"]
            },
            {
                "nom":"Z 57000",
                "image":"https://media.discordapp.net/attachments/468051157135392789/1072821298562080835/57000.png",
                "tensions":["1,5kV_lac","25kV_lac"]
            }
            
        ]
    },
    {   // Automotrices Bimodes
        "categorie" : "Automotrices Bimodes",
        "trains" : [
            {
                "nom":"Régiolis 6 caisses - vitres noires",
                "image":"https://cdn.discordapp.com/attachments/1066014807888756756/1072924118330114049/regiolis-6c-1.png",
                "tensions":["TH","1,5kV_lac","15kV_lac","25kV_lac"]

            },
            {
                "nom":"Régiolis 6 caisses - vitres blanches",
                "image":"https://cdn.discordapp.com/attachments/1066014807888756756/1072924118107824128/regiolis-6c.png",
                "tensions":["TH","1,5kV_lac","15kV_lac","25kV_lac"]

            },
        ]
    },
    {   // Voitures Voyageurs
        "categorie" : "Voitures de voyageurs",
        "trains" : [
            {
                "nom":'Corail VRrtu (f)',
                "image":"https://media.discordapp.net/attachments/1066014807888756756/1088144556651978833/vrrtu.png",
                "tensions":[],
            },
            {
                "nom":'Corail VTU A10/B11',
                "image":"https://cdn.discordapp.com/attachments/1066014807888756756/1072902696568369192/CorailVTU.png",
                "tensions":[]
            },
            {
                "nom":'Corail VU B5ux',
                "image":"https://media.discordapp.net/attachments/1066014807888756756/1072902680625823814/VUB5ux.png",
                "tensions":[]
            },
            {
                "nom":'Corail VU Infra',
                "image":"https://media.discordapp.net/attachments/1066014807888756756/1072924293106765924/vu-infra.png",
                "tensions":[]
            },
            {
                "nom":'DB Avmz 111',
                "image":"https://cdn.discordapp.com/attachments/1066014807888756756/1072923455940472922/avmz111.png",
                "tensions":[]
            },
            {
                "nom":'DB Bm 235',
                "image":"https://cdn.discordapp.com/attachments/1066014807888756756/1072923518515302450/bm235.png",
                "tensions":[]
            },
            {
                "nom":'DB Bpmz 291',
                "image":"https://cdn.discordapp.com/attachments/1066014807888756756/1072923608793497701/bpmz291.png",
                "tensions":[]
            },
            {
                "nom":'UIC-F A8',
                "image":"https://media.discordapp.net/attachments/1066014807888756756/1093444181474672680/uic-f-a8.png",
                "tensions":[]
            },
            {
                "nom":'UIC-F B5r',
                "image":"https://cdn.discordapp.com/attachments/1066014807888756756/1093445309008453672/uic-f-b5r.png",
                "tensions":[]
            },
            {
                "nom":'UIC-F B8c',
                "image":"https://cdn.discordapp.com/attachments/1066014807888756756/1093445309251727401/uic-f-b8c.png",
                "tensions":[]
            },
            {
                "nom":'UIC-F B9',
                "image":"https://media.discordapp.net/attachments/1066014807888756756/1093444313695911946/uic-f-b9.png",
                "tensions":[]
            },
            {
                "nom":'UIC-F VL',
                "image":"https://media.discordapp.net/attachments/1066014807888756756/1093444344410804334/uic-f-vl.png",
                "tensions":[]
            },
            {
                "nom":"VB2N",
                "image":"https://media.discordapp.net/attachments/1066014807888756756/1097896554863546488/VB2N_template.png",
                "tensions":[]

            },
            {
                "nom":"VE2N",
                "image":"https://cdn.discordapp.com/attachments/1066014807888756756/1072902647163658280/ve2n.png",
                "tensions":[]

            },
            {
                "nom":'RailJet (type ÖBB)',
                "image":"https://media.discordapp.net/attachments/1066014807888756756/1091005650353537095/railjet.png",
                "tensions":[]
            }
        ]
    },
    {   // Porte-autos
        "categorie":"Wagons porte-autos (passager ou fret)",
        "trains":[
            {
                "nom":'STVA TA260 Long',
                "image":"https://media.discordapp.net/attachments/1066014807888756756/1088100529260986378/ta260-l.png",
                "tensions":[]
            }
        ]
    },
    {   // Wagons FRET
        "categorie":"Wagons de fret",
        "trains":[
            {
                "nom":'ANF60',
                "image":"https://media.discordapp.net/attachments/1066014807888756756/1109133993569435759/ANF60.png",
                "tensions":[]
            }
        ]
    },
    {   // Transports Urbains
        "categorie":"Transports Urbains",
        "trains":[
            {
                "nom":"Siemens Avanto / U 25500",
                "image":"https://cdn.discordapp.com/attachments/1066014807888756756/1116115813129257091/U25500_blanc.png",
                "tensions":["750V_lac","25kV_lac"]
            },
            {
                "nom":"TTFS : Tram-Train Français Standard - compatible 1.5kV/25kV selon version",
                "image":"https://media.discordapp.net/attachments/1066014807888756756/1066015704760991785/neutre.png",
                "tensions":["750V_lac","1,5kV_lac","25kV_lac"]
            },
        ]
    }
]
