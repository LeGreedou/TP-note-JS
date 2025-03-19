class Region {
    constructor(id, nom) {
        this.id = id;
        this.nom = nom;
        this.background = this.assignerBackground();
        this.couleur = this.assignerCouleur();
    }
    assignerBackground() {
        switch (this.nom) {
            case "Ionia":
                return "linear-gradient( #ab0e69, #e6098a)"; 
            case "Noxus":
                return "linear-gradient( #690202, #9c1313"; 
            case "Zaun":
                return "linear-gradient( #184500, #2a630b";
            case "Targon":
                return "linear-gradient( #351f70, #522bba";
            case "Piltover":
                return "linear-gradient(rgb(173, 153, 5),rgb(208, 204, 0)";
            case "Îles Obscures":
                return "linear-gradient( #194f44, #09635a";
            case "Freljord":
                return "linear-gradient( #10507d, #2a79b0";
            case "Shurima":
                return "linear-gradient(rgb(186, 133, 25),rgb(245, 178, 43)";
            case "Demacia":
                return "linear-gradient( #4d4d4d,rgb(147, 147, 147)";
            case "Bandle City":
                return "linear-gradient( #bd0266, #ed007f";
            case "Bilgewater":
                return "linear-gradient( #466569, #71a2a8";
            case "Runeterra":
                return "linear-gradient( #3d4f52, #698387";
            case "Ixtal":
                return "linear-gradient( #1c7a24, #29ba35";
            case "Le Néant":
                return "linear-gradient( #531259, #8d0fb8";
            default:
                return "#000000";
        }
    }
    assignerCouleur() {
        switch (this.nom) {
            case "Ionia":
                return "#f71198"; 
            case "Noxus":
                return "#c71414"; 
            case "Zaun":
                return "#398510";
            case "Targon":
                return "#6537de";
            case "Piltover":
                return "rgb(208, 204, 0)";
            case "Îles Obscures":
                return "#0b7d72";
            case "Freljord":
                return "#3191d4";
            case "Shurima":
                return "rgb(252, 193, 75)";
            case "Demacia":
                return "#9c9898";
            case "Bandle City":
                return "#ff1793";
            case "Bilgewater":
                return "#639196";
            case "Runeterra":
                return "#6badb5";
            case "Ixtal":
                return "#29cf37";
            case "Le Néant":
                return "#ab16de";
            default:
                return "#000000";
        }
    }
}
export default Region;
