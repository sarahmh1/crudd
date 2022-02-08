const express = require ('express');
const router = express.Router();

const {getAllCustomers, getAddCustomerView, customerAction , getUpdateCustomerView, updateCustomer} = require('../controllers/customerController');

router.get('/' , getAllCustomers);
router.get('/addCustomer', getAddCustomerView);
router.post('/addCustomerAction', customerAction);
router.get('/updateCustomer/:id', getUpdateCustomerView)
router.post('/updateCustomer/:id', updateCustomer);
module.exports = router