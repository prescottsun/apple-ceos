const db = require('./conn');

class Executive {
    constructor(name, year) {
        this.name = name;
        this.year = year;
    }

    static async getAll() {
            try {
                const response = await db.any(`SELECT * FROM ceos;`);
                // console.log('response', response);
                return response;
            } catch(error) {
                return error.message
            }
    }
    async addNewCeo() {
        try {
            const response = await db.result(`INSERT INTO ceos (name, year) VALUES ($1, $2);`, [this.name, this.year])
            console.log('response: ', response);
            return response;
        } catch(error) {
            return error.message
        }
    }
}

module.exports = Executive;