module.exports = {
  extends: ['@commitlint/config-conventional'],
  plugins: ['commitlint-plugin-function-rules'],
  rules: {
    'subject-case': [0], // Disabled and override
    'header-max-length': [0, 'always', 120],
    'function-rules/subject-case': [2, 'always', (parsed) =>
      // eslint-disable-next-line no-misleading-character-class,implicit-arrow-linebreak
      (parsed.subject.match(/[π€π‘βπΈπβ‘π‘πΉππ] #\d{1,4} [\W\w ]{3,}/)
        ? [true]
        : [false, 'Subject must include ticket number. i,e, #123 ticket title']),
    ],
  },
};
