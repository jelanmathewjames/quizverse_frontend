# QuizVerse Frontend

### Setup instructions

1. clone the project

```
    git clone https://github.com/jelanmathewjames/quizverse_frontend.git

```

2. move into the directory

```
    cd quizverse_frontend
```

3. Install dependencies

```
    npm i
```

4. Run the server

```
    npm run dev
```

### Adding plugins and dependencies

```
npm install @reduxjs/toolkit react-redux react-router-dom react-icons react-chartjs-2 chart.js daisyui axios react-hot-toast @tailwindcss/line-clamp
```

### Adding auto import sort

1. Install the plugin

```
    npm i eslint-plugin-simple-import-sort
```

2. Add rule in `.eslintrc.cjs`

```
    'simple-import-sort/imports' : 'error',
```

3. Add simple-import-sort in the plugin array of '.eslintrc.cjs' file

```
    plugins: [...,'simple-import-sort']
```

4. Open settings.json in vscode configuration settings

5. add the following line

```
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    }
```
