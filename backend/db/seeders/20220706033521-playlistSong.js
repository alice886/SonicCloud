'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('playlistSongs', [
      {
        songId: 2,
        playlistId: 1,
      },
      {
        songId: 3,
        playlistId: 1,
      },
      {
        songId: 4,
        playlistId: 1,
      },
      {
        songId: 1,
        playlistId: 2,
      },
      {
        songId: 4,
        playlistId: 2,
      },
      {
        songId: 4,
        playlistId: 3,
      },
      {
        songId: 6,
        playlistId: 4,
      },
      {
        songId: 4,
        playlistId: 5,
      },
      {
        songId: 5,
        playlistId: 6,
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('playlistSongs');
  }
};

/*
SELECT Playlists.name, Playlists.userId, playlistSongs.songId, playlistSongs.playlistId, Songs.title
       FROM playlistSongs
  JOIN Songs ON Songs.id =playlistSongs.songId
       JOIN Playlists ON Playlists.id = playlistSongs.playlistId;
*/
/*
need to add songId to uderId=3 
SELECT * FROM Playlists WHERE userId=3;
*/
