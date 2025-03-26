class Champion {
    constructor(id, nom, image, region, role, notes=[]) {
        this.id = id;
        this.nom = nom;
        this.region = region;
        this.role = role;
        this.image = image;
        this.notes = notes;
    }
}
export default Champion;
