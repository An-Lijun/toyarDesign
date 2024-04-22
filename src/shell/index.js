import pro from 'child_process'

let type =process.env['npm_config_type'] ||'prepatch'
pro.exec(`npm version ${type}`, (error, stdout, stderr) => {
  if (!error) {
    pro.exec('npm run build',(error,stdout,stderr)=>{
      if (!error) {
        pro.exec('npm run publish')
      }
    })
  }
});
