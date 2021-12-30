module.exports = {


  friendlyName: 'OrderUpdate',


  description: 'Update Order.',


  inputs: {

    id: {
      type: 'string',
      required: true
    },

    external_order_id: {
      type: 'string',
      required: false,
      unique: true,
      maxLength: 128,
      example: 'Paypal Order ID'
    },

    external_payer_id: {
      type: 'string',
      required: false,
      maxLength: 128,
      example: 'Paypal Payer ID'
    },

    user_id: {
      type: 'string',
      required: true
    },

    emailAddress: {
      type: 'string',
      required: true,
      isEmail: true,
      maxLength: 200,
      example: 'mary.sue@example.com'
    },

    fullName: {
      type: 'string',
      required: true,
      description: 'Full representation of the user\'s name.',
      maxLength: 120,
      example: 'Mary Sue van der McHenst'
    },

    country_code: {
      type: 'string',
      required: false,
      maxLength: 12,
    },

    status: {
      type: 'string',
      isIn: ['pending', 'received', 'fulfilled', 'refunded'],
      defaultsTo: 'pending',
    },

    shipToFullName: {
      type: 'string',
      required: true,
      maxLength: 120,
    },

    shipToAddress1: {
      type: 'string',
      required: true,
      maxLength: 120,
    },

    shipToAddress2: {
      type: 'string',
      required: false,
      maxLength: 120,
    },

    shipToCity: {
      type: 'string',
      required: true,
      maxLength: 120,
    },

    shipToState: {
      type: 'string',
      required: true,
      maxLength: 32,
    },

    shipToZip: {
      type: 'string',
      required: true,
      maxLength: 32,
    },

    shipToCountry: {
      type: 'string',
      required: true,
      maxLength: 64,
    },

    shipToEstDate: {
      type: 'string',
      required: false,
      maxLength: 64,
    },

    shippingCarrier: {
      type: 'string',
      isIn: ['usps', 'fedex', 'ups'],
      defaultsTo: 'usps',
    },

    shippingTracking: {
      type: 'string',
      required: false,
      maxLength: 128,
    },

    itemized: {
      type: 'string',
      required: true,
      maxLength: 512,
      example: '1x This, 2x That'
    },

    subtotal: {
      type: 'number',
      example: 4.99
    },

    taxPrice: {
      type: 'number',
      example: 4.99
    },

    shippingPrice: {
      type: 'number',
      example: 4.99
    },

    discountPrice: {
      type: 'number',
      example: -4.99
    },

    totalPrice: {
      type: 'number',
      example: 4.99
    },

    shippingWeightLBs: {
      type: 'number',
      example: 0.1
    },

  },

  exits: {
  },


  fn: async function ({id, external_order_id, external_payer_id, emailAddress, fullName, country_code,
    status, shipToFullName, shipToAddress1, shipToAddress2, shipToCity, shipToState, shipToZip, shipToCountry,
    shipToEstDate, shippingCarrier, shippingTracking, itemized,
    subtotal, taxPrice, shippingPrice, discountPrice, totalPrice, shippingWeightLBs, user_id}) {

    let existingOrder = await Order.findOne({
      id: id
    });

    let updateOrder = await Order.updateOne({
      id: id
    })
    .set(_.extend({
      external_order_id: external_order_id,
      external_payer_id: external_payer_id,
      emailAddress: emailAddress,
      fullName: fullName,
      country_code: country_code,
      status: status,
      shipToFullName: shipToFullName,
      shipToAddress1: shipToAddress1,
      shipToAddress2: shipToAddress2,
      shipToCity: shipToCity,
      shipToState: shipToState,
      shipToZip: shipToZip,
      shipToCountry: shipToCountry,
      shipToEstDate: shipToEstDate,
      shippingCarrier: shippingCarrier,
      shippingTracking: shippingTracking,
      itemized: itemized,
      subtotal: subtotal,
      taxPrice: taxPrice,
      shippingPrice: shippingPrice,
      discountPrice: discountPrice,
      totalPrice: totalPrice,
      shippingWeightLBs: shippingWeightLBs,
      user: user_id
    }));

    if(!updateOrder) { throw 'dbUpdateError'; }

    if ((existingOrder.status == 'received') &&
      (updateOrder.status == 'fulfilled') &&
      updateOrder.shippingCarrier && updateOrder.shippingTracking) {

      // Send "order shipped" email to customer
      await sails.helpers.sendTemplateEmail.with({
        to: emailAddress,
        subject: 'Order #' + external_order_id + ' Shipped',
        template: 'email-order-shipped',
        templateData: {
          fullName: fullName,
          orderID: external_order_id,
          itemized: itemized,
          carrier: shippingCarrier.toUpperCase(),
          trackingID: shippingTracking,
        }
      });

      // Send "order shipped" email to admin
      await sails.helpers.sendTemplateEmail.with({
        to: sails.config.custom.internalEmailAddress,
        subject: 'Order #' + external_order_id + ' Shipped',
        template: 'email-order-shipped',
        templateData: {
          fullName: fullName,
          orderID: external_order_id,
          itemized: itemized,
          carrier: shippingCarrier.toUpperCase(),
          trackingID: shippingTracking,
        }
      });
    }

    return updateOrder;
  }
};
