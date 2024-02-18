//requiring path and fs modules
const path = require('path');
const fs = require('fs');

//joining path of directory 
const directoryPath = path.join(__dirname, 'public/spelling-asset');
//passsing directoryPath and callback function



const AUDIO_FORMATS = ['m4a', 'mp3']
const ret = [];
async function getFile () {
    
    const files = await fs.promises.readdir(directoryPath);

    files.forEach(function (file) {
        // Do whatever you want to do with the file
        const isAudio = AUDIO_FORMATS.some((item) => {
            return file.indexOf(item) !== -1;
        })
        const [text] = file.split('.');
        ret.push({
            text,
            src: file,
            isAudio
        });
    });

    
    

}

getFile()
    .then((val) => {
        console.log(ret);
        fs.writeFile(__dirname + '/src/config/assets-info.json', JSON.stringify(ret), () => {});
    });


