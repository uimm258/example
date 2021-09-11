const GenresService = {
  getAllGenres(knex){
    return knex
      .select('*')
      .from('genres');
  },
  insertGenres(knex, newGenres){
    return knex
      .insert(newGenres)
      .into('genres')
      .returning('*')
      .then((rows)=>{
        return rows[0];
      });
  },
  getById(knex, id){
    return knex
      .from('genres')
      .select('*')
      .where('id', id)
      .first();
  },
  deleteGenres(knex, id){
    return knex('genres')
      .where({id})
      .delete();
  },
  updateGenres(knex, id, newGenresFields){
    return knex('genres')
      .where({id})
      .update(newGenresFields);
  },
};

module.exports = GenresService;
