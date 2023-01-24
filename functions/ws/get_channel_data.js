async function get_channel_data(channel, option){
    return new Promise((resolve, reject) => {
        if(!(channel ?? undefined) || !(option ?? undefined)) return reject({path:[0],msg:"channel or option is undefined"});

        switch (option){
            case "dashboard": {
                


                break;
            }
        }
    });
};

module.exports = get_channel_data;