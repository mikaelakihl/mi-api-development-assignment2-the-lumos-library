export class Review {
    constructor(
        _id = "",
        name = "",
        rating = 0,
        created_at = ""

    ) {
        this._id = _id;
        this.name = name;
        this.rating = rating;
        this.created_at = created_at;
    }
}