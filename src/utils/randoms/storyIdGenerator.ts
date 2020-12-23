exports.generateDisplayedId  =  () => {
    const length = 4;
    const numerals = Math.floor(Math.random()*90000) + 10000;
    let alphaNumerals  = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
       alphaNumerals += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    const displayedId = "#"+numerals+alphaNumerals.toUpperCase()
    return displayedId;
}
