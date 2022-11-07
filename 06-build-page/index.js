const path = require('path');
const fs = require('fs');
const { text } = require('stream/consumers');


// create dir project-dist

fs.promises.mkdir(
    path.join(__dirname, "project-dist"),
    {recursive: true}
)  


// // create dir assets in project-dist

// fs.promises.mkdir(
//     path.join(__dirname, "project-dir", "assets"),
//     {recursive: true}
// )

// // merge styles and put style.css in project-sit

// fs.readdir(
//     path.join(__dirname, 'styles'),
//     {withFileTypes: true},
//     (err, files) => {
//         if(err) throw err;
//         fs.writeFile(
//             path.join(__dirname, 'project-dist', 'style.css'),
//              '',
//               (err)=> {
//                 if(err) throw err;
//               })
//         files.forEach((file => {
//             if(path.parse(path.join(__dirname, "styles", file.name)).ext === '.css') {
//                 fs.readFile(
//                     path.join(__dirname, 'styles', file.name),
//                     'utf-8',
//                     (err, data) => {
//                         if(err) throw err;
//                         fs.appendFile(
//                             path.join(__dirname, 'project-dist', 'style.css'),
//                             data,
//                             (err) => {
//                                 if(err) throw err
//                             }
//                         )
//                     }

//                 )
//             }

//         }))
//     }
// )
// copy files from assets to project-dir assets

// fs.readdir(
//     path.join(__dirname, 'assets'),
//     {withFileTypes: true},
//     (err, files) => {
//         if(err) throw err
//         files.forEach((file) => {
//             if (!file.isFile()) {
//                 fs.promises.mkdir(
//                 path.join(__dirname, "project-dist", file.name),
//                 {recursive: true}
//             )  
//                 copyFile(file.name)
//             };
//         })
//     }
// )

// copy assets function

// function copyFile(dirname) {
//     fs.readdir(
//     path.join(__dirname, 'assets', dirname),
//     { withFileTypes: true},
//     (err, files) => {
//         if(err) throw err
//         files.forEach((file) => {
//             fs.copyFile(
//                 path.join(__dirname, 'assets', dirname, file.name),
//                 path.join(__dirname, 'project-dist', dirname, file.name),
//                 (err) => {
//                     if (err) throw err
//                 }
//             )
//         }

//         )
//     }
//     )
// }

fs.readFile(
    path.join(__dirname, 'template.html'),
    'utf-8',
    (err, html) => {
        if(err) throw err;
        let htmlText = html;
        fs.readdir(
            path.join(__dirname, 'components'),
            { withFileTypes: true},
            (err, components) => {
                if(err) throw err;
                let i = 0;
                components.forEach((component) => {
                    fs.readFile(
                        path.join(__dirname, 'components', component.name),
                        'utf-8',
                        (err, componentInner) => {
                            if(err) throw err;
                            let componentFileName = component.name.split('.')[0];
                            htmlText = htmlText.replace(`{{${componentFileName}}}`, componentInner);
                            i++;
                            if(i ==3) {
                                fs.appendFile(
                                    path.join(__dirname, 'project-dist', 'index.html'),
                                    htmlText,
                                    (err) => {
                                        if(err) throw err;
                                    } // Ты три раза вставляешь
                                )
                            }
                            
                        }
                    )
                })
            }
        )
    }
)


// В файле **index.js** директории **06-build-page** напишите скрипт который:
// 1. Создаёт папку  **project-dist**.
// 2. Заменяет шаблонные теги в файле **template.html** с названиями файлов из папки components (пример:```{{section}}```) на содержимое одноимённых компонентов и  сохраняет результат в **project-dist/index.html**.
// 3. Собирает в единый файл стили из папки **styles** и помещает их в файл **project-dist/style.css**.
// 4. Копирует папку **assets** в **project-dist/assets**