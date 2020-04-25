class Chambre {
    constructor(chambreId) {
        this.chambreId = chambreId;
    }

    getChambreId() {
        return this.chambreId
    }

    displayHeader(message) {
        $('.layout').css('display', 'block');
        $('.menu').css('display', 'none');
        $('.main_game').css('display', 'block');
        $('#welcome').html(message);
        $('#welcome').css('text-align', 'center');
        $('#chat').css('display', 'block');
    }
}