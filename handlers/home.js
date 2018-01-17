function homePage(req, res){
    res.sendFile('./index.html');
}
module.exports = {
    homePage,
};