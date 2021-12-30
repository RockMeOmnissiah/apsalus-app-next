module.exports = {


  friendlyName: 'TaxRateGet',


  description: 'Get Tax Rates.',


  inputs: {

    postal_code: {
      type: 'string',
      required: true
    },

    country_code: {
      type: 'string',
      required: true
    },

    shippingWeightLBs: {
      type: 'number',
      example: 0.1
    },

    valueOfContents: {
      type: 'number',
      example: 20
    },

  },

  exits: {

    // dbUpdateError: {
    //   description: `There was an issue updating the database.`,
    //   responseType: 'unauthorized'
    // }

  },


  fn: async function ({postal_code, country_code, shippingWeightLBs, valueOfContents}) {

    const usps = require('usps-web-tools-node-sdk');
    usps.configure({ userID: sails.config.custom.usps_user_id });

    let shippingRate;
    async function awaitShippingRate() {
      while(!shippingRate) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }

    // SHIPPING DATE (INCLUDE A HANDLING TIME BUFFER)
    const HANDLE_DAYS = 2;
    const shippingDate_YYYY_MM_DD = (new Date(Date.now() + HANDLE_DAYS * 24 * 60 * 60 * 1000)).toISOString().split('T')[0];
    const shippingDate_INTL = (new Date(Date.now() + HANDLE_DAYS * 24 * 60 * 60 * 1000)).toISOString();

    // CONVERT WEIGHT FROM FRACTIONAL LBs to { LBs, OZs }
    function _convertWeight(weightLBs) {
      let LBs = Math.trunc(weightLBs);
      let float_part = Number((weightLBs-LBs).toFixed(2));
      let OZs = Math.ceil(float_part * 16.0);
      return { LBs: LBs, OZs: OZs };
    }
    const convertedWeight =_convertWeight(shippingWeightLBs);

    // DOMESTIC RATES
    if (country_code.toUpperCase() == 'US') {

      await usps.rateCalculator.rate({
        revision: '2',
        package: [
          {
            service: 'FIRST CLASS',
            container: 'RECTANGULAR',
            firstClassMailType: 'PACKAGE SERVICE RETAIL',
            zipOrigination: sails.config.custom.usps_origin_zip,
            zipDestination: postal_code,
            pounds: convertedWeight.LBs,
            ounces: convertedWeight.OZs,
            dropOffTime: '23:59',
            shipDate: { shipDate: shippingDate_YYYY_MM_DD},
            machinable: true,
          },
          {
            service: 'PRIORITY',
            container: 'RECTANGULAR',
            zipOrigination: sails.config.custom.usps_origin_zip,
            zipDestination: postal_code,
            pounds: convertedWeight.LBs,
            ounces: convertedWeight.OZs,
            dropOffTime: '23:59',
            shipDate: { shipDate: shippingDate_YYYY_MM_DD},
            machinable: true,
          }
        ]
      }, function (error, response) {
        if (error) {
          shippingRate = { error: error };
        } else {
          shippingRate = response;
        }
      });

    // INTL RATES
    } else {

      let regionNames = new Intl.DisplayNames(['en'], {type: 'region'});

      await usps.rateCalculator.intlRate({
        revision: '2',
        package: [
          {
            mailType: 'PACKAGE',
            container: 'RECTANGULAR',
            pounds: convertedWeight.LBs,
            ounces: convertedWeight.OZs,
            valueOfContents: Math.ceil(valueOfContents),
            country: regionNames.of(country_code),
            acceptanceDateTime: shippingDate_INTL,
            destinationPostalCode: postal_code,
            originZip: sails.config.custom.usps_origin_zip,
            machinable: true,
          },
        ]
      }, function (error, response) {
        if (error) {
          shippingRate = { error: error };
        } else {
          shippingRate = response;
        }
      });

    }

    await awaitShippingRate();
    if (shippingRate.error) {
      this.res.status(400).send(
        {
          code: shippingRate.error.number,
          problems: shippingRate.error.description,
        }
      );
    }
    return shippingRate;
  }
};
