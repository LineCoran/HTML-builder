const path = require('path')
const fs = require('fs');

fs.promises.mkdir(
    path.join(__dirname, "files-copy"),
    {recursive: true}
)

fs.readdir(
    path.join(__dirname, 'files'),
    {withFileTypes: true},
    (err, files) => {
        if(err) {
            console.log(err);
            throw err;
        }
        files.forEach((file) => {
            fs.copyFile(
                path.join(__dirname, 'files', file.name),
                path.join(__dirname, 'files-copy', file.name),
                (err) => {
                    if(err) throw err
                }
            )
        })
    }
)