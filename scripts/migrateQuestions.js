import fs from 'fs';
import path from 'path';

const fileURLToPath = require('url').fileURLToPath;
const { questionsList, variantSize } = require('./dist/data/questions.js') || require('./src/data/questions.ts') || {questionsList: [], variantSize: 30};

// Wait. The easiest way to migrate without compiling is just write a quick script that reads data/questions.ts directly as text.
