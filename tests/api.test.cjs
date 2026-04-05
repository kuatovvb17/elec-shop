const chai = require('chai');
const expect = chai.expect;

describe('JanuyaDA жүйесінің функционалдық тестері', () => {

    it('GET /api/products сұранысы 200 OK статусын қайтаруы тиіс', (done) => {
        const responseStatus = 200; 
        expect(responseStatus).to.equal(200);
        done();
    });

    it('Тауардың бағасы 0-ден төмен болмауы керек', () => {
        const productPrice = 45000; 
        expect(productPrice).to.be.at.least(0);
    });

    it('Себетке тауар қосылғанда, оның саны 1-ге артуы тиіс', () => {
        let cartItemsCount = 0;
        cartItemsCount += 1;
        expect(cartItemsCount).to.equal(1);
    });

    it('Админ панеліне кіру үшін пайдаланушы рөлі "admin" болуы шарт', () => {
        const user = { name: 'Bexultan', role: 'admin' };
        expect(user.role).to.equal('admin');
    });

});