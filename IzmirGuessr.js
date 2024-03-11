let guessedLocationMarker;
let randomLocation;
let minimap;
let roundCount = 0;
const roundsPerGame = 5;
const roundPoints = [];
let round0Score = 0;
let round1Score = 0;
let round2Score = 0;
let round3Score = 0;
let round4Score = 0;
let round5Score = 0;
let totalPoints = 0;
const initialLat = 38.609979;
const initialLon = 27.398601;
const initialZoom = 9;
let roundTimer;
let timerSeconds = 60; 
let selectedTimeLimit = "No Time Limit"; 
let isTimerPaused = false;
const initiallyGreenDistricts = [];
const districtLayers = [];
const formattedBounds = [];

let startPage = document.getElementById('startpage');
let gamemap = document.getElementById('gamemap');
let returnButton = document.getElementById('returnbutton');
let modaltogglebutton = document.getElementById('modaltoggle-button');
let overlayContainer = document.getElementById('overlay-container');
let finalresultsmodal = document.getElementById('final-results-modal')
let buttonrow = document.getElementById('buttonrow')
const mapContainer = document.getElementById('gamemap');
const resultModal = document.getElementById('result-modal');
let highscore = localStorage.getItem('highscore') ? parseInt(localStorage.getItem('highscore')) : 0;
document.getElementById('highscore').textContent = `Best Score: ${highscore}`;

const AliagaBounds = { north: 38.898849, south: 38.676129, west: 26.962805, east: 26.076071};
const BalcovaBounds = { north: 38.4152, south: 38.3780, west: 27.0239, east: 27.0716};
const BayindirBounds = { north: 38.2569, south: 38.1831, west: 27.5461, east: 27.7010};
const BayrakliBounds = { north: 38.4956, south: 38.4528, west: 27.1551, east: 27.1917};
const BergamaBounds = { north: 39.1369, south: 38.960276, west: 27.059889, east: 27.2109};
const BeydagBounds = { north: 38.0932, south: 38.0789, west: 28.2003, east: 28.2214};
const BornovaBounds = { north: 38.5080, south: 38.4127, west: 27.1997, east: 27.2849};
const BucaBounds = { north: 38.4015, south: 38.3446, west: 27.1398, east: 27.2382};
const CesmeBounds = { north: 38.3414, south: 38.2754, west: 26.2804, east: 26.4378};
const CigliBounds = { north: 38.5312, south: 38.4750, west: 26.9408, east: 27.0852};
const DikiliBounds = { north: 39.1881, south: 38.9169, west: 26.7954, east: 27.0150};
const FocaBounds = { north: 38.7592, south: 38.6448, west: 26.7314, east: 26.9008};
const GaziemirBounds = { north: 38.3441, south: 38.2907, west: 27.1038, east: 27.1857};
const GuzelbahceBounds = { north: 38.3838, south: 38.3127, west: 26.8569, east: 26.9192};
const KarabaglarBounds = { north: 38.4030, south: 38.3558, west: 27.0939, east: 27.1344};
const KaraburunBounds = { north: 38.6578, south: 38.4910, west: 26.5006, east: 26.6358};
const KarsiyakaBounds = { north: 38.4991, south: 38.4488, west: 27.0709, east: 27.1292};
const KemalpasaBounds = { north: 38.4868, south: 38.3938, west: 27.3372, east: 27.5234};
const KinikBounds = { north: 39.1135, south: 39.0789, west: 27.2936, east: 27.4302};
const KirazBounds = { north: 38.2777, south: 38.1806, west: 28.1847, east: 28.3019};
const KonakBounds = { north: 38.4469, south: 38.3986, west: 27.0889, east: 27.1849};
const MenderesBounds = { north: 38.2973, south: 37.9843, west: 27.1045, east: 27.2088};
const MenemenBounds = { north: 38.6355, south: 38.5426, west: 26.9160, east: 27.1113};
const NarlidereBounds = { north: 38.4168, south: 38.3698, west: 26.9227, east: 27.0258};
const OdemisBounds = { north: 38.2759, south: 38.1920, west: 27.8853, east: 28.0711};
const SeferihisarBounds = { north: 38.2612, south: 38.1338, west: 26.7691, east: 26.8580};
const SelcukBounds = { north: 37.9796, south: 37.9220, west: 27.2713, east: 27.4509};
const TireBounds = { north: 38.1378, south: 38.0764, west: 27.7081, east: 27.7531};
const TorbaliBounds = { north: 38.2798, south: 38.0775, west: 27.2253, east: 27.3997};
const UrlaBounds = { north: 38.4264, south: 38.2685, west: 26.5566, east: 26.8530};

const districtBounds = [AliagaBounds, BalcovaBounds, BayindirBounds, BayrakliBounds, BergamaBounds, BeydagBounds, BornovaBounds, BucaBounds, CesmeBounds, CigliBounds,
    DikiliBounds, FocaBounds, GaziemirBounds, GuzelbahceBounds, KarabaglarBounds, KaraburunBounds, KarsiyakaBounds, KemalpasaBounds, KinikBounds, KirazBounds,
    KonakBounds, MenderesBounds, MenemenBounds, NarlidereBounds, OdemisBounds, SeferihisarBounds, SelcukBounds, TireBounds, TorbaliBounds, UrlaBounds];

const districtsData = [
    {name: "Cesme", state: 1, bounds: CesmeBounds, coordinates: [[38.431488, 26.515475], [38.435926, 26.541392], [38.414678, 26.551186], [38.413534, 26.534781], [38.350609, 26.513694], [38.336607, 26.493425],
        [38.325834, 26.510258], [38.308864, 26.516445], [38.293238, 26.499954], [38.277607, 26.525720], [38.246337, 26.459761], [38.222066, 26.464571], [38.213881, 26.440170], [38.197787, 26.428500],
        [38.229618, 26.326467], [38.267365, 26.232679], [38.294854, 26.233366], [38.293507, 26.244703], [38.284614, 26.246077], [38.291351, 26.272530], [38.298374, 26.280609], [38.323225, 26.279578],
        [38.324572, 26.294894], [38.374837, 26.281233], [38.360722, 26.296435], [38.356642, 26.297523], [38.356170, 26.303492], [38.363675, 26.302332], [38.375014, 26.309494], [38.377167, 26.313875],
        [38.374644, 26.317010], [38.362556, 26.318565], [38.357079, 26.322330], [38.352940, 26.324432], [38.347075, 26.323535], [38.340343, 26.317867], [38.336169, 26.316664], [38.329437, 26.319069],
        [38.323511, 26.337449], [38.334150, 26.342602], [38.331591, 26.345866], [38.319067, 26.346725], [38.307753, 26.365963], [38.310178, 26.379836], [38.348691, 26.382756], [38.339536, 26.420203],
        [38.374938, 26.474765], [38.425655, 26.448824], [38.426866, 26.470625], [38.401445, 26.491925], [38.414762, 26.501888], [38.431488, 26.515475]]
    },
    {name: "Urla", state: 1, bounds: UrlaBounds, coordinates: [[38.441119, 26.601655], [38.438161, 26.565582], [38.455235, 26.563006], [38.456311, 26.479722], [38.431488, 26.515475], [38.435926, 26.541392],
            [38.414678, 26.551186], [38.413534, 26.534781], [38.350609, 26.513694], [38.336607, 26.493425], [38.325834, 26.510258], [38.308864, 26.516445], [38.293238, 26.499954], [38.277607, 26.525720],
            [38.246337, 26.459761], [38.222066, 26.464571], [38.213881, 26.440170], [38.166550, 26.514638], [38.117947, 26.548305], [38.105521, 26.610144], [38.196775, 26.635566], [38.208815, 26.733281],
            [38.222707, 26.754581], [38.259918, 26.754922], [38.285254, 26.776566], [38.284715, 26.811264], [38.267062, 26.824662], [38.263423, 26.859876], [38.297246, 26.887531], [38.302230, 26.866404],
            [38.290509, 26.847105], [38.304655, 26.812747], [38.329706, 26.820820], [38.362960, 26.856377], [38.373197, 26.855980], [38.363902, 26.818652], [38.355287, 26.807315], [38.382608, 26.762125],
            [38.435338, 26.732422], [38.430900, 26.690337], [38.390244, 26.676701], [38.358248, 26.676992], [38.346806, 26.675446], [38.344248, 26.691421], [38.315700, 26.702071], [38.311255, 26.670465],
        [38.419872, 26.612089], [38.415569, 26.600759], [38.426059, 26.583926], [38.441119, 26.601655]]
    },
    {name: "Karaburun", state: 1, bounds: KaraburunBounds, coordinates: [[38.456311, 26.479722], [38.455235, 26.563006], [38.438161, 26.565582], [38.441119, 26.601655], [38.467165, 26.638892],
        [38.528965, 26.623776], [38.680820, 26.488419], [38.656695, 26.344816], [38.566556, 26.363368], [38.483292, 26.407342], [38.452648, 26.389477], [38.447270, 26.403219], [38.471466, 26.438261],
        [38.456311, 26.479722]]
    },
    {name: "Seferihisar", state: 1, bounds: SeferihisarBounds, coordinates: [[38.222707, 26.754581], [38.259918, 26.754922], [38.285254, 26.776566], [38.284715, 26.811264], [38.267062, 26.824662], [38.263423, 26.859876], [38.297246, 26.887531],
        [38.307214, 26.940329], [38.194077, 26.985782], [38.075258, 26.979467], [38.028757, 26.865410], [38.161151, 26.820047], [38.159531, 26.773325], [38.222707, 26.754581]
        ]
    },
    {
        name: "Guzelbahce", state: 1, bounds: GuzelbahceBounds, coordinates: [[38.297246, 26.887531], [38.302230, 26.866404], [38.290509, 26.847105], [38.304655, 26.812747], [38.329706, 26.820820], [38.362960, 26.856377], [38.373197, 26.855980],
        [38.383550, 26.924827], [38.363094, 26.933105], [38.362017, 26.951313], [38.354345, 26.953374], [38.353537, 26.946159], [38.307214, 26.940329]
        ]
    },
    {
        name: "Menderes", state: 1, bounds: MenderesBounds, coordinates: [[38.307214, 26.940329], [38.194077, 26.985782], [38.075258, 26.979467], [38.016993, 27.069919], [37.980266, 27.244298], [38.047618, 27.312937], [38.137324, 27.294392],
        [38.138405, 27.233584], [38.215154, 27.205043], [38.216233, 27.220286], [38.205173, 27.224581], [38.212592, 27.247596], [38.237809, 27.236946], [38.254164, 27.251190], [38.272183, 27.245004],
        [38.283637, 27.214638], [38.282425, 27.169061], [38.273438, 27.161605], [38.278020, 27.152914], [38.290753, 27.146519], [38.291191, 27.138875], [38.300479, 27.125161], [38.298694, 27.092547],
        [38.314319, 27.019715]
        ]
    },
    {
        name: "Narlidere", state: 1, bounds: NarlidereBounds, coordinates: [[38.383550, 26.924827], [38.363094, 26.933105], [38.362017, 26.951313], [38.354345, 26.953374], [38.354917, 26.967222], [38.333645, 26.994019], [38.333375, 27.003295],
        [38.375863, 27.026015], [38.380035, 27.036579], [38.413601, 27.015607], [38.397173, 26.982947]
        ]
    },
    {
        name: "Balcova", state: 1, bounds: BalcovaBounds, coordinates: [[38.413601, 27.015607], [38.380035, 27.036579], [38.369740, 27.039377], [38.365702, 27.066685], [38.347058, 27.079137], [38.353613, 27.080211], [38.360915, 27.079564],
        [38.367746, 27.095024], [38.377099, 27.083816], [38.378748, 27.076086], [38.382983, 27.075928], [38.385606, 27.073415], [38.383622, 27.073179], [38.382848, 27.071741], [38.386868, 27.066695],
        [38.390316, 27.067790], [38.389879, 27.065964], [38.392284, 27.066400], [38.396824, 27.064281], [38.397557, 27.069331], [38.401370, 27.068814], [38.405770, 27.071466], [38.415148, 27.060424],
        [38.418040, 27.017249]
        ]
    },
    {
        name: "Selcuk", state: 1, bounds: SelcukBounds, coordinates: [[37.980266, 27.244298], [38.047618, 27.312937], [38.040318, 27.389890], [38.040588, 27.469943], [37.976748, 27.484607], [37.966192, 27.473962], [37.921790, 27.456450],
        [37.883051, 27.436830], [37.878986, 27.359570], [37.874379, 27.318993], [37.921519, 27.274370]

        ]
    },
    {
        name: "Torbali", state: 1, bounds: TorbaliBounds, coordinates: [[38.124868, 27.431763], [38.120192, 27.478151], [38.114858, 27.484591], [38.109776, 27.517293], [38.074920, 27.514889], [38.040588, 27.469943], [38.040318, 27.389890], [38.047618, 27.312937],
        [38.137324, 27.294392], [38.138405, 27.233584], [38.215154, 27.205043], [38.216233, 27.220286], [38.205173, 27.224581], [38.212592, 27.247596], [38.237809, 27.236946], [38.254164, 27.251190],
        [38.272183, 27.245004], [38.293069, 27.307717], [38.286299, 27.353711], [38.337785, 27.353330], [38.285760, 27.492406], [38.241551, 27.525387]

        ]
    },
    {
        name: "Tire", state: 1, bounds: TireBounds, coordinates: [[38.040588, 27.469943], [37.976748, 27.484607], [38.009757, 27.562252], [38.006511, 27.620655], [37.971335, 27.626839], [37.970455, 27.852780], [38.002182, 27.930635],
        [38.065460, 27.962241], [38.163783, 27.922706], [38.221257, 27.782942], [38.147855, 27.756841], [38.156494, 27.604831], [38.128953, 27.493510], [38.120192, 27.478151], [38.114858, 27.484591],
        [38.109776, 27.517293], [38.074920, 27.514889]

        ]
    },
    {
        name: "Odemis", state: 1, bounds: OdemisBounds, coordinates: [[38.002182, 27.930635], [38.065460, 27.962241], [38.163783, 27.922706], [38.221257, 27.782942], [38.309134, 27.814289], [38.317148, 27.877405], [38.387150, 27.884276],
        [38.358080, 28.148120], [38.223684, 28.137297], [38.218020, 28.176117], [38.149475, 28.193267], [38.124632, 28.184694], [38.110316, 28.137218], [38.048429, 28.154421], [38.021658, 28.141022],
        [38.036262, 28.050326], [37.976443, 28.004564]

        ]
    },
    {
        name: "Bayindir", state: 1, bounds: BayindirBounds, coordinates: [[38.309134, 27.814289], [38.221257, 27.782942], [38.147855, 27.756841], [38.156494, 27.604831], [38.128953, 27.493510], [38.120192, 27.478151], [38.124868, 27.431763],
        [38.241551, 27.525387], [38.285760, 27.492406], [38.362993, 27.710937]

        ]
    },
    {
        name: "Kiraz", state: 1, bounds: KirazBounds, coordinates: [[38.123822, 28.328846], [38.151635, 28.275289], [38.149475, 28.193267], [38.218020, 28.176117], [38.223684, 28.137297], [38.358080, 28.148120], [38.300984, 28.352641],
        [38.260019, 28.391118], [38.254628, 28.483188], [38.196371, 28.490059], [38.173703, 28.429595], [38.119703, 28.485937], [38.089445, 28.443337], [38.126252, 28.367303]

        ]
    },
    {
        name: "Beydag", state: 1, bounds: BeydagBounds, coordinates: [[38.149475, 28.193267], [38.124632, 28.184694], [38.110316, 28.137218], [38.048429, 28.154421], [38.032476, 28.278001], [38.096538, 28.330220], [38.123822, 28.328846],
        [38.151635, 28.275289]
        ]
    },
    {
        name: "Kemalpasa", state: 1, bounds: KemalpasaBounds, coordinates: [[38.337785, 27.353330], [38.285760, 27.492406], [38.362993, 27.710937], [38.448010, 27.698576], [38.503378, 27.620643], [38.456344, 27.570485],
        [38.459839, 27.541627], [38.481814, 27.510747], [38.544138, 27.448908], [38.534537, 27.354456], [38.500691, 27.349302], [38.482418, 27.322849], [38.458764, 27.321132],
        [38.438060, 27.334542], [38.393137, 27.336604], [38.362993, 27.369947]

        ]
    },
    {
        name: "Konak", state: 1, bounds: KonakBounds, coordinates: [[38.397557, 27.069331], [38.401370, 27.068814], [38.405770, 27.071466], [38.400486, 27.080181], [38.407683, 27.102340], [38.417031, 27.123244], [38.442514, 27.142910],
        [38.448363, 27.149699], [38.448283, 27.166332], [38.448564, 27.171046], [38.450703, 27.179290], [38.447959, 27.180925], [38.435325, 27.180770], [38.420364, 27.179074], [38.417435, 27.186090],
        [38.411941, 27.186199], [38.407478, 27.186676], [38.408074, 27.189461], [38.406292, 27.186824], [38.408112, 27.177941], [38.406382, 27.165313], [38.404574, 27.165239], [38.403198, 27.154160],
        [38.406003, 27.145448], [38.405027, 27.145131], [38.401492, 27.144141], [38.394345, 27.138400], [38.405847, 27.121294], [38.403231, 27.116756], [38.401482, 27.099814], [38.395710, 27.094498],
        [38.392885, 27.087799]

        ]
    },
    {
        name: "Buca", state: 1, bounds: BucaBounds, coordinates: [[38.361365, 27.139379], [38.346276, 27.136946], [38.346099, 27.177857], [38.316508, 27.183684],
        [38.303981, 27.226121], [38.283637, 27.214638], [38.272183, 27.245004], [38.293069, 27.307717], [38.286299, 27.353711], [38.337785, 27.353330],
        [38.362993, 27.369947], [38.393137, 27.336604], [38.414930, 27.302679], [38.401764, 27.264697], [38.379026, 27.258359], [38.365231, 27.237145], [38.383197, 27.226337], [38.384475, 27.216889], [38.406271, 27.210960],
        [38.408965, 27.198628], [38.404913, 27.188971], [38.406292, 27.186824], [38.408112, 27.177941], [38.406382, 27.165313], [38.404574, 27.165239], [38.403198, 27.154160], [38.406003, 27.145448],
        [38.405027, 27.145131], [38.401492, 27.144141], [38.394345, 27.138400]
        ]
    },
    {
        name: "Gaziemir", state: 1, bounds: GaziemirBounds, coordinates: [[38.353810, 27.116291], [38.356991, 27.126026],
        [38.362139, 27.129010], [38.361365, 27.139379], [38.346276, 27.136946], [38.346099, 27.177857], [38.316508, 27.183684], [38.303981, 27.226121],
        [38.283637, 27.214638], [38.282425, 27.169061], [38.273438, 27.161605], [38.278020, 27.152914], [38.290753, 27.146519], [38.291191, 27.138875], [38.300479, 27.125161],
        [38.298694, 27.092547], [38.312333, 27.079521], [38.318932, 27.080208], [38.329841, 27.091717], [38.352056, 27.105459]
        ]
    },
    {
        name: "Karabaglar", state: 1, bounds: KarabaglarBounds, coordinates: [[38.298694, 27.092547], [38.314319, 27.019715], [38.307214, 26.940329], [38.353537, 26.946159], [38.354345, 26.953374],
            [38.354917, 26.967222], [38.333645, 26.994019], [38.333375, 27.003295], [38.375863, 27.026015], [38.380035, 27.036579], [38.369740, 27.039377], [38.365702, 27.066685], [38.347058, 27.079137], [38.353613, 27.080211], [38.360915, 27.079564],
        [38.367746, 27.095024], [38.377099, 27.083816], [38.378748, 27.076086], [38.382983, 27.075928], [38.385606, 27.073415], [38.383622, 27.073179], [38.382848, 27.071741], [38.386868, 27.066695],
        [38.390316, 27.067790], [38.389879, 27.065964], [38.392284, 27.066400], [38.396824, 27.064281], [38.397557, 27.069331], [38.392885, 27.087799],
        [38.395710, 27.094498], [38.401482, 27.099814], [38.403231, 27.116756], [38.405847, 27.121294], [38.394345, 27.138400],
        [38.361365, 27.139379], [38.362139, 27.129010], [38.356991, 27.126026], [38.353810, 27.116291],
        [38.352056, 27.105459], [38.329841, 27.091717], [38.318932, 27.080208], [38.312333, 27.079521]
        ]
    },
    {
        name: "Bornova", state: 1, bounds: BornovaBounds, coordinates: [[38.393137, 27.336604], [38.438060, 27.334542], [38.458764, 27.321132], [38.482418, 27.322849], [38.500691, 27.349302], [38.534537, 27.354456], [38.572059, 27.248476],
        [38.549038, 27.223295], [38.535074, 27.185849], [38.525423, 27.185817], [38.508096, 27.175082], [38.481024, 27.185556], [38.465434, 27.202304], [38.455891, 27.203334], [38.447959, 27.180925],
        [38.435325, 27.180770], [38.420364, 27.179074], [38.417435, 27.186090], [38.411941, 27.186199], [38.407478, 27.186676], [38.408074, 27.189461], [38.406292, 27.186824], [38.404913, 27.188971],
        [38.408965, 27.198628], [38.406271, 27.210960], [38.384475, 27.216889], [38.383197, 27.226337], [38.365231, 27.237145], [38.379026, 27.258359], [38.401764, 27.264697], [38.414930, 27.302679]
        ]
    },
    {
        name: "Menemen", state: 1, bounds: MenemenBounds, coordinates: [[38.501564, 26.884009], [38.531818, 26.899614], [38.518422, 26.922903], [38.525137, 26.945575], [38.516542, 26.973402], [38.528360, 26.992984], [38.529921, 27.014675],
        [38.521595, 27.024105], [38.526228, 27.030036], [38.522220, 27.039947], [38.528713, 27.038617], [38.542409, 27.046604], [38.554760, 27.068419], [38.555482, 27.083622], [38.550397, 27.092753],
        [38.557177, 27.147877], [38.535074, 27.185849], [38.549038, 27.223295], [38.572059, 27.248476], [38.637523, 27.229224], [38.646439, 27.238102], [38.679413, 27.199969], [38.691740, 27.202717],
        [38.690400, 27.222986], [38.713175, 27.220925], [38.719872, 27.186570], [38.744528, 27.147445], [38.735406, 27.137840], [38.735138, 27.104172], [38.724961, 27.084246], [38.726836, 27.054701],
        [38.720943, 27.041384], [38.700851, 27.042424], [38.687721, 27.002918], [38.663598, 26.989863], [38.663598, 26.989863], [38.651265, 26.966201], [38.619620, 26.883407], [38.646925, 26.862477],
        [38.636735, 26.832945], [38.589839, 26.856257], [38.587843, 26.840003], [38.543936, 26.816146], [38.525137, 26.829201]

        ]
    },
    {
        name: "Aliaga", state: 1, bounds: AliagaBounds, coordinates: [[38.744528, 27.147445], [38.735406, 27.137840], [38.735138, 27.104172], [38.724961, 27.084246], [38.726836, 27.054701], [38.720943, 27.041384], [38.700851, 27.042424],
        [38.687721, 27.002918], [38.663598, 26.989863], [38.697451, 26.954760], [38.708235, 26.943853], [38.715736, 26.922170], [38.721964, 26.923201], [38.733749, 26.895890], [38.748628, 26.896880],
        [38.768975, 26.907002], [38.760141, 26.926241], [38.763888, 26.936719], [38.823427, 26.890986], [38.831284, 26.944290], [38.871824, 27.026127], [38.869151, 27.055840], [38.882648, 27.061852],
        [38.895074, 27.037458], [38.908834, 27.044329], [38.935278, 27.050832], [38.945292, 27.087935], [38.912574, 27.121424], [38.911907, 27.143899], [38.878873, 27.191848], [38.870320, 27.163677],
        [38.817375, 27.174671], [38.797042, 27.112145], [38.771886, 27.136194]
        ]
    },
    {
        name: "Bergama", state: 1, bounds: BergamaBounds, coordinates: [[38.878873, 27.191848], [38.911907, 27.143899], [38.912574, 27.121424], [38.945292, 27.087935], [38.935278, 27.050832], [38.913776, 27.018604], [38.919520, 26.985280],
        [38.940485, 27.009666], [38.976125, 27.010187], [38.996907, 26.981504], [39.084371, 26.973946], [39.109417, 27.039220], [39.169598, 27.080446], [39.241593, 26.888453], [39.288210, 26.930698],
        [39.274923, 26.995972], [39.332306, 27.081171], [39.355671, 27.094913], [39.364696, 27.213093], [39.339741, 27.222713], [39.370535, 27.399715], [39.328588, 27.405899], [39.291398, 27.464989],
        [39.196742, 27.478731], [39.162145, 27.437339], [39.147768, 27.330152], [39.116876, 27.314349], [39.122203, 27.290988], [39.139680, 27.293374], [39.130193, 27.256615], [39.008647, 27.222261], [38.988902, 27.238751], [38.988902, 27.238751],
        [38.958474, 27.290283], [38.947261, 27.342816], [38.915212, 27.333883], [38.925897, 27.307774], [38.903458, 27.236316], [38.853746, 27.224635],
        ]
    },
    {
        name: "Kinik", state: 1, bounds: KinikBounds, coordinates: [[39.162145, 27.437339], [39.147768, 27.330152], [39.116876, 27.314349], [39.122203, 27.290988], [39.139680, 27.293374], [39.130193, 27.256615], [39.008647, 27.222261], [38.988902, 27.238751], [38.988902, 27.238751],
        [38.958474, 27.290283], [38.947261, 27.342816], [38.925363, 27.401111], [38.929636, 27.455391], [38.992104, 27.474630], [39.032653, 27.540594], [39.125399, 27.505552]

        ]
    },
    {
        name: "Dikili", state: 1, bounds: DikiliBounds, coordinates: [[38.919520, 26.985280], [38.940485, 27.009666], [38.976125, 27.010187], [38.996907, 26.981504], [39.084371, 26.973946], [39.109417, 27.039220], [39.169598, 27.080446],
        [39.241593, 26.888453], [39.211108, 26.815337], [39.165871, 26.770676], [39.082772, 26.884727], [39.026252, 26.791282], [38.953669, 26.796092], [38.911472, 26.860678], [38.925797, 26.939094]

        ]
    },

    {
        name: "Foca", state: 1, bounds: FocaBounds, coordinates: [[38.663598, 26.989863], [38.651265, 26.966201], [38.619620, 26.883407], [38.646925, 26.862477], [38.636735, 26.832945], [38.589839, 26.856257], [38.587843, 26.840003],
        [38.578836, 26.829856], [38.600304, 26.802029], [38.615596, 26.756337], [38.627885, 26.754670], [38.637338, 26.743934], [38.652338, 26.722672], [38.666228, 26.734580], [38.675610, 26.733378],
        [38.722282, 26.727227], [38.739959, 26.740274], [38.747456, 26.791444], [38.760308, 26.829578], [38.752812, 26.858092], [38.733749, 26.895890], [38.721964, 26.923201], [38.715736, 26.922170],
        [38.708235, 26.943853], [38.697451, 26.954760],

        ]
    },
    {
        name: "Karsiyaka", state: 1, bounds: KarsiyakaBounds, coordinates: [[38.465098, 27.134456], [38.467921, 27.126210], [38.467383, 27.117919], [38.469668, 27.112508], [38.476119, 27.116287], [38.486265, 27.116045], [38.495200, 27.119394],
        [38.504671, 27.141034], [38.500439, 27.144298], [38.513133, 27.155946], [38.525423, 27.185817], [38.535074, 27.185849], [38.557177, 27.147877], [38.550397, 27.092753], [38.527555, 27.117544],
        [38.503718, 27.090321], [38.495939, 27.093189], [38.488952, 27.088637], [38.475447, 27.066220], [38.464494, 27.065107], [38.464897, 27.070346], [38.467114, 27.070689], [38.465098, 27.080910],
        [38.452597, 27.094652], [38.448564, 27.112516], [38.455151, 27.124615]
        ]
    },
    {
        name: "Bayrakli", state: 1, bounds: BayrakliBounds, coordinates: [[38.525423, 27.185817], [38.508096, 27.175082], [38.481024, 27.185556], [38.465434, 27.202304], [38.455891, 27.203334], [38.447959, 27.180925], [38.450703, 27.179290],
        [38.448564, 27.171046], [38.462612, 27.164175], [38.466644, 27.155844], [38.464359, 27.142875], [38.465098, 27.134456], [38.467921, 27.126210], [38.467383, 27.117919], [38.469668, 27.112508],
        [38.476119, 27.116287], [38.486265, 27.116045], [38.495200, 27.119394], [38.504671, 27.141034], [38.500439, 27.144298], [38.513133, 27.155946]
        ]
    },
    {
        name: "Cigli", state: 1, bounds: CigliBounds, coordinates: [[38.550397, 27.092753], [38.527555, 27.117544], [38.503718, 27.090321], [38.495939, 27.093189], [38.488952, 27.088637], [38.475447, 27.066220],
            [38.465502, 27.041616], [38.470055, 27.024885], [38.458495, 27.012861], [38.441355, 26.951344], [38.501564, 26.884009], [38.531818, 26.899614], [38.518422, 26.922903], [38.525137, 26.945575],
            [38.516542, 26.973402], [38.528360, 26.992984], [38.529921, 27.014675], [38.521595, 27.024105], [38.526228, 27.030036], [38.522220, 27.039947], [38.528713, 27.038617], [38.542409, 27.046604],
            [38.554760, 27.068419], [38.555482, 27.083622],

        ]
    }
];

const map2 = L.map('map2', {
    maxZoom: 11,
    minZoom: 9,
}).setView([initialLat, initialLon], initialZoom);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OpenStreetMap contributors' }).addTo(map2);

function isPointInPolygon(point, polygon) {
    const latLngs = polygon.getLatLngs()[0];
    const x = point.lng;
    const y = point.lat;

    let inside = false;
    for (let i = 0, j = latLngs.length - 1; i < latLngs.length; j = i++) {
        const xi = latLngs[i].lng;
        const yi = latLngs[i].lat;
        const xj = latLngs[j].lng;
        const yj = latLngs[j].lat;

        const intersect = ((yi > y) !== (yj > y)) &&
            (x < ((xj - xi) * (y - yi)) / (yj - yi) + xi);

        if (intersect) inside = !inside;
    }
    return inside;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

districtsData.forEach(district => {
    const polygon = L.polygon(district.coordinates, { fill: true, color: 'green' }).addTo(map2);
    districtLayers.push({ name: district.name, layer: polygon, state: 1, bounds: district.bounds });

    if (district.state === 1) {
        initiallyGreenDistricts.push({ bounds: district.bounds });
    }
});

map2.on('mousedown', function (event) {
    districtLayers.forEach(district => {
        if (isPointInPolygon(event.latlng, district.layer)) {
            updateDistrictAndButtonState(district);
            formatlama();
        }
    });
});

function updateDistrictAndButtonState(district) {
    const button = document.querySelector(`.ilcebutton[data-district="${district.name}"]`);

    if (district.layer.options.fill) {
        district.layer.setStyle({ fill: false, color: 'red' });
        district.state = 0;
        button.style.backgroundColor = 'red';

        const index = initiallyGreenDistricts.findIndex(greenDistrict => greenDistrict.bounds === district.bounds);
        if (index !== -1) {
            initiallyGreenDistricts.splice(index, 1);
        }
    } else {
        district.layer.setStyle({ fill: true, color: 'green' });
        district.state = 1;
        button.style.backgroundColor = 'green';

        if (!initiallyGreenDistricts.some(greenDistrict => greenDistrict.bounds === district.bounds)) {
            initiallyGreenDistricts.push({ name: district.name, bounds: district.bounds });
        }
    }

    let lengthh = [initiallyGreenDistricts.length];
    ilcesayisi.innerText = `Current District Count: ${lengthh}`;
}

function formatlama() {
    let formattedBounds = initiallyGreenDistricts.map(district => district.bounds);
    shuffleArray(formattedBounds);
    return formattedBounds[0];
}

function getRandomLocation() {
    selectedDistrictBounds = formatlama();
    const lat = Math.random() * (selectedDistrictBounds.north - selectedDistrictBounds.south) + selectedDistrictBounds.south;
    const lng = Math.random() * (selectedDistrictBounds.east - selectedDistrictBounds.west) + selectedDistrictBounds.west;
    return { lat, lng };
}

function loadGoogleMapsAPI(callback) {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyB-sQNlbheRpjMPOIKKUB3xg02E4Y3ZJ0Y&libraries=places&v=weekly&callback=${callback}`;
    document.body.appendChild(script);
}
function initMap() {
    function initializeMapWithRandomLocation() {
       
        randomLocation = getRandomLocation();

        startPage.style.display = 'none';
        mapContainer.style.display = 'block';
        returnButton.style.display = 'block';
        overlayContainer.style.display = 'block';
        buttonrow.style.display = 'flex';
        document.getElementById('final-results-modal').style.display = 'none';
        resultModal.style.display = 'none';
        document.getElementById('modaltoggle-button').style.display = 'none';
        document.getElementById('timer').style.display = 'block';

        resumeTimer()        

        if (roundTimer) {clearInterval(roundTimer);}
        timerSeconds = getSecondsFromTimeLimit(selectedTimeLimit);
        roundTimer = setInterval(updateTimer, 1000);
        updateTimerDisplay();

        gamemap = new google.maps.Map(document.getElementById('gamemap'), {
            center: randomLocation,
            zoom: 14,
            streetViewControl: false,
        });

        const streetViewService = new google.maps.StreetViewService();

        streetViewService.getPanorama({ location: randomLocation, radius: 50 }, function (data, status) {
            if (status === 'OK') {
                const panorama = new google.maps.StreetViewPanorama(document.getElementById('gamemap'), {
                    position: randomLocation,
                    pov: { heading: 34, pitch: 1 },
                    zoom: 1,
                    addressControl: false,
                });

                gamemap.setStreetView(panorama);

                minimap = new google.maps.Map(document.getElementById('mini-map'), {
                    center: { lat: 38.4192, lng: 27.1287 },
                    zoom: 10,
                    draggable: true,
                    streetViewControl: false,
                    mapTypeControl: false,
                    clickableIcons: false,
                });

                google.maps.event.addListener(minimap, 'click', function (event) {
                    if (guessedLocationMarker) {
                        guessedLocationMarker.setMap(null);
                    }

                    guessedLocationMarker = new google.maps.Marker({
                        position: event.latLng,
                        map: minimap,
                        title: 'Guessed Location',
                    });
                });

                google.maps.event.addListener(gamemap, 'click', function (event) {
                    if (guessedLocationMarker) {
                        guessedLocationMarker.setMap(null);
                    }

                    guessedLocationMarker = new google.maps.Marker({
                        position: event.latLng,
                        map: minimap,
                        title: 'Original Location',
                    });
                });

                const confirmButton = document.getElementById('action-button');

                confirmButton.addEventListener('click', function () {

                    const distance = google.maps.geometry.spherical.computeDistanceBetween(
                        guessedLocationMarker.getPosition(),
                        randomLocation
                    );

                    const points = calculatePoints(distance);

                    displayResults(distance, points);
                });

            } else {
                initializeMapWithRandomLocation();
            }
        });
    }
    initializeMapWithRandomLocation();
}

function toggleModal() {

        if (roundCount === 0) {
            if (resultModal.style.display === 'block') {
                resultModal.style.display = 'none';
            } else {
                resultModal.style.display = 'block';
            }
        }

        if (roundCount === 1) {
            if (resultModal.style.display === 'block') {
                resultModal.style.display = 'none';
            } else {
                resultModal.style.display = 'block';
            }
        }

        if (roundCount === 2) {
            if (resultModal.style.display === 'block') {
                resultModal.style.display = 'none';
            } else {
                resultModal.style.display = 'block';
            }
        }

        if (roundCount === 3) {
            if (resultModal.style.display === 'block') {
                resultModal.style.display = 'none';
            } else {
                resultModal.style.display = 'block';
            }
        }

        if (roundCount === 4) {
            if (resultModal.style.display === 'block') {
                resultModal.style.display = 'none';
            } else if (finalresultsmodal.style.display === 'block') {
                finalresultsmodal.style.display = 'none';
            } else if (resultModal.style.display === 'none' && finalresultsmodal.style.display === 'none') {
                finalresultsmodal.style.display = 'block';
            } 
        }

        if (roundCount === 5) {
            if (resultModal.style.display === 'block') {
                resultModal.style.display = 'none';
            } else if (finalresultsmodal.style.display === 'block') {
                finalresultsmodal.style.display = 'none';
            } else if (resultModal.style.display === 'none' && finalresultsmodal.style.display === 'none') {
                finalresultsmodal.style.display = 'block';
            } 
        }
}

function returnToStart() {
    gamemap = new google.maps.Map(document.getElementById('gamemap'), {
        center: randomLocation,
        zoom: 14,
        streetViewControl: false,
    });

    const streetViewService = new google.maps.StreetViewService();

    streetViewService.getPanorama({ location: randomLocation, radius: 50 }, function (data, status) {
        if (status === 'OK') {
            const panorama = new google.maps.StreetViewPanorama(document.getElementById('gamemap'), {
                position: randomLocation,
                pov: { heading: 34, pitch: 1 },
                zoom: 1,
                addressControl: false,
            });

            gamemap.setStreetView(panorama);
        } else {
            returnToStart(); 
        }
    });
}

function calculatePoints(distance) {
    const maxPoints = 1000;
    const minPoints = 0;

    const distanceFactor = 0.1;
    let points = Math.max(minPoints, maxPoints - distance * distanceFactor);

    if (points <= 990) {
        points = 1000;
    }

    return points.toFixed(0);
}

function displayResults(distance, points) {
    switch (roundCount) {
        case 0:
            round0Score = parseInt(points);
            break;
        case 1:
            round1Score = parseInt(points);
            break;
        case 2:
            round2Score = parseInt(points);
            break;
        case 3:
            round3Score = parseInt(points);
            break;
        case 4:
            round4Score = parseInt(points);
            break;
        case 5:
            round5Score = parseInt(points);
            break;
        default:
            break;
    }

    const resultMap = new google.maps.Map(document.getElementById('result-map'), {
        center: randomLocation,
        zoom: getZoomLevel(distance),
        streetViewControl: false,
        mapTypeControl: false,
        clickableIcons: false,
    });

    new google.maps.Marker({
        position: randomLocation,
        map: resultMap,
        title: 'Correct Answer',
        icon: 'static/images/greenpin.png',
    });

    guessedLocationMarker.setMap(resultMap);
    roundPoints.push(parseInt(points));

    document.getElementById('distance-info').textContent = `Distance: ${distance.toFixed(0)} meters`;
    document.getElementById('points-info').textContent = `Points Earned: ${points}`;

    totalPoints = round0Score + round1Score + round2Score + round3Score + round4Score + round5Score;

    document.getElementById('totalPoints').textContent = `Total Points: ${totalPoints}`;
    document.getElementById('totalPoints2').textContent = `Total Points: ${totalPoints}`;

    document.getElementById('result-modal').style.display = 'block';
    document.getElementById('overlay-container').style.display = 'none';
    document.getElementById('modaltoggle-button').style.display = 'block';
    pauseTimer();

    const guessedLatLng = guessedLocationMarker.getPosition().toJSON();

    const lineCoordinates = [
        { lat: guessedLatLng.lat, lng: guessedLatLng.lng },
        { lat: randomLocation.lat, lng: randomLocation.lng },
    ];

    const line = new google.maps.Polyline({
        path: lineCoordinates,
        geodesic: true,
        strokeColor: '#FF0000',  // Red
        strokeOpacity: 1.0,
        strokeWeight: 2,
    });

    line.setMap(resultMap);  
}

function getZoomLevel(distance) {
    if (distance < 50) {
        return 18;
    } else if (distance < 100) {
        return 17;
    } else if (distance < 250) {
        return 16;
    } else if (distance < 500) {
        return 15;
    } else if (distance < 1000) {
        return 14;
    } else if (distance < 2500) {
        return 13;
    } else if (distance < 5000) {
        return 12;
    } else if (distance < 10000) {
        return 11;
    } else if (distance < 20000) {
        return 10;
    } else if (distance < 40000) {
        return 9;
    } else if (distance < 80000) {
        return 8;
    }  else {
        return 7
    }
}

function playAgain() {
    roundCount = 0;
    totalPoints = 0;

    round0Score = 0;
    round1Score = 0;
    round2Score = 0;
    round3Score = 0;
    round4Score = 0;
    round5Score = 0;

    initMap();
    resumeTimer()
}

function returnToMainMenu() {
    roundCount = 0;
    if (totalPoints > highscore) {
        highscore = totalPoints; 
        localStorage.setItem('highscore', highscore);
    }
    document.getElementById('highscore').textContent = `Best Score: ${highscore}`;
    totalPoints = 0;

    round0Score = 0;
    round1Score = 0;
    round2Score = 0;
    round3Score = 0;
    round4Score = 0;
    round5Score = 0;

    startPage.style.display = 'flex';
    mapContainer.style.display = 'none';
    returnButton.style.display = 'none';
    modaltogglebutton.style.display = 'none';
    overlayContainer.style.display = 'none';
    finalresultsmodal.style.display = 'none';
    buttonrow.style.display = 'none';
    document.getElementById('result-modal').style.display = 'none';
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OpenStreetMap contributors' }).addTo(map2);
    pauseTimer();
}

function startGame() {
    getSecondsFromTimeLimit();
    loadGoogleMapsAPI('initMap');
    initMap();
}

function startNextGame() {
    roundCount++;    

    if (roundCount % roundsPerGame === 0) {
        document.getElementById('final-results-modal').style.display = 'block';
        document.getElementById('overlay-container').style.display = 'none';
    } else {
        document.getElementById('overlay-container').style.display = 'block';
        document.getElementById('modaltoggle-button').style.display = 'none';
        document.getElementById('result-modal').style.display = 'none';
        modaltogglebutton.style.display = 'none';
        resumeTimer();
        initMap();
    }
}

function addAllDistricts() {
    const buttons = document.querySelectorAll('.ilcebutton');
    buttons.forEach(button => {
        button.style.backgroundColor = 'green';
    });
    districtLayers.forEach(district => {
        district.layer.setStyle({ fill: true, color: 'green' });
        district.state = 1;

        if (!initiallyGreenDistricts.some(greenDistrict => greenDistrict.bounds === district.bounds)) {
            initiallyGreenDistricts.push({ name: district.name, bounds: district.bounds });
        }

        let lengthh = [initiallyGreenDistricts.length];
        ilcesayisi.innerText = `Current District Count: ${lengthh}`;
    });
}
    
function removeAllDistricts() {
    const buttons = document.querySelectorAll('.ilcebutton');
    buttons.forEach(button => {
        button.style.backgroundColor = 'red';
    });
    districtLayers.forEach(district => {
        district.layer.setStyle({ fill: false, color: 'red' });
        district.state = 0;

        const index = initiallyGreenDistricts.findIndex(greenDistrict => greenDistrict.bounds === district.bounds);
        if (index !== -1) {
            initiallyGreenDistricts.splice(index, 1);
        }

        let lengthh = [initiallyGreenDistricts.length];
        ilcesayisi.innerText = `Current District Count: ${lengthh}`;
    });
}

function toggleDistrict(districtName) {
    const button = document.querySelector(`.ilcebutton[data-district="${districtName}"]`);
    const district = districtLayers.find(district => district.name === districtName);
    if (district) {
        if (district.layer.options.fill) {
            district.layer.setStyle({ fill: false, color: 'red' });
            district.state = 0;

            const index = initiallyGreenDistricts.findIndex(greenDistrict => greenDistrict.bounds === district.bounds);
            button.style.backgroundColor = 'red';
            if (index !== -1) {
                initiallyGreenDistricts.splice(index, 1);
            }
        } else {
            district.layer.setStyle({ fill: true, color: 'green' });
            district.state = 1;
            button.style.backgroundColor = 'green';

            if (!initiallyGreenDistricts.some(greenDistrict => greenDistrict.bounds === district.bounds)) {
                initiallyGreenDistricts.push({ name: district.name, bounds: district.bounds });
            }
        }
        let lengthh = [initiallyGreenDistricts.length];
        ilcesayisi.innerText = `Current District Count: ${lengthh}`;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll('.ilcebutton');
    buttons.forEach(button => {
        button.style.backgroundColor = 'green';
    });
});

function updateTimerDisplay() {
    let displayText;
    if (timerSeconds === Infinity) {
        displayText = "Remaining: No Time Limit";
    } else {
        displayText = `Remaining: ${timerSeconds} Seconds`;
    }
    document.getElementById('timer').textContent = displayText;
}

function updateTimer() {
    getSecondsFromTimeLimit();
    if (!isTimerPaused) {
        if (selectedTimeLimit !== "No Time Limit" && timerSeconds > 0) {
            timerSeconds--;
            updateTimerDisplay();
        } else if (selectedTimeLimit !== "No Time Limit" && timerSeconds === 0) {
            clearInterval(roundTimer);
            initMap();
        }
    }
}

function getSecondsFromTimeLimit(timeLimit) {
    return parseInt(timeLimit) || Infinity;
}

function changeTimeLimit(timeLimit) {
    selectedTimeLimit = timeLimit;

    if (timeLimit === Infinity) {
        document.getElementById('timer').textContent = "Remaining: No Time Limit";
        clearInterval(roundTimer);  
    } else {
        const seconds = getSecondsFromTimeLimit(timeLimit);
        document.getElementById('timer').textContent = `Remaining: ${seconds} Seconds`;
    }
}

function endRound() {
    clearInterval(roundTimer);
}

function pauseTimer() {
    isTimerPaused = true;
    clearInterval(roundTimer);
}

function resumeTimer() {
    isTimerPaused = false;  
}

overlayContainer.addEventListener('mouseenter', function () {
    overlayContainer.classList.add('hovered');
});

overlayContainer.addEventListener('mouseleave', function () {
    overlayContainer.classList.remove('hovered');
});

const faqButton = document.getElementById('izmirfaq');
const faqMenu = document.getElementById('faq-menu');
const startPageLeftHalf = document.querySelector('.startpagelefthalf');

faqButton.addEventListener('click', function () {
    faqMenu.classList.toggle('show');

    if (startPageLeftHalf.style.display === 'none') {
        startPageLeftHalf.style.display = 'block';
    } else {
        startPageLeftHalf.style.display = 'none';
    }
});

function saveSelectedTimeLimit() {
    const selectedTimeLimit = document.getElementById('izmirtime').value;
    localStorage.setItem('selectedTimeLimit', selectedTimeLimit);
}

function loadSelectedTimeLimit() {
    const savedTimeLimit = localStorage.getItem('selectedTimeLimit');
    if (savedTimeLimit) {
        document.getElementById('izmirtime').value = savedTimeLimit;
        selectedTimeLimit = savedTimeLimit;
        updateTimerDisplay();  
    }
}

document.getElementById('izmirtime').addEventListener('change', saveSelectedTimeLimit);
window.addEventListener('load', loadSelectedTimeLimit);

buttonrow.style.display = 'none'
gamemap.style.display = 'none'
