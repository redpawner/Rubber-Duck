const seeds = [
  {
    uid: 'oFtYP4ntJdXaLOg6yJy9al8W69Z2',
    username: 'test1',
    email: 'test1@gmail.com',
    avatar: 'user.59168e41eade7de7457f.png',
    rating_total: 0,
    rating_count: 0,
    needHelp: true,
    help_request: {
      username: 'test1',
      title: 'Why do bees sting?',
      description: 'Stinging bees. Please help.',
      hr_languages: ['Javascript', 'PHP'],
      time_created: '2022-06-29T15:49:09.638Z',
    },
  },
  {
    uid: 'Ns9zrrSjDtVfCw15CARZz8gDsN82',
    username: 'test2',
    email: 'test2@gmail.com',
    avatar: 'user.59168e41eade7de7457f.png',
    rating_total: 0,
    rating_count: 0,
    needHelp: true,
    help_request: {
      username: 'test2',
      title: 'Animals can talk, which are the rudest?',
      description: 'Quack Quack',
      hr_languages: ['Python', 'Javascript'],
      time_created: '2022-06-29T12:48:09.638Z',
    },
  },
  {
    uid: 'J2EqBocov9U46RfmaJil6CUKv8f2',
    username: 'test3',
    email: 'test3@gmail.com',
    avatar: 'user.59168e41eade7de7457f.png',
    rating_total: 0,
    rating_count: 0,
    needHelp: true,
    help_request: {
      username: 'test3',
      title: 'Is cereal soup?',
      description: 'It must be soup. no?',
      hr_languages: ['C', 'Java'],
      time_created: '2022-06-21T12:48:09.638Z',
    },
  },
  {
    uid: '0SkNjN2yF8ZSHW0hsNcmgZ2mXsE3',
    username: 'test4',
    email: 'test4@gmail.com',
    avatar: 'user.59168e41eade7de7457f.png',
    rating_total: 0,
    rating_count: 0,
    needHelp: true,
    help_request: {
      username: 'test4',
      title: 'How many chickens needed to kill elephant?',
      description: 'Depends on the size of the elephant and chickens, I guess.',
      hr_languages: ['Ruby', 'C++', 'Javascript'],
      time_created: '2022-06-23T01:48:09.638Z',
    },
  },
  {
    uid: 'mYnZBKFsFpU35XuTjxm6OL2x9QY2',
    username: 'test5',
    email: 'test5@gmail.com',
    avatar: 'user.59168e41eade7de7457f.png',
    rating_total: 0,
    rating_count: 0,
    needHelp: true,
    help_request: {
      username: 'test5',

      title: 'Who would win a fight between Superman and Batman?',
      description: 'Man..',
      hr_languages: ['Typescript', 'Perl'],
      time_created: '2022-06-26T12:48:09.638Z',
    },
  },
  {
    uid: 'latjE3wug7Zp88tflVE2QTzHJu03',
    username: 'test6',
    email: 'test6@gmail.com',
    rating_total: 0,
    avatar: 'user.59168e41eade7de7457f.png',
    rating_count: 0,
    needHelp: true,
    help_request: {
      username: 'test6',
      title: 'Sliced bread',
      description:
        'Sliced bread was first manufactured by machine and sold in the 1920s by the Chillicothe Baking Company in Missouri. It was the greatest thing since…unsliced bread?',
      hr_languages: ['Rust', 'Go'],
      time_created: '2022-06-29T12:28:09.638Z',
    },
  },
  {
    uid: 'nASbai2fxwVZTTVBmCzUNLpopoa2',
    username: 'test7',
    email: 'test7@gmail.com',
    avatar: 'user.59168e41eade7de7457f.png',
    rating_total: 0,
    rating_count: 0,
    needHelp: true,
    help_request: {
      username: 'test7',
      title: 'Google?',
      description:
        'The original name for the search engine Google was Backrub. It was renamed Google after the googol, which is the number one followed by 100 zeros.',
      hr_languages: ['React', 'MongoDB'],
      time_created: '2022-06-29T10:48:09.638Z',
    },
  },
  {
    uid: '3aUHZM9Hm7VLXMXfnfllPaCwm2i1',
    username: 'test8',
    email: 'test8@gmail.com',
    avatar: 'user.59168e41eade7de7457f.png',
    rating_total: 0,
    rating_count: 0,
    needHelp: true,
    help_request: {
      username: 'test8',
      title: 'About cows',
      description:
        'Cows don’t actually have four stomachs; they have one stomach with four compartments.',
      hr_languages: ['Angular', 'SQL'],
      time_created: '2022-05-29T12:48:09.638Z',
    },
  },
  {
    uid: 'RwymdGrtiwO4jcs6TMKJAenGn6v2',
    username: 'test9',
    email: 'test9@gmail.com',
    avatar: 'user.59168e41eade7de7457f.png',
    rating_total: 0,
    rating_count: 0,
    needHelp: true,
    help_request: {
      username: 'test9',
      title: 'Is this true?',
      description: 'Octopuses have three hearts.',
      hr_languages: ['Javascript', 'React', 'MongoDB'],
      time_created: '2022-05-30T12:48:09.638Z',
    },
  },
  {
    uid: '4fT4XDVSEEciKHzGMx6PWWnRfC92',
    username: 'test10',
    email: 'test10@gmail.com',
    avatar: 'user.59168e41eade7de7457f.png',
    rating_total: 0,
    rating_count: 0,
    needHelp: true,
    help_request: {
      username: 'test10',
      title: 'Deadliest question',
      description:
        'Mosquitoes are the deadliest animal in the world: They kill more people than any other creature, due to the diseases they carry.',
      hr_languages: ['Java', 'Prisma'],
      time_created: '2022-06-15T12:48:09.638Z',
    },
  },
  {
    uid: '5Nf0ENttLbXDxMCe2in5bfvVoI83',
    username: 'test11',
    email: 'test11@gmail.com',
    avatar: 'user.59168e41eade7de7457f.png',
    rating_total: 0,
    rating_count: 0,
    needHelp: true,
    help_request: {
      username: 'test11',
      title: 'Coding source',
      description:
        'The green code in The Matrix was actually created from symbols in the code designers wifes sushi cookbook.',
      hr_languages: ['C++', 'React'],
      time_created: '2022-06-17T12:48:09.638Z',
    },
  },
  {
    uid: 'FSCjgeIGSbVzMRfMdZRifEoCRy02',
    username: 'test12',
    email: 'test12@gmail.com',
    avatar: 'user.59168e41eade7de7457f.png',
    rating_total: 0,
    rating_count: 0,
    needHelp: true,
    help_request: {
      username: 'test12',
      title: 'Why do bees sting?',
      description:
        'Its impossible to hum while holding your nose (just try it!).',
      hr_languages: ['Javascript', 'Matlab'],
      time_created: '2022-06-16T12:48:09.638Z',
    },
  },
  {
    uid: 'sCnqF3Tpo9NZJFnJ6dYOCV5yBQr1',
    username: 'test13',
    email: 'test13@gmail.com',
    avatar: 'user.59168e41eade7de7457f.png',
    rating_total: 0,
    rating_count: 0,
    needHelp: true,
    help_request: {
      username: 'test13',
      title: 'Transfixed',
      description: 'People blink less when they use computers.',
      hr_languages: ['Perl', 'Python', 'Java'],
      time_created: '2022-06-22T11:48:09.638Z',
    },
  },
  {
    uid: 'kVkIFyhJNDea3U5T3XUnhUivYnG3',
    username: 'test14',
    email: 'test14@gmail.com',
    avatar: 'user.59168e41eade7de7457f.png',
    rating_total: 0,
    rating_count: 0,
    needHelp: true,
    help_request: {
      username: 'test14',
      title: 'Whoops',
      description: 'The first Gigabyte Drive cost $40,000.',
      hr_languages: ['Javascript', 'Ruby'],
      time_created: '2022-06-22T11:48:09.638Z',
    },
  },
  {
    uid: 'URmS411RFKSmZvbBZdSZArNM7g23',
    username: 'test15',
    email: 'test15@gmail.com',
    avatar: 'user.59168e41eade7de7457f.png',
    rating_total: 0,
    rating_count: 0,
    needHelp: true,
    help_request: {
      username: 'test15',
      title: 'Better smile',
      description: 'MIT has computers that can detect fake smiles.',
      hr_languages: ['SQL', 'Go', 'React'],
      time_created: '2022-04-22T11:48:09.638Z',
    },
  },
  {
    uid: 'xvUWCW4nuxc7Eep699ktcnIMAZj1',
    username: 'test16',
    avatar: 'user.59168e41eade7de7457f.png',
    email: 'test16@gmail.com',
    rating_total: 0,
    rating_count: 0,
    needHelp: false,
  },
  {
    uid: 'HdpgIXrPKrgEvB36sDrImIqE6533',
    username: 'test17',
    email: 'test17@gmail.com',
    avatar: 'user.59168e41eade7de7457f.png',
    rating_total: 0,
    rating_count: 0,
    needHelp: false,
  },
  {
    uid: 'baot5nPM38UhDez4FtsECrUQFVn2',
    username: 'test18',
    email: 'test18@gmail.com',
    avatar: 'user.59168e41eade7de7457f.png',
    rating_total: 0,
    rating_count: 0,
    needHelp: false,
  },
  {
    uid: '0xuXLcZBkCeNYpQ774bcgSmmB4R2',
    username: 'test19',
    email: 'test19@gmail.com',
    avatar: 'user.59168e41eade7de7457f.png',
    rating_total: 0,
    rating_count: 0,
    needHelp: false,
  },
  {
    uid: 'QpLXkWcz6AaYfXXz55M6ecp8NVe2',
    username: 'test20',
    email: 'test20@gmail.com',
    avatar: 'user.59168e41eade7de7457f.png',
    rating_total: 0,
    rating_count: 0,
    needHelp: false,
  },
];

export default seeds;
