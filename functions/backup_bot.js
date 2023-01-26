const dayjs = require("dayjs");
const fs = require("fs");
const path = require("path");
const zlib = require("zlib");
const _mainpath = require("./_mainpath");

async function backup_bot(){
    return new Promise((resolve, reject) => {
        const path__ = path.resolve(_mainpath(""), "../JuBot_old");
        let path_ = path__;
        if(!fs.existsSync(path_)){
            fs.mkdirSync(path_);
        };

        this.date = dayjs().format("YYYY-MM-DD");

        // path_ = path.resolve(path_, `${this.date}`);

        let dir_ = fs.readdirSync(path__);
        let pathnum = dir_.filter(v => {return v.includes(this.date)}).length;

        path_ = path.resolve(path_, `${this.date}${(pathnum === 0 ? "" : `-${pathnum+1}`)}/`);

        fs.mkdirSync(path_);

        let folder = fs.createWriteStream(path_);
        let gzip = zlib.createGzip();
        
        fs.createReadStream(_mainpath(""), {"encoding": "utf-8"}).pipe(gzip);
    });
};

// backup_bot();

// module.exports = backup_bot;