class Animal{
    constructor(json){
        let locationTranslate = { 
            'River': 'Rivière',
            'Sea': 'Océan', 
            'Pier': 'Ponton', 
            'Pond': 'Étang', 
            'River (Mouth)': 'Embouchure de rivière', 
            'River (Clifftop)': 'Cascade',  
            'Sea (when raining or snowing)': 'Océan (quand il pleut ou neige)', 
            'On palm trees': 'Sur les palmiers', 
            'Flying': 'Volant', 
            'On trees': 'Sur les arbres', 
            'On tree stumps': 'Sur les souches d\'arbres', 
            'On flowers': 'Sur les fleurs',
            'On white flowers': 'Sur les fleurs blanches', 
            'On the ground': 'Sur le sol', 
            'Shaking trees': 'En secouant les arbres', 
            'On ponds and rivers': 'Dans les étangs et rivières',
            'On rotten food': 'Sur les aliments pourris',
            'On villagers': 'Sur les villageois',
            'Near trash': 'Près des poubelles',
            'On rocks (when raining)': 'Sur les rochers (quand il pleut)',
            'On beach rocks': 'Sur les rochers de plage'
        };
        this.id = json.id;
        this.name = json['name']['name-EUfr'].charAt(0).toUpperCase() + json['name']['name-EUfr'].slice(1);
        this.northernMonth = json['availability']['month-array-northern'];
        this.southernMonth = json['availability']['month-array-southern'];
        this.time = json['availability']['time-array'];
        this.shadow = json['shadow'];
        this.price = json['price'];
        this.icon = json['icon_uri'];
        this.location = locationTranslate[json['availability']['location']] === undefined ? json['availability']['location'] : locationTranslate[json['availability']['location']];
        this.speed = json['speed'];
        this.possessed = false;
    }
}

export default Animal;