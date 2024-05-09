import pro from 'child_process'

let type =process.env['npm_config_type'] ||'prepatch'
pro.exec(`npm version ${type}  && npm run build && npm publish && exit 1`);
