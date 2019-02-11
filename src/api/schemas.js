function makeId(len = 10) {
  let text = 'screenName_';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < len; i += 1) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

const screenSchema = () => ({
  name: makeId(10),
  meta: {
    surveyType: 'list',
    skippable: true,
    survey: {
      increments: 'Discrete',
      orientation: 'vertical',
      mode: 'single',
      options: [],
      // optionsCount: 2,
      optionsMax: 1,
      optionsMin: 1,
    },
    text: '',
  },
});

export default {
  screenSchema,
};
