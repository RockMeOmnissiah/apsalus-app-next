module.exports = {


  friendlyName: 'TaxRateGet',


  description: 'Get Tax Rates.',


  inputs: {

    country_code: {
      type: 'string',
      required: true
    },

    state_code: {
      type: 'string',
      required: true
    },

  },

  exits: {

    // dbUpdateError: {
    //   description: `There was an issue updating the database.`,
    //   responseType: 'unauthorized'
    // }

  },


  fn: async function ({country_code, state_code}) {

    const SalesTax = require('sales-tax');
    SalesTax.setTaxOriginCountry("US");

    let taxRate;
    async function awaitTaxRate() {
      while(!taxRate) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }

    await SalesTax.getSalesTax(country_code, state_code)
    .then((tax) => {
      taxRate = tax.rate
    });

    awaitTaxRate();
    return taxRate;
  }
};
