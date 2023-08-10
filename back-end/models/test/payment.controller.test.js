const { Payment } = require('../models');
const paymentController = require('./payment.controller');

let payment;

beforeEach(() => {
  payment = {
    create: jest.fn(),
    findAll: jest.fn(),
    findByPk: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn()
  };

  jest.spyOn(Payment, 'create').mockImplementation(() => payment.create());
  jest.spyOn(Payment, 'findAll').mockImplementation(() => payment.findAll());
  jest.spyOn(Payment, 'findByPk').mockImplementation(() => payment.findByPk()); 
  jest.spyOn(Payment, 'update').mockImplementation(() => payment.update());
  jest.spyOn(Payment, 'destroy').mockImplementation(() => payment.destroy());
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('Payment Controller', () => {

  it('creates a payment', async () => {
    await paymentController.create({body: {}}, {});
    expect(Payment.create).toHaveBeenCalled(); 
  });

  it('finds all payments', async () => {
   await paymentController.findAll({}, {});
   expect(Payment.findAll).toHaveBeenCalled();
  });

  it('finds payment by id', async () => {
   await paymentController.findOne({params: {id: 1}}, {});
   expect(Payment.findByPk).toHaveBeenCalledWith(1);
  });

  it('updates a payment', async () => {
   await paymentController.update({params: {id: 1}, body: {}}, {});
   expect(Payment.update).toHaveBeenCalledWith({}, {where: {id: 1}});
  });

  it('deletes a payment', async () => {
    //modified
   await paymentController.delete({params: {id: 1}}, {});
   expect(Payment.destroy).toHaveBeenCalledWith({where: {id: 1}}); 
  });

});