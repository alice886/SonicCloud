'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Songs', [
      {
        userId: 1,
        albumId: 1,
        title: 'Warm feeling',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        url: 'https://soniccloud886.s3.amazonaws.com/tunetank.com_3499_warm-feeling_by_ahoami.mp3',
        previewImage: 'https://styles.redditmedia.com/t5_2rlyh/styles/communityIcon_hmzazn2ionw71.png?width=256&s=d4e8f4c216663dcf2e54bfb878a3e70f9eda8a78',
      },
      {
        userId: 1,
        albumId: 1,
        title: 'Cold star',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        url: 'https://soniccloud886.s3.amazonaws.com/tunetank.com_3535_cold-star_by_ahoami.mp3',
        previewImage: 'https://styles.redditmedia.com/t5_2rlyh/styles/communityIcon_hmzazn2ionw71.png?width=256&s=d4e8f4c216663dcf2e54bfb878a3e70f9eda8a78',
      },
      {
        userId: 1,
        albumId: 1,
        title: 'Travel vlog',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        url: 'https://soniccloud886.s3.amazonaws.com/tunetank.com_4119_travel-vlog_by_alexey-anisimov.mp3',
        previewImage: 'https://styles.redditmedia.com/t5_2rlyh/styles/communityIcon_hmzazn2ionw71.png?width=256&s=d4e8f4c216663dcf2e54bfb878a3e70f9eda8a78'
      },
      {
        userId: 1,
        albumId: 1,
        title: 'Depth',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        url: 'https://soniccloud886.s3.amazonaws.com/tunetank.com_4215_depth_by_decibel.mp3',
        previewImage: 'https://styles.redditmedia.com/t5_2rlyh/styles/communityIcon_hmzazn2ionw71.png?width=256&s=d4e8f4c216663dcf2e54bfb878a3e70f9eda8a78'
      },
      {
        userId: 1,
        albumId: 1,
        title: 'Clouds',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        url: 'https://soniccloud886.s3.amazonaws.com/tunetank.com_4269_clouds_by_ahoami.mp3',
        previewImage: 'https://styles.redditmedia.com/t5_2rlyh/styles/communityIcon_hmzazn2ionw71.png?width=256&s=d4e8f4c216663dcf2e54bfb878a3e70f9eda8a78'
      },
      {
        userId: 2,
        albumId: 2,
        title: 'I wanna be with you',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        url: 'https://soniccloud886.s3.amazonaws.com/tunetank.com_5178_i-wanna-be-with-you_by_alexey-anisimov.mp3',
        previewImage: 'https://webmention.io/avatar/pbs.twimg.com/0fa39ee842dce4dd418d709a63d649c52dab690c69565aa62f8a0db299c100f9.jpg'
      },
      {
        userId: 2,
        albumId: 2,
        title: 'Green tea',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        url: 'https://soniccloud886.s3.amazonaws.com/tunetank.com_5280_green-tea_by_omka.mp3',
        previewImage: 'https://webmention.io/avatar/pbs.twimg.com/0fa39ee842dce4dd418d709a63d649c52dab690c69565aa62f8a0db299c100f9.jpg'
      },
      {
        userId: 2,
        albumId: 2,
        title: 'Rooftop sunset',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        url: 'https://soniccloud886.s3.amazonaws.com/tunetank.com_5412_rooftop-sunsets_by_alexey-anisimov.mp3',
        previewImage: 'https://webmention.io/avatar/pbs.twimg.com/0fa39ee842dce4dd418d709a63d649c52dab690c69565aa62f8a0db299c100f9.jpg'
      },
      {
        userId: 2,
        albumId: 2,
        title: 'Late night latte',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        url: 'https://soniccloud886.s3.amazonaws.com/tunetank.com_5415_late-night-latte_by_alex-gl.mp3',
        previewImage: 'https://webmention.io/avatar/pbs.twimg.com/0fa39ee842dce4dd418d709a63d649c52dab690c69565aa62f8a0db299c100f9.jpg'
      },
      {
        userId: 2,
        albumId: 2,
        title: 'Breathe',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        url: 'https://soniccloud886.s3.amazonaws.com/tunetank.com_5646_breathe_by_cloudsystem.mp3',
        previewImage: 'https://webmention.io/avatar/pbs.twimg.com/0fa39ee842dce4dd418d709a63d649c52dab690c69565aa62f8a0db299c100f9.jpg'
      },
      {
        userId: 3,
        albumId: 3,
        title: 'Morning coffee',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        url: 'https://soniccloud886.s3.amazonaws.com/tunetank.com_5710_morning-coffee_by_alex-gl.mp3',
        previewImage: 'https://ih1.redbubble.net/image.1162482071.1894/st,small,845x845-pad,1000x1000,f8f8f8.jpg'
      },
      {
        userId: 3,
        albumId: 3,
        title: 'In a jazz mood',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        url: 'https://soniccloud886.s3.amazonaws.com/tunetank.com_5953_in-a-jazz-mood_by_soundstreet.mp3',
        previewImage: 'https://ih1.redbubble.net/image.1162482071.1894/st,small,845x845-pad,1000x1000,f8f8f8.jpg'
      },
      {
        userId: 3,
        albumId: 3,
        title: 'Gameboy',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        url: 'https://soniccloud886.s3.amazonaws.com/tunetank.com_6037_gameboy_by_omka.mp3',
        previewImage: 'https://ih1.redbubble.net/image.1162482071.1894/st,small,845x845-pad,1000x1000,f8f8f8.jpg'
      },
      {
        userId: 3,
        albumId: 3,
        title: 'Stroll',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        url: 'https://soniccloud886.s3.amazonaws.com/tunetank.com_6071_stroll_by_ahoami.mp3',
        previewImage: 'https://ih1.redbubble.net/image.1162482071.1894/st,small,845x845-pad,1000x1000,f8f8f8.jpg'
      },
      {
        userId: 3,
        albumId: 3,
        title: 'Alley cat',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        url: 'https://soniccloud886.s3.amazonaws.com/tunetank.com_5646_breathe_by_cloudsystem.mp3',
        previewImage: 'https://soniccloud886.s3.amazonaws.com/tunetank.com_6073_alley-cat_by_ahoami.mp3'
      },

    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Songs', null, {});
  }
};
