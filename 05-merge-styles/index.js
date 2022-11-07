const path = require('path');
const fs = require('fs');

fs.readdir(
    path.join(__dirname, 'styles'),
    {withFileTypes: true},
    (err, files) => {
        if(err) throw err;
        fs.writeFile(
            path.join(__dirname, 'project-dist', 'bundle.css'),
             '',
              (err)=> {
                if(err) throw err;
              })
        files.forEach((file => {
            if(path.parse(path.join(__dirname, "styles", file.name)).ext === '.css') {
                fs.readFile(
                    path.join(__dirname, 'styles', file.name),
                    'utf-8',
                    (err, data) => {
                        if(err) throw err;
                        fs.appendFile(
                            path.join(__dirname, 'project-dist', 'bundle.css'),
                            data,
                            (err) => {
                                if(err) throw err
                            }
                        )
                    }

                )
            }

        }))
    }
)

